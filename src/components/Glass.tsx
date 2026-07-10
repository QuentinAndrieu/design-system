import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export type GlassProps = HTMLAttributes<HTMLDivElement>;

/** A frosted glass surface with the rim-lit top highlight. */
export const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={["ds-glass", className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);
Glass.displayName = "Glass";
