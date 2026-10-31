import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getOperatorFloor } from "@/modules/operator/getOperatorFloor";
import { OperatorFloorPage } from "@/modules/operator/OperatorFloorPage";

export const metadata: Metadata = { title: "Ketersediaan Lantai" };

export default async function Page() {
  await requireRole(["operator"]);
  const data = await getOperatorFloor();

  return <OperatorFloorPage data={data} />;
}
