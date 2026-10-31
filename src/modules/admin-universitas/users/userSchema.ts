import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "@/shared/profile/changePassword";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";

// Same length rule as Ubah Kata Sandi in Profil. Laravel checks it again.
const PASSWORD_TOO_SHORT = `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter.`;

const passwordShape = {
  password: z.string().min(MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT),
  confirmation: z.string(),
};

type IssueSink = { addIssue: (issue: { code: "custom"; path: string[]; message: string }) => void };

function requireMatchingPassword(values: { password: string; confirmation: string }, ctx: IssueSink) {
  if (values.confirmation !== values.password) {
    ctx.addIssue({ code: "custom", path: ["confirmation"], message: "Konfirmasi tidak sama dengan kata sandi." });
  }
}

/** A new password an admin may set for an existing account; both fields empty means keep the old one. */
export const passwordResetSchema = z
  .object({ password: z.string(), confirmation: z.string() })
  .superRefine((values, ctx) => {
    if (!values.password && !values.confirmation) return;
    if (values.password.length < MIN_PASSWORD_LENGTH) {
      ctx.addIssue({ code: "custom", path: ["password"], message: PASSWORD_TOO_SHORT });
    }
    requireMatchingPassword(values, ctx);
  });

export type PasswordResetValues = z.infer<typeof passwordResetSchema>;

/** New ormawa or dosen account. Email must not be taken by another account in the list. */
export function createUserSchema(role: ManagedRole, existing: ManagedUser[]) {
  const taken = new Set(existing.map((user) => user.email.toLowerCase()));
  return z
    .object({
      name: z.string().trim().min(3, "Tulis nama minimal 3 karakter.").max(120, "Nama maksimal 120 karakter."),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email("Format email tidak valid."))
        .refine((email) => !taken.has(email), "Email ini sudah dipakai akun lain."),
      /** Dosen only; ormawa belong to no faculty. */
      fakultas: z.string(),
      npp: z.string().trim(),
      ...passwordShape,
    })
    .superRefine((values, ctx) => {
      requireMatchingPassword(values, ctx);
      if (role === "dosen" && !values.fakultas) {
        ctx.addIssue({ code: "custom", path: ["fakultas"], message: "Pilih fakultas dosen." });
      }
      if (role === "dosen" && !/^\d{8,18}$/.test(values.npp)) {
        ctx.addIssue({ code: "custom", path: ["npp"], message: "NPP berisi 8 sampai 18 angka." });
      }
    });
}

export type NewUserInput = z.input<ReturnType<typeof createUserSchema>>;
export type NewUserValues = z.output<ReturnType<typeof createUserSchema>>;

/** The account as listed. The password goes only to the API, never into the list. */
export function toManagedUser(values: NewUserValues, role: ManagedRole, id: string): ManagedUser {
  return {
    id,
    role,
    name: values.name,
    email: values.email,
    fakultasId: role === "dosen" ? values.fakultas : null,
    npp: role === "dosen" ? values.npp : undefined,
    isActive: true,
  };
}

/** Case-insensitive match on name, email, or NPP. */
export function searchUsers(users: ManagedUser[], query: string): ManagedUser[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return users;
  return users.filter((user) => [user.name, user.email, user.npp ?? ""].some((field) => field.toLowerCase().includes(needle)));
}
