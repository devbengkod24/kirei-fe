export type BadgeTone = "primary" | "danger" | "success" | "warning";

export interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}

const TONE_STYLES = {
  primary: "bg-primary-soft text-primary",
  danger: "bg-danger-soft text-danger",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
} as const;

export function Badge({ tone = "primary", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm px-2 py-0.5 text-[11px] font-semibold leading-4 whitespace-nowrap ${TONE_STYLES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
