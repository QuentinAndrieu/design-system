import type { ReactNode } from "react";

export interface ToastProps {
  children: ReactNode;
}

/**
 * Presentational toast (fixed, above the tab bar). Render it when you have a
 * message and unmount to dismiss — queueing/timeout stays in the app's state.
 */
export function Toast({ children }: ToastProps) {
  return (
    <div className="ds-toast" role="status">
      {children}
    </div>
  );
}
