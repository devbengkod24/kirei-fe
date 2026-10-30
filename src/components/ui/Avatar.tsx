"use client";

import { useState } from "react";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function Avatar({ src, name, size = 48, className = "" }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const dimension = { width: size, height: size };

  if (src && !imageFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- avatar URLs come from the API, not a known host
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        style={dimension}
        className={`shrink-0 rounded-full object-cover ${className}`}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={name}
      style={{ ...dimension, fontSize: Math.round(size * 0.3) }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary ${className}`}
    >
      {initialsOf(name)}
    </span>
  );
}
