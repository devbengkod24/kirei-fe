import type { CurrentUser } from "@/types/user";

// Sample data from the Figma V3 mockup, used until the Laravel API is connected.
export const MOCK_CURRENT_USER: CurrentUser = {
  id: "usr-829102",
  name: "Nurudin Wafiq Mustaqim",
  email: "111202214797@mhs.dinus.ac.id",
  role: "ormawa",
  fakultasId: "fik",
};

export const MOCK_ADMIN_FAKULTAS: CurrentUser = {
  id: "usr-100231",
  name: "Adhitya Nugraha S.Kom, M.CS",
  email: "admin.fik@dinus.ac.id",
  role: "admin_fakultas",
  fakultasId: "fik",
};

/** Demo password for every mock account. Local development only. */
export const MOCK_PASSWORD = "kirei123";

/** Accounts the mock login accepts, one per role that has screens so far. */
export const MOCK_ACCOUNTS: CurrentUser[] = [
  MOCK_CURRENT_USER,
  {
    id: "usr-830001",
    name: "BEM Universitas",
    email: "bem@dinus.ac.id",
    role: "ormawa",
    fakultasId: null,
  },
  {
    id: "usr-512044",
    name: "Dr. Maria Lestari, M.Pd.",
    email: "maria.lestari@dsn.dinus.ac.id",
    role: "dosen",
    fakultasId: "fik",
  },
  MOCK_ADMIN_FAKULTAS,
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
