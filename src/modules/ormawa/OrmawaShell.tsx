import { Suspense } from "react";
import { AppBrand } from "@/components/brand/AppBrand";
import { Shell } from "@/components/layout/Shell";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { CurrentUserAvatar, CurrentUserAvatarPlaceholder } from "@/shared/layout/CurrentUserAvatar";
import { LogoutButton } from "@/shared/layout/LogoutButton";
import { ORMAWA_NAV } from "./nav";

export function OrmawaShell({ children }: { children: React.ReactNode }) {
  const navGroups = ORMAWA_NAV.map((group) =>
    group.map((item) => ({
      href: item.href,
      label: item.label,
      icon: <MaskIcon src={item.iconSrc} size={item.iconSize} />,
    })),
  );

  return (
    <Shell
      brand={<AppBrand />}
      navGroups={navGroups}
      sidebarFooter={<LogoutButton />}
      headerEnd={
        <Suspense fallback={<CurrentUserAvatarPlaceholder />}>
          <CurrentUserAvatar />
        </Suspense>
      }
    >
      {children}
    </Shell>
  );
}
