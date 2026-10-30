import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "primary-outline" | "success-outline" | "danger-outline";
}

const VARIANT_STYLES = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary",
  outline: "border border-border bg-surface text-ink hover:bg-page active:bg-border",
  "primary-outline": "border border-primary bg-surface text-primary hover:bg-primary-soft active:bg-primary-tint",
  "success-outline": "border border-success bg-surface text-success hover:bg-success-soft active:bg-success-soft",
  "danger-outline": "border border-danger-strong bg-surface text-danger-strong hover:bg-danger-soft active:bg-danger-soft",
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", type = "button", children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:opacity-50 disabled:hover:bg-surface ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
