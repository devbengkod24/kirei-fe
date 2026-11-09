import { describe, expect, it } from "vitest";
import { parseApiUser, parseSetCookie } from "./laravel";

describe("parseSetCookie", () => {
  it("reads the name, the decoded value, and the options", () => {
    const cookie = parseSetCookie(
      "kirei_session=abc%3D%3D; expires=Wed, 11 Nov 2026 10:00:00 GMT; Max-Age=7200; path=/; domain=localhost; httponly; samesite=lax",
    );
    expect(cookie).toMatchObject({
      name: "kirei_session",
      value: "abc==",
      options: { path: "/", maxAge: 7200, httpOnly: true, sameSite: "lax" },
    });
    expect(cookie.options.expires?.toISOString()).toBe("2026-11-11T10:00:00.000Z");
    // the cookie belongs to the Next host, so Laravel's Domain is dropped
    expect(cookie.options).not.toHaveProperty("domain");
  });

  it("keeps a script-readable cookie readable, like XSRF-TOKEN", () => {
    expect(parseSetCookie("XSRF-TOKEN=tok%2Fen; path=/; samesite=lax").options.httpOnly).toBeUndefined();
  });
});

describe("parseApiUser", () => {
  const user = { id: 7, name: "Budi", email: "budi@dinus.ac.id", role: "operator", faculty_id: 3 };

  it("reads the ApiResponse envelope and maps faculty_id to fakultasId", () => {
    expect(parseApiUser({ success: true, message: "ok", data: user, errors: null })).toEqual({
      id: "7",
      name: "Budi",
      email: "budi@dinus.ac.id",
      role: "operator",
      fakultasId: "3",
    });
  });

  it("accepts a bare user and a missing faculty", () => {
    expect(parseApiUser({ ...user, role: "admin_universitas", faculty_id: null, avatar_url: "/a.png" })).toMatchObject({
      role: "admin_universitas",
      fakultasId: null,
      avatarUrl: "/a.png",
    });
  });

  it("rejects an unknown role or a body that is not a user", () => {
    expect(parseApiUser({ data: { ...user, role: "superadmin" } })).toBeNull();
    expect(parseApiUser(undefined)).toBeNull();
  });
});
