import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cx } from "../internal/cx";

export type ButtonVariant =
  | "solid"
  | "gradient"
  | "glass"
  | "ghost"
  | "outline"
  | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `solid` fills with the flat accent (default); `gradient` is the opt-in
   * signature gradient for a single hero action; `glass` is a frosted chip;
   * `outline` and `ghost` are secondary actions on the control surface (0.26.0); `danger` is a
   * destructive one, in the danger red's outline.
   */
  variant?: ButtonVariant;
}

/** The fleet button. `type` defaults to `"button"`, so it never submits a form by accident. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", className, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx("ds-btn", `ds-btn--${variant}`, className)}
      {...rest}
    />
  ),
);
Button.displayName = "Button";
