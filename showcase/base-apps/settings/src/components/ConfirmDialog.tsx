import { useEffect, useRef, type ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  testId?: string;
}

/**
 * Modal confirmation built on the native <dialog> element: showModal() traps focus,
 * makes the rest of the page inert and closes on Escape (reported through onCancel).
 */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  onConfirm,
  onCancel,
  testId = 'confirm-dialog',
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      cancelRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby={`${testId}-title`}
      aria-describedby={`${testId}-body`}
      onClose={() => {
        if (open) onCancel();
      }}
      data-testid={testId}
    >
      <h2 id={`${testId}-title`}>{title}</h2>
      <div id={`${testId}-body`} className="dialog-body">
        {children}
      </div>
      <div className="dialog-actions">
        <button ref={cancelRef} type="button" className="button" onClick={onCancel} data-testid={`${testId}-cancel`}>
          Cancel
        </button>
        <button type="button" className="button button-primary" onClick={onConfirm} data-testid={`${testId}-confirm`}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
