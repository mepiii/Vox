"""Purpose: Video subtitle burn endpoint.
Callers: Frontend export workflow.
Deps: FastAPI, video service.
API: POST /api/video/burn.
Side effects: Generates subtitled MP4.
"""
from fastapi import APIRouter

from app.schemas.media import BurnVideoRequest
from app.services.file_service import find_upload
from app.services.video_service import burn_subtitles

router = APIRouter(prefix="/api")


@router.post("/video/burn")
def burn_video(payload: BurnVideoRequest) -> dict[str, str]:
    output = burn_subtitles(find_upload(payload.file_id), payload.file_id)
    return {"video_url": f"/api/download/{output.name}"}
