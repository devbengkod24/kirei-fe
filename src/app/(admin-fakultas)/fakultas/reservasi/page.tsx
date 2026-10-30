import { redirect } from "next/navigation";
import { ADMIN_FAKULTAS_ROUTES } from "@/modules/admin-fakultas/routes";

export default function Page() {
  redirect(ADMIN_FAKULTAS_ROUTES.reservationApprovals);
}
