import type { ReactNode } from "react";

export interface EmptyProps {
  /** Neutral icon (use the DS <Icon/>). Deliberately not an emoji. */
  icon?: ReactNode;
  text: string;
  /** Secondary line under the main text. */
  hint?: ReactNode;
  children?: ReactNode;
  /**
   * When set, the whole panel becomes a dashed "create" affordance (a button).
   * Omit for a static notice on a glass card.
   */
  onClick?: () => void;
}

/** Centered empty-state. Static → glass card; with `onClick` → dashed create panel. */
export function Empty({ icon, text, hint, children, onClick }: EmptyProps) {
  const inner = (
    <>
      {icon ? (
        <span className="ds-empty__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <p>{text}</p>
      {hint ? <p className="ds-empty__hint">{hint}</p> : null}
      {children}
    </>
  );
  return onClick ? (
    <button type="button" className="ds-empty ds-empty--action" onClick={onClick}>
      {inner}
    </button>
  ) : (
    <div className="ds-empty ds-glass">{inner}</div>
  );
}
