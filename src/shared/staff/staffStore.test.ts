import { describe, expect, it } from "vitest";
import type { Staff } from "@/types/staff";
import { MOCK_STAFF_KEY, readStoredStaff, saveStaff } from "./staffStore";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
}

const DRIVER: Staff = {
  id: "staff-1",
  name: "Slamet Riyadi",
  phone: "081234500011",
  licenseClass: "B1 Umum",
  role: "sopir",
  isActive: true,
};

describe("staff store", () => {
  it("reads nothing until a list is saved, then the saved list", () => {
    const storage = memoryStorage();
    expect(readStoredStaff(storage)).toBeNull();
    expect(saveStaff([DRIVER, { ...DRIVER, id: "staff-2", isActive: false }], storage)).toBe(true);
    expect(readStoredStaff(storage)?.map((member) => [member.id, member.isActive])).toEqual([
      ["staff-1", true],
      ["staff-2", false],
    ]);
  });

  it("reads broken data as nothing stored, and reports when the browser cannot store", () => {
    const storage = memoryStorage();
    storage.setItem(MOCK_STAFF_KEY, '[{"id":1}]');
    expect(readStoredStaff(storage)).toBeNull();
    expect(saveStaff([DRIVER], null)).toBe(false);
  });

  it("keeps drivers saved with a licence number, without a class yet", () => {
    const storage = memoryStorage();
    const old = { id: DRIVER.id, name: DRIVER.name, phone: DRIVER.phone, role: DRIVER.role, isActive: DRIVER.isActive };
    storage.setItem(MOCK_STAFF_KEY, JSON.stringify([{ ...old, licenseNumber: "1234", licenseExpiresOn: "2028-03-14" }]));
    expect(readStoredStaff(storage)).toEqual([{ ...DRIVER, licenseClass: "" }]);
  });
});
