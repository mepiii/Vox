"""Purpose: Create lightweight transcript summaries.
Callers: Transcription route.
Deps: Segment schema.
API: build_summary.
Side effects: None.
"""
from app.schemas.segment import Segment
from app.schemas.transcript import Summary


def build_summary(segments: list[Segment]) -> Summary:
    text = " ".join(s.text.strip() for s in segments if s.text.strip())
    sentences = [part.strip() for part in text.replace("?", ".").replace("!", ".").split(".") if part.strip()]
    short = ". ".join(sentences[:2]) + ("." if sentences[:2] else "Vox couldn’t detect enough speech to summarize.")
    key_points = sentences[:5] or ["No clear key points detected."]
    action_items = [s for s in sentences if any(word in s.lower() for word in ("need", "must", "should", "todo", "action"))]
    return Summary(short=short, key_points=key_points, action_items=action_items)
