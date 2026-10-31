/**
 * Join class names, dropping the falsy ones: `cx("ds-btn", on && "ds-btn--on", className)`.
 * Internal — not exported from the package. Order is kept, so the base class comes first
 * and the consumer's `className` last.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
