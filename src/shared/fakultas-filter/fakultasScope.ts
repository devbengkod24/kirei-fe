import type { AdminScope } from "@/shared/admin-scope";
import type { Fakultas } from "@/types/fakultas";

/** Query parameter that carries the faculty filter, e.g. `?fakultas=fik`. */
export const FAKULTAS_PARAM = "fakultas";

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Admin universitas scope from the URL. A missing or unknown faculty means all faculties,
 * so a stale link never shows an empty page.
 */
export function fakultasScopeFromSearchParams(searchParams: SearchParams, fakultas: Fakultas[]): AdminScope {
  const raw = searchParams[FAKULTAS_PARAM];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return { fakultasId: fakultas.some((item) => item.id === value) ? value! : null };
}
