import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger-outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px]";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs rounded-[var(--radius-sm)]",
      md: "px-4 py-2 text-sm rounded-[var(--radius-md)]",
      lg: "px-6 py-3 text-base rounded-[var(--radius-lg)]",
    }[size];

    const variantStyles = {
      primary:
        "bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)] hover:bg-[var(--brand-primary-hover)] active:bg-[var(--brand-primary-active)]",
      outline:
        "border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]",
      "danger-outline":
        "border border-[#F87171] bg-[var(--surface-card)] text-[#DC2626] hover:bg-[#FEF2F2] active:bg-[#FEE2E2]",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]",
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

