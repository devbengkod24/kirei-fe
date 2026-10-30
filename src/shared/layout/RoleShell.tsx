import { AppBrand } from "@/components/brand/AppBrand";
import { Shell } from "@/components/layout/Shell";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { LogoutButton } from "./LogoutButton";

export interface NavLinkConfig {
  label: string;
  href: string;
  /** Single-color SVG in /public, rendered with MaskIcon so it follows the text color. */
  iconSrc: string;
  iconSize?: number;
}

export interface RoleShellProps {
  /** Each group is separated by a divider line. */
  nav: NavLinkConfig[][];
  headerEnd: React.ReactNode;
  children: React.ReactNode;
}

/** Sidebar, header and logout shared by every role; only the menu and header content differ. */
export function RoleShell({ nav, headerEnd, children }: RoleShellProps) {
  const navGroups = nav.map((group) =>
    group.map((item) => ({
      href: item.href,
      label: item.label,
      icon: <MaskIcon src={item.iconSrc} size={item.iconSize} />,
    })),
  );

  return (
    <Shell brand={<AppBrand />} navGroups={navGroups} sidebarFooter={<LogoutButton />} headerEnd={headerEnd}>
      {children}
    </Shell>
  );
}
