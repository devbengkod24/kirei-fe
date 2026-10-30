import { describe, expect, it } from "vitest";
import { createRoomReservationSchema, type RoomReservationInput } from "./schema";

// 30 Oct 2026, 08:00 WIB
const schema = createRoomReservationSchema(() => new Date("2026-10-30T01:00:00Z"));
const letter = new File(["%PDF-1.7"], "surat.pdf", { type: "application/pdf" });

const valid: RoomReservationInput = {
  buildingId: "gedung-h",
  floorId: "gedung-h-5",
  date: "2026-10-30",
  startTime: "10:00",
  endTime: "12:00",
  roomId: "room-H.5.1",
  phone: "0857-1234-5612",
  purpose: "Rapat pengurus bulanan",
  letter,
  intent: "submit",
};

function issues(input: RoomReservationInput) {
  const result = schema.safeParse(input);
  return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), issue.message]));
}

describe("room reservation schema", () => {
  it("accepts a complete reservation and normalises the phone number", () => {
    const result = schema.parse(valid);
    expect(result.phone).toBe("085712345612");
    expect(result.purpose).toBe("Rapat pengurus bulanan");
  });

  it("requires a room and a later end time", () => {
    expect(issues({ ...valid, roomId: "" })).toMatchObject({ roomId: "Pilih ruangan pada denah." });
    expect(issues({ ...valid, endTime: "09:00" })).toMatchObject({ endTime: "Jam selesai harus setelah jam mulai." });
  });

  it("rejects a start time that has passed", () => {
    expect(issues({ ...valid, startTime: "07:00" })).toMatchObject({ startTime: expect.stringContaining("sudah lewat") });
    expect(issues({ ...valid, date: "2026-10-29" })).toHaveProperty("startTime");
  });

  it("checks the schedule even while phone and purpose are still empty", () => {
    // the summary dialog opens only after the schedule passes, before phone and purpose are filled
    const result = issues({ ...valid, phone: "", purpose: "", endTime: "09:00" });
    expect(result).toHaveProperty("endTime");
    expect(result).toHaveProperty("phone");
  });

  it("validates phone and purpose", () => {
    expect(issues({ ...valid, phone: "12345" })).toHaveProperty("phone");
    expect(issues({ ...valid, phone: "+6281234567890" })).not.toHaveProperty("phone");
    expect(issues({ ...valid, purpose: "  abc " })).toHaveProperty("purpose");
  });

  it("needs a PDF letter to submit, but not to save a draft", () => {
    expect(issues({ ...valid, letter: null })).toHaveProperty("letter");
    expect(issues({ ...valid, letter: null, intent: "draft" })).toEqual({});
    expect(issues({ ...valid, letter: new File(["x"], "surat.docx", { type: "application/msword" }) })).toMatchObject({
      letter: "Surat harus berformat PDF.",
    });
  });
});
