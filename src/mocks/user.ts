import type { CurrentUser, UserRole } from "@/types/user";

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
  email: "admin.fakultas@example.com",
  role: "admin_fakultas",
  fakultasId: "fik",
};

const MOCK_USERS_BY_ROLE: Partial<Record<UserRole, CurrentUser>> = {
  ormawa: MOCK_CURRENT_USER,
  dosen: { ...MOCK_CURRENT_USER, role: "dosen" },
  admin_fakultas: MOCK_ADMIN_FAKULTAS,
};

export function mockUserFor(role: UserRole): CurrentUser {
  return MOCK_USERS_BY_ROLE[role] ?? { ...MOCK_CURRENT_USER, role, fakultasId: null };
}
