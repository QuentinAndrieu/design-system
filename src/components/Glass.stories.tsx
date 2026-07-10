import { Glass } from "./Glass";

export default { title: "Components / Glass" };

export const Surface = () => (
  <Glass style={{ padding: 20, maxWidth: 320 }}>
    <h3 style={{ margin: 0 }}>Frosted surface</h3>
    <p style={{ margin: "6px 0 0", color: "var(--fg-muted)" }}>
      Rim-lit glass floating over the ambient wash.
    </p>
  </Glass>
);
