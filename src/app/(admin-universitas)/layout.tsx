import { AdminUniversitasShell } from "@/modules/admin-universitas/AdminUniversitasShell";

// The shell checks the role; pages load their data inside their own Suspense boundary (cacheComponents).
export default function AdminUniversitasLayout({ children }: { children: React.ReactNode }) {
  return <AdminUniversitasShell>{children}</AdminUniversitasShell>;
}
