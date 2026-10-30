import React from "react";

export interface AccountStatusAlertProps {
  isBlocked: boolean;
  blockedUntil?: string;
  reason?: string;
}

export function AccountStatusAlert({
  isBlocked,
  blockedUntil = "28 April",
}: AccountStatusAlertProps) {
  if (!isBlocked) {
    return null;
  }

  return (
    <div
      role="alert"
      className="rounded-[var(--radius-lg)] bg-[var(--alert-danger-bg)] border border-[var(--alert-danger-border)] p-4 shadow-xs"
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-0.5 text-[var(--alert-danger-text)]" aria-hidden="true">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-[var(--alert-danger-text)] leading-tight">
            Akun Anda telah diblokir sementara!
          </h4>
          <p className="mt-1 text-xs text-[#7F1D1D] leading-normal">
            Tidak dapat melakukan reservasi hingga{" "}
            <span className="font-bold">{blockedUntil}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

