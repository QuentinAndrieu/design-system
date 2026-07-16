import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Toast } from "./Toast";

// A module-scope store instead of React context: the DS bundle is evaluated by
// server components too (every app's layout imports AppShell), and a top-level
// createContext would crash the react-server condition. This keeps the whole
// package RSC-safe and makes `toast()` callable from any event handler.
type Entry = { message: ReactNode; key: number } | null;

let current: Entry = null;
let timer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** Show a toast. Latest message wins; one on screen at a time, auto-dismissed. */
export function toast(message: ReactNode, durationMs = 2600) {
  if (timer) clearTimeout(timer);
  current = { message, key: Date.now() };
  timer = setTimeout(() => {
    current = null;
    emit();
  }, durationMs);
  emit();
}

/**
 * Renders whatever `toast()` was last called with. Mount it once, inside any
 * client component (next to the app's TabBar adapter is the fleet spot) —
 * it holds client state, so not directly in a server layout.
 */
export function Toaster() {
  const entry = useSyncExternalStore(subscribe, () => current, () => null);
  return entry ? <Toast key={entry.key}>{entry.message}</Toast> : null;
}
