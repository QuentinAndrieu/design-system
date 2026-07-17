import { useState } from "react";
import { GroupLabel } from "./GroupLabel";
import { SettingsGroup } from "./SettingsGroup";
import { Row } from "./Row";
import { ThemeSelect, useResolvedTheme, useThemeEffect, type ThemePref } from "./Theme";

export default { title: "Components / Theme" };

/** The Theme row every app's More screen carries. Live — it themes Ladle itself. */
export const ThemeRow = () => {
  const [pref, setPref] = useState<ThemePref>("auto");
  useThemeEffect(pref);
  const resolved = useResolvedTheme();
  return (
    <div style={{ maxWidth: 440 }}>
      <GroupLabel>Settings</GroupLabel>
      <SettingsGroup>
        <Row
          title="Theme"
          subtitle={pref === "auto" ? `following the OS — currently ${resolved}` : undefined}
          trailing={<ThemeSelect value={pref} onChange={setPref} />}
        />
      </SettingsGroup>
    </div>
  );
};

/** Localised labels — kurumon reads French. */
export const Localised = () => {
  const [pref, setPref] = useState<ThemePref>("dark");
  return (
    <div style={{ maxWidth: 440 }}>
      <GroupLabel>Réglages</GroupLabel>
      <SettingsGroup>
        <Row
          title="Thème"
          trailing={
            <ThemeSelect
              value={pref}
              onChange={setPref}
              labels={{ auto: "Auto", dark: "Sombre", light: "Clair" }}
            />
          }
        />
      </SettingsGroup>
    </div>
  );
};
