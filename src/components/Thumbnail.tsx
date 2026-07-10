import type { ReactNode } from "react";

export interface ThumbnailProps {
  src?: string;
  title?: string;
  /** Small overlay badge, top-left (e.g. a score). */
  badge?: ReactNode;
  /** Stretch to fill its grid cell instead of the fixed poster width. */
  fill?: boolean;
  onClick?: () => void;
}

/**
 * Poster/cover with a 2:3 aspect ratio, gradient shade, optional title overlay
 * and badge. Domain apps (miru's anime covers) compose their specifics on top.
 */
export function Thumbnail({ src, title, badge, fill, onClick }: ThumbnailProps) {
  const initial = title?.trim()?.[0]?.toUpperCase() ?? "?";
  const className = ["ds-thumb", fill && "ds-thumb--fill"]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      {src ? (
        <img src={src} alt={title ?? ""} />
      ) : (
        <span className="ds-thumb__fallback">{initial}</span>
      )}
      <span className="ds-thumb__shade" />
      {badge ? <span className="ds-thumb__badge">{badge}</span> : null}
      {title ? <span className="ds-thumb__title">{title}</span> : null}
    </>
  );

  return onClick ? (
    <button className={className} onClick={onClick}>
      {inner}
    </button>
  ) : (
    <div className={className}>{inner}</div>
  );
}
