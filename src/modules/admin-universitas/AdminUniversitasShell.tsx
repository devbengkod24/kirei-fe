import { Suspense } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { requireRole } from "@/lib/auth/requireRole";
import { CurrentUserAvatarPlaceholder } from "@/shared/layout/CurrentUserAvatar";
import { RoleShell } from "@/shared/layout/RoleShell";
import { ADMIN_UNIVERSITAS_NAV } from "./nav";

async function AdminAvatar() {
  const user = await requireRole(["admin_universitas"]);
  return <Avatar src={user.avatarUrl} name={user.name} size={48} />;
}

export function AdminUniversitasShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell
      nav={ADMIN_UNIVERSITAS_NAV}
      headerEnd={
        <Suspense fallback={<CurrentUserAvatarPlaceholder />}>
          <AdminAvatar />
        </Suspense>
      }
    >
      {children}
    </RoleShell>
  );
}
