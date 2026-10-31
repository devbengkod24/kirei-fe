import { MOCK_FAKULTAS } from "@/mocks/fakultas";
import type { Fakultas } from "@/types/fakultas";

export async function getFakultasOptions(): Promise<Fakultas[]> {
  // TODO: replace with the orval client for faculties (rarely changes, so it may be cached).
  return MOCK_FAKULTAS;
}
