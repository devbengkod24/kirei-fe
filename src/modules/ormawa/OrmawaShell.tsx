import { Suspense } from "react";
import { PageSkeleton } from "@/components/feedback/PageSkeleton";
import { Avatar } from "@/components/ui/Avatar";
import { requireRole } from "@/lib/auth/requireRole";
import { CurrentUserAvatarPlaceholder } from "@/shared/layout/CurrentUserAvatar";
import { RoleShell } from "@/shared/layout/RoleShell";
import { hasDrafts } from "./borrowerBooking";
import { DOSEN_NAV, ORMAWA_NAV } from "./nav";

// Ormawa and dosen share these screens; other roles are sent back to their own home.
async function BorrowerShell({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["ormawa", "dosen"]);
  return (
    <RoleShell nav={hasDrafts(user.role) ? ORMAWA_NAV : DOSEN_NAV} headerEnd={<Avatar src={user.avatarUrl} name={user.name} size={48} />}>
      {children}
    </RoleShell>
  );
}

/** The menu depends on the role (dosen have no drafts), so the shell waits for the user inside Suspense. */
export function OrmawaShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <RoleShell nav={DOSEN_NAV} headerEnd={<CurrentUserAvatarPlaceholder />}>
          <PageSkeleton label="Memuat halaman..." />
        </RoleShell>
      }
    >
      <BorrowerShell>{children}</BorrowerShell>
    </Suspense>
  );
}
