// Purpose: Audio/video playback with subtitle sync.
// Callers: Editor page.
// Deps: SubtitleOverlay, subtitle helper.
// API: MediaPlayer component.
// Side effects: Creates local object URL for selected file.
"use client";
import { useEffect, useMemo } from "react";
import { getActiveSegment } from "@/lib/subtitle";
import type { Segment } from "@/types/transcript";
import { SubtitleOverlay } from "./SubtitleOverlay";

export function MediaPlayer({ file, fileType, segments, currentTime, onTime }: { file?: File; fileType: "audio" | "video"; segments: Segment[]; currentTime: number; onTime: (time: number) => void }) {
  const src = useMemo(() => file ? URL.createObjectURL(file) : undefined, [file]);
  useEffect(() => () => { if (src) URL.revokeObjectURL(src); }, [src]);
  const active = getActiveSegment(segments, currentTime);
  if (!src) return <div className="panel grid aspect-video place-items-center rounded-[2rem] text-slate-400">Upload preview appears here</div>;
  return <div className="panel relative overflow-hidden rounded-[2rem] p-3">{fileType === "video" ? <video src={src} controls className="aspect-video w-full rounded-3xl bg-black object-contain" onTimeUpdate={(event) => onTime(event.currentTarget.currentTime)} /> : <div className="rounded-3xl bg-slate-950/70 p-8"><div className="wave mb-8 flex h-40 items-center justify-center gap-2">{Array.from({ length: 40 }, (_, i) => <span key={i} className="w-1 rounded-full bg-cyan-200" style={{ height: 18 + (i % 10) * 9 }} />)}</div><audio src={src} controls className="w-full" onTimeUpdate={(event) => onTime(event.currentTarget.currentTime)} /></div>}<SubtitleOverlay segment={active} /></div>;
}
