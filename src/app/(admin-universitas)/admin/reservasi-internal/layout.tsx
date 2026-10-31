import { ADMIN_UNIVERSITAS_ROUTES } from "@/modules/admin-universitas/routes";
import { TypeTabs } from "@/modules/admin-universitas/TypeTabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <TypeTabs basePath={ADMIN_UNIVERSITAS_ROUTES.internalReservation} />
      {children}
    </div>
  );
}
