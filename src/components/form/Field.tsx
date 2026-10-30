import Image from "next/image";

export const INPUT_CLASS =
  "min-h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted hover:border-primary/50 focus-visible:border-primary disabled:bg-page";

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  /** "caps" is the small uppercase label used in detail views. */
  labelStyle?: "plain" | "caps";
  className?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, error, labelStyle = "plain", className = "", children }: FieldProps) {
  const labelClass =
    labelStyle === "caps" ? "text-[10px] tracking-[0.05em] uppercase text-primary" : "text-xs text-primary";

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/** Native select with the caret from Figma. */
export function SelectInput({ className = "", children, ...props }: SelectInputProps) {
  return (
    <div className="relative">
      <select className={`${INPUT_CLASS} appearance-none pr-9 ${className}`} {...props}>
        {children}
      </select>
      <Image
        src="/icons/admin/caret-down.svg"
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
      />
    </div>
  );
}
