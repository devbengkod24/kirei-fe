import { redirect } from "next/navigation";
import { reservationsRoute } from "@/modules/admin-universitas/routes";
import { parseReservationTypeParam, reservationTypeParams } from "@/shared/reservation/reservationTypeParam";

export const generateStaticParams = reservationTypeParams;

export default async function Page({ params }: PageProps<"/admin/reservasi/[tipe]">) {
  const tipe = parseReservationTypeParam((await params).tipe);
  redirect(reservationsRoute(tipe, "persetujuan"));
}
