// Purpose: Render export download actions.
// Callers: Editor page.
// Deps: API URL, transcript types.
// API: ExportButtons component.
// Side effects: Navigates browser to download URLs.
import { apiUrl } from "@/lib/api";
import type { Downloads } from "@/types/transcript";

export function ExportButtons({ downloads }: { downloads: Downloads }) {
  return <section className="space-y-4"><h2 className="font-display text-2xl font-semibold">Exports</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(downloads).map(([format, path]) => <a key={format} href={`${apiUrl}${path}`} className="rounded-2xl bg-white px-4 py-4 text-center font-black uppercase text-slate-950">{format}</a>)}</div><button className="rounded-2xl border border-white/10 px-5 py-4 text-slate-300">Burn subtitles into video</button></section>;
}
