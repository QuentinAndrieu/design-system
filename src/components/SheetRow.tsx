import type { ReactNode } from "react";

export interface SheetRowProps {
  icon?: ReactNode;
  children: ReactNode;
  /** Marks the active option (glass highlight). */
  selected?: boolean;
  /** Destructive styling (danger color). */
  danger?: boolean;
  /** Small status dot color, shown before the label. */
  dotColor?: string;
  /** Right-aligned trailing content (checkmark, value…). */
  trailing?: ReactNode;
  onClick?: () => void;
}

/** Menu-style row for inside a Sheet: icon/dot · label · trailing. */
export function SheetRow({
  icon,
  children,
  selected,
  danger,
  dotColor,
  trailing,
  onClick,
}: SheetRowProps) {
  return (
    <button
      type="button"
      aria-selected={selected}
      className={["ds-sheet-row", danger && "ds-sheet-row--danger"]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
    >
      {dotColor ? (
        <span className="ds-sheet-row__dot" style={{ background: dotColor }} />
      ) : null}
      {icon}
      <span>{children}</span>
      <span className="ds-sheet-row__spacer" />
      {trailing}
    </button>
  );
}
