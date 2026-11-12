// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { LandingPage } from "./LandingPage";

beforeAll(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(cleanup);

describe("LandingPage", () => {
  it("points every section link at a section that exists", () => {
    const { container } = render(<LandingPage />);
    const nav = screen.getByRole("navigation", { name: "Bagian halaman" });
    const targets = within(nav)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    expect(targets).toEqual(["#beranda", "#fasilitas", "#peraturan", "#panduan", "#faq"]);
    for (const target of targets) {
      expect(container.querySelector(target!)).not.toBeNull();
    }
  });

  it("has one page heading and sends the sign-in links to the login page", () => {
    render(<LandingPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const signInLinks = [
      ...screen.getAllByRole("link", { name: "Masuk" }),
      screen.getByRole("link", { name: "Reservasi Sekarang" }),
      screen.getByRole("link", { name: "Mulai Reservasi Sekarang" }),
    ];
    expect(signInLinks.map((link) => link.getAttribute("href"))).toEqual(signInLinks.map(() => "/login"));
  });

  it("switches the tutorial between organisations and lecturers", () => {
    render(<LandingPage />);
    expect(screen.getByText("Masuk ke Akun Organisasi")).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: "Dosen" }));
    expect(screen.getByRole("tab", { name: "Dosen" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Masuk ke Akun Dosen")).toBeTruthy();
    expect(screen.queryByText("Unggah Surat Peminjaman")).toBeNull();
  });

  it("opens one FAQ answer at a time", () => {
    render(<LandingPage />);
    const first = screen.getByRole("button", { name: /cara mendapatkan akun/ });
    const second = screen.getByRole("button", { name: /membatalkan reservasi/ });

    fireEvent.click(first);
    expect(first.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(second);
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(second.getAttribute("aria-expanded")).toBe("true");
  });

  it("opens the mobile menu and closes it with Escape", () => {
    render(<LandingPage />);
    fireEvent.click(screen.getByRole("button", { name: "Buka menu" }));
    expect(screen.getByRole("dialog", { name: "Menu navigasi" })).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Buka menu" }).getAttribute("aria-expanded")).toBe("false");
  });
});
