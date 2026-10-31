import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/ComingSoon";
import { ADMIN_UNIVERSITAS_ROUTES } from "@/modules/admin-universitas/routes";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { parseReservationTypeParam, reservationTypeParams } from "@/shared/reservation/reservationTypeParam";
import type { ReservationType } from "@/types/reservation";

export const generateStaticParams = reservationTypeParams;

const title = (tipe: ReservationType) => `Persetujuan ${RESERVATION_TYPE_LABEL[tipe]}`;

export async function generateMetadata({ params }: PageProps<"/admin/reservasi/[tipe]/persetujuan">): Promise<Metadata> {
  return { title: title(parseReservationTypeParam((await params).tipe)) };
}

export default async function Page({ params }: PageProps<"/admin/reservasi/[tipe]/persetujuan">) {
  const tipe = parseReservationTypeParam((await params).tipe);
  return <ComingSoon title={title(tipe)} backHref={ADMIN_UNIVERSITAS_ROUTES.dashboard} backLabel="Kembali ke Dashboard" />;
}
