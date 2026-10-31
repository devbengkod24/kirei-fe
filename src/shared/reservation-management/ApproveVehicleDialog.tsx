"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDateShortWIB, formatTimeWIB } from "@/lib/date";
import { summarizeAssignment, type AssignedVehicle, type VehicleAssignment } from "@/shared/reservation/vehicleAssignment";
import { VehicleUnitPicker } from "@/shared/reservation/VehicleUnitPicker";
import type { Vehicle } from "@/types/facility";
import type { ReservationRequest } from "@/types/reservation";

export interface ApproveVehicleDialogProps {
  reservation: ReservationRequest;
  /** Active vehicle kinds the admin can assign units of. */
  vehicles: Vehicle[];
  onClose: () => void;
  onApprove: (assigned: AssignedVehicle[]) => void;
}

/** Borrowers ask for a trip, not a vehicle; the admin assigns units while approving, several of a kind if needed. */
export function ApproveVehicleDialog({ reservation, vehicles, onClose, onApprove }: ApproveVehicleDialogProps) {
  const [assignment, setAssignment] = useState<VehicleAssignment>({});
  const [error, setError] = useState<string>();
  const participants = reservation.trip?.participants ?? 0;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const summary = summarizeAssignment(assignment, vehicles);
    if (summary.units === 0) return setError("Tambahkan minimal satu kendaraan untuk perjalanan ini.");
    onApprove(summary.items);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Setujui Reservasi Kendaraan"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" form="approve-vehicle-form" variant="success-outline" disabled={vehicles.length === 0}>
            Setujui
          </Button>
        </>
      }
    >
      <p className="text-sm">
        <span className="font-semibold">{reservation.borrowerName}</span>
        {reservation.trip && (
          <>
            {" "}
            ke <span className="font-semibold">{reservation.trip.destination}</span> untuk {participants} orang
          </>
        )}
        , {formatDateShortWIB(reservation.startsAt)} {formatTimeWIB(reservation.startsAt)} - {formatTimeWIB(reservation.endsAt)} WIB.
      </p>

      {vehicles.length === 0 ? (
        <p className="text-sm text-muted">Belum ada kendaraan aktif. Aktifkan kendaraan dulu sebelum menyetujui.</p>
      ) : (
        <form id="approve-vehicle-form" onSubmit={submit} noValidate>
          <VehicleUnitPicker
            vehicles={vehicles}
            value={assignment}
            onChange={(next) => {
              setAssignment(next);
              setError(undefined);
            }}
            participants={participants}
            idPrefix="approve-vehicle"
            error={error}
          />
        </form>
      )}
    </Modal>
  );
}
