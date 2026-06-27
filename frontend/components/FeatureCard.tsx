// Purpose: Landing feature card.
// Callers: Landing page feature grid.
// Deps: Lucide icons via ReactNode.
// API: FeatureCard component.
// Side effects: None.
import type { ReactNode } from "react";

export function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return <article className="panel rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30"><div className="mb-6 grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-200">{icon}</div><h3 className="font-display text-xl font-semibold text-white">{title}</h3><p className="mt-3 leading-7 text-slate-300">{description}</p></article>;
}
