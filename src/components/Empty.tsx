import type { ReactNode } from "react";

export interface EmptyProps {
  /** Neutral icon (use the DS <Icon/>). Deliberately not an emoji. */
  icon?: ReactNode;
  text: string;
  children?: ReactNode;
}

/** Centered empty-state on a glass card. */
export function Empty({ icon, text, children }: EmptyProps) {
  return (
    <div className="ds-empty ds-glass">
      {icon ? (
        <span className="ds-empty__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <p>{text}</p>
      {children}
    </div>
  );
}
