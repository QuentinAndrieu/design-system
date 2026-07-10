/* =============================================================================
   @quentinandrieu/design-system — Tailwind preset (token bridge)
   -----------------------------------------------------------------------------
   Maps the design-system's CSS-variable tokens onto Tailwind's theme so a
   consuming app writes utilities against the DS vocabulary:

       import dsPreset from "@quentinandrieu/design-system/tailwind-preset";
       export default { presets: [dsPreset], content: [...] };

       <div className="bg-raised text-fg rounded-pill shadow-glass">
       <span className="text-fg-muted">…</span>
       <button className="bg-accent text-accent-ink rounded-pill">

   This bridges TOKENS only — the components still ship as compiled CSS
   (`@quentinandrieu/design-system/styles.css`), so a `<Button>` looks identical
   in every app regardless of that app's own Tailwind theme.

   ADDITIVE-ONLY: the preset never overrides Tailwind's built-in scales (radius,
   fonts, durations) — it only ADDS names (accent, fg, bg/raised, shadow-glass,
   rounded-pill, z-tabbar, …). So it drops onto an existing Tailwind app without
   resizing its `rounded-*` corners or changing its fonts.

   The token VALUES live in tokens.css (imported via styles.css) and flip with
   the theme; this preset just references the variables. Structural colors are
   RGB channel triplets, so the `<alpha-value>` slot keeps `bg-accent/40` etc.
   working; pre-composed rgba tokens (fg-muted, glass, wash) are referenced
   directly and ignore the alpha modifier by design.
   ========================================================================== */

/** @type {import("tailwindcss").Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        // surfaces & ink
        bg: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          raised: "rgb(var(--bg-raised) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "var(--fg-muted)",
          faint: "var(--fg-faint)",
        },
        // brand accent (filled by accents/*.css; neutral slate by default)
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          2: "rgb(var(--accent-2) / <alpha-value>)",
          focus: "rgb(var(--accent-focus) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
          wash: "var(--accent-wash)",
        },
        // semantic status
        success: "rgb(var(--success) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        // glass fills / borders. NO bare `glass` key on purpose — it would
        // collide with `boxShadow.glass` (Tailwind would emit `shadow-glass`
        // as both a box-shadow and a shadow-color). The full glass MATERIAL
        // (fill + blur + rim) comes from the `.ds-glass` class / <Glass>, not a
        // bare `bg-glass`; these nested keys are for one-off frosted fills.
        glass: {
          panel: "var(--glass-panel-bg)",
          sheet: "var(--glass-sheet-bg)",
          border: "var(--glass-border)",
        },
        scrim: "var(--scrim-bg)",
      },
      // Only `pill` — the DS deliberately does NOT override Tailwind's built-in
      // sm/md/lg/xl radius scale, so dropping this preset onto an existing
      // Tailwind app never resizes its rounded-* corners. (DS components carry
      // their own radii internally.) Same reasoning: no fontFamily or
      // transitionDuration overrides — the preset is purely additive. Apps that
      // want a DS radius on their own element use `rounded-[var(--radius-lg)]`.
      borderRadius: {
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
      },
      backgroundImage: {
        "accent-grad": "var(--accent-grad)",
      },
      transitionTimingFunction: {
        glass: "var(--ease)",
      },
      zIndex: {
        tabbar: "var(--z-tabbar)",
        scrim: "var(--z-scrim)",
        sheet: "var(--z-sheet)",
      },
    },
  },
};

export default preset;
