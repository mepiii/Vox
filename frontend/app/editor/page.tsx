// Purpose: Vox result workspace with synced transcript and exports.
// Callers: Next.js App Router.
// Deps: Editor components, API client, transcript types.
// API: EditorPage component.
// Side effects: Reads sessionStorage and updates generated exports.
"use client";
import { useEffect, useMemo, useState } from "react";
import { ExportButtons } from "@/components/ExportButtons";
import { Logo } from "@/components/Logo";
import { MediaPlayer } from "@/components/MediaPlayer";
import { SubtitleEditor } from "@/components/SubtitleEditor";
import { SummaryPanel } from "@/components/SummaryPanel";
import { Toast } from "@/components/Toast";
import { TranscriptEditor } from "@/components/TranscriptEditor";
import { updateSegments } from "@/lib/api";
import type { Segment, TranscriptionResult } from "@/types/transcript";

const tabs = ["Transcript", "Subtitles", "Summary", "Export"] as const;
type Tab = (typeof tabs)[number];

export default function EditorPage() {
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [tab, setTab] = useState<Tab>("Transcript");
  const [currentTime, setCurrentTime] = useState(0);
  const [message, setMessage] = useState("");
  const fileType = useMemo(() => (typeof window === "undefined" ? "video" : (sessionStorage.getItem("vox:lastFileType") as "audio" | "video") || "video"), []);
  useEffect(() => {
    const stored = sessionStorage.getItem("vox:lastResult");
    if (!stored) return;
    const parsed = JSON.parse(stored) as TranscriptionResult;
    setResult(parsed);
    setSegments(parsed.segments);
  }, []);
  const save = async () => {
    if (!result) return;
    const next = await updateSegments(result.file_id, segments);
    setResult(next);
    setSegments(next.segments);
    sessionStorage.setItem("vox:lastResult", JSON.stringify(next));
    setMessage("Exports regenerated from edited subtitles.");
  };
  const seek = (time: number) => setCurrentTime(time);
  if (!result) return <main className="mx-auto max-w-5xl px-6 py-10"><Logo /><div className="mt-12"><Toast tone="error" message="No transcript found. Upload a file first." /></div></main>;
  return <main className="mx-auto max-w-7xl px-6 py-8"><div className="mb-8 flex items-center justify-between"><a href="/"><Logo /></a><a href="/upload" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">New file</a></div><div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]"><MediaPlayer fileType={fileType} segments={segments} currentTime={currentTime} onTime={setCurrentTime} /><section className="panel max-h-[78vh] overflow-auto rounded-[2rem] p-5"><div className="mb-5 flex flex-wrap gap-2">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === item ? "bg-cyan-300 text-slate-950" : "bg-white/[.06] text-slate-300"}`}>{item}</button>)}<button onClick={save} className="ml-auto rounded-full border border-white/10 px-4 py-2 text-sm text-cyan-100">Save changes</button></div>{message && <div className="mb-4"><Toast tone="success" message={message} /></div>}{tab === "Transcript" && <TranscriptEditor segments={segments} currentTime={currentTime} onChange={setSegments} onSeek={seek} />}{tab === "Subtitles" && <SubtitleEditor segments={segments} currentTime={currentTime} onChange={setSegments} onSeek={seek} />}{tab === "Summary" && <SummaryPanel summary={result.summary} language={result.language} duration={result.duration} />}{tab === "Export" && <ExportButtons downloads={result.downloads} />}</section></div></main>;
}
