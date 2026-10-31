import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { UniversityReservations } from "@/modules/admin-universitas/reservations/UniversityReservations";
import { fakultasScopeFromSearchParams } from "@/shared/fakultas-filter/fakultasScope";
import { getFakultasOptions } from "@/shared/fakultas-filter/getFakultasOptions";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { parseReservationTypeParam, reservationTypeParams } from "@/shared/reservation/reservationTypeParam";

export const generateStaticParams = reservationTypeParams;

export async function generateMetadata({ params }: PageProps<"/admin/reservasi/[tipe]/persetujuan">): Promise<Metadata> {
  return { title: `Persetujuan ${RESERVATION_TYPE_LABEL[parseReservationTypeParam((await params).tipe)]}` };
}

export default async function Page({ params, searchParams }: PageProps<"/admin/reservasi/[tipe]/persetujuan">) {
  await requireRole(["admin_universitas"]);
  const tipe = parseReservationTypeParam((await params).tipe);
  const fakultasOptions = await getFakultasOptions();
  const scope = fakultasScopeFromSearchParams(await searchParams, fakultasOptions);

  return <UniversityReservations tipe={tipe} tab="persetujuan" scope={scope} fakultasOptions={fakultasOptions} />;
}
