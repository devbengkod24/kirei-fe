"use client";

import React, { useState } from "react";

export interface AvatarProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ src, alt, initials = "U", size = "md", className = "" }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];

  if (src && !imageError) {
    return (
      <div
        className={`relative inline-block rounded-full overflow-hidden border border-[var(--border-subtle)] ${sizeStyles} ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={alt}
      role="img"
      className={`inline-flex items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-secondary)] font-semibold border border-[var(--border-subtle)] ${sizeStyles} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
}

