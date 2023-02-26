from typing import List
import os

from pydantic import BaseSettings
from pydantic.networks import AnyHttpUrl
from loguru import logger


_ORIGINS = [
    "http://localhost",
    "http://localhost:8080",
]


class Settings(BaseSettings):
    ENVIRONMENT: str = "dev"
    TESTING: str = 0

    ORIGINS: List[AnyHttpUrl] = _ORIGINS

    # # Postgres
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DBNAME: str = "postgres"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = 5432
    POSTGRES_URL: str = (
        "postgresql+psycopg2://postgres:postgres@localhost:5432/postgres"
    )
    POSTGRES_URL_TEST: str = (
        "postgresql+psycopg2://postgres:postgres@localhost:5432/postgres"
    )

    BASE_DIR: str = os.path.dirname(os.path.dirname(__file__))

    # SESSION_TYPE: str = "redis"
    SECRET_KEY: str
    # REDIS_SESSION_URL: str

    AUTH0_DOMAIN: str
    AUTH0_API_AUDIENCE: str
    AUTH0_ISSUER: str
    AUTH0_ALGORITHMS: str
    AUTH0_RULE_NAMESPACE: str
    AUTH0_CLIENT_ID: str
    AUTH0_CLIENT_SECRET: str

    class Config:
        env_file = "./.env"
        env_file_encoding = "utf-8"


def get_settings(env: str = ".env") -> Settings:
    logger.info(f"Loading config settings from the {env} environment...")
    settings = Settings(_env_file=f"./{env}")
    return settings


settings = get_settings(env="app.env")
settings2 = get_settings(env="app2.env")