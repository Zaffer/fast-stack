"""Routes for the V1 API"""

from fastapi import APIRouter

from app.api.v0 import ping, report

v0_router = APIRouter(prefix="/v0")

v0_router.include_router(report.router, tags=["report"])

