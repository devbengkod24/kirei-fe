import React from "react";

export function BrandLogo({ size = 38 }: { size?: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-full flex items-center justify-center bg-[var(--brand-primary)] text-white shadow-xs"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
        {/* Stylized monogram "b" and "k" */}
        <path
          d="M10 8V22M10 16C10 13.5 12 12 14.5 12C17 12 18.5 13.5 18.5 16C18.5 18.5 17 20 14.5 20C12 20 10 18.5 10 16Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12L15 17M17 15L22 21"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

