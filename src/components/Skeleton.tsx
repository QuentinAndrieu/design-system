import type { CSSProperties } from "react";

export interface SkeletonProps {
  /** `line` for text, `cover` for a 2:3 poster, `card` for a list item. */
  variant?: "line" | "cover" | "card";
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}

/** Shimmering placeholder for loading content. */
export function Skeleton({ variant = "line", width, height, style }: SkeletonProps) {
  return (
    <div
      className={`ds-skel ds-skel--${variant}`}
      style={{ width, height, ...style }}
    />
  );
}
