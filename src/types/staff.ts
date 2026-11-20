/** A driver for campus vehicles; the co-driver rides along and takes over on long trips. */
export type StaffRole = "sopir" | "co_sopir";

export interface Staff {
  id: string;
  name: string;
  phone: string;
  /** Driving licence number. */
  licenseNumber: string;
  /** "YYYY-MM-DD" */
  licenseExpiresOn: string;
  role: StaffRole;
}
