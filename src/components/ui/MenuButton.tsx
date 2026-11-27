"use client";

import { useState } from "react";
import { MaskIcon } from "./MaskIcon";
import { Popover } from "./Popover";

export interface MenuOption {
  key: string;
  label: string;
  /** Short line under the label, e.g. what the file contains. */
  hint: string;
  onSelect: () => void;
}

export interface MenuButtonProps {
  label: string;
  /** Accessible name of the menu panel. */
  menuLabel: string;
  options: MenuOption[];
  disabled?: boolean;
  className?: string;
}

/**
 * Primary button with a chevron that opens a list of choices, each with a hint under it.
 * Used for "Import Jadwal" (PDF or CSV) and the report download (PDF or Excel).
 */
export function MenuButton({ label, menuLabel, options, disabled = false, className = "" }: MenuButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <Popover
        open={open}
        onOpenChange={setOpen}
        label={menuLabel}
        disabled={disabled}
        triggerClassName="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:hover:bg-primary"
        trigger={
          <>
            {label}
            <MaskIcon src="/icons/chevron-down-small.svg" size={16} className={open ? "rotate-180" : ""} />
          </>
        }
      >
        <ul className="-m-3 flex flex-col gap-1">
          {options.map((option) => (
            <li key={option.key}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  option.onSelect();
                }}
                className="flex min-h-11 w-full flex-col items-start rounded-md px-3 py-2 text-left hover:bg-primary-soft"
              >
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-[11px] text-muted">{option.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}
