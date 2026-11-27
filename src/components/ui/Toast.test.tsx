// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Toast", () => {
  it("announces the message and closes itself after the duration", () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Toast message="Kelas H.5.1 disimpan." onDismiss={onDismiss} durationMs={4000} />);

    expect(screen.getByRole("status").textContent).toBe("Kelas H.5.1 disimpan.");
    act(() => vi.advanceTimersByTime(3999));
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("closes from its button and shows nothing when empty", () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<Toast message="Disimpan." onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: "Tutup notifikasi" }));
    expect(onDismiss).toHaveBeenCalledOnce();

    rerender(<Toast message="" onDismiss={onDismiss} />);
    expect(screen.queryByRole("button", { name: "Tutup notifikasi" })).toBeNull();
    expect(screen.getByRole("status").textContent).toBe("");
  });
});
