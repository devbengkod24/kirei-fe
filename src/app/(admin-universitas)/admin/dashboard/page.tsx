import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getUniversityDashboard } from "@/modules/admin-universitas/dashboard/getUniversityDashboard";
import { UniversityDashboard } from "@/modules/admin-universitas/dashboard/UniversityDashboard";
import { fakultasScopeFromSearchParams } from "@/shared/fakultas-filter/fakultasScope";
import { getFakultasOptions } from "@/shared/fakultas-filter/getFakultasOptions";

export const metadata: Metadata = { title: "Dashboard Admin Universitas" };

export default async function Page({ searchParams }: PageProps<"/admin/dashboard">) {
  await requireRole(["admin_universitas"]);
  const fakultasOptions = await getFakultasOptions();
  const scope = fakultasScopeFromSearchParams(await searchParams, fakultasOptions);
  const data = await getUniversityDashboard(scope);

  return (
    <UniversityDashboard
      data={data}
      fakultasOptions={fakultasOptions}
      fakultas={fakultasOptions.find((fakultas) => fakultas.id === scope.fakultasId) ?? null}
    />
  );
}
