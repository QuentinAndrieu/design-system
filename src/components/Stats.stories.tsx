import { StatTile, StatGrid } from "./Stat";
import { Donut } from "./Donut";
import { BarChart } from "./BarChart";
import { ProgressRing } from "./ProgressRing";
import { Glass } from "./Glass";

export default { title: "Components / Stats" };

export const Rings = () => (
  <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
    <ProgressRing pct={72} size={58} stroke={4}>
      <span style={{ fontSize: 13, fontWeight: 700 }}>72%</span>
    </ProgressRing>
    <ProgressRing pct={40} size={58} stroke={4} color="rgb(var(--success))" />
    <ProgressRing pct={90} size={58} stroke={4} color="rgb(var(--gold))" />
  </div>
);

export const KPIs = () => (
  <div style={{ maxWidth: 440 }}>
    <StatGrid>
      <StatTile value="128" label="Completed" />
      <StatTile value="42" label="Watching" />
      <StatTile value="7.9" label="Mean score" />
      <StatTile value="19d" label="Time spent" />
    </StatGrid>
  </div>
);

export const StatusDonut = () => (
  <Glass style={{ maxWidth: 440 }}>
    <Donut
      segments={[
        { label: "Watching", value: 42, color: "rgb(var(--accent))" },
        { label: "Completed", value: 128, color: "rgb(var(--success))" },
        { label: "On hold", value: 12, color: "rgb(var(--gold))" },
        { label: "Dropped", value: 6, color: "rgb(var(--danger))" },
      ]}
    />
  </Glass>
);

export const Bars = () => (
  <Glass style={{ maxWidth: 440, padding: "8px 12px" }}>
    <BarChart
      data={[
        { label: "1", value: 4 },
        { label: "2", value: 7 },
        { label: "3", value: 3 },
        { label: "4", value: 9 },
        { label: "5", value: 6 },
        { label: "6", value: 2 },
        { label: "7", value: 5 },
      ]}
    />
  </Glass>
);
