"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useTransition } from "react";
import { SelectInput } from "@/components/form/Field";
import type { Fakultas } from "@/types/fakultas";
import { FAKULTAS_PARAM } from "./fakultasScope";

export interface FakultasFilterProps {
  options: Fakultas[];
  /** Current faculty id from the URL, or null for all faculties. */
  value: string | null;
}

/** Faculty filter kept in the URL (`?fakultas=`), so the page and its links share it. */
export function FakultasFilter({ options, value }: FakultasFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const id = useId();

  const change = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set(FAKULTAS_PARAM, next);
    else params.delete(FAKULTAS_PARAM);
    // A different faculty has different pages of results.
    params.delete("halaman");
    const query = params.toString();
    startTransition(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }));
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-xs whitespace-nowrap text-primary">
        Fakultas
      </label>
      <SelectInput
        id={id}
        value={value ?? ""}
        onChange={(event) => change(event.target.value)}
        aria-busy={pending || undefined}
        className="min-w-48 text-xs"
      >
        <option value="">Semua fakultas</option>
        {options.map((fakultas) => (
          <option key={fakultas.id} value={fakultas.id}>
            {fakultas.name}
          </option>
        ))}
      </SelectInput>
    </div>
  );
}
