// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

afterEach(cleanup);

describe("Breadcrumb", () => {
  it("links the parents and marks the last item as the current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Buat Reservasi", href: "/reservasi/baru" },
          { label: "Ruangan" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Lokasi halaman" });
    expect(within(nav).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(["/dashboard", "/reservasi/baru"]);
    expect(within(nav).getByText("Ruangan").getAttribute("aria-current")).toBe("page");
  });

  it("does not link the current page even when it has an href", () => {
    render(<Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Buat Reservasi", href: "/reservasi/baru" }]} />);
    expect(screen.queryByRole("link", { name: "Buat Reservasi" })).toBeNull();
    expect(screen.getByText("Buat Reservasi").getAttribute("aria-current")).toBe("page");
  });
});
