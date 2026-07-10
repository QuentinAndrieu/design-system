import type { ReactNode } from "react";

export interface ProgressRingProps {
  /** Progress 0–100. */
  pct: number;
  size?: number;
  stroke?: number;
  /** Ring color; defaults to the accent. */
  color?: string;
  /** Centered label (e.g. a percentage or icon). */
  children?: ReactNode;
}

/** Circular progress ring (ported from nihongo-study). */
export function ProgressRing({
  pct,
  size = 48,
  stroke = 3,
  color = "rgb(var(--accent))",
  children,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className="ds-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--glass-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - clamped / 100)}
          strokeLinecap="round"
        />
      </svg>
      {children ? <div className="ds-ring__label">{children}</div> : null}
    </div>
  );
}
