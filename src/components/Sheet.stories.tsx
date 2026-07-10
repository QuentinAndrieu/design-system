import { useState } from "react";
import { Sheet } from "./Sheet";
import { Button } from "./Button";

export default { title: "Components / Sheet" };

export const Bottom = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      title="Rate this"
      trigger={<Button>Open sheet</Button>}
    >
      <p style={{ color: "var(--fg-muted)", margin: 0 }}>
        Radix handles the focus trap, Escape, and scroll-lock. We only paint the
        glass.
      </p>
    </Sheet>
  );
};
