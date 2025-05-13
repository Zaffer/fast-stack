from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from fastapi.staticfiles import StaticFiles

from loguru import logger

from app.core.config import settings
from app.api.v0 import v0_router
# from app.api.v1 import v1_router

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up...")
    yield
    logger.info("Shutting down...")


def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.TITLE,
        description=settings.DESCRIPTION,
        version=settings.VERSION,
        terms_of_service=settings.TERMS_OF_SERVICE,
        contact=settings.CONTACT,
        license=settings.LICENSE_INFO,
        lifespan=lifespan,
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(v0_router)
    # application.include_router(v1_router)

    return application


app = create_application()


# # Debugger requires application start in the code, uncomment and run with python main.py
# import uvicorn
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
