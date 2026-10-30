"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a native <dialog> from React state: `open` shows it as a modal, and Escape asks the
 * parent to close it through `onClose` instead of closing it behind React's back.
 */
export function useModalDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Escape fires `cancel`. In testing the native `close` event did not always follow it,
  // so the parent state is updated from here and the dialog closes through `open`.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  return ref;
}
