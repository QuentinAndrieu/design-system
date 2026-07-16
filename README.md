# @quentinandrieu/design-system

Glass design system shared across my apps. Framework-agnostic CSS tokens + a thin
set of React 19 components (Radix under the interactive ones). Docs run on Ladle.

The package ships the **glass recipe and structure**; each app supplies only its
**accent hue**. This package never names a consumer app.

## Consuming it in an app

`.npmrc` in the app (so the scope resolves from GitHub Packages):

```
@quentinandrieu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Install, then import the CSS once + pick an accent:

```bash
npm i @quentinandrieu/design-system
```

```tsx
import "@quentinandrieu/design-system/styles.css";       // tokens + base + components
import "@quentinandrieu/design-system/accents/iris.css"; // or ember / jade / sakura / shu, or your own
import { Button, Sheet, TabBar } from "@quentinandrieu/design-system";
```

Drop `<div className="ds-wash" />` once at the app root for the ambient wash, and
set `data-theme="light" | "dark"` on `<html>` to flip themes.

### Bringing your own accent

Skip the accent preset and define the slot yourself — the library stays agnostic:

```css
:root { --accent: 178 59 59; --accent-focus: 199 91 91; --accent-ink: 255 255 255; }
```

### Tailwind

Apps on Tailwind get a **preset** that bridges every token into the theme, so app
CSS is written as utilities against the DS vocabulary (`bg-accent`, `text-fg-muted`,
`rounded-pill`, `shadow-glass`, `ease-glass`, `z-tabbar`, …). It is **additive-only** —
it never overrides Tailwind's own radius/font/duration scales, so it drops onto an
existing Tailwind app without resizing corners. The components still ship as compiled
CSS, so a `<Button>` looks identical regardless of the app's theme.

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
(`fg-muted`, `glass`, `accent-wash`) ignore it.

## Developing

```bash
npm install
npm run dev        # Ladle — the living docs, with light/dark + accent toggle
npm run build      # tsup → dist/ (JS + .d.ts) and copies CSS verbatim
npm run typecheck
```

## Releasing

CI publishes to GitHub Packages on a version tag:

```bash
npm version patch && git push --follow-tags
```

## What's inside

- `src/styles/tokens.css` — the canonical vocabulary (dark + light)
- `src/styles/components.css` — `ds-*` classes
- `src/accents/*.css` — hue presets (`ember`, `iris`, `jade`, `sakura`, `shu`)
- `src/components/*` — `Glass`, `Button`, `Sheet`, `TabBar`, `Field`
- `tailwind-preset.js` — token bridge for Tailwind apps (`presets: [dsPreset]`)
