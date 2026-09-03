import { useState } from "react";
import { AppShell } from "./AppShell";
import { AppHeader } from "./AppHeader";
import { TabBar } from "./TabBar";
import { Icon } from "./Icon";
import { Glass } from "./Glass";

export default { title: "Components / AppShell" };

const TABS = [
  { id: "dex", label: "Dex", icon: <Icon name="dex" /> },
  { id: "progress", label: "Progress", icon: <Icon name="trophy" /> },
  { id: "more", label: "More", icon: <Icon name="grid" /> },
];

/** The desktop layout: `rail` docks the SAME tab bar as a vertical rail on the
 *  left once the viewport is 900px wide, and widens a constrained shell to
 *  --ds-shell-max-wide. Narrow the preview below 900px and it is the phone
 *  shell again — floating capsule, phone column. One nav element, two layouts. */
export const Rail = () => {
  const [active, setActive] = useState("dex");
  return (
    <AppShell
      rail
      scroll="page"
      width="constrained"
      appHeader={<AppHeader label="kurudex" title="Dex" />}
      bottomBar={<TabBar tabs={TABS} active={active} onChange={setActive} />}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        {Array.from({ length: 18 }, (_, i) => (
          <Glass key={i} style={{ aspectRatio: "3 / 4", padding: 12, color: "var(--fg-muted)", fontSize: 12 }}>
            No. {String(i + 1).padStart(3, "0")}
          </Glass>
        ))}
      </div>
    </AppShell>
  );
};
