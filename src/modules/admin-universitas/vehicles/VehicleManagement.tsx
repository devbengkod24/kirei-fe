"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { INPUT_CLASS } from "@/components/form/Field";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { toWibDateKey } from "@/lib/date";
import { tripRange, unitsHeld, vehicleBookings, type VehicleBooking } from "@/shared/reservation-form/vehicleAvailability";
import { withDecision } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { Vehicle } from "@/types/facility";
import { VehicleDialog } from "./VehicleDialog";
import { searchVehicles, type VehicleValues } from "./vehicleSchema";

export interface VehicleManagementProps {
  vehicles: Vehicle[];
  /** Units held by waiting or approved requests the server knows. */
  bookings: VehicleBooking[];
  /** ISO 8601 server time, for "today" in WIB. */
  now: string;
}

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;

function StatusBadge({ isActive, size = "md" }: { isActive: boolean; size?: "sm" | "md" }) {
  return (
    <Badge tone={isActive ? "success" : "danger"} size={size} className="uppercase">
      {isActive ? "Dibuka" : "Ditutup"}
    </Badge>
  );
}

const passengers = (vehicle: Vehicle) => `${vehicle.minPassengers ?? 1}–${vehicle.capacity} orang`;

/** Kelola Kendaraan: the campus vehicle types, their passenger rule and units free today. Search, add, change, and close for borrowing. */
export function VehicleManagement({ vehicles: initial, bookings: serverBookings, now }: VehicleManagementProps) {
  // TODO: persist through the orval client; changes live in this page until then.
  const [vehicles, setVehicles] = useState(initial);
  const [query, setQuery] = useState("");
  // undefined: no dialog; null: adding; a vehicle type: editing it.
  const [editing, setEditing] = useState<Vehicle | null | undefined>(undefined);
  const [notice, setNotice] = useState("");
  const searchId = useId();
  const visible = searchVehicles(vehicles, query);
  const paging = usePagination(visible, 10);

  // Units taken today by waiting or approved requests, including ones made in this browser's demo store.
  const store = useMockReservations();
  const today = toWibDateKey(new Date(now));
  const inUse = useMemo(() => {
    const bookings = [
      ...serverBookings,
      ...vehicleBookings(store.created.map((reservation) => withDecision(reservation, store.decisions)), vehicles),
    ];
    const range = tripRange(today, today);
    return (vehicle: Vehicle) => (range ? unitsHeld(vehicle.id, bookings, range) : 0);
  }, [serverBookings, store, vehicles, today]);
  const units = (vehicle: Vehicle) => `${Math.max(0, vehicle.unitCount - inUse(vehicle))} / ${vehicle.unitCount} unit`;

  const editButton = (vehicle: Vehicle) => (
    <button
      type="button"
      onClick={() => setEditing(vehicle)}
      aria-label={`Lihat detail ${vehicle.name}`}
      className="flex size-11 items-center justify-center rounded-md border border-border transition-colors hover:bg-page"
    >
      <Image src="/icons/admin/view.svg" alt="" width={14} height={11} />
    </button>
  );

  const save = (values: VehicleValues) => {
    if (editing) {
      setVehicles(vehicles.map((vehicle) => (vehicle.id === editing.id ? { ...vehicle, ...values } : vehicle)));
      setNotice(
        `Data ${values.name} diperbarui${values.isActive === editing.isActive ? "" : `, peminjaman sekarang ${values.isActive ? "dibuka" : "ditutup"}`}.`,
      );
    } else {
      setVehicles([{ ...values, id: `vehicle-new-${Date.now().toString(36)}` }, ...vehicles]);
      setQuery("");
      paging.setPage(1);
      setNotice(`${values.name} ditambahkan.`);
    }
    setEditing(undefined);
  };

  return (
    <Card as="section" aria-labelledby="vehicles-title" className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="vehicles-title" className="text-base font-semibold">
          Jenis Kendaraan
        </h2>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <label htmlFor={searchId} className="sr-only">
            Cari jenis kendaraan
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              paging.setPage(1);
            }}
            placeholder="Cari jenis kendaraan"
            className={`${INPUT_CLASS} min-w-0 flex-1 sm:w-72`}
          />
          <Button onClick={() => setEditing(null)}>+ Tambah Kendaraan</Button>
        </div>
      </div>

      <p role="status" className={notice ? "text-sm text-success" : "sr-only"}>
        {notice}
      </p>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">
          {vehicles.length === 0 ? "Belum ada jenis kendaraan." : `Tidak ada kendaraan yang cocok dengan "${query.trim()}".`}
        </p>
      ) : (
        <>
          <table className={`hidden ${TABLE} text-left lg:table`}>
            <caption className="sr-only">Daftar jenis kendaraan kampus</caption>
            <thead>
              <tr className={TABLE_ROW}>
                <th scope="col" className={TH}>No</th>
                <th scope="col" className={TH}>Jenis Kendaraan</th>
                <th scope="col" className={TH}>Penumpang</th>
                <th scope="col" className={TH}>Unit Tersedia</th>
                <th scope="col" className={TH}>Status</th>
                <th scope="col" className={TH}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paging.items.map((vehicle, index) => (
                <tr key={vehicle.id} className={TABLE_ROW}>
                  <td className={TD}>{(paging.page - 1) * paging.pageSize + index + 1}</td>
                  <td className={TD}>{vehicle.name}</td>
                  <td className={`${TD} tabular-nums`}>{passengers(vehicle)}</td>
                  <td className={`${TD} tabular-nums`}>{units(vehicle)}</td>
                  <td className={TD}>
                    <StatusBadge isActive={vehicle.isActive} />
                  </td>
                  <td className={TD}>{editButton(vehicle)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Below lg the table becomes a list, like the other admin tables. */}
          <ul className="flex flex-col lg:hidden">
            {paging.items.map((vehicle) => (
              <li key={vehicle.id} className="flex items-start justify-between gap-3 border-b border-border py-3 first:pt-0">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-sm font-medium break-words">{vehicle.name}</span>
                  <span className="text-xs text-muted">
                    {passengers(vehicle)} · Tersedia {units(vehicle)}
                  </span>
                  <StatusBadge isActive={vehicle.isActive} size="sm" />
                </div>
                {editButton(vehicle)}
              </li>
            ))}
          </ul>
        </>
      )}

      <Pagination
        page={paging.page}
        pageCount={paging.pageCount}
        pageSize={paging.pageSize}
        onPageChange={paging.setPage}
        onPageSizeChange={paging.setPageSize}
      />

      {editing !== undefined && (
        <VehicleDialog vehicle={editing} existing={vehicles} inUse={editing ? inUse(editing) : 0} onClose={() => setEditing(undefined)} onSave={save} />
      )}
    </Card>
  );
}
