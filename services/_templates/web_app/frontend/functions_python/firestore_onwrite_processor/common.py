from enum import Enum
from typing import Any, Dict, Callable, TypeVar, Union, Optional
from google.cloud.firestore import DocumentSnapshot, GeoPoint, SERVER_TIMESTAMP
from firebase_functions.firestore_fn import Event, Change

# Type definitions
FirestoreField = Union[str, int, float, bool, dict, list, GeoPoint, None]

class ChangeType(str, Enum):
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"

class State(str, Enum):
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    ERROR = "ERROR"

def now():
    return SERVER_TIMESTAMP

def get_change_type(change: Change) -> ChangeType:
    if not change.before or not change.before.exists:
        return ChangeType.CREATE
    if not change.after or not change.after.exists:
        return ChangeType.DELETE
    return ChangeType.UPDATE

def is_delete(change: Change) -> bool:
    return get_change_type(change) == ChangeType.DELETE

def is_update(change: Change) -> bool:
    return get_change_type(change) == ChangeType.UPDATE

def is_create(change: Change) -> bool:
    return get_change_type(change) == ChangeType.CREATE

def safe_get(document, field_path, default=None):
    """Safely get a field from a document without KeyError."""
    if document is None:
        return default
    if not hasattr(document, 'get'):
        return default
        
    try:
        return document.get(field_path)
    except KeyError:
        return default