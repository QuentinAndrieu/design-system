import type { ReactNode } from "react";

export interface StatTileProps {
  value: ReactNode;
  label: string;
}

/** A single glass KPI tile: big figure over a mono caption. */
export function StatTile({ value, label }: StatTileProps) {
  return (
    <div className="ds-glass ds-kpi">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

/** Two-column grid for a set of StatTiles. */
export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="ds-kpis">{children}</div>;
}
