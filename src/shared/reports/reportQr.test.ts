import { describe, expect, it } from "vitest";
import { buildPublicReportUrl, generateReportQrDataUrl } from "./reportQr";

describe("reportQr", () => {
  it("builds a clean shared /lapor URL", () => {
    expect(buildPublicReportUrl("https://kirei.dinus.ac.id/")).toBe("https://kirei.dinus.ac.id/lapor");
    expect(buildPublicReportUrl("http://localhost:3000")).toBe("http://localhost:3000/lapor");
  });

  it("renders a PNG data URL for the public report link", async () => {
    const dataUrl = await generateReportQrDataUrl("https://kirei.dinus.ac.id/lapor");
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true);
  });
});
