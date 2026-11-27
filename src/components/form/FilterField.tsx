import { INPUT_CLASS } from "./Field";

/** Select inside a FilterField: borderless, with small blue text. Pass it to `SelectInput`. */
export const FILTER_SELECT_CLASS = "min-h-10 border-0 py-1 text-xs font-medium text-primary";

/** Date or text input inside a FilterField, styled like the filter select. */
export const FILTER_INPUT_CLASS = `${INPUT_CLASS} ${FILTER_SELECT_CLASS}`;

export interface FilterFieldProps {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Page filter box: the label on the left and the control on the right, inside one bordered box.
 * Used by Kelola Ruangan, Kelola Jadwal, and Reservasi Internal so their filters look the same.
 */
export function FilterField({
  label,
  htmlFor,
  className = "",
  children,
}: FilterFieldProps) {
  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border px-3 py-1 sm:max-w-[233px] ${className}`}
    >
      <label htmlFor={htmlFor} className="shrink-0 text-xs">
        {label}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
