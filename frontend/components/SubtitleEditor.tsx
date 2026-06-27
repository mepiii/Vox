// Purpose: Editable subtitle segment list.
// Callers: Editor page.
// Deps: Segment type.
// API: SubtitleEditor component.
// Side effects: None.
"use client";
import type { Segment } from "@/types/transcript";

export function SubtitleEditor({ segments, currentTime, onChange, onSeek }: { segments: Segment[]; currentTime: number; onChange: (segments: Segment[]) => void; onSeek: (time: number) => void }) {
  const patch = (id: number, changes: Partial<Segment>) => onChange(segments.map((segment) => segment.id === id ? { ...segment, ...changes } : segment));
  const remove = (id: number) => onChange(segments.filter((segment) => segment.id !== id));
  const add = () => onChange([...segments, { id: segments.length + 1, start: 0, end: 2, text: "New subtitle" }]);
  return <section className="space-y-4"><div className="flex items-center justify-between"><h2 className="font-display text-2xl font-semibold">Subtitles</h2><button onClick={add} className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">Add segment</button></div>{segments.map((segment) => <article key={segment.id} className={`grid gap-3 rounded-2xl p-4 ${currentTime >= segment.start && currentTime <= segment.end ? "bg-cyan-300/12" : "bg-white/[.04]"}`}><div className="flex gap-2"><button onClick={() => onSeek(segment.start)} className="rounded-full border border-white/10 px-3 py-1 text-sm text-cyan-200">#{segment.id}</button><input type="number" step="0.1" value={segment.start} onChange={(event) => patch(segment.id, { start: Number(event.target.value) })} className="w-24 rounded-xl bg-slate-950/70 px-3 py-2" /><input type="number" step="0.1" value={segment.end} onChange={(event) => patch(segment.id, { end: Number(event.target.value) })} className="w-24 rounded-xl bg-slate-950/70 px-3 py-2" /><button onClick={() => remove(segment.id)} className="ml-auto text-sm text-red-300">Delete</button></div><textarea value={segment.text} onChange={(event) => patch(segment.id, { text: event.target.value })} className="min-h-16 rounded-xl border border-white/10 bg-slate-950/60 p-3 outline-none focus:border-cyan-200" /></article>)}</section>;
}
