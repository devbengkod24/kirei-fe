"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { RESERVATION_TYPES } from "@/types/reservation";
import { ORMAWA_ROUTES } from "./routes";

/** Dashboard › Buat Reservasi › tipe, read from the URL so it stays put while a form page loads. */
export function CreateReservationBreadcrumb() {
  const pathname = usePathname();
  const tipe = RESERVATION_TYPES.find((type) => pathname === `${ORMAWA_ROUTES.createReservation}/${type}`);

  const items: BreadcrumbItem[] = [
    { label: "Dashboard", href: ORMAWA_ROUTES.dashboard },
    { label: "Buat Reservasi", href: tipe ? ORMAWA_ROUTES.createReservation : undefined },
  ];
  if (tipe) items.push({ label: RESERVATION_TYPE_LABEL[tipe] });

  return <Breadcrumb items={items} />;
}
