import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "solid" | "gradient" | "glass" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `solid` fills with the flat accent (default); `gradient` is the opt-in
   * signature gradient for a single hero action; `glass` is a frosted chip;
   * `ghost` is text-only.
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
