from typing import Any, List

from app.core.config import settings
from app.core.security.auth0 import Auth0, Auth0User
from fastapi import APIRouter
from loguru import logger

# from app.integrations.invendis import itoc
from app.core import session
from app.schemas.plotly import plots

router = APIRouter()


@router.get(
    "/ping",
    response_model=List[plots.Scatter],
    # dependencies=[Depends(auth0.implicit_scheme)],
)
def ping() -> Any:
    logger.info(f"ping: {settings.ENVIRONMENT} + {settings.PROXY}")

    # data = plots.Line(
    #     x=[55, 69, 62, 99, 60],
    #     y=[55, 69, 62, 99, 60],
    #     type="line"
    # )
    # return [data.dict()]
    data = {
        "ping": "ok",
        "enviroment": settings.ENVIRONMENT,
        "proxy": settings.PROXY,
        "data": [
            {
                "x": [1, 2, 3],
                "y": [5, 5, 5],
                "type": "scatter",
                "mode": "lines+points",
                "marker": {"color": "red"},
            },
        ],
    }
    return data["data"]


@router.get(
    "/redis",
    # response_model=List[ScanCodeLogRead,
    # dependencies=[Depends(auth0.implicit_scheme)],
)
async def redis() -> Any:

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
