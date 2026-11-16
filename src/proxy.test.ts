import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MOCK_ADMIN_FAKULTAS, MOCK_CURRENT_USER, MOCK_PASSWORD, findMockAccount } from "@/mocks/user";
import { SESSION_COOKIE } from "@/lib/auth/session";
import { proxy } from "./proxy";

function request(path: string, sessionId?: string) {
  const req = new NextRequest(new URL(path, "http://localhost:3000"));
  if (sessionId) req.cookies.set(SESSION_COOKIE, sessionId);
  return req;
}

const location = (response: Response) => response.headers.get("location");

describe("proxy", () => {
  it("sends visitors without a session to the login page", () => {
    expect(location(proxy(request("/reservasi/riwayat")))).toBe("http://localhost:3000/login");
  });

  it("drops an unknown session cookie", () => {
    const response = proxy(request("/dashboard", "usr-unknown"));
    expect(location(response)).toBe("http://localhost:3000/login");
    expect(response.headers.get("set-cookie")).toContain(`${SESSION_COOKIE}=;`);
  });

  it("lets a visitor without a session open the login page", () => {
    expect(location(proxy(request("/login")))).toBeNull();
  });

  it("shows the landing page to a visitor without a session", () => {
    expect(location(proxy(request("/")))).toBeNull();
    expect(location(proxy(request("/", "usr-unknown")))).toBeNull();
  });

  it("sends a signed-in user from the login page and the root to their home", () => {
    expect(location(proxy(request("/login", MOCK_ADMIN_FAKULTAS.id)))).toBe("http://localhost:3000/fakultas/dashboard");
    expect(location(proxy(request("/", MOCK_CURRENT_USER.id)))).toBe("http://localhost:3000/dashboard");
  });

  it("lets a signed-in user through to other pages", () => {
    expect(location(proxy(request("/pengumuman", MOCK_CURRENT_USER.id)))).toBeNull();
  });
});

describe("proxy with AUTH_MODE=api", () => {
  afterEach(() => vi.unstubAllEnvs());

  function apiRequest(path: string, cookie?: string) {
    vi.stubEnv("AUTH_MODE", "api");
    const req = new NextRequest(new URL(path, "http://localhost:3000"));
    if (cookie) req.cookies.set(cookie, "x");
    return req;
  }

  it("sends visitors without Laravel's session cookie to the login page", () => {
    expect(location(proxy(apiRequest("/dashboard")))).toBe("http://localhost:3000/login");
    // the demo cookie means nothing in this mode
    expect(location(proxy(apiRequest("/dashboard", SESSION_COOKIE)))).toBe("http://localhost:3000/login");
  });

  it("lets a visitor open the landing and login pages, and a session through to the pages", () => {
    expect(location(proxy(apiRequest("/")))).toBeNull();
    expect(location(proxy(apiRequest("/login")))).toBeNull();
    expect(location(proxy(apiRequest("/login", "kirei_session")))).toBeNull();
    expect(location(proxy(apiRequest("/pengumuman", "kirei_session")))).toBeNull();
  });
});

describe("mock login accounts", () => {
  it("matches the email case-insensitively and needs the demo password", () => {
    expect(findMockAccount(" ADMIN.FIK@dinus.ac.id ", MOCK_PASSWORD)?.role).toBe("admin_fakultas");
    expect(findMockAccount(MOCK_ADMIN_FAKULTAS.email, "salah")).toBeNull();
    expect(findMockAccount("tidak.ada@dinus.ac.id", MOCK_PASSWORD)).toBeNull();
  });
});
