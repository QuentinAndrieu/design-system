import type { ReactNode } from "react";

export interface FilterToggleOption {
  value: string;
  /** visible text; omit for an icon-only toggle */
  label?: ReactNode;
  icon?: ReactNode;
  /** tooltip + accessible name — required for an icon-only toggle */
  title?: string;
  disabled?: boolean;
}

export interface FilterTogglesProps {
  options: FilterToggleOption[];
  /** the lit toggles — EMPTY means no filter: everything shows */
  value: readonly string[];
  /** the toggles lit after the tap */
  onChange: (value: string[]) => void;
  /** several lit at once (`true`), or one at most — a tap on the lit one turns it off */
  multiple?: boolean;
  /** the row under another filter's choice (its sub-filter): lower, on a ground a step darker, the
   *  icons a touch lighter — reads as belonging to the row above, never competing with it */
  secondary?: boolean;
  /** stretch to the row, the toggles sharing it */
  fill?: boolean;
}

/**
 * A row of filters where NOTHING lit means everything (0.20.0). Unlike a {@link SegmentedControl},
 * which always has one segment pressed, each toggle here is on or off on its own — no « All »
 * button, just tap a filter on and tap it off again.
 *
 * A lit toggle wears the accent's WASH (a filter is on — a state), never the full accent (that is
 * a selection, the SegmentedControl's): the two sit side by side in a filter panel and must not
 * read alike.
 */
export function FilterToggles({ options, value, onChange, multiple = false, secondary = false, fill = false }: FilterTogglesProps) {
  const toggle = (v: string) => {
    const lit = value.includes(v);
    if (multiple) onChange(lit ? value.filter((x) => x !== v) : [...value, v]);
    else onChange(lit ? [] : [v]);
  };
  return (
    <div
      className={["ds-ftog", secondary && "ds-ftog--secondary", fill && "ds-ftog--fill"].filter(Boolean).join(" ")}
      role="group"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value.includes(o.value)}
          aria-label={o.title}
          title={o.title}
          disabled={o.disabled}
          onClick={() => toggle(o.value)}
        >
          {o.icon != null && (
            <span className="ds-ftog__ic" aria-hidden="true">
              {o.icon}
            </span>
          )}
          {o.label != null && <span>{o.label}</span>}
        </button>
      ))}
    </div>
  );
}
