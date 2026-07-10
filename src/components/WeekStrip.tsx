export interface WeekDay {
  key: string;
  /** Small mono caption under the number (e.g. "MON"). */
  label: string;
  /** Large figure (e.g. day-of-month). Falls back to the label. */
  num?: string | number;
}

export interface WeekStripProps {
  days: WeekDay[];
  active: string;
  onChange: (key: string) => void;
}

/**
 * Generic seven-across day selector. miru's Weekly airing schedule is this strip
 * plus its own list of episodes below — the DS owns the selector, not the domain.
 */
export function WeekStrip({ days, active, onChange }: WeekStripProps) {
  return (
    <div className="ds-week" role="tablist">
      {days.map((d) => (
        <button
          key={d.key}
          role="tab"
          aria-selected={d.key === active}
          className="ds-day"
          onClick={() => onChange(d.key)}
        >
          <b>{d.num ?? d.label.slice(0, 2)}</b>
          <span>{d.label}</span>
        </button>
      ))}
    </div>
  );
}
