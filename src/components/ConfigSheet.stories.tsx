import { ConfigSheet } from "./ConfigSheet";
import { GroupLabel, SettingsGroup } from "..";
import { Row } from "./Row";
import { Switch } from "./Switch";
import { Field } from "./Field";

export default { title: "Components / ConfigSheet" };

/** The studio shell kurumon/kamishibai wear: artwork owns the viewport, the
 *  sheet rests on the peeking handle. Open it and the handle band collapses to
 *  a compact grabber — the peek height is a rest affordance only. */
export const Fullscreen = () => (
  <ConfigSheet
    variant="fullscreen"
    openLabel="Configure"
    exitLabel="Back"
    onExit={() => {}}
    toolbar={<span style={{ color: "var(--fg-muted)", fontSize: 12 }}>tools</span>}
    hero={
      <div
        style={{
          aspectRatio: "3 / 4",
          height: "100%",
          maxWidth: "100%",
          margin: "0 auto",
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
);

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
