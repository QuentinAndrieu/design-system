# @quentinandrieu/design-system

Glass design system shared across my apps. Framework-agnostic CSS tokens + a thin
set of React 19 components (Radix under the dialogs). Docs run on Ladle.

The package ships the **glass recipe and structure**; each app supplies only its
**accent hue**. This package never names a consumer app.

How the code is written — file layout, component shape, class naming, tokens,
comments, exports: [CONVENTIONS.md](./CONVENTIONS.md).

## Consuming it in an app

The fleet installs it as a **git dependency** on this public repo — no registry, no
`.npmrc`, no token:

```bash
npm install git+https://github.com/QuentinAndrieu/design-system.git
```

```json
"@quentinandrieu/design-system": "git+https://github.com/QuentinAndrieu/design-system.git"
```

The `prepare` script builds `dist/` on install, so a fresh clone (or Vercel) builds the
package itself. The app's lockfile pins the commit. Keep the lockfile's URLs on
`git+https://…`: npm rewrites GitHub deps to `git+ssh://`, which Vercel can't clone.

Then import the CSS once + pick an accent:

```tsx
import "@quentinandrieu/design-system/styles.css";       // tokens + base + components
import "@quentinandrieu/design-system/accents/iris.css"; // or ember / jade / sakura / shu, or your own
import "@quentinandrieu/design-system/fonts.css";        // optional: Inter + Cormorant Garamond
import "@quentinandrieu/design-system/fonts-jp.css";     // optional: Noto Serif JP, only if the app renders Japanese
import { Button, Sheet, TabBar } from "@quentinandrieu/design-system";
```

`components.css` and `tokens.css` are also exported on their own, for an app that keeps
its own reset instead of `base.css`.

Drop `<div className="ds-wash" />` once at the app root for the ambient wash, and
set `data-theme="light" | "dark"` on `<html>` to flip themes — or let the theme helpers
do it (`themeBootScript` in the `<head>`, `useThemeEffect` near the root, `ThemeSelect`
in settings).

### Bringing your own accent

Skip the accent preset and fill the slot yourself — the library stays agnostic. The
presets in `src/accents/` set all six, for both themes:

```css
:root, [data-theme="dark"] {
  --accent: 178 59 59;          /* RGB triplets */
  --accent-2: 199 91 91;
  --accent-focus: 199 91 91;
  --accent-ink: 255 255 255;    /* text on the accent */
  --accent-wash: rgba(178, 59, 59, 0.16);
  --accent-grad: linear-gradient(120deg, rgb(var(--accent)), rgb(var(--accent-2)));
}
[data-theme="light"] { /* … the same six, tuned for light … */ }
```

### Tailwind

Apps on Tailwind get a **preset** that bridges every token into the theme, so app
CSS is written as utilities against the DS vocabulary (`bg-accent`, `text-fg-muted`,
`rounded-pill`, `shadow-glass`, `ease-glass`, `z-tabbar`, `opacity-disabled`, …). It is
**additive-only** — it never overrides Tailwind's own radius/font/duration scales, so it
drops onto an existing Tailwind app without resizing corners. The components still ship
as compiled CSS, so a `<Button>` looks identical regardless of the app's theme.

```ts
// tailwind.config.ts
import dsPreset from "@quentinandrieu/design-system/tailwind-preset";

export default {
  presets: [dsPreset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

The token *values* still come from `styles.css` (import it once) and flip with
`data-theme`; the preset only wires the variables into Tailwind's scales. Structural
colors keep the alpha modifier (`bg-accent/40`); pre-composed rgba tokens
(`fg-muted`, `glass-*`, `accent-wash`) ignore it.

## Developing

```bash
npm install
npm run dev          # Ladle — the living docs, with light/dark toggle
npm run build        # tsup → dist/ (JS + .d.ts) and copies the CSS verbatim
npm run typecheck
npm run check:fonts  # every app's font stacks lead with a face it actually loads
```

## Releasing

There is no publish step. A release is a commit on `main` that bumps `version` in
`package.json` (the commit subject ends with `— x.y.z`), pushed. Each app moves to it
when its lockfile is updated: `npm update @quentinandrieu/design-system`, then rewrite the
`git+ssh://git@github.com/…` npm leaves in `package-lock.json` back to `git+https://…`. Apps pin versions independently, so anything public
— an export, a prop, a `ds-*` class, a CSS custom property, a preset key — is renamed or
removed only as a breaking change.

`.github/workflows/publish.yml` is a leftover from the GitHub Packages era: it publishes
there on a `v*` tag, and no app reads from there. Don't push tags.

## What's inside

- `src/styles/tokens.css` — the canonical vocabulary (dark + light)
- `src/styles/base.css` — minimal reset, `ds-mono` / `ds-jp`, reduced motion
- `src/styles/components.css` — the `ds-*` classes (a contents list at its top)
- `src/styles/fonts.css`, `fonts-jp.css` — the typeface pair, and the Japanese face
- `src/accents/*.css` — hue presets (`ember`, `iris`, `jade`, `sakura`, `shu`)
- `src/components/*` — the components, each with its stories beside it
- `src/internal/*` — helpers shared between components, not exported
- `src/index.ts` — the public API
- `tailwind-preset.js` — token bridge for Tailwind apps (`presets: [dsPreset]`)

### Components

- **Surfaces & actions** — `Glass`, `Button` (`solid` · `gradient` · `glass` · `ghost` ·
  `outline` · `danger`), `IconButton`, `Icon` (+ `iconNames`)
- **Data display** — `Chip` / `ChipGroup`, `Badge`, `Avatar`, `ProgressBar`,
  `ProgressRing`, `Thumbnail`, `Row`, `GroupLabel`, `SettingsGroup`
- **Layout** — `AppShell`, `AppHeader`, `ParallaxSheet`, `ConfigSheet`, `useDesktop`
- **Navigation** — `TabBar`, `SegmentedControl`, `FilterToggles`, `WeekStrip`
- **Inputs** — `Field`, `SearchField`, `Dropdown`, `MultiSelect`, `Slider`, `Switch`,
  `Rating`, `ThemeSelect` (+ `useThemeEffect`, `useResolvedTheme`, `createThemeStore`,
  `themeBootScript`, `applyTheme`, `resolveTheme`, `THEME_BG`)
- **Overlays** — `Sheet`, `SheetRow`, `Modal`
- **Feedback** — `Skeleton`, `Empty`, `ErrorBox`, `Toast`, `Toaster` + `toast()`
- **Stats** — `StatTile` / `StatGrid`, `Donut`, `BarChart`

A few behaviours worth knowing:

- `AppShell rail` (0.14.0): on viewports ≥ 900px the same `TabBar` docks as a vertical
  rail on the left and a constrained shell widens to `--ds-shell-max-wide` (64rem) — the
  desktop layout, opt-in per app; the phone shell is untouched below it.
- `ConfigSheet dock` (0.15.0): past the same breakpoint the studio's sheet docks as a
  permanent side panel beside the artwork — no handle, no choreography. `useDesktop()` is
  the matching hook for app-side layout decisions.
- `.ds-wash` (0.15.1) ships in `components.css`, not the base reset — a fixed viewport
  layer any app can drop at its root, including one that keeps its own preflight.
- `AppHeader back` (0.16.0): on a pushed screen the label line becomes the back link
  (`‹ Collection`) — two lines instead of app name + title + a back row.
- `SegmentedControl` (0.17.0) takes an array `value` for a multi-select group — the same
  track, several segments pressed.
- `.ds-ctl` (0.26.0): the control surface for an app's own secondary button, the face the
  outline / ghost / icon buttons and chips wear.
