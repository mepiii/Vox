"""Purpose: Upload route for media files.
Callers: Frontend upload workflow.
Deps: FastAPI, file service.
API: POST /api/upload.
Side effects: Persists uploaded file locally.
"""
from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.schemas.media import UploadResponse
from app.services.file_service import save_upload

router = APIRouter(prefix="/api")


@router.post("/upload", response_model=UploadResponse)
async def upload(file: UploadFile = File(...)) -> UploadResponse:
    try:
        file_id, filename, file_type = await save_upload(file)
    except ValueError as exc:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(exc)) from exc
    return UploadResponse(file_id=file_id, filename=filename, file_type=file_type, status="uploaded")
