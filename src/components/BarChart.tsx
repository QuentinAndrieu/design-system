export interface Bar {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: Bar[];
  /** Value mapped to full height. Defaults to the largest bar. */
  max?: number;
}

/** Minimal bar chart; the tallest bar is highlighted with its value on top. */
export function BarChart({ data, max }: BarChartProps) {
  const values = data.map((d) => d.value);
  const ceil = max ?? Math.max(...values, 1);
  const peak = Math.max(...values, 0);
  return (
    <div>
      <div className="ds-bars">
        {data.map((d, i) => (
          <i
            key={i}
            data-n={d.value}
            className={d.value === peak && peak > 0 ? "ds-bar--peak" : undefined}
            style={{ height: `${(d.value / ceil) * 100}%` }}
          />
        ))}
      </div>
      <div className="ds-barx">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
