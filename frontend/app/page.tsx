// Purpose: Premium animated Vox landing page.
// Callers: Next.js App Router.
// Deps: Landing components, lucide-react.
// API: Home page component.
// Side effects: None.
import { AudioLines, Captions, Download, FileText, Sparkles, Timer } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { Hero } from "@/components/Hero";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { WorkflowStep } from "@/components/WorkflowStep";

const features = [
  [AudioLines, "Audio transcription", "Turn podcasts, lectures, calls, and voice notes into clean timestamped text."],
  [Captions, "Video subtitles", "Extract speech from video and generate synced SRT and VTT captions."],
  [Timer, "Synced timestamps", "Keep transcript sections aligned with playback for review and editing."],
  [FileText, "Editable transcript", "Search, copy, polish, and reshape every generated segment."],
  [Download, "Multi-format export", "Download TXT, SRT, VTT, JSON, and CSV from one workspace."],
  [Sparkles, "AI summary", "Create quick summaries, key points, and action items from long recordings."],
] as const;

export default function Home() {
  return <main><Navbar /><Hero /><section id="features" className="mx-auto max-w-7xl px-6 py-20"><div className="mb-12 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.24em] text-cyan-200">Feature set</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.04em]">One pipeline from raw media to usable text.</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon, title, description]) => <FeatureCard key={title} icon={<Icon size={22} />} title={title} description={description} />)}</div></section><section id="workflow" className="mx-auto max-w-7xl px-6 py-20"><div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[.04] p-8 md:grid-cols-4 md:p-12"><WorkflowStep step="01" title="Upload" description="Drop audio or video, choose model size, select transcript or subtitles." /><WorkflowStep step="02" title="Transcribe" description="Vox prepares media, extracts audio, and runs faster-whisper." /><WorkflowStep step="03" title="Edit" description="Review active transcript sections and subtitle timing beside playback." /><WorkflowStep step="04" title="Export" description="Download clean exports or burn subtitles into video with FFmpeg." /></div></section><section id="demo" className="mx-auto max-w-7xl px-6 py-20"><div className="panel grid gap-6 rounded-[2rem] p-6 lg:grid-cols-[1fr_.9fr]"><div className="rounded-3xl bg-slate-950/80 p-5"><div className="aspect-video rounded-2xl bg-[radial-gradient(circle_at_center,oklch(70%_.17_260/.22),transparent_35%),oklch(14%_.04_268)]" /><p className="mx-auto -mt-16 w-fit rounded-2xl bg-black/70 px-5 py-3 text-center text-lg font-semibold">Turn speech into text instantly.</p></div><div className="space-y-3"><p className="rounded-2xl bg-cyan-300/12 p-4 text-cyan-50">00:00 Welcome to Vox.</p><p className="rounded-2xl bg-white/[.06] p-4 text-slate-300">00:04 Upload audio or video and generate synced captions.</p><p className="rounded-2xl bg-white/[.06] p-4 text-slate-300">00:09 Export SRT, VTT, TXT, JSON, or CSV.</p><div className="flex flex-wrap gap-2 pt-4">{["TXT", "SRT", "VTT", "JSON", "CSV"].map((item) => <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">{item}</span>)}</div></div></div></section><section className="mx-auto max-w-7xl px-6 py-20"><div className="grid gap-5 md:grid-cols-3"><div className="md:col-span-2"><h2 className="font-display text-4xl font-semibold tracking-[-.04em]">Built for creators, students, researchers, podcasters, YouTubers, meetings, and courses.</h2></div><a href="/upload" className="grid place-items-center rounded-[2rem] bg-cyan-300 p-8 text-xl font-black text-slate-950">Try Vox Now</a></div></section><footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-slate-400 md:flex-row md:items-center md:justify-between"><Logo /><p>AI transcription with Next.js, FastAPI, faster-whisper, and FFmpeg.</p></footer></main>;
}
