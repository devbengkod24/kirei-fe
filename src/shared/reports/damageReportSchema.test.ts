import { describe, expect, it } from "vitest";
import { REPORT_PHOTO_MAX_SIZE_MB } from "@/config/reservation";
import { damageReportSchema } from "./damageReportSchema";

const valid = {
  reporterName: "Budi Santoso",
  roomCode: "H.5.1",
  category: "kerusakan_alat" as const,
  body: "Proyektor tidak mau menyala dan kabel HDMI putus.",
  photo: null,
};

describe("damageReportSchema", () => {
  it("accepts a complete complaint with or without a valid photo", () => {
    expect(damageReportSchema.safeParse(valid).success).toBe(true);
    const photo = new File(["img"], "proyektor.png", { type: "image/png" });
    expect(damageReportSchema.safeParse({ ...valid, category: "lainnya", photo }).success).toBe(true);
  });

  it("requires reporter name, room/class text, category, and at least 10 characters of description", () => {
    const missing = damageReportSchema.safeParse({
      reporterName: "A",
      roomCode: "",
      category: "",
      body: "rusak",
      photo: null,
    });
    expect(missing.success).toBe(false);
    if (missing.success) return;
    const fields = new Set(missing.error.issues.map((issue) => String(issue.path[0])));
    expect(fields).toEqual(new Set(["reporterName", "roomCode", "category", "body"]));
  });

  it("rejects invalid or oversized photos", () => {
    const wrongType = new File(["pdf"], "laporan.pdf", { type: "application/pdf" });
    expect(damageReportSchema.safeParse({ ...valid, photo: wrongType }).success).toBe(false);

    const tooBig = new File([new Uint8Array(REPORT_PHOTO_MAX_SIZE_MB * 1024 * 1024 + 1)], "foto.jpg", {
      type: "image/jpeg",
    });
    expect(damageReportSchema.safeParse({ ...valid, photo: tooBig }).success).toBe(false);
  });
});
