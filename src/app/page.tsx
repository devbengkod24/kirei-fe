import { Shell } from "@/components/layout/Shell";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { NavIcon } from "@/components/icons/NavIcons";
import { DashboardView } from "@/shared/dashboard/DashboardView";
import { ORMAWA_PRIMARY_NAV, ORMAWA_SECONDARY_NAV } from "@/modules/ormawa/nav";
import {
  INITIAL_USER_PROFILE,
  INITIAL_TODAY_RESERVATION,
  INITIAL_ANNOUNCEMENTS,
} from "@/config/dashboardData";

export default function Page() {
  const navItems = ORMAWA_PRIMARY_NAV.map((item) => ({
    ...item,
    icon: <NavIcon name={item.iconName} />,
    isActive: item.id === "dashboard",
  }));

  const secondaryNavItems = ORMAWA_SECONDARY_NAV.map((item) => ({
    ...item,
    icon: <NavIcon name={item.iconName} />,
  }));

  return (
    <Shell
      brandLogo={<BrandLogo />}
      brandTitle="Bengkel Koding"
      brandSubtitle="Coworking Space"
      currentPageTitle="Dashboard"
      navItems={navItems}
      secondaryNavItems={secondaryNavItems}
      bottomAction={
        <Button variant="danger-outline" className="w-full">
          Logout
        </Button>
      }
      userAvatar={
        <Avatar
          src={INITIAL_USER_PROFILE.avatarUrl}
          initials="NW"
          alt={INITIAL_USER_PROFILE.name}
          size="md"
        />
      }
    >
      <DashboardView
        user={INITIAL_USER_PROFILE}
        todayReservation={INITIAL_TODAY_RESERVATION}
        announcements={INITIAL_ANNOUNCEMENTS}
      />
    </Shell>
  );
}

