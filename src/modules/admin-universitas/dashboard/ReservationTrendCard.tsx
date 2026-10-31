"use client";

import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { Card } from "@/components/ui/Card";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { RESERVATION_TYPES, type ReservationType } from "@/types/reservation";
import type { WeeklyCounts } from "./getUniversityDashboard";

type TrendView = ReservationType | "semua";

const VIEWS: TrendView[] = ["semua", ...RESERVATION_TYPES];

export interface ReservationTrendCardProps {
  labels: string[];
  byType: Record<ReservationType, WeeklyCounts>;
  /** Faculty short name when the filter is on; it only narrows the room figures. */
  fakultasLabel: string | null;
}

const sum = (rows: number[][]) => rows[0].map((_, index) => rows.reduce((total, row) => total + row[index], 0));

/**
 * Success and cancellation lines for one type at a time, or all types summed.
 * Two lines stay readable; six lines (two per type) would not, and room numbers would
 * flatten the GOR and vehicle lines.
 */
export function ReservationTrendCard({ labels, byType, fakultasLabel }: ReservationTrendCardProps) {
  const [view, setView] = useState<TrendView>("semua");
  const counts =
    view === "semua"
      ? {
          succeeded: sum(Object.values(byType).map((type) => type.succeeded)),
          cancelled: sum(Object.values(byType).map((type) => type.cancelled)),
        }
      : byType[view];
  const subject = view === "semua" ? "semua tipe" : RESERVATION_TYPE_LABEL[view];
  const roomScope = fakultasLabel && (view === "semua" || view === "ruangan") ? ` (ruangan: ${fakultasLabel})` : "";

  return (
    <Card as="section" aria-labelledby="reservation-trend-title" className="flex flex-col gap-2 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 id="reservation-trend-title" className="text-sm font-medium">
            Distribusi Reservasi
          </h2>
          <p className="text-xs text-muted">
            Reservasi berhasil dan dibatalkan per minggu bulan ini, {subject}
            {roomScope}
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Tampilkan grafik untuk</legend>
          <div className="flex flex-wrap gap-1">
            {VIEWS.map((option) => (
              <label
                key={option}
                className={`flex min-h-11 items-center rounded-md px-3 text-xs has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus ${
                  view === option ? "bg-primary-soft font-semibold text-primary" : "bg-page text-ink hover:bg-primary-soft"
                }`}
              >
                <input type="radio" name="trend-view" checked={view === option} onChange={() => setView(option)} className="sr-only" />
                {option === "semua" ? "Semua" : RESERVATION_TYPE_LABEL[option]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <LineChart
        caption={`Jumlah reservasi berhasil dan dibatalkan per minggu bulan ini, ${subject}${roomScope}`}
        labels={labels}
        series={[
          { name: "Reservasi Berhasil", color: "var(--color-info)", values: counts.succeeded },
          { name: "Reservasi Dibatalkan", color: "var(--color-danger-strong)", values: counts.cancelled },
        ]}
      />
    </Card>
  );
}
