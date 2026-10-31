import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../internal/cx";

export type GlassProps = HTMLAttributes<HTMLDivElement>;

/** A frosted glass surface with the rim-lit top highlight. */
export const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx("ds-glass", className)}
      {...rest}
    />
  ),
);
Glass.displayName = "Glass";
