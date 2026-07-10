import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Circular glass button sized for a single icon. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={["ds-iconbtn", className].filter(Boolean).join(" ")}
      {...rest}
    />
  ),
);
IconButton.displayName = "IconButton";
