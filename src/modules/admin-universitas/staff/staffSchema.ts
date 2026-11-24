import { z } from "zod";
import { phoneSchema } from "@/shared/reservation-form/schema";
import { LICENSE_CLASSES, type Staff, type StaffRole } from "@/types/staff";

export const STAFF_ROLE_LABEL: Record<StaffRole, string> = {
  sopir: "Sopir",
  co_sopir: "Kenek",
};

/** "SIM B1 Umum", or "-" for a driver saved before the class existed. */
export const licenseLabel = (staff: Pick<Staff, "licenseClass">) => (staff.licenseClass ? `SIM ${staff.licenseClass}` : "-");

/** A driver added or edited in Kelola Staf. */
export function createStaffSchema() {
  return z.object({
    name: z.string().trim().min(3, "Tulis nama minimal 3 karakter.").max(100, "Nama maksimal 100 karakter."),
    phone: phoneSchema,
    licenseClass: z.string().pipe(z.enum(LICENSE_CLASSES, { message: "Pilih golongan SIM." })),
    role: z.string().pipe(z.enum(["sopir", "co_sopir"], { message: "Pilih tipe staf." })),
    isActive: z.boolean(),
  });
}

export type StaffInput = z.input<ReturnType<typeof createStaffSchema>>;
export type StaffValues = z.output<ReturnType<typeof createStaffSchema>>;

/** Name or phone contains the query, ignoring case. */
export function searchStaff(staff: Staff[], query: string): Staff[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return staff;
  return staff.filter((member) => member.name.toLowerCase().includes(needle) || member.phone.includes(needle));
}
