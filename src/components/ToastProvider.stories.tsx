import { Button } from "./Button";
import { Toaster, toast } from "./ToastProvider";

export default { title: "Components / Toaster" };

export const Default = () => (
  <>
    <Button onClick={() => toast("Backup downloaded")}>Show a toast</Button>
    <Toaster />
  </>
);
