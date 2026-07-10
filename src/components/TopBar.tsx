import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface TopBarProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Renders a back affordance on the left. */
  onBack?: () => void;
  backLabel?: string;
  /** Custom left slot (overrides the back button). */
  leading?: ReactNode;
  /** Right slot for actions. */
  actions?: ReactNode;
  /** Optional secondary row under the bar — e.g. a SegmentedControl sub-nav. */
  below?: ReactNode;
}

/**
 * Pinned glass top chrome (ported from nihongo's GlassBar/ScreenHeader + kurumon's
 * TopBar): back/leading · title/subtitle · actions, with an optional `below` sub-row,
 * absorbing the top safe area.
 */
export function TopBar({
  title,
  subtitle,
  onBack,
  backLabel = "Back",
  leading,
  actions,
  below,
}: TopBarProps) {
  return (
    <header className="ds-appbar">
      <div className="ds-appbar__row">
        <div className="ds-appbar__side">
          {leading ??
            (onBack ? (
              <button type="button" className="ds-appbar__back" onClick={onBack}>
                <Icon name="back" size={18} />
                {backLabel}
              </button>
            ) : null)}
        </div>
        <div className="ds-appbar__center">
          {title ? <span className="ds-appbar__title">{title}</span> : null}
          {subtitle ? <span className="ds-appbar__sub">{subtitle}</span> : null}
        </div>
        <div className="ds-appbar__side ds-appbar__side--end">{actions}</div>
      </div>
      {below ? <div className="ds-appbar__below">{below}</div> : null}
    </header>
  );
}
