import { describe, expect, it } from "vitest";
import type { Staff } from "@/types/staff";
import { createStaffSchema, searchStaff, type StaffInput } from "./staffSchema";

const STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseNumber: "1234-5678-000011", licenseExpiresOn: "2028-03-14", role: "sopir", isActive: true },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseNumber: "1234-5678-000014", licenseExpiresOn: "2027-11-30", role: "co_sopir", isActive: false },
];

const TODAY = "2026-11-20";

const valid: StaffInput = {
  name: "Wahyu Hidayat",
  phone: "0812 3450 0099",
  licenseNumber: "1234 5678 000099",
  licenseExpiresOn: "2028-01-01",
  role: "sopir",
  isActive: true,
};

const issues = (input: StaffInput, editingId: string | null = null) => {
  const result = createStaffSchema(STAFF, TODAY, editingId).safeParse(input);
  return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), issue.message]));
};

describe("staff schema", () => {
  it("accepts a driver and cleans up the phone number", () => {
    const result = createStaffSchema(STAFF, TODAY).parse(valid);
    expect(result).toMatchObject({ name: "Wahyu Hidayat", phone: "081234500099", role: "sopir" });
  });

  it("checks the name, phone, and type", () => {
    expect(issues({ ...valid, name: " Ab " })).toMatchObject({ name: "Tulis nama minimal 3 karakter." });
    expect(issues({ ...valid, phone: "12345" })).toHaveProperty("phone");
    expect(issues({ ...valid, role: "" })).toMatchObject({ role: "Pilih tipe staf." });
  });

  it("needs a 12 to 16 digit licence not used by another driver", () => {
    expect(issues({ ...valid, licenseNumber: "1234" })).toMatchObject({ licenseNumber: "Nomor SIM berisi 12 sampai 16 angka." });
    expect(issues({ ...valid, licenseNumber: "123456780000 11" })).toMatchObject({
      licenseNumber: "Nomor SIM ini sudah dipakai staf lain.",
    });
    // editing that driver keeps its own number
    expect(issues({ ...valid, licenseNumber: "1234-5678-000011" }, "staff-1")).toEqual({});
  });

  it("rejects a licence that has run out, unless the driver is switched off", () => {
    expect(issues({ ...valid, licenseExpiresOn: "2026-11-19" })).toMatchObject({
      licenseExpiresOn: "Masa berlaku SIM sudah lewat. Perbarui atau nonaktifkan staf ini.",
    });
    expect(issues({ ...valid, licenseExpiresOn: "2026-11-19", isActive: false })).toEqual({});
    expect(issues({ ...valid, licenseExpiresOn: TODAY })).toEqual({});
    expect(issues({ ...valid, licenseExpiresOn: "" })).toMatchObject({ licenseExpiresOn: "Pilih tanggal masa berlaku SIM." });
  });
});

describe("staff search", () => {
  it("finds by name, phone, or licence number, ignoring case and separators", () => {
    expect(searchStaff(STAFF, "")).toHaveLength(2);
    expect(searchStaff(STAFF, "dedi").map((member) => member.id)).toEqual(["staff-4"]);
    expect(searchStaff(STAFF, "500011").map((member) => member.id)).toEqual(["staff-1"]);
    expect(searchStaff(STAFF, "5678 000014").map((member) => member.id)).toEqual(["staff-4"]);
    expect(searchStaff(STAFF, "tidak ada")).toEqual([]);
  });
});
