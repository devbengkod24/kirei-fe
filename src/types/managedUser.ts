/** Borrower roles admin universitas manages here. Admin fakultas and operator accounts have no design yet. */
export type ManagedRole = "ormawa" | "dosen";

/** A borrower account as admin universitas sees it in Kelola Pengguna. */
export interface ManagedUser {
  id: string;
  role: ManagedRole;
  name: string;
  email: string;
  /** Dosen only. Ormawa belong to no faculty and may book rooms in any of them. */
  fakultasId: string | null;
  /** Dosen only: the staff number. */
  npp?: string;
  /** An inactive account cannot sign in. This is an admin decision, not a penalty. */
  isActive: boolean;
}
