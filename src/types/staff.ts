/** A driver for campus vehicles; the co-driver rides along and takes over on long trips. */
export type StaffRole = "sopir" | "co_sopir";

/** Indonesian driving licence classes a campus driver may hold. */
export const LICENSE_CLASSES = ["A", "A Umum", "B1", "B1 Umum", "B2", "B2 Umum", "C", "D"] as const;

export interface Staff {
  id: string;
  name: string;
  phone: string;
  // TODO(api): licenseClass replaces the licence number and expiry; kirei-api has no staff endpoint yet.
  /** Driving licence class, one of LICENSE_CLASSES; "" for drivers saved before the class existed. */
  licenseClass: string;
  role: StaffRole;
  /** An inactive driver is no longer offered for new trips; older trips keep showing the name. */
  isActive: boolean;
}
