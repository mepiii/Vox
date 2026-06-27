"""Purpose: Convert seconds to subtitle timestamps.
Callers: Subtitle export service.
Deps: None.
API: format_srt_time, format_vtt_time.
Side effects: None.
"""

def _parts(seconds: float) -> tuple[int, int, int, int]:
    total_ms = max(0, round(seconds * 1000))
    hours, rem = divmod(total_ms, 3_600_000)
    minutes, rem = divmod(rem, 60_000)
    secs, ms = divmod(rem, 1000)
    return hours, minutes, secs, ms


def format_srt_time(seconds: float) -> str:
    hours, minutes, secs, ms = _parts(seconds)
    return f"{hours:02}:{minutes:02}:{secs:02},{ms:03}"


def format_vtt_time(seconds: float) -> str:
    hours, minutes, secs, ms = _parts(seconds)
    return f"{hours:02}:{minutes:02}:{secs:02}.{ms:03}"
