import { describe, expect, it } from "vitest";
import { parseScheduleCsv, semesterSchema } from "./scheduleCsv";

const ROOMS = ["H.5.1", "H.5.2"];
const HEADER = "hari,slot_sks,jumlah_sks,ruangan,mata_kuliah,dosen,kelompok";

describe("parseScheduleCsv", () => {
  it("reads valid SKS rows, deriving WIB times and normalizing day names and room codes", () => {
    const result = parseScheduleCsv(
      `${HEADER}\nSenin,1,3,h.5.1,Basis Data,"Dr. Rina Sari, M.Kom",A11.4301\nJUMAT,8,2,H.5.2,Jaringan,Budi,A11.4302`,
      ROOMS,
    );

    expect(result.errors).toEqual([]);
    expect(result.entries).toEqual([
      {
        day: 1,
        sksSlot: 1,
        sksCount: 3,
        startTime: "07:00",
        endTime: "09:30",
        roomCode: "H.5.1",
        courseName: "Basis Data",
        lecturerName: "Dr. Rina Sari, M.Kom",
        classGroup: "A11.4301",
      },
      {
        day: 5,
        sksSlot: 8,
        sksCount: 2,
        startTime: "13:20",
        endTime: "15:00",
        roomCode: "H.5.2",
        courseName: "Jaringan",
        lecturerName: "Budi",
        classGroup: "A11.4302",
      },
    ]);
  });

  it("accepts the columns in any order", () => {
    const result = parseScheduleCsv(
      "kelompok;dosen;ruangan;hari;slot_sks;jumlah_sks;mata_kuliah\nA11.4101;Budi;H.5.1;Rabu;2;2;Algoritma",
      ROOMS,
    );
    expect(result.entries).toEqual([
      {
        day: 3,
        sksSlot: 2,
        sksCount: 2,
        startTime: "07:50",
        endTime: "09:30",
        roomCode: "H.5.1",
        courseName: "Algoritma",
        lecturerName: "Budi",
        classGroup: "A11.4101",
      },
    ]);
  });

  it("reports every problem with its row and keeps the valid rows", () => {
    const result = parseScheduleCsv(
      [
        HEADER,
        "Senin,1,3,H.5.1,Basis Data,Rina,A11.4301",
        "Senen,0,2,H.9.9,,Rina,",
        "Selasa,15,3,H.5.2,Jaringan,Budi,A11.4302",
      ].join("\n"),
      ROOMS,
    );

    expect(result.entries).toHaveLength(1);
    expect(result.errors).toEqual([
      {
        row: 3,
        messages: [
          "Hari harus Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, atau Minggu.",
          "Slot SKS harus antara 1 sampai 15.",
          "Ruangan tidak ada di gedung ini.",
          "Mata kuliah wajib diisi.",
          "Kelompok wajib diisi.",
        ],
      },
      { row: 4, messages: ["Slot SKS melebihi batas jam operasional (maksimal slot 15)."] },
    ]);
  });

  it("rejects a row that overlaps an earlier one in the same room, day, and SKS slot", () => {
    const result = parseScheduleCsv(
      `${HEADER}\nSenin,1,3,H.5.1,Basis Data,Rina,A11.4301\nSenin,3,2,H.5.1,Jaringan,Budi,A11.4302`,
      ROOMS,
    );
    expect(result.errors).toEqual([{ row: 3, messages: ["Bentrok dengan baris 2: ruangan dan slot SKS yang sama."] }]);
  });

  it("explains an empty file, missing columns, or a file with only the header", () => {
    expect(parseScheduleCsv("", ROOMS).errors[0].messages).toEqual(["Berkas CSV kosong."]);
    expect(parseScheduleCsv("hari,ruangan\nSenin,H.5.1", ROOMS).errors[0].messages).toEqual([
      "Kolom slot_sks, jumlah_sks, mata_kuliah, dosen, kelompok tidak ada di baris judul.",
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
