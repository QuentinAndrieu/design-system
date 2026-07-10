import { Glass } from "../components/Glass";

export default { title: "Foundations / Glass materials" };

export const Layers = () => (
  <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
    <Glass style={{ padding: 18 }}>
      <strong>ds-glass</strong> · rim-lit surface, standard blur
    </Glass>
    <div
      className="ds-glass"
      style={{ padding: 18, backdropFilter: "var(--glass-panel-filter)" }}
    >
      <strong>panel filter</strong> · heavier blur for modals
    </div>
  </div>
);
