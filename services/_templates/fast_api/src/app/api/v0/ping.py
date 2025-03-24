from typing import Any, List

from app.core.config import settings
from fastapi import APIRouter
from loguru import logger
from pydantic import BaseModel

router = APIRouter()


class PingSchema(BaseModel):
    ping: str
    environment: str


@router.get(
    "/ping",
    response_model=PingSchema,
    # dependencies=[Depends(auth0.implicit_scheme)],
)
async def ping() -> Any:
    logger.info(f"ping: {settings.ENVIRONMENT}")

    data = {
        "ping": "pong",
        "environment": settings.ENVIRONMENT,
    }
    return data


@router.get(
    "/test",
    # response_model=List[ScanCodeLogRead,
    # dependencies=[Depends(auth0.implicit_scheme)],
)
async def test() -> Any:

    # logger.info(f"redis endpoint")

    # itoc.token_saver("toooooken")

    # r = session.get_redis_session()

    # token = r.get("API:ITOC:TOKEN")

    # return {"token": token}

    # try:
    # resp = await itoc.call_protected()
    # except await Exception as e:
    #     logger.info(f"redis endpoint error: {e}")
    #     return {"error": e}

    return {"response": "resp"}
