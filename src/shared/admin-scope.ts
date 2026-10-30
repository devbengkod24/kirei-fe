/**
 * Filter sent to the API for admin pages. Admin fakultas is always locked to its
 * faculty; admin universitas passes null for "all faculties". Laravel enforces the real limit.
 */
export interface AdminScope {
  fakultasId: string | null;
}
