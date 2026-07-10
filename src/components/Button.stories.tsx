import { Button } from "./Button";

export default { title: "Components / Button" };

export const Solid = () => <Button>Track anime</Button>;
export const Glass = () => <Button variant="glass">Add to shelf</Button>;
export const Ghost = () => <Button variant="ghost">Cancel</Button>;
export const Disabled = () => <Button disabled>Unavailable</Button>;

export const Row = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <Button>Solid</Button>
    <Button variant="glass">Glass</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);
