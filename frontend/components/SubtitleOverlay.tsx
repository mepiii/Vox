// Purpose: Render active subtitle over media.
// Callers: MediaPlayer.
// Deps: Framer Motion, Segment type.
// API: SubtitleOverlay component.
// Side effects: None.
"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { Segment } from "@/types/transcript";

export function SubtitleOverlay({ segment }: { segment?: Segment }) {
  return <div className="pointer-events-none absolute inset-x-4 bottom-6 flex justify-center"><AnimatePresence mode="wait">{segment && <motion.p key={segment.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-2xl bg-black/75 px-5 py-3 text-center text-lg font-semibold text-white">{segment.text}</motion.p>}</AnimatePresence></div>;
}
