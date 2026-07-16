import { ConfigSheet } from "./ConfigSheet";
import { GroupLabel, SettingsGroup } from "..";
import { Row } from "./Row";
import { Switch } from "./Switch";
import { Field } from "./Field";

export default { title: "Components / ConfigSheet" };

export const Studio = () => (
  <div style={{ maxWidth: 440, margin: "0 auto" }}>
    <ConfigSheet
      openLabel="Configure"
      hero={
        <div
          style={{
            aspectRatio: "3 / 4",
            borderRadius: 14,
            background: "rgb(var(--fg) / 0.08)",
            border: "1px solid var(--glass-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--fg-muted)",
          }}
        >
          the artwork
        </div>
      }
    >
      <GroupLabel>Subject</GroupLabel>
      <SettingsGroup>
        <Row title="Name" trailing={<Field defaultValue="Yaris GR" />} />
        <Row title="Foil" trailing={<Switch checked onChange={() => {}} label="Foil" />} />
      </SettingsGroup>
      <div style={{ height: 600 }} />
    </ConfigSheet>
  </div>
);
