import { describe, expect, it } from "vitest";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import { MOCK_MANAGED_USERS } from "@/mocks/users";
import { createUserSchema, passwordResetSchema, searchUsers, toManagedUser } from "./userSchema";
import { parseUserTab } from "./userTabs";

const issues = (result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }) =>
  result.success ? {} : Object.fromEntries(result.error!.issues.map((issue) => [issue.path.join("."), issue.message]));

const PASSWORD = { password: "rahasia123", confirmation: "rahasia123" };
const NO_FLOOR = { buildingId: "", floorId: "" };

describe("new ormawa", () => {
  const schema = createUserSchema("ormawa", MOCK_MANAGED_USERS);

  it("stores an ormawa without a faculty, even if one slipped into the form", () => {
    const values = schema.parse({ name: "UKM Paduan Suara", email: " PADUANSUARA@dinus.ac.id ", fakultas: "fik", npp: "", ...NO_FLOOR, ...PASSWORD });
    expect(values.email).toBe("paduansuara@dinus.ac.id");
    const user = toManagedUser(values, "ormawa", "new-1");
    expect(user).toMatchObject({ fakultasId: null, npp: undefined, isActive: true });
    expect(user).not.toHaveProperty("password");
  });

  it("rejects an email another account already uses, whatever the case", () => {
    expect(issues(schema.safeParse({ name: "HMTI Baru", email: "HMTI@dinus.ac.id", fakultas: "", npp: "", ...NO_FLOOR, ...PASSWORD }))).toEqual({
      email: "Email ini sudah dipakai akun lain.",
    });
  });
});

describe("new dosen", () => {
  const schema = createUserSchema("dosen", []);

  it("needs a faculty and a numeric NPP", () => {
    expect(issues(schema.safeParse({ name: "Dr. Andi", email: "andi@dsn.dinus.ac.id", fakultas: "", npp: "12a", ...NO_FLOOR, ...PASSWORD }))).toEqual({
      fakultas: "Pilih fakultas dosen.",
      npp: "NPP berisi 8 sampai 18 angka.",
    });
    expect(schema.safeParse({ name: "Dr. Andi", email: "andi@dsn.dinus.ac.id", fakultas: "fik", npp: "19900101", ...NO_FLOOR, ...PASSWORD }).success).toBe(true);
  });
});

describe("new admin fakultas", () => {
  const schema = createUserSchema("admin_fakultas", MOCK_MANAGED_USERS);
  const base = { name: "Lina Marlina, S.Kom.", email: "lina@dinus.ac.id", npp: "", ...NO_FLOOR, ...PASSWORD };

  it("needs the faculty it manages, but no NPP", () => {
    expect(issues(schema.safeParse({ ...base, fakultas: "" }))).toEqual({ fakultas: "Pilih fakultas yang dikelola." });
    const values = schema.parse({ ...base, fakultas: "fik" });
    expect(toManagedUser(values, "admin_fakultas", "new")).toMatchObject({ fakultasId: "fik", npp: undefined, floor: undefined });
  });

  it("allows a second admin for the same faculty", () => {
    expect(MOCK_MANAGED_USERS.filter((user) => user.role === "admin_fakultas" && user.fakultasId === "fik")).toHaveLength(2);
    expect(schema.safeParse({ ...base, fakultas: "fik" }).success).toBe(true);
  });
});

describe("new operator", () => {
  const schema = createUserSchema("operator", [], MOCK_BUILDINGS);
  const base = { name: "Agus Baru", email: "agus.baru@dinus.ac.id", fakultas: "", npp: "", ...PASSWORD };

  it("needs a floor that belongs to the chosen building", () => {
    expect(issues(schema.safeParse({ ...base, ...NO_FLOOR }))).toEqual({ buildingId: "Pilih gedung tempat operator bertugas." });
    expect(issues(schema.safeParse({ ...base, buildingId: "gedung-h", floorId: "gedung-e-2" }))).toEqual({
      floorId: "Pilih lantai tempat operator bertugas.",
    });
    const values = schema.parse({ ...base, buildingId: "gedung-h", floorId: "gedung-h-7" });
    expect(toManagedUser(values, "operator", "new")).toMatchObject({ fakultasId: null, floor: { buildingId: "gedung-h", floorId: "gedung-h-7" } });
  });
});

describe("passwords", () => {
  it("need at least 8 characters and a matching confirmation, on create and on reset", () => {
    const create = createUserSchema("ormawa", []);
    const base = { name: "UKM Catur", email: "catur@dinus.ac.id", fakultas: "", npp: "", ...NO_FLOOR };
    expect(issues(create.safeParse({ ...base, password: "pendek", confirmation: "pendek" }))).toEqual({
      password: "Kata sandi minimal 8 karakter.",
    });
    expect(issues(passwordResetSchema.safeParse({ password: "rahasia123", confirmation: "rahasia124" }))).toEqual({
      confirmation: "Konfirmasi tidak sama dengan kata sandi.",
    });
    expect(passwordResetSchema.safeParse(PASSWORD).success).toBe(true);
  });

  it("keep the old password when both reset fields are empty", () => {
    expect(passwordResetSchema.safeParse({ password: "", confirmation: "" }).success).toBe(true);
    expect(issues(passwordResetSchema.safeParse({ password: "", confirmation: "rahasia123" }))).toEqual({
      password: "Kata sandi minimal 8 karakter.",
      confirmation: "Konfirmasi tidak sama dengan kata sandi.",
    });
  });
});

describe("searchUsers", () => {
  it("matches name, email, or NPP regardless of case", () => {
    expect(searchUsers(MOCK_MANAGED_USERS, "hmti").map((user) => user.name)).toEqual(["HMTI"]);
    expect(searchUsers(MOCK_MANAGED_USERS, "19820411").map((user) => user.name)).toEqual(["Dr. Hendra Gunawan, S.Kom"]);
    expect(searchUsers(MOCK_MANAGED_USERS, "  ")).toHaveLength(MOCK_MANAGED_USERS.length);
  });
});

describe("parseUserTab", () => {
  it("falls back to Ormawa for anything unknown", () => {
    expect(parseUserTab("dosen")).toBe("dosen");
    expect(parseUserTab(["dosen", "ormawa"])).toBe("dosen");
    expect(parseUserTab("operator")).toBe("operator");
    expect(parseUserTab("admin_universitas")).toBe("ormawa");
    expect(parseUserTab(undefined)).toBe("ormawa");
  });
});
