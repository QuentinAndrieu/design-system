import { cx } from "../internal/cx";

export interface ProgressBarProps {
  /** Current value; combined with `max` to compute the fill percentage. */
  value: number;
  max?: number;
  /** Render in the "complete" state (success color). */
  done?: boolean;
}

/** Thin linear progress, clamped to 0–100 %. */
export function ProgressBar({ value, max = 1, done }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={cx("ds-pbar", done && "ds-pbar--done")}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}
