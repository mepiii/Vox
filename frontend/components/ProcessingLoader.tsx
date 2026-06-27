// Purpose: Animated processing progress display.
// Callers: Upload and editor workflows.
// Deps: None.
// API: ProcessingLoader component.
// Side effects: None.
export function ProcessingLoader({ step }: { step: number }) {
  const steps = ["Uploading file", "Preparing media", "Extracting audio", "Running AI transcription", "Syncing timestamps", "Generating exports", "Finalizing result"];
  return <div className="panel rounded-[2rem] p-6"><div className="wave mb-6 flex h-20 items-center justify-center gap-2">{Array.from({ length: 28 }, (_, i) => <span key={i} className="w-1 rounded-full bg-cyan-200" style={{ height: 16 + (i % 7) * 8 }} />)}</div><div className="space-y-3">{steps.map((label, index) => <div key={label} className={`rounded-2xl px-4 py-3 ${index <= step ? "bg-cyan-300/12 text-cyan-50" : "bg-white/[.04] text-slate-500"}`}>{label}</div>)}</div></div>;
}
