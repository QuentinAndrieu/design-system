import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export interface SheetProps {
  /** Controlled open state. Omit to let the trigger manage it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Optional element that opens the sheet (rendered via Radix `asChild`). */
  trigger?: ReactNode;
  /** Visible heading. If omitted, a screen-reader-only title is used for a11y. */
  title?: ReactNode;
  children: ReactNode;
}

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

/**
 * Bottom sheet built on Radix Dialog — focus trap, Escape, and scroll-lock come
 * for free; we only paint the glass on top.
 */
export function Sheet({
  open,
  onOpenChange,
  trigger,
  title,
  children,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="ds-scrim" />
        <Dialog.Content className="ds-sheet">
          <div className="ds-sheet__grip" />
          {title ? (
            <Dialog.Title
              style={{ margin: "0 0 12px", fontSize: 19, fontWeight: 700 }}
            >
              {title}
            </Dialog.Title>
          ) : (
            <Dialog.Title style={srOnly}>Sheet</Dialog.Title>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
