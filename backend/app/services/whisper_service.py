"""Purpose: Run faster-whisper transcription with CPU defaults.
Callers: Transcribe route.
Deps: faster-whisper, config, Segment schema.
API: transcribe_audio.
Side effects: Loads Whisper models lazily into memory.
"""
from functools import lru_cache
from pathlib import Path
from typing import Any

from fastapi import HTTPException, status

from app.config import settings
from app.schemas.segment import Segment


@lru_cache(maxsize=4)
def _model(size: str) -> Any:
    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Install faster-whisper before transcribing files.") from exc
    return WhisperModel(
        size,
        device=settings.whisper_device,
        device_index=settings.whisper_gpu_device_index,
        compute_type=settings.whisper_compute_type,
        cpu_threads=settings.whisper_cpu_threads,
        num_workers=settings.whisper_num_workers,
    )


def transcribe_audio(path: Path, model_size: str, language: str) -> tuple[list[Segment], str, float]:
    try:
        segments_iter, info = _model(model_size).transcribe(str(path), language=None if language == "auto" else language)
        segments = [Segment(id=i + 1, start=float(s.start), end=float(s.end), text=" ".join(s.text.split())) for i, s in enumerate(segments_iter) if s.text.strip()]
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Vox could not transcribe this file.") from exc
    if not segments:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Vox couldn’t detect speech in this file. Try using clearer audio.")
    duration = float(getattr(info, "duration", segments[-1].end))
    detected_language = str(getattr(info, "language", language if language != "auto" else "unknown"))
    return segments, detected_language, duration
