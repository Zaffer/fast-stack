import os
from typing import List

from loguru import logger
from pydantic import BaseSettings, Field, validator
from pydantic.networks import AnyHttpUrl

from app.core.security.secret_manager import GoogleCloudSecretSettings


ORIGINS = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8100",
    "http://localhost:4201",
    "http://localhost:4202",
    "http://localhost:4203",
    "https://your-live-site-goes-here.web.app",
]


class Settings(BaseSettings):
    ENVIRONMENT: str
    TESTING: int = 0
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))

    TITLE: str = "Your Site API"
    DESCRIPTION: str = """Your Site API ⚡"""
    VERSION: str = "1.5.0"
    TERMS_OF_SERVICE: str = "https://www.YourSite.co.za/termsandconditions.html"
    CONTACT: dict = {"url": "https://www.YourSite.co.za/#contact"}
    LICENSE_INFO: dict = {
        "name": "All rights reserved.",
        "url": "https://www.Your Site.co.za/privacypolicy.html",
    }

    ORIGINS: List[AnyHttpUrl] = ORIGINS

    # # you can load settings from a .env file here 
    # class Config:
    #     env_file = ".env"
    #     env_file_encoding = "utf-8"


def get_settings() -> BaseSettings:
    logger.info("Loading config settings from the environment...")
    return Settings()


settings = Settings()


class Secrets(GoogleCloudSecretSettings):
    project_id = os.getenv('GOOGLE_CLOUD_PROJECT')

    # GCS_MY_KEY_RESOURCE_NAME=projects/<id>/secrets/<resource-name>/versions/latest

    AUTH0_DOMAIN: str | None = Field(
        cloud_key=f"projects/{project_id}/secrets/{'AUTH0_DOMAIN'}/versions/latest"
    )
    AUTH0_API_AUDIENCE: str | None = Field(
        cloud_key=f"projects/{project_id}/secrets/{'AUTH0_API_AUDIENCE'}/versions/latest"
    )
    # AUTH0_CLIENT_ID: str | None
    # AUTH0_CLIENT_SECRET: str | None


secrets = Secrets()
