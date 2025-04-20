from typing import Any, Dict, Callable, TypeVar, Generic, Optional, Awaitable
from firebase_functions.firestore_fn import Event, Change, DocumentSnapshot
from .common import ChangeType, State, now, get_change_type, FirestoreField, safe_get

T = TypeVar('T')
TOutput = TypeVar('TOutput', bound=Dict[str, Any])

class ProcessConfig:
    def __init__(
        self,
        input_field: str,
        process_fn: Callable[[Any, Event], Awaitable[Dict[str, FirestoreField]]],
        error_fn: Callable[[Any], str],
        status_field: Optional[str] = None,
        order_field: Optional[str] = None
    ):
        self.input_field = input_field
        self.process_fn = process_fn
        self.error_fn = error_fn
        self.status_field = status_field
        self.order_field = order_field

class FirestoreOnWriteProcessor(Generic[T, TOutput]):
    def __init__(self, options: ProcessConfig):
        self.input_field = options.input_field or 'prompt'
        self.order_field = options.order_field or 'createTime'
        self.status_field = options.status_field or 'status'
        self.process_fn = options.process_fn
        self.process_updates = True
        self.error_fn = options.error_fn

    def should_process(self, change: Change) -> bool:
        change_type = get_change_type(change)
        if change_type == ChangeType.DELETE:
            return False

        # Extract status if it exists
        status = safe_get(change.after, self.status_field)
        state: State = status.get("state") if isinstance(status, dict) else None
        new_value = safe_get(change.after, self.input_field)
        old_value = safe_get(change.before, self.input_field)

        has_changed = (
            change_type == ChangeType.CREATE or
            (self.process_updates and 
             change_type == ChangeType.UPDATE and 
             old_value != new_value)
        )

        if (
            not new_value or
            state in [State.PROCESSING.value, State.COMPLETED.value, State.ERROR.value] or
            not has_changed or
            not isinstance(new_value, str)
        ):
            return False
        
        return True

    async def write_start_event(self, event: Event[Change[DocumentSnapshot]]) -> None:
        create_time = event.data.after.create_time
        update_time = now()

        status = {
            "state": State.PROCESSING.value,
            "startTime": update_time,
            "updateTime": update_time
        }

        start_data = safe_get(event.data.after, self.order_field)
        # Prepare update data
        if start_data:
            update_data = {self.status_field: status}
        else:
            update_data = {
                self.order_field: create_time, 
                self.status_field: status
            }

        event.data.after.reference.update(update_data)

    async def write_completion_event(self, change: Change, output: Dict[str, Any]) -> None:
        update_time = now()
        
        # In Firebase Python, we need to use dot notation as strings
        update_data = dict(output)  # Create a copy to avoid modifying the original
        update_data[f"{self.status_field}.state"] = State.COMPLETED.value
        update_data[f"{self.status_field}.updateTime"] = update_time
        update_data[f"{self.status_field}.completeTime"] = update_time
        
        change.after.reference.update(update_data)

    async def write_error_event(self, change: Change, e: Any) -> None:
        event_timestamp = now()
        error_message = self.error_fn(e)
        
        change.after.reference.update({
            self.status_field: {
                "state": State.ERROR.value,
                "updateTime": event_timestamp,
                "error": error_message
            }
        })

    async def run(self, event: Event) -> None:
        if not event:
            print("No event data")
            return
        
        if not event.data:
            print("No document event.data")
            return

        if not self.should_process(event.data):
            return

        try:
            await self.write_start_event(event)
            
            input_data = safe_get(event.data.after, self.input_field)
            output = await self.process_fn(input_data, event)
            
            await self.write_completion_event(event.data, output)
        except Exception as e:
            print(f"Message processing error: {e}")
            await self.write_error_event(event.data, e)