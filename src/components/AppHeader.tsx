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
  /**
   * Decorative art on the right edge, stretched to the header's full height and
   * bottom-anchored (nihongo's tab illustrations ride here). Purely visual —
   * it's aria-hidden and takes no pointer events.
   */
  art?: ReactNode;
  /** App-side spacing tweaks (e.g. matching the app's own content padding). */
  className?: string;
}

/**
 * The fleet header (fudoki's shape): accent app-name label over the section title.
 * Rendered by `AppShell` via its `appHeader` slot so it scrolls with the content —
 * it is a page block, not pinned chrome.
 */
export function AppHeader({ label, lang, title, actions, art, className }: AppHeaderProps) {
  return (
    <header className={["ds-apphead", className].filter(Boolean).join(" ")}>
      <div className="ds-apphead__text">
        <span className="ds-apphead__label" lang={lang}>
          {label}
        </span>
        <h1 className="ds-apphead__title">{title}</h1>
      </div>
      {actions ? <div className="ds-apphead__actions">{actions}</div> : null}
      {art ? (
        <div className="ds-apphead__art" aria-hidden>
          {art}
        </div>
      ) : null}
    </header>
  );
}
