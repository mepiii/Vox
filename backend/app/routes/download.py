"""Purpose: Download generated export files.
Callers: Frontend export buttons.
Deps: FastAPI FileResponse, file service.
API: GET /api/download/{filename}.
Side effects: Streams local file.
"""
from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.file_service import find_output

router = APIRouter(prefix="/api")


@router.get("/download/{filename}")
def download(filename: str) -> FileResponse:
    path = find_output(filename)
    return FileResponse(path, filename=path.name)
