"""Routes for the V1 API"""

from fastapi import APIRouter

from app.api.v1 import user

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(user.router, tags=["user"])
