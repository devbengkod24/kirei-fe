import type { ManagedRole } from "@/types/managedUser";

/** Query parameter of the Ormawa / Dosen tab. */
export const USER_TAB_PARAM = "tab";

export const USER_TABS: Record<ManagedRole, { label: string; detailTitle: string }> = {
  ormawa: { label: "Ormawa", detailTitle: "Detail Ormawa" },
  dosen: { label: "Dosen", detailTitle: "Detail Dosen" },
};

const ROLES = Object.keys(USER_TABS) as ManagedRole[];

/** The tab in the URL; anything else opens Ormawa. */
export function parseUserTab(value: string | string[] | undefined): ManagedRole {
  const tab = Array.isArray(value) ? value[0] : value;
  return ROLES.includes(tab as ManagedRole) ? (tab as ManagedRole) : "ormawa";
}
