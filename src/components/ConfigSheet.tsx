import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Icon } from "./Icon";

/** Walk up to the nearest scrolling ancestor. Returns `null` when there is none
 *  (a page-scroll shell, where the document/window is the scroller). */
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const oy = getComputedStyle(el).overflowY;
    if (oy === "auto" || oy === "scroll") return el;
    el = el.parentElement;
  }
  return null;
}

/** Dragging the grip past this slice of the sheet's height dismisses it. */
const DISMISS_RATIO = 0.22;

export interface ConfigSheetProps {
  /** The artwork — full column width at rest, shrunk to the top while configuring. */
  hero: ReactNode;
  /** The configuration form. Scrolls INSIDE the sheet; scrolling never dismisses. */
  children: ReactNode;
  /** Label on the opener pill under the artwork (pass the app's i18n string). */
  openLabel: string;
  /** Sheet header label. Defaults to `openLabel`. */
  title?: ReactNode;
  /** Accessible label of the ✕ button (i18n). */
  closeLabel?: string;
  /** Artwork width/height ratio, used to budget the shrunk hero (default 3/4). */
  aspect?: number;
  /** Extra classes on the sheet surface. */
  className?: string;
  /** Notifies the app when the sheet opens/closes (e.g. to pause previews). */
  onOpenChange?: (open: boolean) => void;
}

/**
 * The studio layout, Instagram-style (replaced `ParallaxSheet` in the card /
 * cover / poster / story studios — the map keeps the parallax): at rest the
 * artwork owns the full column and a "configure" pill sits under it — no sheet
 * peeking. Opening scrolls the artwork to the top, shrinks it to the space the
 * sheet leaves, and slides the frosted sheet over the tab bar. The sheet scrolls
 * internally and only dismisses explicitly: drag the grip down, the ✕, tap the
 * artwork, or Escape — closing returns the artwork to its full-width rest state.
 *
 * Hero children tagged `data-cs-hide` (toggles, action rows) are hidden while
 * the sheet is open, so the shrunk hero is the artwork alone.
 */
export function ConfigSheet({
  hero,
  children,
  openLabel,
  title,
  closeLabel = "Close",
  aspect = 0.75,
  className,
  onOpenChange,
}: ConfigSheetProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const set = useCallback(
    (v: boolean) => {
      setOpen(v);
      onOpenChange?.(v);
    },
    [onOpenChange],
  );

  // While open: bring the artwork to the top, freeze the page behind the sheet,
  // close on Escape. The scroller is the contained shell's content or the window.
  useEffect(() => {
    if (!open) return;
    const scroller = getScrollParent(rootRef.current);
    (scroller ?? window).scrollTo({ top: 0, behavior: "smooth" });
    const lockEl = scroller ?? document.documentElement;
    const prev = lockEl.style.overflow;
    lockEl.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") set(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockEl.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, set]);

  // Tap the artwork to dismiss (only while open); controls marked
  // `data-no-collapse` keep working.
  const onHeroClickCapture = useCallback(
    (e: MouseEvent) => {
      if (!open) return;
      if ((e.target as HTMLElement).closest("[data-no-collapse]")) return;
      e.stopPropagation();
      e.preventDefault();
      set(false);
    },
    [open, set],
  );

  // Grip drag drives the shared progress number (--ds-cs-p) per-frame, so the
  // sheet follows the finger AND the artwork grows toward full width as it
  // leaves — one choreography, live. Releasing past the threshold dismisses,
  // else it springs back; either way the transition resumes from the dragged
  // value (the inline var is cleared a frame after the class flips).
  const dragY = useRef<number | null>(null);
  const settle = useCallback(
    (next: boolean) => {
      const root = rootRef.current;
      if (!root) return;
      root.classList.remove("ds-configsheet--drag");
      if (!next) set(false);
      requestAnimationFrame(() => {
        root.style.removeProperty("--ds-cs-p");
      });
    },
    [set],
  );
  const onGripDown = (e: PointerEvent<HTMLDivElement>) => {
    dragY.current = e.clientY;
    rootRef.current?.classList.add("ds-configsheet--drag");
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onGripMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY.current === null) return;
    const sheetH = sheetRef.current?.offsetHeight ?? 1;
    const dy = Math.max(0, e.clientY - dragY.current);
    const p = Math.max(0, 1 - dy / sheetH);
    rootRef.current?.style.setProperty("--ds-cs-p", String(p));
  };
  const onGripUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY.current === null) return;
    const sheetH = sheetRef.current?.offsetHeight ?? 1;
    const dy = Math.max(0, e.clientY - dragY.current);
    dragY.current = null;
    settle(dy <= sheetH * DISMISS_RATIO);
  };
  const onGripCancel = () => {
    if (dragY.current === null) return;
    dragY.current = null;
    settle(true);
  };

  // Safety net: whatever interrupted a drag (lost pointer, Escape, ✕ mid-drag),
  // an open/close flip always clears the drag remnants so no stuck in-between
  // state can survive.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    dragY.current = null;
    root.classList.remove("ds-configsheet--drag");
    root.style.removeProperty("--ds-cs-p");
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={open ? "ds-configsheet ds-configsheet--open" : "ds-configsheet"}
      style={{ "--ds-cs-aspect": aspect } as CSSProperties}
    >
      <div className="ds-cs-hero" onClickCapture={onHeroClickCapture}>
        {hero}
      </div>
      {/* Always mounted — it fades with the choreography (opacity from
          --ds-cs-p) and grows back in as a closing drag progresses. */}
      <button
        type="button"
        className="ds-cs-open"
        tabIndex={open ? -1 : 0}
        onClick={() => !open && set(true)}
      >
        <Icon name="set" size={15} />
        {openLabel}
      </button>
      <div
        ref={sheetRef}
        className={className ? `ds-cs-sheet ${className}` : "ds-cs-sheet"}
        aria-hidden={!open}
      >
        <div
          className="ds-cs-grip"
          aria-hidden
          onPointerDown={onGripDown}
          onPointerMove={onGripMove}
          onPointerUp={onGripUp}
          onPointerCancel={onGripCancel}
        />
        <div className="ds-cs-head">
          <span className="ds-cs-title">{title ?? openLabel}</span>
          <button type="button" className="ds-cs-close" aria-label={closeLabel} onClick={() => set(false)}>
            <Icon name="x" size={14} />
          </button>
        </div>
        <div className="ds-cs-body">{children}</div>
      </div>
    </div>
  );
}
ConfigSheet.displayName = "ConfigSheet";
