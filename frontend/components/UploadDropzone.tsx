// Purpose: Drag/drop upload control with validation.
// Callers: Upload page.
// Deps: react-dropzone.
// API: UploadDropzone component.
// Side effects: Reads selected browser file metadata.
"use client";
import { useDropzone } from "react-dropzone";

const accept = { "audio/*": [".mp3", ".wav", ".m4a", ".aac", ".flac"], "video/*": [".mp4", ".mov", ".mkv", ".webm"] };

export function UploadDropzone({ file, onFile }: { file: File | null; onFile: (file: File) => void }) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ accept, maxFiles: 1, maxSize: 500 * 1024 * 1024, onDrop: (files) => files[0] && onFile(files[0]) });
  return <div {...getRootProps()} className={`panel cursor-pointer rounded-[2rem] p-10 text-center transition ${isDragActive ? "border-cyan-200 bg-cyan-300/10" : "hover:border-cyan-200/40"}`}><input {...getInputProps()} /><div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-cyan-300/12"><span className="wave flex items-center gap-1">{[12,26,18,32,16].map((height) => <span key={height} className="w-1 rounded-full bg-cyan-200" style={{ height }} />)}</span></div><h2 className="font-display text-3xl font-semibold">Drop audio or video here</h2><p className="mt-3 text-slate-300">MP3, WAV, M4A, AAC, FLAC, MP4, MOV, MKV, WEBM up to 500MB.</p>{file && <p className="mt-5 rounded-2xl bg-white/[.06] px-4 py-3 text-cyan-100">Selected: {file.name}</p>}{fileRejections[0] && <p className="mt-5 text-red-300">This file type or size is not supported yet.</p>}</div>;
}
