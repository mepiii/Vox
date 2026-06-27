"""Purpose: Media request and response schemas.
Callers: Upload, transcribe, video routes.
Deps: Pydantic.
API: UploadResponse, TranscribeRequest, BurnVideoRequest.
Side effects: None.
"""
from typing import Literal

from pydantic import BaseModel, Field


FileType = Literal["audio", "video"]
OutputMode = Literal["transcript", "subtitles", "transcript_subtitles"]
ModelSize = Literal["tiny", "base", "small", "medium"]


class UploadResponse(BaseModel):
    file_id: str
    filename: str
    file_type: FileType
    status: Literal["uploaded"]


class TranscribeRequest(BaseModel):
    file_id: str
    language: str = "auto"
    model_size: ModelSize = "base"
    output_mode: OutputMode = "transcript_subtitles"


class SubtitleStyle(BaseModel):
    font_size: int = Field(default=24, ge=12, le=72)
    position: Literal["bottom", "middle", "top"] = "bottom"
    background: bool = True


class BurnVideoRequest(BaseModel):
    file_id: str
    subtitle_style: SubtitleStyle = SubtitleStyle()
