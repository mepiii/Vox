"""Purpose: Transcript segment schemas for Vox.
Callers: Routes, subtitle services, Whisper service.
Deps: Pydantic.
API: Segment model.
Side effects: None.
"""
from pydantic import BaseModel, Field


class Segment(BaseModel):
    id: int = Field(ge=1)
    start: float = Field(ge=0)
    end: float = Field(ge=0)
    text: str = Field(min_length=1)
