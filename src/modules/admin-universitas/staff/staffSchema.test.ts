import { describe, expect, it } from "vitest";
import type { Staff } from "@/types/staff";
import { createStaffSchema, licenseLabel, searchStaff, type StaffInput } from "./staffSchema";

const STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseClass: "B1 Umum", role: "sopir", isActive: true },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseClass: "A", role: "co_sopir", isActive: false },
];

const valid: StaffInput = {
  name: "Wahyu Hidayat",
  phone: "0812 3450 0099",
  licenseClass: "B2 Umum",
  role: "sopir",
  isActive: true,
};

const issues = (input: StaffInput) => {
  const result = createStaffSchema().safeParse(input);
  return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), issue.message]));
};

describe("staff schema", () => {
  it("accepts a driver and cleans up the phone number", () => {
    const result = createStaffSchema().parse(valid);
    expect(result).toMatchObject({ name: "Wahyu Hidayat", phone: "081234500099", licenseClass: "B2 Umum", role: "sopir" });
  });

  it("checks the name, phone, and type", () => {
    expect(issues({ ...valid, name: " Ab " })).toMatchObject({ name: "Tulis nama minimal 3 karakter." });
    expect(issues({ ...valid, phone: "12345" })).toHaveProperty("phone");
    expect(issues({ ...valid, role: "" })).toMatchObject({ role: "Pilih tipe staf." });
  });

  it("needs a known licence class", () => {
    expect(issues({ ...valid, licenseClass: "" })).toMatchObject({ licenseClass: "Pilih golongan SIM." });
    expect(issues({ ...valid, licenseClass: "Z" })).toMatchObject({ licenseClass: "Pilih golongan SIM." });
    expect(issues({ ...valid, licenseClass: "C" })).toEqual({});
  });
});

describe("licence label", () => {
  it("names the class, or a dash for older drivers without one", () => {
    expect(licenseLabel(STAFF[0])).toBe("SIM B1 Umum");
    expect(licenseLabel({ licenseClass: "" })).toBe("-");
  });
});

describe("staff search", () => {
  it("finds by name or phone, ignoring case", () => {
    expect(searchStaff(STAFF, "")).toHaveLength(2);
    expect(searchStaff(STAFF, "dedi").map((member) => member.id)).toEqual(["staff-4"]);
    expect(searchStaff(STAFF, "500011").map((member) => member.id)).toEqual(["staff-1"]);
    expect(searchStaff(STAFF, "tidak ada")).toEqual([]);
  });
});
