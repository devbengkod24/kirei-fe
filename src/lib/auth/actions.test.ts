import { beforeEach, describe, expect, it, vi } from "vitest";
import { MOCK_ADMIN_FAKULTAS, MOCK_CURRENT_USER, MOCK_PASSWORD } from "@/mocks/user";
import { SESSION_COOKIE } from "./session";

const cookieStore = { set: vi.fn(), delete: vi.fn() };
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

  it("returns an error and sets no cookie for a wrong password", async () => {
    await expect(login({ email: MOCK_ADMIN_FAKULTAS.email, password: "salah" })).resolves.toEqual({
      error: "Email atau kata sandi salah.",
    });
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
});

describe("logout", () => {
  it("clears the session cookie and goes to the login page", async () => {
    await expect(logout()).rejects.toThrow("redirect:/login");
    expect(cookieStore.delete).toHaveBeenCalledWith(SESSION_COOKIE);
  });
});
