import { InternalReservationBreadcrumb } from "@/modules/admin-universitas/internal-reservation/InternalReservationBreadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <InternalReservationBreadcrumb />
      {children}
    </div>
  );
}
