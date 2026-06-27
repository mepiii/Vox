// Purpose: Landing workflow step item.
// Callers: Landing workflow section.
// Deps: None.
// API: WorkflowStep component.
// Side effects: None.
export function WorkflowStep({ step, title, description }: { step: string; title: string; description: string }) {
  return <div className="grid gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-black text-slate-950">{step}</span><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="text-slate-300 leading-7">{description}</p></div>;
}
