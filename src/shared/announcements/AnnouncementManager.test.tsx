// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Announcement } from "@/types/announcement";
import { AnnouncementManager } from "./AnnouncementManager";

const ANNOUNCEMENT: Announcement = {
  id: "ann-1",
  title: "Perbaikan AC lantai 5",
  category: "pemberitahuan",
  body: "AC lantai 5 diperbaiki hari ini.",
  authorName: "Admin FIK",
  publishedAt: "2026-11-04T01:00:00Z",
};

afterEach(cleanup);

// Only the admin pages pass canManage; Laravel still checks who may create one.
describe("AnnouncementManager", () => {
  it("lets an admin create announcements", () => {
    render(<AnnouncementManager announcements={[ANNOUNCEMENT]} loadedAt="2026-11-04T03:00:00Z" canManage authorName="Admin FIK" />);
    expect(screen.getByRole("button", { name: "Tambah Pengumuman" })).toBeTruthy();
  });

  it("shows borrowers the list without the create button", () => {
    render(<AnnouncementManager announcements={[ANNOUNCEMENT]} loadedAt="2026-11-04T03:00:00Z" />);
    expect(screen.getByText("Perbaikan AC lantai 5")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Tambah Pengumuman" })).toBeNull();
  });
});
