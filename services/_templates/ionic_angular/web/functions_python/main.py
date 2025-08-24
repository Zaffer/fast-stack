import asyncio

from firebase_functions import https_fn, firestore_fn
from firebase_admin import initialize_app
from typing import Dict, Any
from firestore_onwrite_processor.processor import (
    FirestoreOnWriteProcessor,
    ProcessConfig,
)
from firestore_onwrite_processor.common import FirestoreField

initialize_app()


# Example implementation of a process function
async def process_document(
    input_value: str, event: firestore_fn.Event
) -> Dict[str, FirestoreField]:
    # Your processing logic here
    print(f"Processing document with input: {input_value}")
    return {"result": f"Processed: {input_value}"}


# Example error handler
def handle_error(error: Any) -> str:
    return f"Processing error: {str(error)}"


# Create the processor
processor_config = ProcessConfig(
    input_field="prompt", process_fn=process_document, error_fn=handle_error
)

document_processor = FirestoreOnWriteProcessor(processor_config)


@firestore_fn.on_document_written(document="collection/{docId}")
def process_firestore_document(event: firestore_fn.Event) -> None:
    """Process a document when it's written to Firestore."""
    asyncio.run(document_processor.run(event))


# example function
@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")
