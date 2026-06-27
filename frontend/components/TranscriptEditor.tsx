// Purpose: Editable timestamped transcript panel.
// Callers: Editor page.
// Deps: Segment type, time helper.
// API: TranscriptEditor component.
// Side effects: Uses Clipboard API when copying.
"use client";
import { formatClock } from "@/lib/time";
import type { Segment } from "@/types/transcript";

export function TranscriptEditor({ segments, currentTime, onChange, onSeek }: { segments: Segment[]; currentTime: number; onChange: (segments: Segment[]) => void; onSeek: (time: number) => void }) {
  const update = (id: number, text: string) => onChange(segments.map((segment) => segment.id === id ? { ...segment, text } : segment));
  const copy = () => navigator.clipboard.writeText(segments.map((s) => s.text).join("\n"));
  return <section className="space-y-4"><div className="flex items-center justify-between"><h2 className="font-display text-2xl font-semibold">Transcript</h2><button onClick={copy} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Copy full transcript</button></div>{segments.map((segment) => <article key={segment.id} className={`rounded-2xl p-4 ${currentTime >= segment.start && currentTime <= segment.end ? "bg-cyan-300/12" : "bg-white/[.04]"}`}><button onClick={() => onSeek(segment.start)} className="mb-2 text-sm font-semibold text-cyan-200">{formatClock(segment.start)} – {formatClock(segment.end)}</button><textarea value={segment.text} onChange={(event) => update(segment.id, event.target.value)} className="min-h-20 w-full resize-y rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none focus:border-cyan-200" /></article>)}</section>;
}
