"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { RESERVATION_TYPES } from "@/types/reservation";
import { ADMIN_UNIVERSITAS_ROUTES, internalReservationRoute } from "../routes";

/** Dashboard › Reservasi Internal › tipe, like the borrower's Buat Reservasi; read from the URL so it stays put while a form loads. */
export function InternalReservationBreadcrumb() {
  const pathname = usePathname();
  const tipe = RESERVATION_TYPES.find((type) => pathname === internalReservationRoute(type));

  const items: BreadcrumbItem[] = [
    { label: "Dashboard", href: ADMIN_UNIVERSITAS_ROUTES.dashboard },
    { label: "Reservasi Internal", href: tipe ? ADMIN_UNIVERSITAS_ROUTES.internalReservation : undefined },
  ];
  if (tipe) items.push({ label: RESERVATION_TYPE_LABEL[tipe] });

  return <Breadcrumb items={items} />;
}
