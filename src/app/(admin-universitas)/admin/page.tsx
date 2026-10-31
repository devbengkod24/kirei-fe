import { redirect } from "next/navigation";
import { ADMIN_UNIVERSITAS_ROUTES } from "@/modules/admin-universitas/routes";

export default function Page() {
  redirect(ADMIN_UNIVERSITAS_ROUTES.dashboard);
}
