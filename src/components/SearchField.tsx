import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
  /** Controlled value. */
  value: string;
  onValueChange: (value: string) => void;
}

/**
 * The fleet search input: a glass pill with a leading search glyph and a clear
 * button once there's a query. Controlled only — search state always lives in
 * the screen that filters by it.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ value, onValueChange, className, ...rest }, ref) => (
    <div className={["ds-search", className].filter(Boolean).join(" ")}>
      <Icon name="search" size={15} className="ds-search__ic" />
      <input
        ref={ref}
        type="search"
        className="ds-search__input"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...rest}
      />
      {value !== "" && (
        <button
          type="button"
          className="ds-search__clear"
          aria-label="Clear search"
          onClick={() => onValueChange("")}
        >
          <Icon name="x" size={13} />
        </button>
      )}
    </div>
  ),
);
SearchField.displayName = "SearchField";
