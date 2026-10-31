"use client";

import { usePathname } from "next/navigation";
import { SegmentedNav } from "@/components/ui/SegmentedNav";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { RESERVATION_TYPES } from "@/types/reservation";

export interface TypeTabsProps {
  /** Path before the [tipe] segment, e.g. "/admin/reservasi". */
  basePath: string;
}

/**
 * Ruangan / Kendaraan / GOR tabs for a page with a [tipe] segment. Switching keeps the rest of
 * the path, so Kelola Reservasi stays on Persetujuan or Riwayat.
 */
export function TypeTabs({ basePath }: TypeTabsProps) {
  const pathname = usePathname();
  const [current, ...rest] = pathname.slice(basePath.length + 1).split("/");
  const suffix = rest.length > 0 ? `/${rest.join("/")}` : "";

  return (
    <SegmentedNav
      label="Jenis fasilitas"
      items={RESERVATION_TYPES.map((tipe) => ({
        label: RESERVATION_TYPE_LABEL[tipe],
        href: `${basePath}/${tipe}${suffix}`,
        active: tipe === current,
      }))}
    />
  );
}
