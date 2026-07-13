import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

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

/** Unifies an overflow-scrolling element and the window into one small surface so
 *  the sheet works whether the app shell owns the scroll (`contained`) or the
 *  document does (`page`). */
function scrollApi(el: HTMLElement | null) {
  return {
    scrollTop: () => (el ? el.scrollTop : window.scrollY),
    clientHeight: () => (el ? el.clientHeight : window.innerHeight),
    toTop: () =>
      (el ?? window).scrollTo({ top: 0, behavior: "smooth" }),
    listen: (fn: () => void) => {
      const target: EventTarget = el ?? window;
      target.addEventListener("scroll", fn, { passive: true });
      return () => target.removeEventListener("scroll", fn);
    },
  };
}

export interface ParallaxSheetProps {
  /** The pinned artwork — a live card / cover / poster preview (and its toggles). */
  hero: ReactNode;
  /** The scrolling configuration form that rises over the hero. */
  children: ReactNode;
  /**
   * Distance from the top of the scroll viewport at which the hero pins — set
   * this to the height of a sticky app header that sits above the sheet
   * (page-scroll shells). Defaults to `0` (contained shells, header in chrome).
   */
  topOffset?: number;
  /** Extra classes on the sheet surface. */
  className?: string;
}

/**
 * The card / cover / poster editor layout: the artwork is pinned behind (always
 * visible) and the configuration form is a frosted glass sheet that rises over it
 * as you scroll, stopping just below the title so the artwork still reads
 * *through* the translucent sheet. Tapping the exposed artwork slides the sheet
 * back to its resting place.
 *
 * How it works — two stacked `sticky` layers inside the scroll container:
 *  - the hero (`top: topOffset`) pins the full artwork so it never moves;
 *  - the sheet (`top: peek`) rises with the scroll until its top reaches `peek`
 *    (≈ just under the title), then pins there. Its box height is fixed to
 *    `viewport − peek`, so the outer scroll can travel exactly `heroHeight − strip`
 *    (enough to raise it, no more) and the long form then scrolls *inside* the
 *    sheet. `peek`/`strip` are derived from the measured hero height.
 */
export function ParallaxSheet({
  hero,
  children,
  topOffset = 0,
  className,
}: ParallaxSheetProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  // `strip` = the band of hero left visible above the sheet; `peek` = the sheet's
  // resting top in viewport coordinates (strip + any header offset).
  const [{ peek, strip, sheetH }, setDims] = useState({
    peek: 160,
    strip: 160,
    sheetH: 480,
  });

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const scroller = getScrollParent(rootRef.current);
    const api = scrollApi(scroller);
    const measure = () => {
      const heroH = heroEl.offsetHeight;
      const viewH = api.clientHeight();
      // strip ≈ the hero left visible above the sheet — tuned to land just below
      // the title on a framed card (its name sits near the top). Clamped so it
      // stays sensible for very short or very tall heroes.
      const s = Math.round(Math.min(Math.max(heroH * 0.32, 130), 260));
      const p = topOffset + s;
      setDims({ peek: p, strip: s, sheetH: Math.max(260, viewH - p) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(heroEl);
    if (scroller) ro.observe(scroller);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [topOffset]);

  // Tap the exposed artwork (above the sheet) to slide the sheet back down — but
  // only once it's risen, so a tap on the artwork at rest still reaches it. Taps
  // on controls marked `data-no-collapse` are ignored.
  const onHeroClickCapture = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-no-collapse]")) return;
      const api = scrollApi(getScrollParent(rootRef.current));
      if (api.scrollTop() > strip * 0.5) {
        e.stopPropagation();
        api.toTop();
      }
    },
    [strip],
  );

  return (
    <div ref={rootRef} className="ds-parallax">
      <div
        ref={heroRef}
        onClickCapture={onHeroClickCapture}
        className="ds-parallax-hero"
        style={{ top: topOffset }}
      >
        {hero}
      </div>
      <div
        className={
          className ? `ds-parallax-sheet ${className}` : "ds-parallax-sheet"
        }
        style={{ top: peek, height: sheetH }}
      >
        <div className="ds-parallax-grip" aria-hidden />
        <div className="ds-parallax-body">{children}</div>
      </div>
    </div>
  );
}
ParallaxSheet.displayName = "ParallaxSheet";
