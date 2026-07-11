import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

export interface MultiSelectOption {
  value: string;
  label: ReactNode;
  /** Optional leading glyph (e.g. a category icon). */
  icon?: ReactNode;
  /** Accent colour for this option's selected checkbox + label (any CSS colour).
   *  Falls back to the DS accent when omitted. */
  color?: string;
}

export interface MultiSelectProps {
  /** Trigger text and panel heading (the group name). */
  label: ReactNode;
  options: MultiSelectOption[];
  /** Currently-selected values. */
  value: readonly string[];
  /** Called with the value of the option the user toggled (the panel stays open). */
  onChange: (value: string) => void;
  /** When provided, a clear affordance appears in the header once anything is selected. */
  onClear?: () => void;
  /** Label for the clear affordance (default "Clear"). */
  clearLabel?: ReactNode;
}

/**
 * Multi-select filter dropdown: a trigger showing the group label + a count badge when anything
 * is picked, and a glass popup of checkable options that stays open as you toggle. Dismissed on
 * outside-click or Escape, and collision-aware (flips to open leftward near the viewport's right
 * edge). The single-select counterpart is {@link Dropdown}.
 */
export function MultiSelect({
  label,
  options,
  value,
  onChange,
  onClear,
  clearLabel = "Clear",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = new Set(value);
  const count = selected.size;
  const active = count > 0;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Collision-aware: a left-anchored panel runs off the right edge when the trigger sits near it,
  // so measure on open and flip to right-anchored (opens leftward) when it wouldn't fit.
  const [alignRight, setAlignRight] = useState(false);
  useLayoutEffect(() => {
    if (!open || !rootRef.current) return;
    const PANEL_W = 224;
    const left = rootRef.current.getBoundingClientRect().left;
    setAlignRight(left + PANEL_W > window.innerWidth - 8);
  }, [open]);

  return (
    <div className="ds-multiselect" ref={rootRef}>
      <button
        type="button"
        className="ds-multiselect__trigger"
        data-active={active || undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        {active ? <span className="ds-multiselect__count">{count}</span> : null}
        <Icon
          name="chev"
          size={14}
          className="ds-multiselect__chev"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      {open ? (
        <div
          className={
            "ds-multiselect__panel" +
            (alignRight ? " ds-multiselect__panel--right" : "")
          }
          role="listbox"
          aria-multiselectable="true"
        >
          <div className="ds-multiselect__head">
            <span className="ds-multiselect__title">{label}</span>
            {onClear && active ? (
              <button
                type="button"
                className="ds-multiselect__clear"
                onClick={onClear}
              >
                {clearLabel}
              </button>
            ) : null}
          </div>
          <div className="ds-multiselect__list">
            {options.map((o) => {
              const sel = selected.has(o.value);
              const tint: CSSProperties | undefined =
                o.color && sel
                  ? { background: o.color, borderColor: o.color }
                  : undefined;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={sel}
                  className="ds-multiselect__item"
                  onClick={() => onChange(o.value)}
                >
                  <span
                    className="ds-multiselect__check"
                    data-on={sel || undefined}
                    style={tint}
                  >
                    {sel ? <Icon name="check" size={12} /> : null}
                  </span>
                  {o.icon ? (
                    <span className="ds-multiselect__ic" aria-hidden="true">
                      {o.icon}
                    </span>
                  ) : null}
                  <span
                    className="ds-multiselect__label"
                    style={o.color && sel ? { color: o.color } : undefined}
                  >
                    {o.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
