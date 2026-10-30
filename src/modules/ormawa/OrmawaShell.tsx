import { Suspense } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { requireRole } from "@/lib/auth/requireRole";
import { CurrentUserAvatarPlaceholder } from "@/shared/layout/CurrentUserAvatar";
import { RoleShell } from "@/shared/layout/RoleShell";
import { ORMAWA_NAV } from "./nav";

// Ormawa and dosen share these screens; other roles are sent back to their own home.
async function BorrowerAvatar() {
  const user = await requireRole(["ormawa", "dosen"]);
  return <Avatar src={user.avatarUrl} name={user.name} size={48} />;
}

export function OrmawaShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell
      nav={ORMAWA_NAV}
      headerEnd={
        <Suspense fallback={<CurrentUserAvatarPlaceholder />}>
          <BorrowerAvatar />
        </Suspense>
      }
    >
      {children}
    </RoleShell>
  );
}
