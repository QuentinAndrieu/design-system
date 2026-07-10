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
import "@quentinandrieu/design-system/accents/iris.css"; // or ember / jade, or your own
import { Button, Sheet, TabBar } from "@quentinandrieu/design-system";
```

Drop `<div className="ds-wash" />` once at the app root for the ambient wash, and
set `data-theme="light" | "dark"` on `<html>` to flip themes.

### Bringing your own accent

Skip the preset and define the slot yourself — the library stays agnostic:

```css
:root { --accent: 178 59 59; --accent-focus: 199 91 91; --accent-ink: 255 255 255; }
```

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
- `src/accents/*.css` — hue presets (`ember`, `iris`, `jade`)
- `src/components/*` — `Glass`, `Button`, `Sheet`, `TabBar`, `Field`
