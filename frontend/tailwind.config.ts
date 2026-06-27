import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { display: ["var(--font-display)"], body: ["var(--font-body)"] } } },
  plugins: [],
} satisfies Config;

export default config;
