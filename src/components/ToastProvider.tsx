"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Toast } from "./Toast";

type ShowToast = (message: ReactNode) => void;

const ToastContext = createContext<ShowToast | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  /** How long a toast stays up. */
  durationMs?: number;
}

/**
 * Turnkey toast state over the presentational `Toast`: latest message wins, one
 * on screen at a time, auto-dismissed. Mount once (next to `AppShell`), then
 * `useToast()` anywhere below it.
 */
export function ToastProvider({ children, durationMs = 2600 }: ToastProviderProps) {
  const [toast, setToast] = useState<{ message: ReactNode; key: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ShowToast>(
    (message) => {
      if (timer.current) clearTimeout(timer.current);
      setToast({ message, key: Date.now() });
      timer.current = setTimeout(() => setToast(null), durationMs);
    },
    [durationMs],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast ? <Toast key={toast.key}>{toast.message}</Toast> : null}
    </ToastContext.Provider>
  );
}

/** The `show(message)` function from the nearest `ToastProvider`. */
export function useToast(): ShowToast {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast() needs a <ToastProvider> above it");
  return show;
}
