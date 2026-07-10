import { Row } from "./Row";
import { Glass } from "./Glass";
import { Thumbnail } from "./Thumbnail";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";

export default { title: "Components / Row" };

export const List = () => (
  <Glass style={{ padding: 4, maxWidth: 440 }}>
    <Row
      leading={<Thumbnail title="Frieren" />}
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
);
