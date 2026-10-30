"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useId } from "react";

export interface PerPageSelectProps {
  value: number;
  options: readonly number[];
  /** The current search params minus page and page size, kept when the size changes. */
  baseParams: Record<string, string>;
  /** Search param that holds the page size. */
  paramName: string;
}

/** Page size picker. Changing it goes back to page 1 by dropping the page param. */
export function PerPageSelect({ value, options, baseParams, paramName }: PerPageSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const id = useId();

  const onChange = (next: number) => {
    const params = new URLSearchParams(baseParams);
    params.set(paramName, String(next));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-h-11 appearance-none rounded-inner bg-primary-soft py-1 pr-6 pl-2 hover:bg-border"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Image
          src="/icons/chevron-down-small.svg"
          alt=""
          width={16}
          height={16}
          className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2"
        />
      </div>
      <label htmlFor={id}>per halaman</label>
    </div>
  );
}
