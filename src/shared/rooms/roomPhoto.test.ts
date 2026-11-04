import { describe, expect, it } from "vitest";
import { roomPhotoSchema } from "./roomPhoto";

const file = (name: string, type: string, size: number) => new File([new Uint8Array(size)], name, { type });
const message = (value: unknown) => roomPhotoSchema.safeParse(value).error?.issues[0]?.message;

describe("room photo", () => {
  it("accepts a JPG, PNG, or WebP up to 2 MB", () => {
    expect(roomPhotoSchema.safeParse(file("ruang.jpg", "image/jpeg", 1024)).success).toBe(true);
    expect(roomPhotoSchema.safeParse(file("ruang.webp", "image/webp", 2 * 1024 * 1024)).success).toBe(true);
  });

  it("rejects other formats, empty files, and files over the limit", () => {
    expect(message(file("ruang.gif", "image/gif", 1024))).toBe("Foto harus berformat JPG, PNG, atau WebP.");
    expect(message(file("ruang.png", "image/png", 0))).toBe("Berkas foto kosong. Pilih berkas lain.");
    expect(message(file("ruang.png", "image/png", 2 * 1024 * 1024 + 1))).toBe("Ukuran foto maksimal 2 MB.");
  });
});
