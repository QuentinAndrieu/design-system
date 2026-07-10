export interface ProgressBarProps {
  /** Current value; combined with `max` to compute the fill percentage. */
  value: number;
  max?: number;
  /** Render in the "complete" state (success color). */
  done?: boolean;
}

export function ProgressBar({ value, max = 1, done }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={["ds-pbar", done && "ds-pbar--done"].filter(Boolean).join(" ")}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}
