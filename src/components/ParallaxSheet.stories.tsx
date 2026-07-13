import { ParallaxSheet } from "./ParallaxSheet";

export default { title: "Components / ParallaxSheet" };

/** A fixed-height scroll box stands in for the app shell's scroll container.
 *  Scroll inside it: the artwork stays pinned while the frosted form rises over
 *  it, then the form scrolls internally. Tap the exposed artwork to reset. */
export const Studio = () => (
  <div
    style={{
      height: 560,
      width: 380,
      overflowY: "auto",
      margin: "0 auto",
      border: "1px solid var(--glass-border)",
      borderRadius: 20,
    }}
  >
    <ParallaxSheet
      hero={
        <div style={{ padding: "16px 16px 0" }}>
          <div
            style={{
              aspectRatio: "2 / 3",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 800,
              letterSpacing: "0.1em",
              background:
                "linear-gradient(150deg, var(--accent, #c0392b), #1f2d3d)",
            }}
          >
            ARTWORK
          </div>
        </div>
      }
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            padding: "14px 12px",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div style={{ fontWeight: 700 }}>Config field {i + 1}</div>
          <div style={{ color: "var(--fg-muted)", fontSize: 13 }}>
            The form scrolls under the frosted glass.
          </div>
        </div>
      ))}
    </ParallaxSheet>
  </div>
);
