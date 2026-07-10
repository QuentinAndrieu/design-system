import type { CSSProperties, ReactNode } from "react";

// A hand-drawn, zero-dependency icon set (ported from miru) on a 24×24 grid.
// Stroke-based by default; `filled` swaps to fill. No lucide, fully agnostic.
const ICONS = {
  home: <path d="M4 10.7 12 4l8 6.7V20h-5.4v-5.4h-5.2V20H4z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="M15.8 15.8 20.5 20.5" />
    </>
  ),
  lib: <path d="M7 3.5h10V21l-5-3.6L7 21z" />,
  cal: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.7" />
      <path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4" />
    </>
  ),
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  back: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  chev: <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  share: <path d="M12 14V3.5M8 7l4-3.5L16 7M5.5 12v8h13v-8" />,
  heart: (
    <path d="M12 20.5C7.5 16.7 3.5 13.2 3.5 9.2c0-2.5 2-4.5 4.5-4.5 1.6 0 3.1.8 4 2.1.9-1.3 2.4-2.1 4-2.1 2.5 0 4.5 2 4.5 4.5 0 4-4 7.5-8.5 11.3z" />
  ),
  sort: <path d="M4 7h16M7 12h10M10 17h4" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  star: <path d="M12 3.4l2.6 5.5 6 .7-4.5 4.1 1.2 5.9-5.3-3-5.3 3 1.2-5.9L3.4 9.6l6-.7z" />,
  play: <path d="M9 6.8v10.4l8.6-5.2z" />,
  dl: <path d="M12 4v10.5M7.8 10.7 12 14.9l4.2-4.2M5.5 19.5h13" />,
  up: <path d="M12 15V4.5M7.8 8.3 12 4.1l4.2 4.2M5.5 19.5h13" />,
  set: (
    <>
      <circle cx="16" cy="8" r="2.1" />
      <circle cx="9" cy="16" r="2.1" />
      <path d="M4 8h9.5M18.5 8H20M4 16h2.5M11.5 16H20" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  dice: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number;
  filled?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Icon({ name, size = 18, filled = false, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={["ds-ic", filled && "ds-ic--filled", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {ICONS[name]}
    </svg>
  );
}

export const iconNames = Object.keys(ICONS) as IconName[];
