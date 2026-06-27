// Purpose: Browser API client for Vox backend.
// Callers: Upload and editor pages.
// Deps: Transcript types.
// API: uploadFile, transcribeFile, updateSegments, apiUrl.
// Side effects: Performs HTTP requests.
import type { Segment, TranscriptionResult, UploadResponse } from "@/types/transcript";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8010";

const parse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) throw new Error((await response.text()) || "Vox request failed.");
  return response.json() as Promise<T>;
};

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const form = new FormData();
  form.append("file", file);
  return parse<UploadResponse>(await fetch(`${apiUrl}/api/upload`, { method: "POST", body: form }));
};

export const transcribeFile = async (fileId: string, language: string, modelSize: string, outputMode: string): Promise<TranscriptionResult> => parse<TranscriptionResult>(await fetch(`${apiUrl}/api/transcribe`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ file_id: fileId, language, model_size: modelSize, output_mode: outputMode }) }));

export const updateSegments = async (fileId: string, segments: Segment[]): Promise<TranscriptionResult> => parse<TranscriptionResult>(await fetch(`${apiUrl}/api/segments/update`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ file_id: fileId, segments }) }));
