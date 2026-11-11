import { describe, expect, it } from "vitest";
import {
  createRoomReservationSchema,
  createSportsHallReservationSchema,
  createVehicleReservationSchema,
  type RoomReservationInput,
  type SportsHallReservationInput,
  type VehicleReservationInput,
} from "./schema";

// 30 Oct 2026, 08:00 WIB
const schema = createRoomReservationSchema(() => new Date("2026-10-30T01:00:00Z"));
const letter = new File(["%PDF-1.7"], "surat.pdf", { type: "application/pdf" });

// Ormawa and UKM ("request" mode) book from H-2, so the base reservation is on 1 Nov.
const valid: RoomReservationInput = {
  buildingId: "gedung-h",
  floorId: "gedung-h-5",
  date: "2026-11-01",
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
    expect(issues({ ...valid, date: "2026-10-30", startTime: "07:00" })).toMatchObject({ startTime: expect.stringContaining("sudah lewat") });
    expect(issues({ ...valid, date: "2026-10-29" })).toHaveProperty("startTime");
  });

  it("keeps room bookings within 07.00 to 20.00 WIB", () => {
    const message = "Ruangan hanya bisa dipesan pukul 07.00 sampai 20.00 WIB.";
    expect(issues({ ...valid, startTime: "06:50", endTime: "08:00" })).toMatchObject({ startTime: message });
    expect(issues({ ...valid, startTime: "19:00", endTime: "20:10" })).toMatchObject({ endTime: message });
    expect(issues({ ...valid, startTime: "07:00", endTime: "20:00" })).toEqual({});
  });

  it("keeps ormawa and UKM off today and tomorrow (H-0, H-1)", () => {
    const message = "Ormawa dan UKM tidak bisa memesan untuk hari ini dan besok. Pilih tanggal lusa atau setelahnya.";
    expect(issues({ ...valid, date: "2026-10-30", startTime: "13:00", endTime: "15:00" })).toMatchObject({ date: message });
    expect(issues({ ...valid, date: "2026-10-31" })).toMatchObject({ date: message });
    expect(issues({ ...valid, date: "2026-11-01" })).toEqual({});
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

describe("room reservation schema without a loan letter", () => {
  // borrowers such as dosen send the request without a letter, but it still goes to the admin
  const letterlessSchema = createRoomReservationSchema(() => new Date("2026-10-30T01:00:00Z"), "request_without_letter");

  it("sends without a letter", () => {
    expect(letterlessSchema.safeParse({ ...valid, letter: null }).success).toBe(true);
  });

  it("still needs a phone number", () => {
    const result = letterlessSchema.safeParse({ ...valid, phone: "", letter: null });
    const paths = result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
    expect(paths).toContain("phone");
    expect(paths).not.toContain("letter");
  });
});

describe("room reservation schema for an admin booking", () => {
  // admins book for the faculty: no phone and no loan letter
  const adminSchema = createRoomReservationSchema(() => new Date("2026-10-30T01:00:00Z"), "internal");

  it("accepts a booking without phone or letter", () => {
    expect(adminSchema.safeParse({ ...valid, phone: "", letter: null }).success).toBe(true);
  });

  it("still checks the schedule, room, and purpose", () => {
    const result = adminSchema.safeParse({ ...valid, phone: "", letter: null, roomId: "", purpose: "" });
    const paths = result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
    expect(paths).toEqual(expect.arrayContaining(["roomId", "purpose"]));
    expect(paths).not.toContain("phone");
    expect(paths).not.toContain("letter");
  });
});

describe("GOR reservation schema", () => {
  const gorSchema = createSportsHallReservationSchema(() => new Date("2026-10-30T01:00:00Z"));
  const validGor: SportsHallReservationInput = {
    date: "2026-11-01",
    startTime: "10:00",
    endTime: "12:00",
    activity: "Badminton",
    notes: "",
    letter,
    intent: "submit",
  };
  const gorIssues = (input: SportsHallReservationInput) => {
    const result = gorSchema.safeParse(input);
    return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), issue.message]));
  };

  it("accepts slots picked on the grid with optional notes", () => {
    expect(gorIssues(validGor)).toEqual({});
  });

  it("asks for a slot and an activity", () => {
    expect(gorIssues({ ...validGor, startTime: "", endTime: "" })).toMatchObject({ startTime: "Pilih jam pada jadwal." });
    expect(gorIssues({ ...validGor, activity: "" })).toMatchObject({ activity: "Pilih jenis kegiatan." });
  });

  it("rejects a slot that has started and keeps the letter rule", () => {
    expect(gorIssues({ ...validGor, date: "2026-10-30", startTime: "07:00", endTime: "09:00" })).toHaveProperty("startTime");
    expect(gorIssues({ ...validGor, letter: null })).toHaveProperty("letter");
    expect(gorIssues({ ...validGor, letter: null, intent: "draft" })).toEqual({});
  });

  it("keeps ormawa and UKM off today and tomorrow, but not other borrowers", () => {
    const message = "Ormawa dan UKM tidak bisa memesan untuk hari ini dan besok. Pilih tanggal lusa atau setelahnya.";
    expect(gorIssues({ ...validGor, date: "2026-10-31" })).toMatchObject({ date: message });
    const dosenGor = createSportsHallReservationSchema(() => new Date("2026-10-30T01:00:00Z"), "request_without_letter");
    expect(dosenGor.safeParse({ ...validGor, date: "2026-10-31", letter: null }).success).toBe(true);
  });

  it("caps a booking at 2 hours and 14 days ahead", () => {
    expect(gorIssues({ ...validGor, startTime: "10:00", endTime: "13:00" })).toMatchObject({
      endTime: "Satu reservasi GOR maksimal 2 jam.",
    });
    // 30 Oct is day 1, so 12 Nov is the last day that can be booked
    expect(gorIssues({ ...validGor, date: "2026-11-12" })).toEqual({});
    expect(gorIssues({ ...validGor, date: "2026-11-13" })).toHaveProperty("date");
  });
});

describe("vehicle reservation schema", () => {
  const vehicleSchema = createVehicleReservationSchema(() => "2026-10-30");
  const validVehicle: VehicleReservationInput = {
    phone: "0857 1112 11",
    destination: "Bali",
    participants: "12",
    activity: "Kunjungan studi mahasiswa teknik informatika",
    startDate: "2026-10-30",
    endDate: "2026-10-31",
    letter,
    intent: "submit",
  };
  const vehicleIssues = (input: VehicleReservationInput) => {
    const result = vehicleSchema.safeParse(input);
    return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), issue.message]));
  };

  it("accepts a trip and turns the participant count into a number", () => {
    const result = vehicleSchema.parse(validVehicle);
    expect(result.participants).toBe(12);
    expect(result.phone).toBe("0857111211");
  });

  it("allows a one-day trip but not one that ends before it starts", () => {
    expect(vehicleIssues({ ...validVehicle, endDate: "2026-10-30" })).toEqual({});
    expect(vehicleIssues({ ...validVehicle, endDate: "2026-10-29" })).toMatchObject({
      endDate: "Tanggal selesai tidak boleh sebelum tanggal mulai.",
    });
    expect(vehicleIssues({ ...validVehicle, startDate: "2026-10-29" })).toMatchObject({ startDate: "Tanggal mulai sudah lewat." });
  });

  it("asks a borrower without drafts for the letter without offering a draft", () => {
    const noDraft = createVehicleReservationSchema(() => "2026-10-30", "request_without_draft");
    const result = noDraft.safeParse({ ...validVehicle, letter: null });
    expect(result.error?.issues.map((issue) => issue.message)).toEqual(["Unggah surat peminjaman untuk memesan."]);
    expect(vehicleIssues({ ...validVehicle, letter: null })).toMatchObject({
      letter: "Unggah surat peminjaman untuk memesan, atau simpan sebagai draft dan unggah nanti.",
    });
  });

  it("needs at least one participant as a whole number", () => {
    expect(vehicleIssues({ ...validVehicle, participants: "" })).toMatchObject({ participants: "Jumlah peserta minimal 1." });
    expect(vehicleIssues({ ...validVehicle, participants: "2.5" })).toMatchObject({ participants: "Jumlah peserta harus bilangan bulat." });
    expect(vehicleIssues({ ...validVehicle, participants: "dua" })).toHaveProperty("participants");
  });

  it("checks the destination and activity text", () => {
    expect(vehicleIssues({ ...validVehicle, destination: "  " })).toHaveProperty("destination");
    expect(vehicleIssues({ ...validVehicle, activity: "Tur" })).toHaveProperty("activity");
  });
});

describe("internal bookings by an admin", () => {
  const issues = (result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }) =>
    result.success ? {} : Object.fromEntries(result.error!.issues.map((issue) => [issue.path.join("."), issue.message]));

  it("books the GOR without a letter", () => {
    const gorSchema = createSportsHallReservationSchema(() => new Date("2026-10-30T01:00:00Z"), "internal");
    const booking: SportsHallReservationInput = {
      date: "2026-10-30",
      startTime: "10:00",
      endTime: "12:00",
      activity: "Futsal",
      notes: "",
      letter: null,
      intent: "submit",
    };
    expect(issues(gorSchema.safeParse(booking))).toEqual({});
  });

  it("books a trip without phone or letter", () => {
    const vehicleSchema = createVehicleReservationSchema(() => "2026-10-30", "internal");
    const trip: VehicleReservationInput = {
      phone: "",
      destination: "Yogyakarta",
      participants: "30",
      activity: "Studi banding pimpinan",
      startDate: "2026-10-31",
      endDate: "2026-11-01",
      letter: null,
      intent: "submit",
    };
    expect(issues(vehicleSchema.safeParse(trip))).toEqual({});
  });

  it("asks a borrower for a trip, not a vehicle", () => {
    const requestSchema = createVehicleReservationSchema(() => "2026-10-30");
    const result = requestSchema.safeParse({
      phone: "081234567890",
      destination: "Yogyakarta",
      participants: "30",
      activity: "Studi banding himpunan",
      startDate: "2026-10-31",
      endDate: "2026-11-01",
      letter,
      intent: "submit",
    });
    expect(issues(result)).toEqual({});
  });
});
