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
