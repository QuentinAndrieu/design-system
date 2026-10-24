import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", className, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={["ds-btn", `ds-btn--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  ),
);
Button.displayName = "Button";
