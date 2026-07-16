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

/** Dragging the grip past this slice of the sheet's travel settles it the other way. */
const DISMISS_RATIO = 0.22;

/** Pointer slop under which a grip drag counts as a tap, not a drag. */
const TAP_SLOP = 6;

export interface ConfigSheetProps {
  /** The artwork — full column width at rest, shrunk to the top while configuring. */
  hero: ReactNode;
  /** The configuration form. Scrolls INSIDE the sheet; scrolling never dismisses. */
  children: ReactNode;
  /** Accessible name of the configure button in the toolbar (i18n). */
  openLabel: string;
  /**
   * The screen's action row, rendered ABOVE the artwork with the configure
   * button appended at its far right (kurumon's toggles + export, kamishibai's
   * save icons). Hidden while the sheet is open.
   */
  toolbar?: ReactNode;
  /** Sheet header label. Defaults to `openLabel`. */
  title?: ReactNode;
  /** Artwork width/height ratio, used to budget the shrunk hero (default 3/4). */
  aspect?: number;
  /** Extra classes on the sheet surface. */
  className?: string;
  /** Notifies the app when the sheet opens/closes (e.g. to pause previews). */
  onOpenChange?: (open: boolean) => void;
  /**
   * The shell the studio sits in.
   *
   * `inline` (default) keeps it in the app's content column, under the app's
   * own header and above its tab bar.
   *
   * `fullscreen` gives the artwork the whole viewport: the action row floats
   * over it, and the sheet rests as a peeking handle you drag up rather than
   * hiding offscreen. The app MUST drop its own header + tab bar to match
   * (kurumon's `isFullBleed`) — this variant paints over both.
   */
  variant?: "inline" | "fullscreen";
  /**
   * Leave the studio (`fullscreen` only, where it is REQUIRED in practice: with
   * the tab bar gone there is no other way out, so a fullscreen studio without
   * it traps you).
   */
  onExit?: () => void;
  /** Accessible name of the exit button (i18n). */
  exitLabel?: string;
  /** Label on the resting handle (`fullscreen` only). Defaults to `openLabel`. */
  restLabel?: string;
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
  toolbar,
  title,
  aspect = 0.75,
  className,
  onOpenChange,
  variant = "inline",
  onExit,
  exitLabel,
  restLabel,
}: ConfigSheetProps) {
  const full = variant === "fullscreen";
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);
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
      // No frames come in a hidden document (background tab, throttled
      // webview) — land on the target at once instead of freezing mid-flight.
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        writeP(target);
        return;
      }
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
    const stage = stageRef.current;
    if (!root || !sheet || !stage) return;
    if (full) {
      // Ask the stage what the free box will BE once open, rather than deriving it
      // from the viewport: the pads already encode the sheet, the peek, the gap and
      // the safe area, and re-deriving that here is how the two drift apart. They
      // lerp on --ds-cs-p, though, so pin it to the far end for the read — otherwise
      // a measure taken at rest (or mid-drag, from the grip) budgets against the
      // wrong box and the artwork lands the wrong size.
      const prevP = pRef.current;
      root.style.setProperty("--ds-cs-p", "1");
      const cs = getComputedStyle(stage);
      const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
      const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      const freeH = stage.clientHeight - padY;
      const cap = stage.clientWidth - padX;
      root.style.setProperty("--ds-cs-p", String(prevP));
      // Fill the free box's height; the width only binds on a viewport wide and
      // short enough that a full-height artwork wouldn't fit across.
      const w = Math.max(140, Math.min(freeH * aspect, cap));
      root.style.setProperty("--ds-cs-open-w", `${Math.round(w)}px`);
      return;
    }
    const scroller = getScrollParent(root);
    const scrolled = scroller ? scroller.scrollTop : window.scrollY;
    const chrome = root.getBoundingClientRect().top + scrolled;
    const budget = (window.innerHeight - sheet.offsetHeight - chrome - 12) * aspect;
    const w = Math.max(140, Math.min(budget, root.clientWidth));
    root.style.setProperty("--ds-cs-open-w", `${Math.round(w)}px`);
  }, [aspect, full]);

  // While open: bring the artwork to the top, freeze the page behind the sheet,
  // track resizes, close on Escape. The scroller is the contained shell's
  // content or the window.
  useEffect(() => {
    if (!open) return;
    measureOpenW();
    tweenTo(1);
    const scroller = getScrollParent(rootRef.current);
    // A fullscreen studio has nothing to bring into view — it IS the viewport,
    // and the artwork is parked by the stage, not by scrolling to it.
    if (!full) (scroller ?? window).scrollTo({ top: 0, behavior: "smooth" });
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
  }, [open, set, measureOpenW, full]);

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
  // one choreography, live. Reckoned from wherever the drag STARTED rather than
  // from "open", because fullscreen drags the other way: up, from rest.
  // The distance the sheet can travel: inline it leaves entirely, fullscreen
  // stops at the peeking handle. Measured off the grip so the CSS peek (which
  // carries a safe-area term, i.e. no parseable px value) stays the source of truth.
  const dragY = useRef<number | null>(null);
  const dragFromP = useRef(0);
  // Land on a state, whether or not `open` already agrees: flipping it runs the
  // open effect (which tweens), so only tween here when it wouldn't fire.
  const settle = (toOpen: boolean) => {
    if (toOpen === open) tweenTo(toOpen ? 1 : 0);
    else set(toOpen);
  };
  const travel = () => {
    const sheetH = sheetRef.current?.offsetHeight ?? 1;
    const peek = full ? (gripRef.current?.offsetHeight ?? 0) : 0;
    return Math.max(1, sheetH - peek);
  };
  const onGripDown = (e: PointerEvent<HTMLDivElement>) => {
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    // Measure now, not on open: dragging up from rest must shrink the artwork
    // under the finger, and the open effect hasn't run yet.
    measureOpenW();
    dragY.current = e.clientY;
    dragFromP.current = pRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onGripMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY.current === null) return;
    const up = dragY.current - e.clientY;
    writeP(Math.max(0, Math.min(1, dragFromP.current + up / travel())));
  };
  const onGripUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragY.current === null) return;
    const moved = Math.abs(e.clientY - dragY.current);
    const from = dragFromP.current;
    dragY.current = null;
    // A tap on the handle toggles — the whole point of a resting handle. Inline
    // keeps its old no-op-on-tap behaviour (its grip only exists while open).
    if (moved < TAP_SLOP) {
      if (full) settle(!open);
      else tweenTo(1);
      return;
    }
    // Hysteresis from the starting end, so a short flick either way commits.
    settle(from > 0.5 ? pRef.current >= 1 - DISMISS_RATIO : pRef.current > DISMISS_RATIO);
  };
  const onGripCancel = () => {
    if (dragY.current === null) return;
    dragY.current = null;
    settle(dragFromP.current > 0.5);
  };

  const cls = ["ds-configsheet"];
  if (full) cls.push("ds-configsheet--full");
  if (open) cls.push("ds-configsheet--open");

  return (
    <div
      ref={rootRef}
      className={cls.join(" ")}
      style={{ "--ds-cs-aspect": aspect } as CSSProperties}
    >
      {/* The screen's action row + the configure opener, kurumon's top-row
          shape — hidden (data-cs-hide) while the sheet is open; fullscreen
          floats this over the artwork and fades it with the drag instead. */}
      <div className="ds-cs-bar" data-cs-hide>
        {full && onExit && (
          <button type="button" className="ds-cs-exit" aria-label={exitLabel} title={exitLabel} onClick={onExit}>
            <Icon name="back" size={18} />
          </button>
        )}
        <div className="ds-cs-bar-tools">{toolbar}</div>
        <button
          type="button"
          className="ds-cs-fab"
          aria-label={openLabel}
          title={openLabel}
          onClick={() => !open && set(true)}
        >
          <Icon name="set" size={16} />
        </button>
      </div>
      {/* The box the artwork centres in. Inline it is an inert wrapper; fullscreen
          it is the whole free area, and lerping its bottom pad is what walks the
          artwork from centred to parked above the sheet. */}
      <div className="ds-cs-stage" ref={stageRef}>
        <div className="ds-cs-hero" onClickCapture={onHeroClickCapture}>
          {hero}
        </div>
      </div>
      <div
        ref={sheetRef}
        className={className ? `ds-cs-sheet ${className}` : "ds-cs-sheet"}
        aria-hidden={!open}
      >
        <div
          ref={gripRef}
          className="ds-cs-grip"
          aria-hidden
          onPointerDown={onGripDown}
          onPointerMove={onGripMove}
          onPointerUp={onGripUp}
          onPointerCancel={onGripCancel}
        >
          {/* Fullscreen rests ON the handle, so it has to say what it opens. */}
          {full && <span className="ds-cs-rest">{restLabel ?? openLabel}</span>}
        </div>
        {/* Title only — dismissal is the grip, the artwork, or Escape. */}
        <div className="ds-cs-head">
          <span className="ds-cs-title">{title ?? openLabel}</span>
        </div>
        <div className="ds-cs-body">{children}</div>
      </div>
    </div>
  );
}
ConfigSheet.displayName = "ConfigSheet";
