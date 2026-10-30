export interface BadgeProps {
  tone?: "primary" | "danger" | "success" | "neutral";
  /** `md` is the status pill used in tables. */
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

const TONE_STYLES = {
  primary: "bg-primary-soft text-primary",
  danger: "bg-danger-soft text-danger",
  success: "bg-success-soft text-success",
  neutral: "bg-neutral-soft text-muted",
} as const;

const SIZE_STYLES = {
  sm: "rounded-sm px-2 py-0.5 text-[11px] leading-4",
  md: "min-w-[7.5rem] rounded-inner px-3 py-1 text-xs leading-5",
} as const;

export function Badge({ tone = "primary", size = "sm", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center font-semibold whitespace-nowrap ${SIZE_STYLES[size]} ${TONE_STYLES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
