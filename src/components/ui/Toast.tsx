"use client";

import { useEffect, useRef } from "react";

export interface ToastProps {
  /** Empty hides the toast. */
  message: string;
  onDismiss: () => void;
  /** How long the toast stays before it closes itself. */
  durationMs?: number;
}

/**
 * Success message in the bottom-right corner that closes itself. The status region stays mounted
 * so screen readers announce each new message.
 */
export function Toast({ message, onDismiss, durationMs = 4000 }: ToastProps) {
  const dismissRef = useRef(onDismiss);
  useEffect(() => {
    dismissRef.current = onDismiss;
  });

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => dismissRef.current(), durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs]);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 left-4 z-50 flex justify-end sm:left-auto">
      <div
        className={
          message
            ? "pointer-events-auto flex max-w-sm items-center gap-3 rounded-md border border-border bg-surface py-2 pr-2 pl-4 shadow-lg"
            : "sr-only"
        }
      >
        {message && (
          <span aria-hidden="true" className="text-success">
            ✓
          </span>
        )}
        <p role="status" className="min-w-0 flex-1 text-sm text-ink">
          {message}
        </p>
        {message && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Tutup notifikasi"
            className="flex size-11 shrink-0 items-center justify-center rounded-md text-muted hover:bg-page hover:text-ink"
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
    </div>
  );
}
