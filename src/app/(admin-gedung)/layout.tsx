import { AdminGedungShell } from "@/modules/admin-gedung/AdminGedungShell";

// Each page calls requireRole(["admin_fakultas"]) inside its own Suspense boundary (cacheComponents).
export default function AdminGedungLayout({ children }: { children: React.ReactNode }) {
  return <AdminGedungShell>{children}</AdminGedungShell>;
}
