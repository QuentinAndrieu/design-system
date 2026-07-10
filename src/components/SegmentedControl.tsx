export interface SegOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegOption[];
  value: string;
  onChange: (value: string) => void;
}

/** Compact inline switch — the top-of-screen counterpart to the bottom TabBar. */
export function SegmentedControl({
  options,
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="ds-seg" role="group">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
