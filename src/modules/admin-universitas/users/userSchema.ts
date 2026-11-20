import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "@/shared/profile/changePassword";
import type { Building } from "@/types/facility";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";
import { placeAccountName, USER_TABS } from "./userTabs";

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

/**
 * New account for one tab. Which of name, NPP, faculty, building, and floor are asked follows
 * USER_TABS. Email must not be taken by another account in the list.
 */
export function createUserSchema(role: ManagedRole, existing: ManagedUser[], buildings: Building[] = []) {
  const taken = new Set(existing.map((user) => user.email.toLowerCase()));
  const { fields, fakultasMessage } = USER_TABS[role];
  return z
    .object({
      name: z.string().trim(),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email("Format email tidak valid."))
        .refine((email) => !taken.has(email), "Email ini sudah dipakai akun lain."),
      fakultas: z.string(),
      npp: z.string().trim(),
      buildingId: z.string(),
      floorId: z.string(),
      ...passwordShape,
    })
    .superRefine((values, ctx) => {
      requireMatchingPassword(values, ctx);
      if (fields.name && values.name.length < 3) {
        ctx.addIssue({ code: "custom", path: ["name"], message: "Tulis nama minimal 3 karakter." });
      } else if (fields.name && values.name.length > 120) {
        ctx.addIssue({ code: "custom", path: ["name"], message: "Nama maksimal 120 karakter." });
      }
      if (fields.building && !buildings.some((building) => building.id === values.buildingId)) {
        ctx.addIssue({ code: "custom", path: ["buildingId"], message: "Pilih gedung yang dikelola." });
      }
      if (fields.fakultas && !values.fakultas) {
        ctx.addIssue({ code: "custom", path: ["fakultas"], message: fakultasMessage ?? "Pilih fakultas." });
      }
      if (fields.npp && !/^\d{8,18}$/.test(values.npp)) {
        ctx.addIssue({ code: "custom", path: ["npp"], message: "NPP berisi 8 sampai 18 angka." });
      }
      if (fields.floor) {
        const building = buildings.find((item) => item.id === values.buildingId);
        if (!building) {
          ctx.addIssue({ code: "custom", path: ["buildingId"], message: "Pilih gedung tempat operator bertugas." });
        } else if (!building.floors.some((floor) => floor.id === values.floorId)) {
          ctx.addIssue({ code: "custom", path: ["floorId"], message: "Pilih lantai tempat operator bertugas." });
        }
      }
    });
}

/** Accounts as the "empty" data mode keeps them in the browser. Passwords are never part of it. */
export const managedUsersSchema: z.ZodType<ManagedUser[]> = z.array(
  z.object({
    id: z.string(),
    role: z.enum(["organisasi", "dosen", "admin_fakultas", "operator"]),
    name: z.string(),
    email: z.string(),
    fakultasId: z.string().nullable(),
    npp: z.string().optional(),
    buildingId: z.string().optional(),
    floor: z.object({ buildingId: z.string(), floorId: z.string() }).optional(),
    isActive: z.boolean(),
  }),
);

export type NewUserInput = z.input<ReturnType<typeof createUserSchema>>;
export type NewUserValues = z.output<ReturnType<typeof createUserSchema>>;

/**
 * The account as listed. The password goes only to the API, never into the list. Accounts without
 * a name field are named after their building (and floor), which the schema has already checked.
 */
export function toManagedUser(values: NewUserValues, role: ManagedRole, id: string, buildings: Building[] = []): ManagedUser {
  const { fields } = USER_TABS[role];
  const building = buildings.find((item) => item.id === values.buildingId);
  return {
    id,
    role,
    name: fields.name || !building ? values.name : placeAccountName(role, building, values.floorId),
    email: values.email,
    fakultasId: fields.fakultas ? values.fakultas : null,
    npp: fields.npp ? values.npp : undefined,
    buildingId: fields.building ? values.buildingId : undefined,
    floor: fields.floor ? { buildingId: values.buildingId, floorId: values.floorId } : undefined,
    isActive: true,
  };
}

/** Case-insensitive match on name, email, or NPP. */
export function searchUsers(users: ManagedUser[], query: string): ManagedUser[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return users;
  return users.filter((user) => [user.name, user.email, user.npp ?? ""].some((field) => field.toLowerCase().includes(needle)));
}
