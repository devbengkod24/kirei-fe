import type { ManagedUser } from "@/types/managedUser";

// Ormawa names follow the Figma V3 "kelola pengguna" frame; the rest are sample data.
// Ormawa have no faculty; only dosen belong to one.
const ORMAWA: [string, string, boolean][] = [
  ["Dian Nuswantoro Computer Club", "dncc@dinus.ac.id", true],
  ["BEM Universitas", "bem@dinus.ac.id", true],
  ["UKM Bulu Tangkis", "ukm.badminton@dinus.ac.id", true],
  ["UKM Futsal", "ukm.futsal@dinus.ac.id", false],
  ["Engineering Society", "engsociety@dinus.ac.id", true],
  ["Art and Design Club", "artdesignclub@dinus.ac.id", false],
  ["Robotics Enthusiasts", "roboticsclub@dinus.ac.id", true],
  ["HMTI", "hmti@dinus.ac.id", true],
  ["Himpunan Mahasiswa Sistem Informasi", "hmsi@dinus.ac.id", true],
  ["Himpunan Mahasiswa Manajemen", "hmm@dinus.ac.id", true],
  ["Himpunan Mahasiswa Akuntansi", "hima.akuntansi@dinus.ac.id", true],
  ["Himpunan Mahasiswa Kesehatan Masyarakat", "hmkm@dinus.ac.id", true],
];

const DOSEN: [string, string, string, string, boolean][] = [
  ["Dr. Hendra Gunawan, S.Kom", "hendra.gunawan@dsn.dinus.ac.id", "19820411", "fik", true],
  ["Dr. Maria Lestari, M.Pd.", "maria.lestari@dsn.dinus.ac.id", "19800521", "fik", true],
  ["Prof. Dr. Aris Marjuni, S.Si., M.Kom.", "aris.marjuni@dsn.dinus.ac.id", "19750312", "fik", true],
  ["Ir. Budi Santoso, M.T.", "budi.santoso@dsn.dinus.ac.id", "19781109", "ft", true],
  ["Dr. Siti Nurhaliza, M.A.", "siti.nurhaliza@dsn.dinus.ac.id", "19850217", "fib", true],
  ["Dr. Rina Sari, M.Pd.", "rina.sari@dsn.dinus.ac.id", "19830704", "fib", false],
  ["Dr. Lisa Ananda, M.A.", "lisa.ananda@dsn.dinus.ac.id", "19870915", "feb", true],
  ["Dr. Bambang Wijaya, S.E., M.M.", "bambang.wijaya@dsn.dinus.ac.id", "19790602", "feb", true],
  ["dr. Ayu Pratiwi, M.Kes.", "ayu.pratiwi@dsn.dinus.ac.id", "19880120", "fkes", true],
  ["dr. Fajar Nugroho, Sp.PD.", "fajar.nugroho@dsn.dinus.ac.id", "19760830", "fk", false],
];

// A faculty may have more than one admin.
const ADMIN_FAKULTAS: [string, string, string, boolean][] = [
  ["Adhitya Nugraha S.Kom, M.CS", "admin.fik@dinus.ac.id", "fik", true],
  ["Rina Kartika, S.Kom.", "rina.kartika@dinus.ac.id", "fik", true],
  ["Dewi Anggraini, S.E.", "admin.feb@dinus.ac.id", "feb", true],
  ["Taufik Hidayat, S.S.", "admin.fib@dinus.ac.id", "fib", false],
  ["Yusuf Prasetyo, S.T.", "admin.ft@dinus.ac.id", "ft", true],
];

// Floors from mocks/facilities.ts; each operator looks after one floor.
const OPERATORS: [string, string, string, string, boolean][] = [
  ["Agus Setiawan", "agus.setiawan@dinus.ac.id", "gedung-h", "gedung-h-5", true],
  ["Budi Hartono", "budi.hartono@dinus.ac.id", "gedung-h", "gedung-h-7", true],
  ["Sri Wahyuni", "sri.wahyuni@dinus.ac.id", "gedung-e", "gedung-e-2", true],
  ["Joko Susilo", "joko.susilo@dinus.ac.id", "gedung-rektorat", "gedung-rektorat-1", false],
];

export const MOCK_MANAGED_USERS: ManagedUser[] = [
  ...ORMAWA.map(([name, email, isActive], index): ManagedUser => ({
    id: `ormawa-${index + 1}`,
    role: "ormawa",
    name,
    email,
    fakultasId: null,
    isActive,
  })),
  ...DOSEN.map(([name, email, npp, fakultasId, isActive], index): ManagedUser => ({
    id: `dosen-${index + 1}`,
    role: "dosen",
    name,
    email,
    npp,
    fakultasId,
    isActive,
  })),
  ...ADMIN_FAKULTAS.map(([name, email, fakultasId, isActive], index): ManagedUser => ({
    id: `admin-fakultas-${index + 1}`,
    role: "admin_fakultas",
    name,
    email,
    fakultasId,
    isActive,
  })),
  ...OPERATORS.map(([name, email, buildingId, floorId, isActive], index): ManagedUser => ({
    id: `operator-${index + 1}`,
    role: "operator",
    name,
    email,
    fakultasId: null,
    floor: { buildingId, floorId },
    isActive,
  })),
];
