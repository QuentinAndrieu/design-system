import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface DropdownOption {
  value: string;
  label: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: ReactNode;
}

/**
 * Glass select (ported from kurumon's PickerDropdown): trigger + popup panel,
 * dismissed on outside-click or Escape.
 */
export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select…",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

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

  return (
    <div className="ds-dropdown" ref={rootRef}>
      <button
        type="button"
        className="ds-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <Icon
          name="chev"
          size={14}
          className="ds-dropdown__chev"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>
      {open ? (
        <div className="ds-dropdown__panel" role="listbox">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              className="ds-dropdown__item"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
              {o.value === value ? (
                <Icon name="check" size={15} style={{ marginLeft: "auto" }} />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
