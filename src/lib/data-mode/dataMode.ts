/*
 * Which data the demo runs on while kirei-api is not connected:
 * - "sample": the seeded sample data in src/mocks plus whatever the tester adds on top;
 * - "empty": no seeded lists. Only master data stays (demo accounts, faculties, buildings and floor
 *   plans, the GOR, vehicles) and everything made in the UI is kept in this browser.
 *
 * The choice lives in a cookie so Server Components and Client Components read the same value. It
 * is not a secret and holds no user data. Remove this folder together with src/mocks.
 */
export type DataMode = "sample" | "empty";

export const DATA_MODE_COOKIE = "kirei_data_mode";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Anything but "empty" (no cookie, an old value) means the sample data. */
export function parseDataMode(value: string | undefined | null): DataMode {
  return value === "empty" ? "empty" : "sample";
}

/** The cookie as the browser has it; "sample" on the server and when cookies are blocked. */
export function readBrowserDataMode(): DataMode {
  try {
    if (typeof document === "undefined") return "sample";
    const entry = document.cookie.split("; ").find((item) => item.startsWith(`${DATA_MODE_COOKIE}=`));
    return parseDataMode(entry?.slice(DATA_MODE_COOKIE.length + 1));
  } catch {
    return "sample";
  }
}

/** Returns false when the browser refused the cookie. */
export function writeBrowserDataMode(mode: DataMode): boolean {
  try {
    document.cookie = `${DATA_MODE_COOKIE}=${mode}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
  } catch {
    return false;
  }
  return readBrowserDataMode() === mode;
}
