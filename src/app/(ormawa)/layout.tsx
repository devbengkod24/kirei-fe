import { OrmawaShell } from "@/modules/ormawa/OrmawaShell";

// Route group for ormawa and dosen (same screens). TODO: role guard once lib/auth has a session.
export default function OrmawaLayout({ children }: { children: React.ReactNode }) {
  return <OrmawaShell>{children}</OrmawaShell>;
}
