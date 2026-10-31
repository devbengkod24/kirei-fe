import { redirect } from "next/navigation";
import { internalReservationRoute } from "@/modules/admin-universitas/routes";

export default function Page() {
  redirect(internalReservationRoute("ruangan"));
}
