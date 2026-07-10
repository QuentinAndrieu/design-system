import type { GlobalProvider } from "@ladle/react";
import "../src/styles/index.css";
// Docs run on the NEUTRAL default accent so the system reads as brand-agnostic.
// Uncomment one line to preview an accent (dev-only — never published).
// import "../src/accents/iris.css";
// import "../src/accents/ember.css";
// import "../src/accents/jade.css";

// Wire Ladle's built-in light/dark toggle to our [data-theme] tokens, and paint
// the ambient wash behind every story so the glass has something to refract.
export const Provider: GlobalProvider = ({ children, globalState }) => (
  <div
    data-theme={globalState.theme === "light" ? "light" : "dark"}
    style={{
      minHeight: "100vh",
      padding: 32,
      background: "rgb(var(--bg))",
      color: "rgb(var(--fg))",
      fontFamily: "var(--font-sans)",
    }}
  >
    <div className="ds-wash" />
    {children}
  </div>
);
