import { describe, expect, it } from "vitest";
import { LETTER_MAX_SIZE_MB } from "@/config/reservation";
import { letterFileSchema } from "./letter";

const MB = 1024 * 1024;
const fileOfSize = (name: string, type: string, bytes: number) => new File([new Uint8Array(bytes)], name, { type });

function message(value: unknown) {
  const result = letterFileSchema.safeParse(value);
  return result.success ? null : result.error.issues[0].message;
}

describe("letterFileSchema", () => {
  it("accepts a PDF within the size limit", () => {
    expect(message(fileOfSize("surat.pdf", "application/pdf", 200 * 1024))).toBeNull();
    // some browsers leave the type empty; the extension is enough on the client
    expect(message(fileOfSize("SURAT.PDF", "", 1024))).toBeNull();
    expect(message(fileOfSize("pas.pdf", "application/pdf", LETTER_MAX_SIZE_MB * MB))).toBeNull();
  });

  it("rejects other formats", () => {
    expect(message(fileOfSize("surat.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 1024))).toBe(
      "Surat harus berformat PDF.",
    );
    expect(message(fileOfSize("surat.jpg", "image/jpeg", 1024))).toBe("Surat harus berformat PDF.");
  });

  it("rejects empty and oversized files", () => {
    expect(message(fileOfSize("kosong.pdf", "application/pdf", 0))).toBe("Berkas surat kosong. Pilih berkas lain.");
    expect(message(fileOfSize("besar.pdf", "application/pdf", LETTER_MAX_SIZE_MB * MB + 1))).toBe(
      `Ukuran surat maksimal ${LETTER_MAX_SIZE_MB} MB.`,
    );
  });

  it("asks for a file when none is given", () => {
    expect(message(null)).toBe("Pilih berkas surat peminjaman.");
  });
});
