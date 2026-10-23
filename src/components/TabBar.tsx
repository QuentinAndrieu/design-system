import type { ReactNode } from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Dim + block the tab (e.g. a destination with no content yet). */
  disabled?: boolean;
  /** Something waiting there, on the glyph's corner, in the accent: `true` a dot, a number a
   *  count (99+ past 99). `false`, `0` or absent: nothing. */
  badge?: boolean | number;
  /** An extra class on this tab's button, for an app to set one tab apart (0.25.0 — torimon's
   *  admin tabs). The selected state stays the bar's: contrast and weight, `aria-selected`. */
  className?: string;
}

export interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

const badgeOf = (badge: Tab["badge"]) =>
  badge === true ? (
    <span className="ds-tab-badge" aria-hidden />
  ) : typeof badge === "number" && badge > 0 ? (
    <span className="ds-tab-badge ds-tab-badge--count">{badge > 99 ? "99+" : badge}</span>
  ) : null;

/** Floating glass tab capsule, pinned above the home indicator. */
export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <nav className="ds-tabbar" role="tablist" aria-label="Primary">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === active}
          disabled={t.disabled}
          className={t.className ? `ds-tab ${t.className}` : "ds-tab"}
          onClick={() => onChange(t.id)}
        >
          <span className="ds-tab-glyph">
            {t.icon}
            {badgeOf(t.badge)}
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
