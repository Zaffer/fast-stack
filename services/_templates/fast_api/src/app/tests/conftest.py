import os

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings, get_settings
from app.main import create_application


def get_settings_override():
    return Settings(TESTING=1, POSTGRES_URL=os.environ.get("POSTGRES_TEST_URL"))


@pytest.fixture(scope="module")
def test_app():
    # set up
    app = create_application()
    app.dependency_overrides[get_settings] = get_settings_override
    with TestClient(app) as test_client:

        # testing
        yield test_client

    # tear down


@pytest.fixture(scope="module")
def test_app_with_db():
    # set up
    app = create_application()
    app.dependency_overrides[get_settings] = get_settings_override
    # register_tortoise(
    #     app,
    #     db_url=os.environ.get("DATABASE_TEST_URL"),
    #     modules={"models": ["app.models.tortoise"]},
    #     generate_schemas=True,
    #     add_exception_handlers=True,
    # )
    # TODO attach db session to app here useing SQL Alchemy
    with TestClient(app) as test_client:

        # testing
        yield test_client

    # tear down
