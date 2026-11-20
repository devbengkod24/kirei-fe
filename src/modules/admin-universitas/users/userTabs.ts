import type { Building } from "@/types/facility";
import type { ManagedRole } from "@/types/managedUser";

/** Query parameter of the account tab, e.g. `?tab=operator`. */
export const USER_TAB_PARAM = "tab";

export interface UserTabConfig {
  label: string;
  detailTitle: string;
  /**
   * Which fields the accounts of this tab have. Admin gedung and operator accounts belong to a
   * place, not a person, so they have no name field; `building` is a whole building, `floor` one floor of it.
   */
  fields: { name: boolean; npp: boolean; fakultas: boolean; building: boolean; floor: boolean };
  namePlaceholder: string;
  emailPlaceholder: string;
  /** Shown when the faculty is missing; only for tabs with a faculty. */
  fakultasMessage?: string;
}

export const USER_TABS: Record<ManagedRole, UserTabConfig> = {
  organisasi: {
    label: "Ormawa",
    detailTitle: "Detail Ormawa",
    fields: { name: true, npp: false, fakultas: false, building: false, floor: false },
    namePlaceholder: "Contoh: UKM Paduan Suara",
    emailPlaceholder: "nama@dinus.ac.id",
  },
  dosen: {
    label: "Dosen",
    detailTitle: "Detail Dosen",
    fields: { name: true, npp: true, fakultas: true, building: false, floor: false },
    namePlaceholder: "Contoh: Dr. Andi Pratama, M.Kom.",
    emailPlaceholder: "nama@dsn.dinus.ac.id",
    fakultasMessage: "Pilih fakultas dosen.",
  },
  admin_fakultas: {
    label: "Admin Gedung",
    detailTitle: "Detail Admin Gedung",
    fields: { name: false, npp: false, fakultas: false, building: true, floor: false },
    namePlaceholder: "",
    emailPlaceholder: "nama@dinus.ac.id",
  },
  operator: {
    label: "Operator",
    detailTitle: "Detail Operator",
    fields: { name: false, npp: false, fakultas: false, building: false, floor: true },
    namePlaceholder: "",
    emailPlaceholder: "nama@dinus.ac.id",
  },
};

export const USER_ROLES = Object.keys(USER_TABS) as ManagedRole[];

/** The tab in the URL; anything else opens Ormawa. */
export function parseUserTab(value: string | string[] | undefined): ManagedRole {
  const tab = Array.isArray(value) ? value[0] : value;
  return USER_ROLES.includes(tab as ManagedRole) ? (tab as ManagedRole) : "organisasi";
}

/** Display name of an account without a name field, e.g. "Admin Gedung H" or "Operator Gedung H Lantai 5". */
export function placeAccountName(role: ManagedRole, building: Building, floorId?: string): string {
  if (role === "operator") {
    const floor = building.floors.find((item) => item.id === floorId);
    return `Operator ${building.name}${floor ? ` Lantai ${floor.number}` : ""}`;
  }
  return `Admin ${building.name}`;
}
