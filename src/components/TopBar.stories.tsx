import { TopBar } from "./TopBar";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";

export default { title: "Components / TopBar" };

export const WithBack = () => (
  <TopBar
    title="Frieren"
    subtitle="Episode 12"
    onBack={() => {}}
    actions={
      <IconButton aria-label="Share">
        <Icon name="share" />
      </IconButton>
    }
  />
);

export const TitleOnly = () => (
  <TopBar
    title="Discover"
    actions={
      <>
        <IconButton aria-label="Search">
          <Icon name="search" />
        </IconButton>
        <IconButton aria-label="Settings">
          <Icon name="set" />
        </IconButton>
      </>
    }
  />
);
