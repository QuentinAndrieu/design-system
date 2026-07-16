import type { ReactNode } from "react";

export interface GroupLabelProps {
  children: ReactNode;
}

/** Micro heading above a grouped card (the More screen's section labels). */
export function GroupLabel({ children }: GroupLabelProps) {
  return <h2 className="ds-grouplabel">{children}</h2>;
}
