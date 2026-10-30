import { describe, expect, it } from "vitest";
import { isLaravelValidationError, toFormErrors } from "./form-errors";

const fieldMap = { room_id: "roomId", starts_at: "startTime", letter: "letter" } as const;

describe("form-errors", () => {
  it("recognises a Laravel 422 body", () => {
    expect(isLaravelValidationError({ message: "Invalid", errors: { room_id: ["Wajib."] } })).toBe(true);
    expect(isLaravelValidationError({ message: "Server Error" })).toBe(false);
    expect(isLaravelValidationError(null)).toBe(false);
  });

  it("maps keys to form fields and keeps the first message", () => {
    expect(
      toFormErrors({ message: "x", errors: { room_id: ["Ruangan sudah dipesan.", "Lain"], starts_at: ["Di luar jam operasional."] } }, fieldMap),
    ).toEqual([
      { field: "roomId", message: "Ruangan sudah dipesan." },
      { field: "startTime", message: "Di luar jam operasional." },
    ]);
  });

  it("maps dotted keys by their first segment", () => {
    expect(toFormErrors({ message: "x", errors: { "letter.0": ["Maksimal 2 MB."] } }, fieldMap)).toEqual([
      { field: "letter", message: "Maksimal 2 MB." },
    ]);
  });

  it("sends unknown keys, or an empty error list, to the root", () => {
    expect(toFormErrors({ message: "x", errors: { quota: ["Kuota habis."] } }, fieldMap)).toEqual([
      { field: "root.server", message: "Kuota habis." },
    ]);
    expect(toFormErrors({ message: "Data tidak valid.", errors: {} }, fieldMap)).toEqual([
      { field: "root.server", message: "Data tidak valid." },
    ]);
  });
});
