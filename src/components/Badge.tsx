import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export type BadgeVariant = "default" | "score" | "accent";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

/** Small mono label. `score` = gold, `accent` = gradient fill. */
export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span className={cx("ds-badge", variant !== "default" && `ds-badge--${variant}`)}>
      {children}
    </span>
  );
}
