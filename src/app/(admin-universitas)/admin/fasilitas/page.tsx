import { redirect } from "next/navigation";
import { facilitiesRoute } from "@/modules/admin-universitas/routes";

export default function Page() {
  redirect(facilitiesRoute("ruangan"));
}
