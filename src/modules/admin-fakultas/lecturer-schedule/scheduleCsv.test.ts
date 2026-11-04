import { describe, expect, it } from "vitest";
import { parseScheduleCsv, semesterSchema } from "./scheduleCsv";

const ROOMS = ["H.5.1", "H.5.2"];
const HEADER = "hari,jam_mulai,jam_selesai,ruangan,mata_kuliah,dosen";

describe("parseScheduleCsv", () => {
  it("reads valid rows, normalizing day names, times, and room codes", () => {
    const result = parseScheduleCsv(`${HEADER}\nSenin,7.30,09:10,h.5.1,Basis Data,"Dr. Rina Sari, M.Kom"\nJUMAT,13:00,15:30,H.5.2,Jaringan,Budi`, ROOMS);

    expect(result.errors).toEqual([]);
    expect(result.entries).toEqual([
      { day: 1, startTime: "07:30", endTime: "09:10", roomCode: "H.5.1", courseName: "Basis Data", lecturerName: "Dr. Rina Sari, M.Kom" },
      { day: 5, startTime: "13:00", endTime: "15:30", roomCode: "H.5.2", courseName: "Jaringan", lecturerName: "Budi" },
    ]);
  });

  it("accepts the columns in any order", () => {
    const result = parseScheduleCsv("dosen;ruangan;hari;jam_mulai;jam_selesai;mata_kuliah\nBudi;H.5.1;Rabu;08:00;10:00;Algoritma", ROOMS);
    expect(result.entries).toEqual([
      { day: 3, startTime: "08:00", endTime: "10:00", roomCode: "H.5.1", courseName: "Algoritma", lecturerName: "Budi" },
    ]);
  });

  it("reports every problem with its row and keeps the valid rows", () => {
    const result = parseScheduleCsv(
      [HEADER, "Senin,08:00,10:00,H.5.1,Basis Data,Rina", "Senen,25:00,10:00,H.9.9,,Rina", "Selasa,10:00,09:00,H.5.2,Jaringan,Budi"].join("\n"),
      ROOMS,
    );

    expect(result.entries).toHaveLength(1);
    expect(result.errors).toEqual([
      {
        row: 3,
        messages: [
          "Hari harus Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, atau Minggu.",
          "Jam mulai harus berformat JJ:MM, misalnya 07:30.",
          "Ruangan tidak ada di gedung fakultas ini.",
          "Mata kuliah wajib diisi.",
        ],
      },
      { row: 4, messages: ["Jam selesai harus setelah jam mulai."] },
    ]);
  });

  it("rejects a row that overlaps an earlier one in the same room and day", () => {
    const result = parseScheduleCsv(`${HEADER}\nSenin,08:00,10:00,H.5.1,Basis Data,Rina\nSenin,09:00,11:00,H.5.1,Jaringan,Budi`, ROOMS);
    expect(result.errors).toEqual([{ row: 3, messages: ["Bentrok dengan baris 2: ruangan dan jam yang sama."] }]);
  });

  it("explains an empty file, missing columns, or a file with only the header", () => {
    expect(parseScheduleCsv("", ROOMS).errors[0].messages).toEqual(["Berkas CSV kosong."]);
    expect(parseScheduleCsv("hari,ruangan\nSenin,H.5.1", ROOMS).errors[0].messages).toEqual([
      "Kolom jam_mulai, jam_selesai, mata_kuliah, dosen tidak ada di baris judul.",
    ]);
    expect(parseScheduleCsv(HEADER, ROOMS).errors[0].messages).toEqual(["Belum ada jadwal di bawah baris judul."]);
  });
});

describe("semesterSchema", () => {
  it("needs both dates with the end after the start", () => {
    expect(semesterSchema.safeParse({ startDate: "2026-09-01", endDate: "2027-01-31" }).success).toBe(true);
    expect(semesterSchema.safeParse({ startDate: "2026-09-01", endDate: "2026-09-01" }).error?.issues[0].message).toBe(
      "Tanggal selesai harus setelah tanggal mulai.",
    );
  });
});
