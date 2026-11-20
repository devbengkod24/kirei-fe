"use client";

import { useMemo, useState } from "react";
import { Popover } from "@/components/ui/Popover";
import { toWibDateKey } from "@/lib/date";
import {
  passengerSeats,
  tripRange,
  vehicleBookings,
  vehicleOptions,
  type VehicleBooking,
} from "@/shared/reservation-form/vehicleAvailability";
import { withDecision } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { Vehicle } from "@/types/facility";

export interface VehicleFleetInfoProps {
  vehicles: Vehicle[];
  /** Units held by waiting or approved requests the server knows. */
  bookings: VehicleBooking[];
  /** ISO 8601 server time, for "today" in WIB. */
  now: string;
}

/** (i) button beside the type tabs: the campus vehicles and how many units are taken today. */
export function VehicleFleetInfo({ vehicles, bookings: serverBookings, now }: VehicleFleetInfoProps) {
  const [open, setOpen] = useState(false);
  const store = useMockReservations();
  const today = toWibDateKey(new Date(now));
  const rows = useMemo(() => {
    const bookings = [
      ...serverBookings,
      ...vehicleBookings(store.created.map((reservation) => withDecision(reservation, store.decisions)), vehicles),
    ];
    return vehicleOptions(vehicles, bookings, tripRange(today, today), null);
  }, [serverBookings, store, vehicles, today]);
  const inactive = vehicles.filter((vehicle) => !vehicle.isActive);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      label="Info kendaraan kampus"
      triggerClassName="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-primary hover:bg-primary-soft"
      trigger={
        <>
          <span aria-hidden="true" className="font-serif italic">
            i
          </span>
          <span className="sr-only">Info kendaraan kampus</span>
        </>
      }
    >
      <div className="flex flex-col gap-3 text-xs">
        <p className="text-sm font-semibold">Kendaraan kampus</p>
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted">
              <th scope="col" className="pb-1 font-medium">Jenis</th>
              <th scope="col" className="pb-1 text-right font-medium">Unit</th>
              <th scope="col" className="pb-1 text-right font-medium">Kursi</th>
              <th scope="col" className="pb-1 text-right font-medium">Dipakai hari ini</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ vehicle, free }) => (
              <tr key={vehicle.id} className="border-t border-border">
                <td className="py-1.5">{vehicle.name}</td>
                <td className="py-1.5 text-right">{vehicle.unitCount}</td>
                <td className="py-1.5 text-right">{passengerSeats(vehicle)}</td>
                <td className="py-1.5 text-right">{vehicle.unitCount - free}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-muted">
          Kursi dihitung per unit, tanpa kursi sopir. Dipakai hari ini mencakup permohonan yang masih menunggu.
          {inactive.length > 0 && ` Tidak aktif: ${inactive.map((vehicle) => vehicle.name).join(", ")}.`}
        </p>
      </div>
    </Popover>
  );
}
