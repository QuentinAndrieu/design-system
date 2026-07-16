import type { ReactNode } from "react";
import { Glass } from "./Glass";

export interface SettingsGroupProps {
  children: ReactNode;
}

/**
 * A grouped glass card of `Row`s with hairline dividers — the fleet's settings
 * group (every More screen is labelled groups of these).
 */
export function SettingsGroup({ children }: SettingsGroupProps) {
  return <Glass className="ds-setgroup">{children}</Glass>;
}
