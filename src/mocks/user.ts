import type { CurrentUser } from "@/types/user";

// Sample data from the Figma V3 mockup, used until the Laravel API is connected.
export const MOCK_CURRENT_USER: CurrentUser = {
  id: "usr-829102",
  name: "Nurudin Wafiq Mustaqim",
  email: "111202214797@mhs.dinus.ac.id",
  role: "ormawa",
  // Ormawa belong to no faculty; they may book rooms in any of them.
  fakultasId: null,
};

export const MOCK_ADMIN_FAKULTAS: CurrentUser = {
  id: "usr-100231",
  name: "Adhitya Nugraha S.Kom, M.CS",
  email: "admin.fik@dinus.ac.id",
  role: "admin_fakultas",
  fakultasId: "fik",
};

export const MOCK_ADMIN_UNIVERSITAS: CurrentUser = {
  id: "usr-100001",
  name: "Rahmat Hidayat, S.Kom., M.Kom.",
  email: "admin.univ@dinus.ac.id",
  role: "admin_universitas",
  fakultasId: null,
};

/** Demo password for every mock account. Local development only. */
export const MOCK_PASSWORD = "kirei123";

/** Accounts the mock login accepts, one per role that has screens so far. */
export const MOCK_ACCOUNTS: CurrentUser[] = [
  MOCK_CURRENT_USER,
  {
    id: "usr-512044",
    name: "Dr. Maria Lestari, M.Pd.",
    email: "maria.lestari@dsn.dinus.ac.id",
    role: "dosen",
    fakultasId: "fik",
  },
    MOCK_ADMIN_FAKULTAS,
  MOCK_ADMIN_UNIVERSITAS,
  {
    id: "usr-700512",
    name: "Budi Hartono",
    email: "operator.h5@dinus.ac.id",
    role: "operator",
    fakultasId: "fik",
  },
];

export function findMockAccount(email: string, password: string): CurrentUser | null {
  const account = MOCK_ACCOUNTS.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
  return account && password === MOCK_PASSWORD ? account : null;
}

export function findMockUserById(id: string | undefined): CurrentUser | null {
  return MOCK_ACCOUNTS.find((user) => user.id === id) ?? null;
}
