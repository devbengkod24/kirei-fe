/** Accounts admin universitas manages in Kelola Pengguna. Values follow the API roles. */
export type ManagedRole = "ormawa" | "dosen" | "admin_fakultas" | "operator";

/** Where an operator works: one floor in one building. */
export interface FloorAssignment {
  buildingId: string;
  floorId: string;
}

/** An account as admin universitas sees it in Kelola Pengguna. */
export interface ManagedUser {
  id: string;
  role: ManagedRole;
  name: string;
  email: string;
  /** Dosen and admin fakultas only. Ormawa belong to no faculty and may book rooms in any of them. */
  fakultasId: string | null;
  /** Dosen only: the staff number. */
  npp?: string;
  /** Operator only. */
  floor?: FloorAssignment;
  /** An inactive account cannot sign in. This is an admin decision, not a penalty. */
  isActive: boolean;
}
