import QRCode from "qrcode";

/** Builds the shared public QR target URL for the /lapor complaint form. */
export function buildPublicReportUrl(origin: string): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  return `${cleanOrigin}/lapor`;
}

/** Generates a crisp PNG data URL for the public complaint-form QR code. */
export async function generateReportQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}
