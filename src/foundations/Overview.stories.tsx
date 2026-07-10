import { useState } from "react";
import { Glass } from "../components/Glass";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { Icon } from "../components/Icon";
import { Chip, ChipGroup } from "../components/Chip";
import { Badge } from "../components/Badge";
import { Avatar } from "../components/Avatar";
import { ProgressBar } from "../components/ProgressBar";
import { Thumbnail } from "../components/Thumbnail";
import { Row } from "../components/Row";
import { SegmentedControl } from "../components/SegmentedControl";
import { WeekStrip } from "../components/WeekStrip";

export default { title: "Foundations / Overview" };

const DAYS = [
  { key: "mon", label: "MON", num: 7 },
  { key: "tue", label: "TUE", num: 8 },
  { key: "wed", label: "WED", num: 9 },
  { key: "thu", label: "THU", num: 10 },
  { key: "fri", label: "FRI", num: 11 },
  { key: "sat", label: "SAT", num: 12 },
  { key: "sun", label: "SUN", num: 13 },
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 12, maxWidth: 440 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--fg-faint)",
        }}
      >
        {label}
      </div>
      {children}
    </section>
  );
}

export const Everything = () => {
  const [chip, setChip] = useState("all");
  const [seg, setSeg] = useState("week");
  const [day, setDay] = useState("thu");

  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 27, fontWeight: 700, letterSpacing: "-0.01em" }}>
          Design system
        </h1>
        <p style={{ margin: "4px 0 0", color: "var(--fg-muted)" }}>
          One glass language, every app. Toggle theme + accent in the toolbar.
        </p>
      </div>

      <Section label="Buttons">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Button>
            <Icon name="plus" /> Track
          </Button>
          <Button variant="glass">Shelf</Button>
          <Button variant="ghost">Cancel</Button>
          <IconButton aria-label="Search">
            <Icon name="search" />
          </IconButton>
          <IconButton aria-label="Settings">
            <Icon name="set" />
          </IconButton>
        </div>
      </Section>

      <Section label="Chips">
        <ChipGroup>
          {["all", "airing", "movies", "rated"].map((c) => (
            <Chip key={c} selected={chip === c} onClick={() => setChip(c)}>
              {c}
            </Chip>
          ))}
        </ChipGroup>
      </Section>

      <Section label="Segmented + week strip">
        <SegmentedControl
          options={[
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
            { value: "all", label: "All" },
          ]}
          value={seg}
          onChange={setSeg}
        />
        <Glass style={{ padding: 12 }}>
          <WeekStrip days={DAYS} active={day} onChange={setDay} />
        </Glass>
      </Section>

      <Section label="Thumbnails">
        <div style={{ display: "flex", gap: 11, overflowX: "auto" }}>
          <Thumbnail title="Frieren" badge="8.9" />
          <Thumbnail title="Vinland Saga" badge="8.7" />
          <Thumbnail title="Monster" badge="9.0" />
        </div>
      </Section>

      <Section label="List rows">
        <Glass style={{ padding: 4 }}>
          <Row
            leading={<Thumbnail title="Frieren" fill={false} />}
            title="Frieren: Beyond Journey's End"
            subtitle={<ProgressBar value={0.7} />}
            trailing={<Badge variant="score">8.9</Badge>}
          />
          <Row
            leading={<Avatar name="Quentin" />}
            title="Quentin Andrieu"
            subtitle="Watching · 42 shows"
            trailing={
              <IconButton aria-label="More">
                <Icon name="chev" />
              </IconButton>
            }
          />
        </Glass>
      </Section>

      <Section label="Badges + progress">
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Badge>NEW</Badge>
          <Badge variant="score">
            <Icon name="star" size={11} filled /> 8.9
          </Badge>
          <Badge variant="accent">Airing</Badge>
        </div>
        <ProgressBar value={0.35} />
        <ProgressBar value={1} done />
      </Section>
    </div>
  );
};
