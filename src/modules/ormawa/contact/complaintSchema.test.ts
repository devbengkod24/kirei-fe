import { describe, expect, it } from "vitest";
import { complaintSchema } from "./complaintSchema";

describe("complaint schema", () => {
  it("accepts a category and a description, trimmed", () => {
    const parsed = complaintSchema.parse({ category: "kerusakan_alat", body: "  Proyektor H.5.6 mati  " });
    expect(parsed).toEqual({ category: "kerusakan_alat", body: "Proyektor H.5.6 mati" });
  });

  it("asks for a category when none is chosen", () => {
    const result = complaintSchema.safeParse({ category: "", body: "Proyektor H.5.6 mati" });
    expect(result.error?.issues[0]).toMatchObject({ path: ["category"], message: "Pilih kategori pengaduan." });
  });

  it("rejects a description that is too short after trimming", () => {
    const result = complaintSchema.safeParse({ category: "lainnya", body: "   rusak   " });
    expect(result.error?.issues[0]?.path).toEqual(["body"]);
  });
});
