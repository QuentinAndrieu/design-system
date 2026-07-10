import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

/** Pill-shaped filter/toggle. `selected` drives the accent-washed active state. */
export function Chip({
  selected,
  className,
  type = "button",
  children,
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={["ds-chip", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Wrapping flex container for a set of chips. */
export function ChipGroup({ children }: { children: ReactNode }) {
  return <div className="ds-chips">{children}</div>;
}
