import { useState } from "react";
import { GroupLabel } from "./GroupLabel";
import { SettingsGroup } from "./SettingsGroup";
import { Row } from "./Row";
import { Switch } from "./Switch";
import { SegmentedControl } from "./SegmentedControl";

export default { title: "Components / Settings" };

/** The fleet's More screen shape: labelled groups of rows in a glass card. */
export const MoreScreen = () => {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  return (
    <div style={{ maxWidth: 440 }}>
      <GroupLabel>Settings</GroupLabel>
      <SettingsGroup>
        <Row
          title="Dark theme"
          subtitle="The map keeps its own sea colours"
          trailing={<Switch checked={dark} onChange={() => setDark(!dark)} label="Dark theme" />}
        />
        <Row
          title="Language"
          trailing={
            <SegmentedControl
              size="sm"
              options={[
                { value: "en", label: "EN" },
                { value: "fr", label: "FR" },
              ]}
              value={lang}
              onChange={setLang}
            />
          }
        />
        <Row title="Your stats" subtitle="episodes, days watched, top genres" chevron onClick={() => {}} />
        <Row title="Screen saver" subtitle="needs at least one pack" chevron disabled onClick={() => {}} />
      </SettingsGroup>
    </div>
  );
};
