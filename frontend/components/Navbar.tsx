// Purpose: Landing navigation for Vox.
// Callers: Landing page.
// Deps: Logo component.
// API: Navbar component.
// Side effects: None.
import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  return <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6"><Link href="/"><Logo /></Link><nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex"><a href="#features">Features</a><a href="#workflow">How it works</a><a href="#demo">Demo</a><a href="https://github.com" target="_blank">GitHub</a></nav><Link href="/upload" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Start Free</Link></header>;
}
