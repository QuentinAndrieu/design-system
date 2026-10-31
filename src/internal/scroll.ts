/**
 * Walk up to the nearest scrolling ancestor. Returns `null` when there is none
 * (a page-scroll shell, where the document/window is the scroller).
 * Shared by ParallaxSheet and ConfigSheet, which both work in either kind of shell.
 */
export function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const oy = getComputedStyle(el).overflowY;
    if (oy === "auto" || oy === "scroll") return el;
    el = el.parentElement;
  }
  return null;
}
