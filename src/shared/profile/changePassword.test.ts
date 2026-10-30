import { describe, expect, it } from "vitest";
import { validatePasswordChange } from "./changePassword";

describe("validatePasswordChange", () => {
  it("accepts a valid change", () => {
    expect(validatePasswordChange({ currentPassword: "lama1234", newPassword: "baru12345", confirmation: "baru12345" })).toEqual({});
  });

  it("reports every problem at once", () => {
    expect(validatePasswordChange({ currentPassword: "", newPassword: "pendek", confirmation: "beda" })).toEqual({
      currentPassword: "Masukkan kata sandi lama.",
      newPassword: "Kata sandi baru minimal 8 karakter.",
      confirmation: "Konfirmasi tidak sama dengan kata sandi baru.",
    });
  });

  it("rejects reusing the current password", () => {
    expect(
      validatePasswordChange({ currentPassword: "sama12345", newPassword: "sama12345", confirmation: "sama12345" }).newPassword,
    ).toBe("Kata sandi baru harus berbeda dari yang lama.");
  });
});
