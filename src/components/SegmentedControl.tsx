import type { ReactNode } from "react";

export interface SegOption {
  value: string;
  /** Text label. Omit for an icon-only segment (pass `icon` + `title`). */
  label?: ReactNode;
  /** Leading glyph — use the DS <Icon/>. */
  icon?: ReactNode;
  /** Tooltip + accessible name; required for icon-only segments. */
  title?: string;
  /** Dim + block this segment. */
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegOption[];
  value: string;
  onChange: (value: string) => void;
  /** `md` (default) for chrome switches; `sm` for compact toggles above artwork. */
  size?: "sm" | "md";
  /** Segments grow to share the row equally instead of hugging their content. */
  fill?: boolean;
}

/** Compact inline switch — the top-of-screen counterpart to the bottom TabBar. */
export function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  fill = false,
}: SegmentedControlProps) {
  return (
    <div
      className={["ds-seg", size === "sm" && "ds-seg--sm", fill && "ds-seg--fill"]
        .filter(Boolean)
        .join(" ")}
      role="group"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          aria-label={o.title}
          title={o.title}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
        >
          {o.icon != null && (
            <span className="ds-seg__ic" aria-hidden="true">
              {o.icon}
            </span>
          )}
          {o.label != null && <span>{o.label}</span>}
        </button>
      ))}
    </div>
  );
}
