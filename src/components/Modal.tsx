import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  /** Footer actions (buttons). Omit for a plain panel. */
  footer?: ReactNode;
  /**
   * When set, the body + footer render inside a `<form>` and Enter (or a
   * `type="submit"` footer button) calls this — `preventDefault` is handled.
   * Lets a short dialog submit without reaching for the mouse.
   */
  onSubmit?: () => void;
}

/**
 * Centered dialog (ported from kurumon) — the counterpart to the bottom Sheet,
 * for short forms and confirmations. Built on Radix Dialog for focus + Escape.
 */
export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  children,
  footer,
  onSubmit,
}: ModalProps) {
  const body = (
    <>
      <div className="ds-modal__body">{children}</div>
      {footer ? <div className="ds-modal__foot">{footer}</div> : null}
    </>
  );
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="ds-scrim" />
        <Dialog.Content className="ds-modal">
          <div className="ds-modal__head">
            <Dialog.Title className="ds-modal__title">{title}</Dialog.Title>
          </div>
          {onSubmit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              {body}
            </form>
          ) : (
            body
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
