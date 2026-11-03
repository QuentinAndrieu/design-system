/**
 * A dialog opens focused on its own box, not on its first control (Radix's default). On a phone the
 * first control is often a text field, and focusing it opens the keyboard over a screen nobody has
 * typed in yet. Tab still reaches the first control; a field that wants the focus says so with
 * `autoFocus` (Radix leaves a focus already inside the dialog alone).
 */
export const focusBox = (e: Event) => {
  e.preventDefault();
  (e.currentTarget as HTMLElement | null)?.focus({ preventScroll: true });
};
