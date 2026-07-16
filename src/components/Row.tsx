import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface RowProps {
  /** Leading visual — Thumbnail, Avatar, Icon, etc. */
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Trailing column — actions, score, controls. */
  trailing?: ReactNode;
  /** Navigation affordance: a trailing chevron (after `trailing` if both are set). */
  chevron?: boolean;
  /** Dims the row and drops its interaction (clickable rows only). */
  disabled?: boolean;
  onClick?: () => void;
}

/** Generic list row: leading · (title + subtitle) · trailing. Wrap in Glass for a card. */
export function Row({ leading, title, subtitle, trailing, chevron, disabled, onClick }: RowProps) {
  const inner = (
    <>
      {leading}
      <div className="ds-row__body">
        <div className="ds-row__title">{title}</div>
        {subtitle ? <div className="ds-row__sub">{subtitle}</div> : null}
      </div>
      {trailing ? <div className="ds-row__trailing">{trailing}</div> : null}
      {chevron ? <Icon name="chev" size={15} className="ds-row__chev" /> : null}
    </>
  );

  return onClick ? (
    <button className="ds-row" onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  ) : (
    <div className="ds-row">{inner}</div>
  );
}
