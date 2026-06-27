"""Purpose: Transcript result schemas.
Callers: Transcription and segment update routes.
Deps: Pydantic, Segment schema.
API: Summary, TranscriptionResponse, UpdateSegmentsRequest.
Side effects: None.
"""
from pydantic import BaseModel

from app.schemas.segment import Segment


class Summary(BaseModel):
    short: str
    key_points: list[str]
    action_items: list[str]


class TranscriptionResponse(BaseModel):
    file_id: str
    language: str
    duration: float
    segments: list[Segment]
    transcript: str
    summary: Summary
    downloads: dict[str, str]


class UpdateSegmentsRequest(BaseModel):
    file_id: str
    segments: list[Segment]
