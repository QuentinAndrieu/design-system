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
}

/**
 * The fleet header (fudoki's shape): accent app-name label over the section title.
 * Rendered by `AppShell` via its `appHeader` slot so it scrolls with the content —
 * it is a page block, not pinned chrome.
 */
export function AppHeader({ label, lang, title, actions }: AppHeaderProps) {
  return (
    <header className="ds-apphead">
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
