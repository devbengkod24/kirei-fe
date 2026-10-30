import { Suspense } from "react";
import { CurrentUserAvatar, CurrentUserAvatarPlaceholder } from "@/shared/layout/CurrentUserAvatar";
import { RoleShell } from "@/shared/layout/RoleShell";
import { ORMAWA_NAV } from "./nav";

export function OrmawaShell({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell
      nav={ORMAWA_NAV}
      headerEnd={
        <Suspense fallback={<CurrentUserAvatarPlaceholder />}>
          <CurrentUserAvatar />
        </Suspense>
      }
    >
      {children}
    </RoleShell>
  );
}
