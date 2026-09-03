import { useSyncExternalStore } from "react";

/**
 * The fleet's one desktop breakpoint: where `<AppShell rail>` docks the tab bar
 * and a `dock`ed `ConfigSheet` becomes a side panel. The CSS keeps it as a literal
 * (media queries can't read custom properties) — this is the same number for JS,
 * so an app's layout decisions flip together with the shell's.
 */
export const DESKTOP_MIN_WIDTH = 900;
export const DESKTOP_QUERY = `(min-width: ${DESKTOP_MIN_WIDTH}px)`;

let mql: MediaQueryList | null = null;
const query = (): MediaQueryList | null => {
  if (mql === null && typeof window !== "undefined" && typeof window.matchMedia === "function") {
    mql = window.matchMedia(DESKTOP_QUERY);
  }
  return mql;
};
const subscribe = (onChange: () => void) => {
  const m = query();
  if (!m) return () => {};
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
};
const getSnapshot = () => query()?.matches ?? false;
const getServerSnapshot = () => false;

/**
 * `true` on a desktop-wide viewport (≥ 900px) — the SAME query the CSS rail
 * uses, so app-side decisions (keep the rail while a studio is open, wider grid
 * tiles) can't drift from the shell. `false` on the server and through
 * hydration: the phone layout is the SSR truth, and desktop upgrades it.
 */
export function useDesktop(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
