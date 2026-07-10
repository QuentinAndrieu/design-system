import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Field } from "./Field";

export default { title: "Components / Modal" };

export const Centered = () => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add a title"
      trigger={<Button>New entry</Button>}
      footer={
        <>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Add</Button>
        </>
      }
    >
      <Field label="Title" placeholder="e.g. Frieren" />
    </Modal>
  );
};
