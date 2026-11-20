import { redirect } from "next/navigation";
import { ADMIN_GEDUNG_ROUTES } from "@/modules/admin-gedung/routes";

export default function Page() {
  redirect(ADMIN_GEDUNG_ROUTES.reservationApprovals);
}
