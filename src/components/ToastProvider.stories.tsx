import { Button } from "./Button";
import { ToastProvider, useToast } from "./ToastProvider";

export default { title: "Components / ToastProvider" };

function Demo() {
  const toast = useToast();
  return <Button onClick={() => toast("Backup downloaded")}>Show a toast</Button>;
}

export const Default = () => (
  <ToastProvider>
    <Demo />
  </ToastProvider>
);
