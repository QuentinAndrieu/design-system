import type { ReactNode } from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

/** Floating glass tab capsule, pinned above the home indicator. */
export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <nav className="ds-tabbar" role="tablist" aria-label="Primary">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === active}
          className="ds-tab"
          onClick={() => onChange(t.id)}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
