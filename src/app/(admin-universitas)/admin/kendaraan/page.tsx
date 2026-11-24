import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getVehicles } from "@/modules/admin-universitas/vehicles/getVehicles";
import { VehicleManagement } from "@/modules/admin-universitas/vehicles/VehicleManagement";
import { getVehicleReservationOptions } from "@/shared/reservation-form/getReservationOptions";

export const metadata: Metadata = { title: "Kelola Kendaraan" };

export default async function Page() {
  await requireRole(["admin_universitas"]);
  const [vehicles, { bookings, now }] = await Promise.all([getVehicles(), getVehicleReservationOptions()]);
  return <VehicleManagement vehicles={vehicles} bookings={bookings} now={now} />;
}
