import { describe, expect, it } from "vitest";
import { DOSEN_FAQ_ITEMS, FAQ_ITEMS } from "./faq-items";

describe("DOSEN_FAQ_ITEMS", () => {
  it("leaves out drafts and asks for a letter only for vehicles", () => {
    const text = DOSEN_FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`).join(" ");
    expect(text).not.toMatch(/draft/i);
    expect(text).not.toContain("Unggah surat");
    expect(DOSEN_FAQ_ITEMS.length).toBe(FAQ_ITEMS.length - 1);
    const letter = DOSEN_FAQ_ITEMS.find((item) => item.question.startsWith("Surat peminjaman"));
    expect(letter?.answer).toMatch(/kendaraan/);
  });
});
