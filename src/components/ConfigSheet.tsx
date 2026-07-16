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

  // The single choreography number (0 = rest, 1 = configuring), tweened by a
  // rAF ease — sheet position, hero width and pill fade all derive from it in
  // CSS. JS-driven on purpose: CSS transitions on registered custom properties
  // start late/skip in the wild.
  const pRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const writeP = useCallback((v: number) => {
    pRef.current = v;
    rootRef.current?.style.setProperty("--ds-cs-p", String(v));
  }, []);
  const tweenTo = useCallback(
    (target: number) => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      const from = pRef.current;
      const start = performance.now();
      const DUR = 450;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DUR);
        writeP(from + (target - from) * easeOut(t));
        animRef.current = t < 1 ? requestAnimationFrame(step) : null;
      };
      animRef.current = requestAnimationFrame(step);
    },
    [writeP],
  );
  useEffect(
    () => () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    },
    [],
  );

  const set = useCallback(
    (v: boolean) => {
      setOpen(v);
      onOpenChange?.(v);
      if (!v) tweenTo(0);
    },
    [onOpenChange, tweenTo],
  );

  // The hero's open-state width, measured in real pixels: what the viewport
  // keeps above the sheet (minus the chrome above the artwork), times the
  // artwork's aspect. CSS lerps between 100% and this value via --ds-cs-p.
  const measureOpenW = useCallback(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    if (!root || !sheet) return;
    const scroller = getScrollParent(root);
    const scrolled = scroller ? scroller.scrollTop : window.scrollY;
    const chrome = root.getBoundingClientRect().top + scrolled;
    const budget = (window.innerHeight - sheet.offsetHeight - chrome - 24) * aspect;
    const w = Math.max(140, Math.min(budget, root.clientWidth));
    root.style.setProperty("--ds-cs-open-w", `${Math.round(w)}px`);
  }, [aspect]);

  // While open: bring the artwork to the top, freeze the page behind the sheet,
  // track resizes, close on Escape. The scroller is the contained shell's
  // content or the window.
  useEffect(() => {
    if (!open) return;
    measureOpenW();
    tweenTo(1);
    const scroller = getScrollParent(rootRef.current);
    (scroller ?? window).scrollTo({ top: 0, behavior: "smooth" });
    const lockEl = scroller ?? document.documentElement;
    const prev = lockEl.style.overflow;
    lockEl.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") set(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", measureOpenW);
    return () => {
      lockEl.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", measureOpenW);
    };
  }, [open, set, measureOpenW]);

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

  // Grip drag writes the shared progress number per-frame, so the sheet
  // follows the finger AND the artwork grows toward full width as it leaves —
  // one choreography, live. Releasing past the threshold dismisses (the tween
  // finishes the close from wherever the finger left off), else springs back.
  const dragY = useRef<number | null>(null);
  const onGripDown = (e: PointerEvent<HTMLDivElement>) => {
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    dragY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onGripMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY.current === null) return;
    const sheetH = sheetRef.current?.offsetHeight ?? 1;
    const dy = Math.max(0, e.clientY - dragY.current);
    writeP(Math.max(0, 1 - dy / sheetH));
  };
  const onGripUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY.current === null) return;
    const sheetH = sheetRef.current?.offsetHeight ?? 1;
    const dy = Math.max(0, e.clientY - dragY.current);
    dragY.current = null;
    if (dy > sheetH * DISMISS_RATIO) set(false);
    else tweenTo(1);
  };
  const onGripCancel = () => {
    if (dragY.current === null) return;
    dragY.current = null;
    tweenTo(1);
  };

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
