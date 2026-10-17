export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  /** dims to the shared disabled look and ignores taps (0.22.0) */
  disabled?: boolean;
}

/** Accent-gradient toggle. */
export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className="ds-switch"
      onClick={() => onChange(!checked)}
    />
  );
}
