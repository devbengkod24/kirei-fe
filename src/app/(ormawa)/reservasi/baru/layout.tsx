import { CreateReservationBreadcrumb } from "@/modules/ormawa/CreateReservationBreadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <CreateReservationBreadcrumb />
      {children}
    </div>
  );
}
