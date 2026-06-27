// Purpose: Reusable Vox brand mark.
// Callers: Navbar, footer, loading states.
// Deps: None.
// API: Logo component.
// Side effects: None.
export function Logo() {
  return <div className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[.06]"><span className="wave flex h-5 items-center gap-[2px]">{[6,14,9,18,11].map((height) => <span key={height} className="block w-[3px] rounded-full bg-cyan-300" style={{ height }} />)}</span></span><span>Vox</span></div>;
}
