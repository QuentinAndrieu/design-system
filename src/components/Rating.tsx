import { Slider } from "./Slider";

export interface RatingProps {
  /** Score, typically 0–10. */
  value: number;
  onChange: (value: number) => void;
  max?: number;
  step?: number;
}

/** Big neutral score over an accent slider. Apps add their own reaction row if wanted. */
export function Rating({ value, onChange, max = 10, step = 0.5 }: RatingProps) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ textAlign: "center" }}>
        <span className="ds-bigscore">{value.toFixed(1)}</span>
      </div>
      <Slider
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Score"
      />
    </div>
  );
}
