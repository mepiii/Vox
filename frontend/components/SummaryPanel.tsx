// Purpose: Display transcript summary metadata.
// Callers: Editor page.
// Deps: Summary type.
// API: SummaryPanel component.
// Side effects: None.
import type { Summary } from "@/types/transcript";

export function SummaryPanel({ summary, language, duration }: { summary: Summary; language: string; duration: number }) {
  return <section className="space-y-5"><h2 className="font-display text-2xl font-semibold">Summary</h2><p className="rounded-2xl bg-cyan-300/12 p-5 text-cyan-50">{summary.short}</p><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-white/[.04] p-5"><h3 className="font-semibold">Key points</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">{summary.key_points.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="rounded-2xl bg-white/[.04] p-5"><h3 className="font-semibold">Action items</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">{(summary.action_items.length ? summary.action_items : ["No explicit action items found."]).map((item) => <li key={item}>{item}</li>)}</ul></div></div><p className="text-slate-400">Language: {language} · Duration: {duration.toFixed(1)}s</p></section>;
}
