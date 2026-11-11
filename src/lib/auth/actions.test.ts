import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MOCK_ADMIN_FAKULTAS, MOCK_CURRENT_USER, MOCK_PASSWORD } from "@/mocks/user";
import { SESSION_COOKIE } from "./session";

const cookieStore = { set: vi.fn(), delete: vi.fn(), getAll: vi.fn(() => [] as { name: string; value: string }[]) };
vi.mock("next/headers", () => ({ cookies: async () => cookieStore }));
vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    throw new Error(`redirect:${path}`);
  },
}));

const { login, logout, quickLogin } = await import("./actions");

beforeEach(() => {
  cookieStore.set.mockClear();
  cookieStore.delete.mockClear();
  cookieStore.getAll.mockReturnValue([]);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("login", () => {
  it("sets the session cookie and redirects to the role's home", async () => {
    await expect(login({ email: MOCK_ADMIN_FAKULTAS.email, password: MOCK_PASSWORD })).rejects.toThrow(
      "redirect:/fakultas/dashboard",
    );
    expect(cookieStore.set).toHaveBeenCalledWith(
      SESSION_COOKIE,
      MOCK_ADMIN_FAKULTAS.id,
      expect.objectContaining({ httpOnly: true, sameSite: "lax", path: "/" }),
    );
  });

  it("returns an error under the email field and sets no cookie for a wrong password", async () => {
    const result = await login({ email: MOCK_ADMIN_FAKULTAS.email, password: "salah" });
    expect(result.error).toBe("Email atau kata sandi salah.");
    expect(result.validation?.errors.email).toEqual(["Email atau kata sandi salah."]);
    expect(cookieStore.set).not.toHaveBeenCalled();
  });
});

describe("quickLogin", () => {
  it("signs in as the chosen demo account", async () => {
    await expect(quickLogin(MOCK_CURRENT_USER.id)).rejects.toThrow("redirect:/dashboard");
    expect(cookieStore.set).toHaveBeenCalledWith(SESSION_COOKIE, MOCK_CURRENT_USER.id, expect.anything());
  });

  it("sends an unknown account back to the login page without a session", async () => {
    await expect(quickLogin("usr-unknown")).rejects.toThrow("redirect:/login");
    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  it("does nothing when the app signs in against Laravel", async () => {
    vi.stubEnv("AUTH_MODE", "api");
    await expect(quickLogin(MOCK_CURRENT_USER.id)).rejects.toThrow("redirect:/login");
    expect(cookieStore.set).not.toHaveBeenCalled();
  });
});

describe("logout", () => {
  it("clears the session cookie and goes to the login page", async () => {
    await expect(logout()).rejects.toThrow("redirect:/login");
    expect(cookieStore.delete).toHaveBeenCalledWith(SESSION_COOKIE);
  });
});

describe("with AUTH_MODE=api", () => {
  const json = (status: number, body: unknown, setCookie: string[] = []) => {
    const headers = new Headers({ "Content-Type": "application/json" });
    for (const cookie of setCookie) headers.append("Set-Cookie", cookie);
    return new Response(JSON.stringify(body), { status, headers });
  };
  const USER = { success: true, message: "ok", data: { id: 1, name: "Rahmat", email: "admin.univ@dinus.ac.id", role: "admin_universitas", faculty_id: null }, errors: null };
  const CREDENTIALS = { email: "admin.univ@dinus.ac.id", password: "rahasia" };

  const fakeLaravel = (login: Response) => {
    const calls: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        if (url.endsWith("/sanctum/csrf-cookie")) {
          return new Response(null, { status: 204, headers: { "Set-Cookie": "XSRF-TOKEN=tok%3D; path=/" } });
        }
        if (url.endsWith("/login")) return login;
        if (url.endsWith("/api/user")) return json(200, USER);
        return new Response(null, { status: 204 });
      }),
    );
    return calls;
  };

  beforeEach(() => vi.stubEnv("AUTH_MODE", "api"));

  it("gets the CSRF cookie first, posts the credentials with the token, and forwards the session", async () => {
    const calls = fakeLaravel(json(200, { success: true }, ["kirei_session=sess; path=/; httponly"]));

    await expect(login(CREDENTIALS)).rejects.toThrow("redirect:/admin/dashboard");

    expect(calls.map((call) => new URL(call.url).pathname)).toEqual(["/sanctum/csrf-cookie", "/login", "/api/user"]);
    const post = new Headers(calls[1].init.headers);
    expect(post.get("X-XSRF-TOKEN")).toBe("tok=");
    expect(post.get("Origin")).toBe("http://localhost:3000");
    expect(JSON.parse(String(calls[1].init.body))).toEqual(CREDENTIALS);
    // the session set by /login is what /api/user is asked with
    expect(new Headers(calls[2].init.headers).get("Cookie")).toContain("kirei_session=sess");
    expect(cookieStore.set).toHaveBeenCalledWith("kirei_session", "sess", expect.objectContaining({ httpOnly: true }));
    expect(cookieStore.set).toHaveBeenCalledWith("XSRF-TOKEN", "tok=", expect.anything());
    expect(cookieStore.set).not.toHaveBeenCalledWith(SESSION_COOKIE, expect.anything(), expect.anything());
  });

  it("returns Laravel's 422 field errors for the form", async () => {
    const body = { message: "Data tidak valid.", errors: { email: ["Email tidak terdaftar."] } };
    fakeLaravel(json(422, body));
    await expect(login(CREDENTIALS)).resolves.toEqual({ error: "Data tidak valid.", validation: body });
    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  it("puts a 401 under the email field", async () => {
    fakeLaravel(json(401, { message: "Unauthenticated." }));
    const result = await login(CREDENTIALS);
    expect(result.validation?.errors.email).toEqual(["Email atau kata sandi salah."]);
  });

  it("explains an expired CSRF token, a rate limit, and a server error", async () => {
    fakeLaravel(json(419, {}));
    expect((await login(CREDENTIALS)).error).toMatch(/kedaluwarsa/);
    fakeLaravel(json(429, {}));
    expect((await login(CREDENTIALS)).error).toMatch(/Terlalu banyak/);
    fakeLaravel(json(500, {}));
    expect((await login(CREDENTIALS)).error).toMatch(/bermasalah/);
  });

  it("reports an unreachable backend without setting a session", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("fetch failed"))));
    await expect(login(CREDENTIALS)).resolves.toEqual({ error: "Server tidak dapat dihubungi. Coba lagi nanti." });
    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  it("posts /logout with the browser's cookies, forwards Laravel's answer, then leaves", async () => {
    cookieStore.getAll.mockReturnValue([
      { name: "kirei_session", value: "sess" },
      { name: "XSRF-TOKEN", value: "tok=" },
    ]);
    const calls: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return new Response(null, { status: 204, headers: { "Set-Cookie": "kirei_session=; Max-Age=0; path=/" } });
      }),
    );

    await expect(logout()).rejects.toThrow("redirect:/login");

    const request = calls.at(-1)!;
    expect(new URL(request.url).pathname).toBe("/logout");
    expect(request.init.method).toBe("POST");
    expect(new Headers(request.init.headers).get("X-XSRF-TOKEN")).toBe("tok=");
    expect(cookieStore.set).toHaveBeenCalledWith("kirei_session", "", expect.objectContaining({ maxAge: 0 }));
  });

  it("still leaves when Laravel cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("fetch failed"))));
    await expect(logout()).rejects.toThrow("redirect:/login");
  });
});
