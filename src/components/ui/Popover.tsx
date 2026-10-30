"use client";

import { useEffect, useId, useRef } from "react";

export interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Content of the toggle button. */
  trigger: React.ReactNode;
  triggerClassName?: string;
  /** Accessible name of the panel. */
  label: string;
  children: React.ReactNode;
}

/** Button that toggles a panel anchored below it. Closes on Escape and on clicks outside. */
export function Popover({ open, onOpenChange, trigger, triggerClassName = "", label, children }: PopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onOpenChange(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className={triggerClassName}
      >
        {trigger}
      </button>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={label}
          className="absolute top-full right-0 z-30 mt-2 w-[min(310px,calc(100vw-2rem))] rounded-xl border border-border bg-surface p-5 shadow-lg"
        >
          {children}
        </div>
      )}
    </div>
  );
}
