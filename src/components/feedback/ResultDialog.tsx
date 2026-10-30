"use client";

import Image from "next/image";
import { useId } from "react";
import { useModalDialog } from "@/hooks/useModalDialog";

export interface ResultDialogProps {
  open: boolean;
  onClose: () => void;
  tone: "success" | "failure";
  title: string;
  children: React.ReactNode;
  /** Label of the single acknowledge button. */
  actionLabel?: string;
}

/** Centered outcome message with one button, used after an action finishes. */
export function ResultDialog({ open, onClose, tone, title, children, actionLabel = "OK" }: ResultDialogProps) {
  const ref = useModalDialog(open, onClose);
  const titleId = useId();
  const bodyId = useId();

  return (
    <dialog
      ref={ref}
      role={tone === "failure" ? "alertdialog" : "dialog"}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      className="m-auto w-[min(21.75rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface p-0 text-ink backdrop:bg-ink/40"
    >
      <div className="flex flex-col items-center gap-2 p-4 text-center">
        <Image src={tone === "success" ? "/icons/result-success.svg" : "/icons/result-failure.svg"} alt="" width={32} height={32} />
        <h2 id={titleId} className="border-b border-border px-6 pb-2 text-base font-semibold">
          {title}
        </h2>
        <div id={bodyId} className="p-2 text-[13px] leading-[18px]">
          {children}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 min-w-16 rounded-inner bg-primary px-4 text-sm text-on-primary hover:bg-primary-hover active:bg-primary"
        >
          {actionLabel}
        </button>
      </div>
    </dialog>
  );
}
