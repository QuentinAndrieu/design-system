import { useEffect, useSyncExternalStore } from "react";
import { SegmentedControl } from "./SegmentedControl";

/** What the user picked. `auto` follows the OS; the other two are literal. */
export type ThemePref = "auto" | "dark" | "light";
/** What actually lands on `<html data-theme>` — `auto` is never written out. */
export type ResolvedTheme = "dark" | "light";

/**
 * Base background per resolved theme — mirrors the `--bg` tokens (dark `11 13 18`,
 * light `240 238 232`). The single source of truth for the browser/PWA chrome tint,
 * so the status bar matches the app body instead of reading as a different shade.
 * The boot script and the runtime path both derive from this map — keep them on it.
 */
export const THEME_BG: Record<ResolvedTheme, string> = {
  dark: "#0b0d12",
  light: "#f0eee8",
};

const DARK_MQ = "(prefers-color-scheme: dark)";

/** `auto` asks the OS; anything else is already the answer. */
export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref !== "auto") return pref;
  if (typeof window === "undefined") return "light";
  return window.matchMedia(DARK_MQ).matches ? "dark" : "light";
}

/**
 * Put the resolved theme on `<html data-theme>` and point the theme-color meta at
 * the matching surface. Creates the meta if the document has none — an app that
 * declares `viewport.themeColor` in Next gets it injected AFTER the boot script,
 * which is why the fleet declares none and lets this own the tag.
 */
export function applyTheme(pref: ThemePref): ResolvedTheme {
  const resolved = resolveTheme(pref);
  document.documentElement.dataset.theme = resolved;
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", THEME_BG[resolved]);
  return resolved;
}

/**
 * Apply `pref` and keep it applied. The boot script is one-shot, so it cannot
 * notice the OS flipping while the app is open — under `auto` that is exactly when
 * the theme must change. Mount once in a client component near the root and pass
 * the app's stored preference; the app owns persistence, this owns resolution.
 */
export function useThemeEffect(pref: ThemePref): void {
  useEffect(() => {
    const mq = window.matchMedia(DARK_MQ);
    const apply = () => applyTheme(pref);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [pref]);
}

const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

/**
 * The theme currently on `<html>`, for the rare visual that can't be expressed in
 * tokens (a canvas, an exported PNG). Reads the attribute rather than app state so
 * it can't go stale, and reports `light` on the server to match the SSR markup —
 * prefer `rgb(var(--fg))` / `currentColor` over branching on this.
 */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(
    subscribeToTheme,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light" as const,
  );
}

export interface ThemeBootOptions {
  /** localStorage key holding the preference. */
  storageKey: string;
  /** Dotted path, if the key holds a JSON blob (zustand persist: `state.theme`). Omit for a raw value. */
  jsonPath?: string;
  /** The preference to assume when nothing is stored — the app's opening theme. */
  fallback: ThemePref;
}

/**
 * The pre-paint `<script>` body: resolve the stored preference and put it on
 * `<html>` before first paint, so the app never flashes the wrong theme. Inline it
 * in the app's layout `<head>`.
 *
 * Persistence stays the app's (each stores the preference its own way, some inside
 * a larger settings blob), so this takes the key + shape rather than owning one.
 */
export function themeBootScript({ storageKey, jsonPath, fallback }: ThemeBootOptions): string {
  const read = jsonPath
    ? `p=${jsonPath
        .split(".")
        .reduce((acc, k) => `(${acc}||{})[${JSON.stringify(k)}]`, "JSON.parse(v)")};`
    : "p=v;";
  // Two try blocks on purpose: only READING is allowed to fail. A corrupt blob or a
  // walled-off localStorage must still leave the theme applied — wrapping both in one
  // try means a JSON.parse throw skips the write entirely, and the app boots with no
  // data-theme at all (i.e. the DS :root default, not `fallback`) and a stale tint.
  return (
    "(function(){var p;try{" +
    `var v=localStorage.getItem(${JSON.stringify(storageKey)});` +
    `if(v!=null){${read}}` +
    "}catch(e){}" +
    `if(p!=="auto"&&p!=="dark"&&p!=="light")p=${JSON.stringify(fallback)};` +
    "try{" +
    'var r=p==="auto"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):p;' +
    "document.documentElement.dataset.theme=r;" +
    'var m=document.querySelector(\'meta[name="theme-color"]\');' +
    `if(m)m.setAttribute("content",r==="dark"?${JSON.stringify(THEME_BG.dark)}:${JSON.stringify(THEME_BG.light)});` +
    "}catch(e){}})();"
  );
}

export interface ThemeSelectProps {
  value: ThemePref;
  onChange: (pref: ThemePref) => void;
  /** `sm` (default) — it sits in a settings `Row`, which is a form row, not a nav row. */
  size?: "sm" | "md";
  /** Override for a localised app (kurumon reads French). */
  labels?: Record<ThemePref, string>;
}

const DEFAULT_LABELS: Record<ThemePref, string> = {
  auto: "Auto",
  dark: "Dark",
  light: "Light",
};

/**
 * The fleet's theme control: Auto / Dark / Light, for the Theme row of every More
 * screen. Controlled — the app holds the preference and pairs this with
 * {@link useThemeEffect}, which is what makes `auto` mean anything.
 */
export function ThemeSelect({ value, onChange, size = "sm", labels = DEFAULT_LABELS }: ThemeSelectProps) {
  return (
    <SegmentedControl
      size={size}
      value={value}
      onChange={(v) => onChange(v as ThemePref)}
      options={[
        { value: "auto", label: labels.auto },
        { value: "dark", label: labels.dark },
        { value: "light", label: labels.light },
      ]}
    />
  );
}
