// Purpose: Next.js project-level configuration.
// Callers: Next.js dev and build commands.
// Deps: NextConfig type.
// API: nextConfig default export.
// Side effects: Pins Turbopack root to frontend folder.
import type { NextConfig } from "next";

const nextConfig = {
  turbopack: { root: __dirname },
} satisfies NextConfig;

export default nextConfig;
