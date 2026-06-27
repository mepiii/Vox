"""Purpose: Health endpoint for Vox backend.
Callers: Frontend and deployment probes.
Deps: FastAPI.
API: GET /health.
Side effects: None.
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "app": "Vox"}
