import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger-outline";
}

const VARIANT_STYLES = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  outline: "border border-border bg-surface text-ink hover:bg-page",
  "danger-outline": "border border-danger-strong bg-surface text-danger-strong hover:bg-danger-soft",
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
