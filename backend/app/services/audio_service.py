"""Purpose: Prepare audio from uploaded media.
Callers: Transcription and video services.
Deps: subprocess, FFmpeg, validators.
API: prepare_audio.
Side effects: Writes WAV files to temp storage.
"""
from pathlib import Path
import shutil
import subprocess

from fastapi import HTTPException, status

from app.config import settings
from app.utils.validators import classify_media


def prepare_audio(path: Path, file_id: str) -> Path:
    if classify_media(path.name) == "audio":
        return path
    if not shutil.which("ffmpeg"):
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "FFmpeg is required to process video files.")
    output = settings.temp_dir / f"{file_id}.wav"
    command = ["ffmpeg", "-y", "-i", str(path), "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", str(output)]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode != 0:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Vox could not extract audio from this video.")
    return output
