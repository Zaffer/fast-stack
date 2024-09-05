from typing import Any, List

from app import crud
from app.api.deps import get_session

from app.core import session
from app.core.config import settings
from app.core.security.auth0 import Auth0, Auth0User
from app.schemas.plotly import plots
from fastapi import APIRouter, Depends
from loguru import logger
from pydantic import BaseModel
from sqlmodel import Session

router = APIRouter()


@router.get(
    "/users",
    # response_model=PingSchema,
    # dependencies=[Depends(auth0.implicit_scheme)],
)
async def users(
    db: Session = Depends(get_session),
):
    logger.info(f">>> /users")

    users = crud.user.get_multi(db)

    return users
