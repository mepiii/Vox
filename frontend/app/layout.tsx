// Purpose: Root layout for Vox frontend.
// Callers: Next.js App Router.
// Deps: Next font loader, global CSS.
// API: RootLayout component.
// Side effects: Loads web fonts and global styles.
import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = { title: "Vox — AI speech to text", description: "Turn audio and video into transcripts, subtitles, summaries, and exports." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
