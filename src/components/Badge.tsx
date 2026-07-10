import type { ReactNode } from "react";

export type BadgeVariant = "default" | "score" | "accent";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

/** Small mono label. `score` = gold, `accent` = gradient fill. */
export function Badge({ variant = "default", children }: BadgeProps) {
  const className =
    variant === "default" ? "ds-badge" : `ds-badge ds-badge--${variant}`;
  return <span className={className}>{children}</span>;
}
