// Purpose: Subtitle sync helpers.
// Callers: Media player and subtitle editor.
// Deps: Segment type.
// API: getActiveSegment.
// Side effects: None.
import type { Segment } from "@/types/transcript";

export const getActiveSegment = (segments: Segment[], currentTime: number): Segment | undefined => segments.find((segment) => currentTime >= segment.start && currentTime <= segment.end);
