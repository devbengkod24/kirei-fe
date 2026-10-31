import { ADMIN_UNIVERSITAS_ROUTES } from "@/modules/admin-universitas/routes";
import { TypeTabs } from "@/modules/admin-universitas/TypeTabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold">Kelola Reservasi</h2>
      <TypeTabs basePath={ADMIN_UNIVERSITAS_ROUTES.reservations} />
      {children}
    </div>
  );
}
