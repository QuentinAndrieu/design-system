import type { ReactNode } from "react";

export interface RowProps {
  /** Leading visual — Thumbnail, Avatar, Icon, etc. */
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Trailing column — actions, score, controls. */
  trailing?: ReactNode;
  onClick?: () => void;
}

/** Generic list row: leading · (title + subtitle) · trailing. Wrap in Glass for a card. */
export function Row({ leading, title, subtitle, trailing, onClick }: RowProps) {
  const inner = (
    <>
      {leading}
      <div className="ds-row__body">
        <div className="ds-row__title">{title}</div>
        {subtitle ? <div className="ds-row__sub">{subtitle}</div> : null}
      </div>
      {trailing ? <div className="ds-row__trailing">{trailing}</div> : null}
    </>
  );

  return onClick ? (
    <button className="ds-row" onClick={onClick}>
      {inner}
    </button>
  ) : (
    <div className="ds-row">{inner}</div>
  );
}
