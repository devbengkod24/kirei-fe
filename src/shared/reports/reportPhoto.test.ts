import { describe, expect, it } from "vitest";
import { REPORT_PHOTO_MAX_SIZE_MB } from "@/config/reservation";
import { reportPhotoSchema } from "./reportPhoto";

describe("reportPhotoSchema", () => {
  it("accepts JPG, PNG, and WebP photos within the size limit", () => {
    const valid = new File(["img"], "rusak.jpg", { type: "image/jpeg" });
    expect(reportPhotoSchema.safeParse(valid).success).toBe(true);
    expect(reportPhotoSchema.safeParse(new File(["img"], "rusak.png", { type: "image/png" })).success).toBe(true);
    expect(reportPhotoSchema.safeParse(new File(["img"], "rusak.webp", { type: "image/webp" })).success).toBe(true);
  });

  it("rejects non-image types, empty files, and oversized photos", () => {
    expect(reportPhotoSchema.safeParse(new File(["pdf"], "surat.pdf", { type: "application/pdf" })).error?.issues[0].message).toBe(
      "Foto harus berformat JPG, PNG, atau WebP.",
    );
    expect(reportPhotoSchema.safeParse(new File([], "kosong.jpg", { type: "image/jpeg" })).error?.issues[0].message).toBe(
      "Berkas foto kosong. Pilih berkas lain.",
    );
    const oversized = new File([new Uint8Array(REPORT_PHOTO_MAX_SIZE_MB * 1024 * 1024 + 1)], "besar.jpg", {
      type: "image/jpeg",
    });
    expect(reportPhotoSchema.safeParse(oversized).error?.issues[0].message).toBe(
      `Ukuran foto maksimal ${REPORT_PHOTO_MAX_SIZE_MB} MB.`,
    );
  });
});
