"use client";

import { useEffect, useId, useRef } from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Buttons row under the content, right-aligned. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Modal built on the native <dialog>: the browser handles the focus trap,
 * Escape and the inert background. Clicking the backdrop also closes it.
 */
export function Dialog({ open, onClose, title, children, footer, className = "" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`m-auto w-[calc(100%-2rem)] max-w-[521px] rounded-xl bg-surface p-0 text-ink backdrop:bg-ink/40 ${className}`}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col gap-6 overflow-y-auto p-[18px]">
        <h2 id={titleId} className="border-b border-border px-6 pb-2 text-center text-xl font-semibold">
          {title}
        </h2>
        <div className="flex flex-col gap-3">{children}</div>
        {footer && <div className="flex flex-wrap items-center justify-end gap-2">{footer}</div>}
      </div>
    </dialog>
  );
}
