import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cx } from "../internal/cx";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Circular glass button sized for a single icon. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx("ds-iconbtn", className)}
      {...rest}
    />
  ),
);
IconButton.displayName = "IconButton";
