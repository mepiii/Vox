"""Purpose: Validate Vox upload inputs.
Callers: File service.
Deps: pathlib.
API: classify_media, validate_extension.
Side effects: None.
"""
from pathlib import Path

AUDIO_EXTENSIONS = {".mp3", ".wav", ".m4a", ".aac", ".flac"}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".mkv", ".webm"}
ALL_EXTENSIONS = AUDIO_EXTENSIONS | VIDEO_EXTENSIONS


def validate_extension(filename: str) -> str:
    suffix = Path(filename).suffix.lower()
    if suffix not in ALL_EXTENSIONS:
        raise ValueError("This file type is not supported yet.")
    return suffix


def classify_media(filename: str) -> str:
    suffix = validate_extension(filename)
    return "video" if suffix in VIDEO_EXTENSIONS else "audio"
