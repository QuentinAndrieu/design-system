import type { ReactNode, Ref } from "react";

export interface AppShellProps {
  /** Screen content. */
  children: ReactNode;
  /**
   * The primary navigation — typically a `<TabBar>` wrapper. Rendered as-is; the
   * DS tab bar pins itself (position: fixed) above the home indicator, so this
   * lives at the end of the shell but paints over everything.
   */
  bottomBar?: ReactNode;
  /**
   * Content width.
   * - `constrained` (default): capped at a phone column — the mobile-first apps.
   * - `full`: spans the viewport — editorial / wide layouts.
   */
  width?: "constrained" | "full";
  /**
   * Scroll model.
   * - `fixed` (default): locks the document to the real viewport height and lets
   *   each screen scroll its own content. Pinned headers can't be rubber-banded
   *   away, and it sidesteps the iOS 26 standalone short-viewport bug
   *   (WebKit #301108) via `--app-viewport-h`. Screens must own their scroll area.
   * - `contained`: same locked frame, but the shell owns a single scroll
   *   container — content scrolls, a `header` stays pinned above it. Content
   *   reserves `--tabbar-clearance` so the last row clears the floating bar.
   * - `page`: the document scrolls normally; the content region reserves
   *   `--tabbar-clearance` at the bottom so the floating capsule never covers it.
   */
  scroll?: "fixed" | "contained" | "page";
  /**
   * Optional region pinned above the content (e.g. a toolbar). Stays put while a
   * `contained` shell's content scrolls beneath it.
   */
  header?: ReactNode;
  /**
   * The fleet header — an `<AppHeader>` (accent app label + section title).
   * Rendered as the first block INSIDE the content region, so it scrolls away
   * with the page in `page`/`contained` shells (fudoki's feel). In a `fixed`
   * shell the screens own the scroll, so it sits statically above them —
   * screens that want it to scroll can render `<AppHeader>` themselves instead.
   */
  appHeader?: ReactNode;
  /**
   * Optional region below the content, in flow (e.g. an editorial site footer).
   * When present in `page` mode it carries the tab-bar clearance so the floating
   * bar never hides the footer.
   */
  footer?: ReactNode;
  /**
   * Optional ambient background layer (blobs, washes) painted behind content and
   * pinned to the shell so it stays put while content scrolls over it.
   */
  ambient?: ReactNode;
  /** Override the constrained max-width (any CSS length). Ignored when `width="full"`. */
  maxWidth?: string;
  /** Extra classes on the content region. */
  className?: string;
  /**
   * Ref to the content region. In `contained` mode this is the single scroll
   * container — handy for scroll-to-top on navigation.
   */
  contentRef?: Ref<HTMLElement>;
}

/**
 * Fleet layout wrapper: a centered app frame with a slot for the floating glass
 * tab bar. Absorbs the safe-area / iOS-26 viewport handling and the tab-bar
 * clearance so apps don't each re-solve them. Router/section wiring stays in the
 * app's own `bottomBar` (keeps the DS framework-agnostic).
 */
export function AppShell({
  children,
  bottomBar,
  width = "constrained",
  scroll = "fixed",
  ambient,
  header,
  appHeader,
  footer,
  maxWidth,
  className,
  contentRef,
}: AppShellProps) {
  return (
    <div
      className={`ds-shell ds-shell--${width} ds-shell--${scroll}`}
      style={maxWidth ? ({ ["--ds-shell-max" as string]: maxWidth } as React.CSSProperties) : undefined}
    >
      {ambient != null && (
        <div className="ds-shell-ambient" aria-hidden>
          {ambient}
        </div>
      )}
      {header != null && <div className="ds-shell-header">{header}</div>}
      <main
        ref={contentRef}
        className={className ? `ds-shell-content ${className}` : "ds-shell-content"}
      >
        {appHeader}
        {children}
      </main>
      {footer != null && <div className="ds-shell-footer">{footer}</div>}
      {bottomBar}
    </div>
  );
}
