# Code conventions

How this package is written today, and the rule for anything new. Where the existing
code has an exception, it is listed — exceptions are kept because renaming them would
break the apps that pin this package (see *Public API* at the end).

## Files

- **One component family per file**, named after its main component in PascalCase:
  `Button.tsx`, `Chip.tsx` (`Chip` + `ChipGroup`), `Stat.tsx` (`StatTile` + `StatGrid`),
  `Theme.tsx` (`ThemeSelect` + the theme hooks and helpers). A hook-only module is `.ts`
  (`Desktop.ts`).
- **Stories sit beside the component**: `Button.stories.tsx`, titled
  `"Components / Button"`. Small families share one story file (`Inputs`, `Feedback`,
  `Stats`, `Settings`); design foundations live in `src/foundations/`, titled
  `"Foundations / …"`.
- **Internal helpers live in `src/internal/`** (`cx`, `getScrollParent`, `useDismiss`)
  and are never exported from the package. When two components need the same helper, it
  goes there instead of being copied.
- Inside a file: imports → module constants and helpers → the props type → the component it
  types. (A helper that needs one of the file's types sits right after it, as in `TabBar`.)

## Components

- **Function components.** Props are destructured in the signature, with defaults there
  (`variant = "solid"`), never in the body.
- **The props type is named `<Component>Props` and exported** from the component's file:
  an `interface` (`ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>`), or a
  `type` alias when it adds nothing to a native element's attributes
  (`GlassProps = HTMLAttributes<HTMLDivElement>`). Option shapes get their own name too
  (`SegOption`, `DropdownOption`, `Tab`). No anonymous `{ children: ReactNode }` props.
- **`forwardRef` for the thin wrappers over one DOM element that spread native
  attributes** — `Glass`, `Button`, `IconButton`, `Field`, `SearchField` — so a ref
  reaches that element. Each sets `displayName` (the inner arrow is anonymous). Composite
  components don't forward a ref; a component that needs one exposes a named ref prop
  (`AppShell`'s `contentRef`). Exceptions: `Chip` and `Slider` spread native attributes
  without `forwardRef`.
- **`className` is merged, never replaced**: `cx("ds-btn", `ds-btn--${variant}`, className)`
  — the base class first, then modifiers, then the consumer's `className` last, so an
  app's class can always add to the DS look. It lands on the element that receives the
  native attributes (`Field` puts it on the `<input>`), else on the root. Exception:
  `SearchField` spreads native attributes onto its `<input>` but puts `className` on the pill.
- **Native defaults are made safe**: a `<button>` gets `type="button"` (or the caller's
  `type`), so it never submits a surrounding form by accident. Older ones without it, left
  as they render today: `Row`, `Thumbnail`, `TabBar`, `WeekStrip` and `ErrorBox`'s retry.
- **Controlled values**: `value` (`active` for navigation: `TabBar`, `WeekStrip`) +
  `onChange` called with a plain value — never an event (`Switch`, `SegmentedControl`,
  `Dropdown`, `Rating`). When the props extend a native element whose `onChange` takes an
  event, the value callback is `onValueChange` (`SearchField`); `Slider`, a styled native
  range input, keeps the native `onChange`.
- **State is styled through ARIA first**: `aria-pressed`, `aria-selected`, `aria-checked`,
  `:disabled`. When no ARIA attribute fits, a boolean data attribute rendered as
  `data-active={active || undefined}` (absent when false). Data attributes an app sets on
  its own markup are public (`data-cs-hide`, `data-no-collapse`).
- **No module-level React context**: the bundle is evaluated by server components, and a
  top-level `createContext` crashes the react-server condition. Shared state is a module
  store read with `useSyncExternalStore` (`toast()`, `createThemeStore`, `useDesktop`).
- **No colourful emoji, no icon library**: glyphs come from `Icon`'s hand-drawn set.

## CSS

All component CSS is in `src/styles/components.css`; tokens are in `src/styles/tokens.css`.

**What the code does today** — BEM, with a few older shapes:

- Block: `ds-<component>` — `ds-btn`, `ds-seg`, `ds-multiselect`, `ds-apphead`. Names are
  lowercase, one word, and may be short (`btn`, `ic`, `seg`, `ftog`, `pbar`, `skel`).
- Part: `ds-<block>__<part>` — `ds-row__title`, `ds-modal__foot`.
- Variant or state fixed at render: `ds-<block>--<modifier>` — `ds-btn--outline`,
  `ds-seg--sm`, `ds-configsheet--docked`.
- Older shapes, kept because apps target them: single-hyphen parts (`ds-shell-content`,
  `ds-tab-glyph`, `ds-tab-badge--count`, `ds-parallax-sheet`, `ds-cs-*` for ConfigSheet,
  `ds-sheet-row`), plural containers (`ds-chips`, `ds-kpis`, `ds-bars`, `ds-barx`,
  `ds-dleg`), and bare children styled by tag (`.ds-kpi b`, `.ds-day span`, `.ds-pbar > i`,
  `.ds-seg button`).

**Rule for new code**: `ds-<block>`, `ds-<block>__<part>`, `ds-<block>--<modifier>`;
give every styled child a part class rather than styling it by tag; state from ARIA or a
`data-*` attribute, not a class toggled in JS.

- **Every value comes from a token** (`rgb(var(--fg) / 0.08)`, `var(--radius-md)`,
  `var(--ctl-h)`); a literal is fine for a one-off geometry (a 38px icon button).
- **Order matters in three places** (stated at the top of `components.css`): the
  zero-specificity disabled baseline first, the control surface after the button and
  chip it re-skins, the flat disabled look last. New sections go before the last one.
- Each component is one section headed `/* ================= name ================= */`;
  sub-sections use `/* ---------- name ---------- */`.

## Tokens

- **Global tokens live in `tokens.css`**: structural colours as RGB triplets (`--fg: 232 234 240`,
  so `rgb(var(--fg) / 0.5)` and Tailwind's `/40` work), pre-composed colours as `rgba()`
  (`--fg-muted`, `--glass-bg`), each defined for dark (`:root, [data-theme="dark"]`) and
  light (`[data-theme="light"]`); theme-independent scales (radius, motion, z-index, fonts,
  `--disabled`) in the last `:root` block.
- **The accent is a slot**, never a hue in `tokens.css`: `src/accents/<colour>.css` fills
  `--accent`, `--accent-2`, `--accent-focus`, `--accent-ink`, `--accent-wash`,
  `--accent-grad` for both themes. Presets are named by colour, never by app.
- **A component's own knob is `--ds-<block>-<name>`**, declared in its section of
  `components.css` (`--ds-shell-max`, `--ds-rail-w`, `--ds-cs-p`). Older un-prefixed ones
  stay as they are (`--tabbar-clearance`, `--app-viewport-h`, `--fill`).
- A token apps should reach from Tailwind is also added to `tailwind-preset.js` — which
  only ever *adds* names, never overrides Tailwind's own scales.

## Comments

- **Say why, not what.** A comment records the reason, the trap or the decision
  (`/* Last in the file on purpose — same-specificity ties go to it. */`), not a
  paraphrase of the next line.
- **Date a decision with the version that made it**: `(0.23.0)`. That is how the history
  is traced; keep the tag when you edit the rule.
- **Every exported component, prop and type gets a `/** … */` doc comment** unless its
  name says it all — they ship in `dist/index.d.ts`, so they are the hover docs in the apps.
- When the code changes, fix the comment in the same commit. A stale comment is a bug.
- The package is app-agnostic: no API, class or token names a consumer app. Comments may
  cite an app as the reason for a rule.

## Exports

- **Everything public goes through `src/index.ts`**, grouped by kind (surfaces, actions,
  data display, layout, navigation, inputs, overlays, feedback, stats). Each component's
  value export is followed by its type export: `export { Chip, ChipGroup } …` then
  `export type { ChipProps } …`.
- **The public API is everything a consumer can name**: the barrel's exports, every prop,
  every `ds-*` class, every CSS custom property, the Tailwind preset's keys and the
  `exports` map in `package.json`. Apps pin this package by git commit, so renaming or
  removing any of these is a breaking change — add alongside instead, and note the
  version in the comment.
