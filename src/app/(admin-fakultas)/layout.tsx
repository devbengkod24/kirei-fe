import { AdminFakultasShell } from "@/modules/admin-fakultas/AdminFakultasShell";

// Each page calls requireRole(["admin_fakultas"]) inside its own Suspense boundary (cacheComponents).
export default function AdminFakultasLayout({ children }: { children: React.ReactNode }) {
  return <AdminFakultasShell>{children}</AdminFakultasShell>;
}
