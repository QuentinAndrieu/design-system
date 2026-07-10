import { Skeleton } from "./Skeleton";
import { Empty } from "./Empty";
import { ErrorBox } from "./ErrorBox";
import { Toast } from "./Toast";
import { Button } from "./Button";
import { Icon } from "./Icon";

export default { title: "Components / Feedback" };

export const Skeletons = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 440 }}>
    <div style={{ display: "flex", gap: 11 }}>
      <Skeleton variant="cover" />
      <Skeleton variant="cover" />
      <Skeleton variant="cover" />
    </div>
    <Skeleton variant="line" width="70%" />
    <Skeleton variant="line" width="40%" />
    <Skeleton variant="card" />
  </div>
);

export const EmptyState = () => (
  <div style={{ maxWidth: 440 }}>
    <Empty
      icon={<Icon name="lib" size={34} />}
      text="Nothing on your shelf yet. Search to add your first title."
    >
      <Button variant="glass">Browse</Button>
    </Empty>
  </div>
);

export const Error = () => (
  <div style={{ maxWidth: 440 }}>
    <ErrorBox
      message="The search API is overloaded right now — it usually clears in a moment."
      onRetry={() => {}}
    />
  </div>
);

export const ToastMessage = () => <Toast>Added to your shelf</Toast>;
