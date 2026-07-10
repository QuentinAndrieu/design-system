export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutProps {
  segments: DonutSegment[];
}

/** Donut chart (conic-gradient ring) with a legend. Wrap in Glass for a card. */
export function Donut({ segments }: DonutProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let acc = 0;
  const stops = segments
    .map((s) => {
      const from = (acc / total) * 360;
      acc += s.value;
      const to = (acc / total) * 360;
      return `${s.color} ${from}deg ${to}deg`;
    })
    .join(", ");

  return (
    <div className="ds-donutrow">
      <div
        className="ds-donut"
        style={{ background: `conic-gradient(${stops})` }}
      />
      <div className="ds-dleg">
        {segments.map((s) => (
          <div key={s.label}>
            <i style={{ background: s.color }} />
            {s.label}
            <b>{s.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
