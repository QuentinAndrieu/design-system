import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Dim + block the tab (e.g. a destination with no content yet). */
  disabled?: boolean;
  /** Something waiting there, on the glyph's corner, in the accent: `true` a dot, a number a
   *  count (99+ past 99). `false`, `0` or absent: nothing. */
  badge?: boolean | number;
  /** The highest count the badge spells out; past it, « max+ » (0.27.0 — torimon's Boosters tab
   *  reads 9+). Default 99. */
  badgeMax?: number;
  /** An extra class on this tab's button, for an app to set one tab apart (0.25.0 — torimon's
   *  admin tabs). The selected state stays the bar's: contrast and weight, `aria-selected`. */
  className?: string;
}

export interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

const badgeOf = (badge: Tab["badge"], max = 99) =>
  badge === true ? (
    <span className="ds-tab-badge" aria-hidden />
  ) : typeof badge === "number" && badge > 0 ? (
    <span className="ds-tab-badge ds-tab-badge--count">{badge > max ? `${max}+` : badge}</span>
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
          className={cx("ds-tab", t.className)}
          onClick={() => onChange(t.id)}
        >
          <span className="ds-tab-glyph">
            {t.icon}
            {badgeOf(t.badge, t.badgeMax)}
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
