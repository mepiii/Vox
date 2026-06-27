"""Purpose: Manage local media upload storage.
Callers: Upload, transcribe, download, video routes.
Deps: FastAPI UploadFile, config, validators.
API: save_upload, find_upload, find_output.
Side effects: Writes uploaded files to disk.
"""
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status

from app.config import settings
from app.utils.validators import classify_media, validate_extension


async def save_upload(file: UploadFile) -> tuple[str, str, str]:
    if not file.filename:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Missing filename.")
    validate_extension(file.filename)
    content = await file.read()
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "The upload is too large. Try a smaller file.")
    file_id = uuid4().hex
    safe_name = Path(file.filename).name
    destination = settings.upload_dir / f"{file_id}_{safe_name}"
    destination.write_bytes(content)
    return file_id, safe_name, classify_media(safe_name)


def find_upload(file_id: str) -> Path:
    matches = list(settings.upload_dir.glob(f"{file_id}_*"))
    if not matches:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Vox could not find this uploaded file.")
    return matches[0]


def find_output(filename: str) -> Path:
    path = settings.output_dir / Path(filename).name
    if not path.exists():
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Vox could not find this export yet.")
    return path
