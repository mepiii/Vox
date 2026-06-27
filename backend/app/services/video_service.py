"""Purpose: Burn subtitles into video with FFmpeg.
Callers: Video route.
Deps: subprocess, FFmpeg, file and subtitle services.
API: burn_subtitles.
Side effects: Writes subtitled video output.
"""
from pathlib import Path
import shutil
import subprocess

from fastapi import HTTPException, status

from app.config import settings


def burn_subtitles(video_path: Path, file_id: str) -> Path:
    if not shutil.which("ffmpeg"):
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "FFmpeg is required to process video files.")
    subtitle_path = settings.output_dir / f"{file_id}.srt"
    if not subtitle_path.exists():
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Generate subtitles before burning them into video.")
    output = settings.output_dir / f"{file_id}_subtitled.mp4"
    command = ["ffmpeg", "-y", "-i", str(video_path), "-vf", f"subtitles={subtitle_path}", "-c:a", "copy", str(output)]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode != 0:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Vox could not burn subtitles into this video.")
    return output
