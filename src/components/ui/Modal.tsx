"use client";

import { useId } from "react";
import { useModalDialog } from "@/hooks/useModalDialog";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Buttons row under the content, right-aligned. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Controlled modal on the native <dialog>: focus stays inside, Escape closes it, and the
 * opener gets focus back on close. Clicking the backdrop closes it too.
 */
export function Modal({ open, onClose, title, children, footer, className = "" }: ModalProps) {
  const ref = useModalDialog(open, onClose);
  const titleId = useId();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[min(29rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface p-0 text-ink backdrop:bg-ink/40 ${className}`}
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2 border-b border-border pb-3">
          <h2 id={titleId} className="pt-2 text-xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="-mr-2 flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-primary-soft active:bg-border"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
        {footer && <div className="flex flex-wrap items-center justify-end gap-2">{footer}</div>}
      </div>
    </dialog>
  );
}
