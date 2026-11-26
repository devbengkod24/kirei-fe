"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { buildPublicReportUrl, generateReportQrDataUrl } from "./reportQr";

export interface ReportQrDialogProps {
  onClose: () => void;
}

type QrResult =
  | { targetUrl: string; qrUrl: string }
  | { targetUrl: string; error: string };

/** Shows, downloads, and prints the shared public QR code pointing to /lapor. */
export function ReportQrDialog({ onClose }: ReportQrDialogProps) {
  const [result, setResult] = useState<QrResult | null>(null);
  const [printError, setPrintError] = useState<string>();

  useEffect(() => {
    let active = true;
    const targetUrl = buildPublicReportUrl(window.location.origin);
    generateReportQrDataUrl(targetUrl)
      .then((qrUrl) => {
        if (active) setResult({ targetUrl, qrUrl });
      })
      .catch(() => {
        if (active) setResult({ targetUrl, error: "Gagal membuat QR code formulir pengaduan." });
      });
    return () => {
      active = false;
    };
  }, []);

  const qrUrl = result && "qrUrl" in result ? result.qrUrl : null;
  const targetUrl = result?.targetUrl ?? "";
  const error = printError ?? (result && "error" in result ? result.error : undefined);

  const downloadQr = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-formulir-pengaduan.png";
    link.click();
  };

  const printQr = () => {
    if (!qrUrl) return;
    const popup = window.open("", "_blank", "width=480,height=640");
    if (!popup) return setPrintError("Pop-up cetak diblokir browser. Gunakan Unduh QR.");
    setPrintError(undefined);
    popup.document.write(`<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>QR Formulir Pengaduan KIREI</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; }
    .card { border: 2px solid #1e3a8a; border-radius: 12px; padding: 28px; text-align: center; max-width: 340px; }
    h1 { margin: 0 0 6px; font-size: 22px; color: #1e3a8a; }
    p { margin: 4px 0 16px; font-size: 13px; color: #5f6368; }
    img { width: 240px; height: 240px; display: block; margin: 0 auto 16px; }
    .note { margin: 0; font-size: 14px; font-weight: 600; color: #000000; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Formulir Pengaduan</h1>
    <p>KIREI Udinus</p>
    <img src="${qrUrl}" alt="QR Formulir Pengaduan KIREI" />
    <p class="note">Pindai QR untuk membuka formulir pengaduan ruangan tanpa login</p>
  </div>
</body>
</html>`);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="QR Formulir Pengaduan"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button variant="primary-outline" onClick={printQr} disabled={!qrUrl}>
            Cetak QR
          </Button>
          <Button onClick={downloadQr} disabled={!qrUrl}>
            Unduh QR
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs text-muted">
          QR ini sama untuk seluruh ruangan. Pemindai langsung diarahkan ke halaman Formulir Pengaduan tanpa perlu login
          dan dapat menuliskan kelasnya sendiri.
        </p>

        {error ? (
          <p role="alert" className="w-full rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
            {error}
          </p>
        ) : qrUrl ? (
          <div className="rounded-lg border border-border bg-surface p-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- generated data URL PNG QR */}
            <img src={qrUrl} alt="QR Code Formulir Pengaduan" width={220} height={220} />
          </div>
        ) : (
          <div className="flex h-[244px] w-[244px] items-center justify-center rounded-lg border border-border bg-page text-xs text-muted">
            Membuat QR code...
          </div>
        )}

        {targetUrl && (
          <p className="w-full break-all rounded-md bg-page px-3 py-2 text-[11px] text-muted">{targetUrl}</p>
        )}
      </div>
    </Modal>
  );
}
