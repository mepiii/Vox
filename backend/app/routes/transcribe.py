"""Purpose: Transcribe uploads and update edited segments.
Callers: Frontend processing and editor workflows.
Deps: FastAPI, media services.
API: POST /api/transcribe, POST /api/segments/update.
Side effects: Generates export files.
"""
from fastapi import APIRouter

from app.schemas.media import TranscribeRequest
from app.schemas.transcript import TranscriptionResponse, UpdateSegmentsRequest
from app.services.audio_service import prepare_audio
from app.services.file_service import find_upload
from app.services.subtitle_service import transcript_text, write_exports
from app.services.summary_service import build_summary
from app.services.whisper_service import transcribe_audio

router = APIRouter(prefix="/api")


@router.post("/transcribe", response_model=TranscriptionResponse)
def transcribe(payload: TranscribeRequest) -> TranscriptionResponse:
    media_path = find_upload(payload.file_id)
    audio_path = prepare_audio(media_path, payload.file_id)
    segments, language, duration = transcribe_audio(audio_path, payload.model_size, payload.language)
    downloads = write_exports(payload.file_id, segments)
    return TranscriptionResponse(
        file_id=payload.file_id,
        language=language,
        duration=duration,
        segments=segments,
        transcript=transcript_text(segments),
        summary=build_summary(segments),
        downloads=downloads,
    )


@router.post("/segments/update", response_model=TranscriptionResponse)
def update_segments(payload: UpdateSegmentsRequest) -> TranscriptionResponse:
    downloads = write_exports(payload.file_id, payload.segments)
    duration = max((segment.end for segment in payload.segments), default=0)
    return TranscriptionResponse(
        file_id=payload.file_id,
        language="edited",
        duration=duration,
        segments=payload.segments,
        transcript=transcript_text(payload.segments),
        summary=build_summary(payload.segments),
        downloads=downloads,
    )
