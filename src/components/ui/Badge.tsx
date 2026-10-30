import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "info" | "danger" | "warning" | "neutral";
  children: React.ReactNode;
}

export function Badge({ variant = "neutral", className = "", children, ...props }: BadgeProps) {
  const variantStyles = {
    info: "bg-[var(--badge-info-bg)] text-[var(--badge-info-text)] border border-[#BAE6FD]",
    danger: "bg-[var(--badge-notice-bg)] text-[var(--badge-notice-text)] border border-[#FECACA]",
    warning: "bg-[var(--alert-warning-bg)] text-[var(--alert-warning-text)] border border-[var(--alert-warning-border)]",
    neutral: "bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[var(--radius-full)] text-xs font-medium tracking-wide ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

