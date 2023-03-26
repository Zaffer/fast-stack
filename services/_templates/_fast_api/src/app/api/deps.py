""""Central place to store Depends functions for use in path operator functions or path decorators
"""
from typing import Generator

# from app import crud, schemas, models
from app.core.config import secrets
from app.core.security.auth0 import Auth0, Auth0User
from app.core.session import SessionLocal
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import HTTPBearer, OAuth2PasswordBearer
from loguru import logger
from pydantic import ValidationError


def get_session() -> Generator:
    with SessionLocal() as session:
        yield session


auth0 = Auth0(
    domain=secrets.AUTH0_DOMAIN,
    api_audience=secrets.AUTH0_API_AUDIENCE,
    # These scopes are selectable in the interactive docs
    scopes={
        "read:users": "required role: ADMIN",
        "read:all": "required role: SUPPORT",
        "write:all": "required role: SUPPORT",
    },
)


def get_auth0_user(
    auth0_user: Auth0User = Security(auth0.get_user, scopes=[]),
) -> Auth0User:

    return auth0_user


def get_auth0_user_be_admin(
    auth0_user: Auth0User = Security(auth0.get_user, scopes=["read:users"]),
) -> Auth0User:

    return auth0_user


def get_auth0_user_be_support(
    auth0_user: Auth0User = Security(auth0.get_user, scopes=["read:all", "write:all"]),
) -> Auth0User:

    return auth0_user
