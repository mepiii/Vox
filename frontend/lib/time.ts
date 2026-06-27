// Purpose: Format seconds for transcript UI.
// Callers: Editors and media preview components.
// Deps: None.
// API: formatClock.
// Side effects: None.
export const formatClock = (seconds: number): string => {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};
