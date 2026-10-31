import type { CSSProperties, InputHTMLAttributes } from "react";
import { cx } from "../internal/cx";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/** Styled range input. The filled portion tracks the current value. */
export function Slider({ className, value, min = 0, max = 100, ...rest }: SliderProps) {
  const lo = Number(min);
  const hi = Number(max);
  const fill = hi > lo ? ((Number(value) - lo) / (hi - lo)) * 100 : 0;
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      className={cx("ds-slider", className)}
      style={{ "--fill": `${fill}%` } as CSSProperties}
      {...rest}
    />
  );
}
