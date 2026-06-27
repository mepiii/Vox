"""Purpose: Generate subtitle and transcript export files.
Callers: Transcription, segment update, video burn routes.
Deps: csv, json, Segment schema, time formatting.
API: write_exports, generate_srt, generate_vtt.
Side effects: Writes export files to output storage.
"""
import csv
import json
from pathlib import Path

from app.config import settings
from app.schemas.segment import Segment
from app.utils.time_format import format_srt_time, format_vtt_time


def clean_segments(segments: list[Segment]) -> list[Segment]:
    return [Segment(id=i + 1, start=s.start, end=s.end, text=" ".join(s.text.split())) for i, s in enumerate(segments) if s.text.strip()]


def transcript_text(segments: list[Segment]) -> str:
    return "\n".join(s.text for s in clean_segments(segments))


def generate_srt(segments: list[Segment]) -> str:
    return "\n\n".join(f"{s.id}\n{format_srt_time(s.start)} --> {format_srt_time(s.end)}\n{s.text}" for s in clean_segments(segments)) + "\n"


def generate_vtt(segments: list[Segment]) -> str:
    body = "\n\n".join(f"{format_vtt_time(s.start)} --> {format_vtt_time(s.end)}\n{s.text}" for s in clean_segments(segments))
    return f"WEBVTT\n\n{body}\n"


def write_exports(file_id: str, segments: list[Segment]) -> dict[str, str]:
    cleaned = clean_segments(segments)
    paths = {
        "txt": settings.output_dir / f"{file_id}.txt",
        "srt": settings.output_dir / f"{file_id}.srt",
        "vtt": settings.output_dir / f"{file_id}.vtt",
        "json": settings.output_dir / f"{file_id}.json",
        "csv": settings.output_dir / f"{file_id}.csv",
    }
    paths["txt"].write_text(transcript_text(cleaned), encoding="utf-8")
    paths["srt"].write_text(generate_srt(cleaned), encoding="utf-8")
    paths["vtt"].write_text(generate_vtt(cleaned), encoding="utf-8")
    paths["json"].write_text(json.dumps([s.model_dump() for s in cleaned], indent=2), encoding="utf-8")
    with paths["csv"].open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=["id", "start", "end", "text"])
        writer.writeheader()
        writer.writerows(s.model_dump() for s in cleaned)
    return {key: f"/api/download/{path.name}" for key, path in paths.items()}
