from typing import Dict, Optional

from google.api_core.exceptions import GoogleAPIError
from google.auth.exceptions import GoogleAuthError
from google.cloud import secretmanager
from loguru import logger
from pydantic import BaseSettings

# Create the Secret Manager client.
client = secretmanager.SecretManagerServiceClient()
# client = secretmanager.SecretManagerServiceClient.from_service_account_json(
#     "app/core/security/keys/service_account.json"
# )


class GoogleCloudSecretSettings(BaseSettings):
    """
    Fetch setting value from Google Cloud Secret Manager.
    Will fail silently if secret cannot be fetched for any reason.
    """

    def _build_values(self, *args, **kwargs) -> Dict[str, Optional[str]]:
        secrets = dict()
        for field in self.__fields__.values():
            cloud_key = field.field_info.extra.get("cloud_key")
            if not isinstance(cloud_key, str):
                continue
            try:
                response = client.access_secret_version(name=cloud_key)
                secrets[field.alias] = response.payload.data.decode("UTF-8")
            except (GoogleAuthError, GoogleAPIError) as e:
                logger.error(f"Could not fetch ({cloud_key}) from GCS: {e}")
        return secrets

    def get_secret(self, cloud_key) -> str | None:
        if not isinstance(cloud_key, str):
            raise TypeError(
                f"Expecting a string as a value, but got: {type(cloud_key)}."
            )
        try:
            response = client.access_secret_version(name=cloud_key)
            return response.payload.data.decode("UTF-8")  # type: ignore
        except (GoogleAuthError, GoogleAPIError) as e:
            logger.error(f"Could not fetch ({cloud_key}) from GCS: {e}")
