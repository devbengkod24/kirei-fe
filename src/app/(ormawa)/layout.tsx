import { OrmawaShell } from "@/modules/ormawa/OrmawaShell";

// Route group for ormawa and dosen (same screens). OrmawaShell checks the role.
export default function OrmawaLayout({ children }: { children: React.ReactNode }) {
  return <OrmawaShell>{children}</OrmawaShell>;
}
