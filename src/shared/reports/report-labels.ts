import type { ReportCategory, ReporterType } from "@/types/report";

export const REPORT_CATEGORY_LABEL: Record<ReportCategory, string> = {
  kesalahan_sistem: "Kesalahan Sistem",
  kerusakan_alat: "Kerusakan Alat",
  lainnya: "Lainnya",
};

export const REPORTER_TYPE_LABEL: Record<ReporterType, string> = {
  staf: "Staf",
  mahasiswa: "Mahasiswa",
};
