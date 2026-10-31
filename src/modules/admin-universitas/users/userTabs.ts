import type { ManagedRole } from "@/types/managedUser";

/** Query parameter of the account tab, e.g. `?tab=operator`. */
export const USER_TAB_PARAM = "tab";

export interface UserTabConfig {
  label: string;
  detailTitle: string;
  /** Which extra fields the accounts of this tab have. */
  fields: { npp: boolean; fakultas: boolean; floor: boolean };
  namePlaceholder: string;
  emailPlaceholder: string;
  /** Shown when the faculty is missing; only for tabs with a faculty. */
  fakultasMessage?: string;
}

export const USER_TABS: Record<ManagedRole, UserTabConfig> = {
  ormawa: {
    label: "Ormawa",
    detailTitle: "Detail Ormawa",
    fields: { npp: false, fakultas: false, floor: false },
    namePlaceholder: "Contoh: UKM Paduan Suara",
    emailPlaceholder: "nama@dinus.ac.id",
  },
  dosen: {
    label: "Dosen",
    detailTitle: "Detail Dosen",
    fields: { npp: true, fakultas: true, floor: false },
    namePlaceholder: "Contoh: Dr. Andi Pratama, M.Kom.",
    emailPlaceholder: "nama@dsn.dinus.ac.id",
    fakultasMessage: "Pilih fakultas dosen.",
  },
  admin_fakultas: {
    label: "Admin Fakultas",
    detailTitle: "Detail Admin Fakultas",
    fields: { npp: false, fakultas: true, floor: false },
    namePlaceholder: "Contoh: Siti Rahma, S.Kom.",
    emailPlaceholder: "nama@dinus.ac.id",
    fakultasMessage: "Pilih fakultas yang dikelola.",
  },
  operator: {
    label: "Operator",
    detailTitle: "Detail Operator",
    fields: { npp: false, fakultas: false, floor: true },
    namePlaceholder: "Contoh: Agus Setiawan",
    emailPlaceholder: "nama@dinus.ac.id",
  },
};

export const USER_ROLES = Object.keys(USER_TABS) as ManagedRole[];

/** The tab in the URL; anything else opens Ormawa. */
export function parseUserTab(value: string | string[] | undefined): ManagedRole {
  const tab = Array.isArray(value) ? value[0] : value;
  return USER_ROLES.includes(tab as ManagedRole) ? (tab as ManagedRole) : "ormawa";
}
