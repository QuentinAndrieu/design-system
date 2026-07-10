import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

/** Labelled text input with the mono uppercase label treatment. */
export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, className, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className="ds-field">
        {label ? (
          <label className="ds-field__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={["ds-field__input", className].filter(Boolean).join(" ")}
          {...rest}
        />
      </div>
    );
  },
);
Field.displayName = "Field";
