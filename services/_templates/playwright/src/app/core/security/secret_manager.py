from typing import Dict, Optional, Any

from google.api_core.exceptions import GoogleAPIError
from google.auth.exceptions import GoogleAuthError
from google.cloud import secretmanager
from loguru import logger
from pydantic import model_validator
from pydantic_settings import BaseSettings

# Create the Secret Manager client.
client = secretmanager.SecretManagerServiceClient()
# client = secretmanager.SecretManagerServiceClient.from_service_account_json(
#     "app/core/security/keys/service_account.json"
# )


class GoogleCloudSecretSettings(BaseSettings):
    """
    Fetch setting values from Google Cloud Secret Manager.
    Will fail silently if secrets cannot be fetched for any reason.
    """

    @model_validator(mode="before")
    @classmethod
    def fetch_secrets(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        for field_name, field in cls.model_fields.items():
            json_extra = field.json_schema_extra or {}
            cloud_key = json_extra.get("cloud_key")
            if not isinstance(cloud_key, str):
                continue
            try:
                response = client.access_secret_version(name=cloud_key)
                values[field_name] = response.payload.data.decode("UTF-8")
            except (GoogleAuthError, GoogleAPIError) as e:
                logger.error(f"Could not fetch ({cloud_key}) from GCS: {e}")
        return values
