import { z } from "zod";
import { phoneSchema } from "@/shared/reservation-form/schema";
import type { Staff, StaffRole } from "@/types/staff";

export const STAFF_ROLE_LABEL: Record<StaffRole, string> = {
  sopir: "Sopir",
  co_sopir: "Kenek",
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Separators people type in a licence number; only the digits are checked. */
const licenseDigits = (value: string) => value.replace(/[\s-]/g, "");

/**
 * A driver added or edited in Kelola Staf. The licence must not be in use by another driver
 * (`existing`, without the one being edited). An active driver's licence must still be valid on
 * `today` ("YYYY-MM-DD"); an inactive one may have run out, so it can be switched off.
 */
export function createStaffSchema(existing: Staff[], today: string, editingId: string | null = null) {
  const taken = new Set(
    existing.filter((member) => member.id !== editingId).map((member) => licenseDigits(member.licenseNumber)),
  );
  return z
    .object({
      name: z.string().trim().min(3, "Tulis nama minimal 3 karakter.").max(100, "Nama maksimal 100 karakter."),
      phone: phoneSchema,
      licenseNumber: z
        .string()
        .trim()
        .refine((value) => /^\d{12,16}$/.test(licenseDigits(value)), "Nomor SIM berisi 12 sampai 16 angka.")
        .refine((value) => !taken.has(licenseDigits(value)), "Nomor SIM ini sudah dipakai staf lain."),
      licenseExpiresOn: z.string().regex(DATE, "Pilih tanggal masa berlaku SIM."),
      role: z.string().pipe(z.enum(["sopir", "co_sopir"], { message: "Pilih tipe staf." })),
      isActive: z.boolean(),
    })
    .superRefine((values, ctx) => {
      // "YYYY-MM-DD" strings compare in calendar order
      if (values.isActive && DATE.test(values.licenseExpiresOn) && values.licenseExpiresOn < today) {
        ctx.addIssue({ code: "custom", path: ["licenseExpiresOn"], message: "Masa berlaku SIM sudah lewat. Perbarui atau nonaktifkan staf ini." });
      }
    });
}

export type StaffInput = z.input<ReturnType<typeof createStaffSchema>>;
export type StaffValues = z.output<ReturnType<typeof createStaffSchema>>;

/** Name, phone, or licence number contains the query; case and licence separators do not matter. */
export function searchStaff(staff: Staff[], query: string): Staff[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return staff;
  const digits = licenseDigits(needle);
  return staff.filter(
    (member) =>
      member.name.toLowerCase().includes(needle) ||
      member.phone.includes(needle) ||
      (digits !== "" && licenseDigits(member.licenseNumber).includes(digits)),
  );
}
