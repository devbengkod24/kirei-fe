import { SegmentedNav } from "@/components/ui/SegmentedNav";
import { ADMIN_UNIVERSITAS_ROUTES } from "../routes";
import { USER_PAGE_TABS, USER_TAB_PARAM, type UserPageTab } from "./userTabs";

/** Ormawa · Dosen · Admin Gedung · Operator · Staf tabs of Kelola Pengguna, kept in the URL. */
export function UserTabsNav({ active }: { active: UserPageTab }) {
  return (
    <SegmentedNav
      label="Jenis pengguna"
      items={USER_PAGE_TABS.map(({ id, label }) => ({
        label,
        href: `${ADMIN_UNIVERSITAS_ROUTES.users}?${USER_TAB_PARAM}=${id}`,
        active: id === active,
      }))}
    />
  );
}
