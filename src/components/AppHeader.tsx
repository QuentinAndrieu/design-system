import type { ReactNode } from "react";

export interface AppHeaderProps {
  /** The app's name, rendered small in the app's accent — what tells the six apps apart. */
  label: ReactNode;
  /**
   * Language of the label when it isn't Latin (e.g. "ja" for 風土記 / 日本語) —
   * picks the matching face via CSS. Only the two Japan-subject apps set it.
   */
  lang?: string;
  /** The current section's title, in the display face. */
  title: ReactNode;
  /** Optional right-aligned screen actions. Never navigation — tabs live in the TabBar. */
  actions?: ReactNode;
  /** App-side spacing tweaks (e.g. matching the app's own content padding). */
  className?: string;
}

/**
 * The fleet header (fudoki's shape): accent app-name label over the section title.
 * Rendered by `AppShell` via its `appHeader` slot so it scrolls with the content —
 * it is a page block, not pinned chrome.
 */
// Decorative per-screen art is NOT a header concern — it lives on the shell's
// ambient layer (AppShell `ambient` slot), where it can run large behind the
// content (nihongo's tab illustrations do exactly that).
export function AppHeader({ label, lang, title, actions, className }: AppHeaderProps) {
  return (
    <header className={["ds-apphead", className].filter(Boolean).join(" ")}>
      <div className="ds-apphead__text">
        <span className="ds-apphead__label" lang={lang}>
          {label}
        </span>
        <h1 className="ds-apphead__title">{title}</h1>
      </div>
      {actions ? <div className="ds-apphead__actions">{actions}</div> : null}
    </header>
  );
}
