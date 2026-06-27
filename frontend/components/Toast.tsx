// Purpose: Lightweight status message.
// Callers: Upload and editor pages.
// Deps: None.
// API: Toast component.
// Side effects: None.
export function Toast({ message, tone = "info" }: { message: string; tone?: "info" | "error" | "success" }) {
  const styles = tone === "error" ? "border-red-300/30 bg-red-400/10 text-red-100" : tone === "success" ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100" : "border-cyan-300/30 bg-cyan-400/10 text-cyan-100";
  return <p className={`rounded-2xl border px-4 py-3 ${styles}`}>{message}</p>;
}
