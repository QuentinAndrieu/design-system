import { AppHeader } from "./AppHeader";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";

export default { title: "Components / AppHeader" };

export const Latin = () => (
  <div style={{ maxWidth: 440 }}>
    <AppHeader label="miru" title="Shelf" />
  </div>
);

export const Japanese = () => (
  <div style={{ maxWidth: 440 }}>
    <AppHeader label="風土記" lang="ja" title="Provinces" />
  </div>
);

export const WithArt = () => (
  <div style={{ maxWidth: 440 }}>
    <AppHeader
      label="日本語"
      lang="ja"
      title="Library"
      art={
        <svg viewBox="0 0 60 60" aria-hidden>
          <rect x="8" y="14" width="6" height="40" fill="var(--fg-faint)" />
          <rect x="46" y="14" width="6" height="40" fill="var(--fg-faint)" />
          <rect x="2" y="8" width="56" height="7" rx="2" fill="rgb(var(--accent))" />
          <rect x="8" y="24" width="44" height="5" fill="var(--fg-faint)" />
        </svg>
      }
    />
  </div>
);

export const WithActions = () => (
  <div style={{ maxWidth: 440 }}>
    <AppHeader
      label="kurumon"
      title="Library"
      actions={
        <IconButton aria-label="Add">
          <Icon name="plus" />
        </IconButton>
      }
    />
  </div>
);
