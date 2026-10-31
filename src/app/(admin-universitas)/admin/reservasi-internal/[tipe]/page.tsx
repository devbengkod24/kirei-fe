import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { InternalReservationForm } from "@/modules/admin-universitas/internal-reservation/InternalReservationForm";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { parseReservationTypeParam, reservationTypeParams } from "@/shared/reservation/reservationTypeParam";

export const generateStaticParams = reservationTypeParams;

export async function generateMetadata({ params }: PageProps<"/admin/reservasi-internal/[tipe]">): Promise<Metadata> {
  return { title: `Reservasi Internal ${RESERVATION_TYPE_LABEL[parseReservationTypeParam((await params).tipe)]}` };
}

export default async function Page({ params }: PageProps<"/admin/reservasi-internal/[tipe]">) {
  const user = await requireRole(["admin_universitas"]);
  const tipe = parseReservationTypeParam((await params).tipe);

  return <InternalReservationForm tipe={tipe} requesterName={user.name} />;
}
