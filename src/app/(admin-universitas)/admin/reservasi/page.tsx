import { redirect } from "next/navigation";
import { reservationsRoute } from "@/modules/admin-universitas/routes";

export default function Page() {
  redirect(reservationsRoute("ruangan"));
}
