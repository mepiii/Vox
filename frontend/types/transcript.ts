// Purpose: Shared transcript types for Vox frontend.
// Callers: API helpers, editors, media components.
// Deps: None.
// API: Segment, Summary, TranscriptionResult.
// Side effects: None.
export type Segment = { id: number; start: number; end: number; text: string };
export type Summary = { short: string; key_points: string[]; action_items: string[] };
export type Downloads = Record<"txt" | "srt" | "vtt" | "json" | "csv", string>;
export type TranscriptionResult = { file_id: string; language: string; duration: number; segments: Segment[]; transcript: string; summary: Summary; downloads: Downloads };
export type UploadResponse = { file_id: string; filename: string; file_type: "audio" | "video"; status: "uploaded" };
