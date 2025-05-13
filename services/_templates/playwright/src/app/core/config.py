import os
from typing import List, Sequence

from loguru import logger
from pydantic import AnyUrl, Field
from pydantic_settings import BaseSettings
from pydantic.networks import AnyHttpUrl

from app.core.security.secret_manager import GoogleCloudSecretSettings


ORIGINS: Sequence[str] = [
    "http://localhost/",
    "http://localhost:8080",
    "http://localhost:4200",
    # "https://your-live-site-goes-here.web.app",
]

class Settings(BaseSettings):
    ENVIRONMENT: str = "dev"
    TESTING: int = 0
    BASE_DIR: str = os.path.dirname(os.path.dirname(__file__))

    TITLE: str = "PLAYWRIGHT"
    DESCRIPTION: str = """🎭"""
    VERSION: str = "0.0.1"
    TERMS_OF_SERVICE: str = ""
    CONTACT: dict = {"url": "https://www.synaptech.ltd"}
    LICENSE_INFO: dict = {
        "name": "All rights reserved.",
        "url": "https://www.synaptech.ltd",
    }

    ORIGINS: Sequence[str] = ORIGINS

    GOOGLE_CLOUD_PROJECT: str = "shain-playwright"

    # # you can load settings from a .env file here
    # class Config:
    #     env_file = ".env"
    #     env_file_encoding = "utf-8"


def get_settings() -> BaseSettings:
    return Settings()


settings = Settings()


class Secrets(GoogleCloudSecretSettings):
    logger.info("loading secrets...")

    # HUBSPOT_ACCESS_TOKEN: str | None = Field(
    #     default="YOUR_HUBSPOT_ACCESS_TOKEN",
    #     json_schema_extra={
    #         "cloud_key": f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'HUBSPOT_ACCESS_TOKEN'}/versions/latest"
    #     },
    # )

    # AUTH0_DOMAIN: str | None = Field(
    #     default='auth0.auth0.com',
    #     cloud_key=f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'AUTH0_DOMAIN'}/versions/latest"
    # )
    # AUTH0_API_AUDIENCE: str | None = Field(
    #     default='YOUR_API_AUDIENCE',
    #     cloud_key=f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'AUTH0_API_AUDIENCE'}/versions/latest"
    # )
    # AUTH0_CLIENT_ID: str | None
    # AUTH0_CLIENT_SECRET: str | None


secrets = Secrets()
