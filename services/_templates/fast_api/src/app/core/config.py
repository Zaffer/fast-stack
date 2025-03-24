import os
from typing import List

from loguru import logger
from pydantic import Field, validator
from pydantic.networks import AnyHttpUrl
from pydantic_settings import BaseSettings

from app.integrations.google.secret_manager import GoogleCloudSecretSettings


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
    BASE_DIR: str = os.path.dirname(os.path.dirname(__file__))

    TITLE: str = "API Service"
    # DESCRIPTION: str = """⚡"""
    # VERSION: str = "0.1.0"
    # TERMS_OF_SERVICE: str = ""
    # CONTACT: dict = {"url": ""}
    # LICENSE_INFO: dict = {
    #     "name": "Proprietary",
    #     "url": "",
    # }

    ORIGINS: List[AnyHttpUrl] = ORIGINS

    GOOGLE_CLOUD_PROJECT: str = "your-gcp-project"

    # # you can load settings from a .env file here
    # class Config:
    #     env_file = ".env"
    #     env_file_encoding = "utf-8"


def get_settings() -> BaseSettings:
    return Settings()


settings = Settings()


class Secrets(GoogleCloudSecretSettings):
    logger.info("getting secrets...")

    POSTGRES_URL: str = "postgresql+psycopg2://postgres:postgres@db-local:5432/db"

    @validator("POSTGRES_URL", pre=True)
    def postgres_url_deps_env(cls, v: str) -> str | None:
        if settings.ENVIRONMENT == "prod":
            return GoogleCloudSecretSettings.get_secret(
                cls,
                cloud_key=f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'POSTGRES_URL'}/versions/latest",
            )
        if settings.ENVIRONMENT == "proxy":
            return GoogleCloudSecretSettings.get_secret(
                cls,
                cloud_key=f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'POSTGRES_URL_PROXY'}/versions/latest",
            )
        return v

    AUTH0_DOMAIN: str | None = Field(
        default='auth0.auth0.com',
        cloud_key=f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'AUTH0_DOMAIN'}/versions/latest"
    )
    AUTH0_API_AUDIENCE: str | None = Field(
        default='YOUR_API_AUDIENCE',
        cloud_key=f"projects/{settings.GOOGLE_CLOUD_PROJECT}/secrets/{'AUTH0_API_AUDIENCE'}/versions/latest"
    )
    # AUTH0_CLIENT_ID: str | None
    # AUTH0_CLIENT_SECRET: str | None


secrets = Secrets()
