import { z } from "zod";
import type { Vehicle } from "@/types/facility";

const wholeNumber = (label: string, min: number, max: number) =>
  z
    .number({ error: `Isi ${label}.` })
    .int(`${label[0].toUpperCase()}${label.slice(1)} harus bilangan bulat.`)
    .min(min, `${label[0].toUpperCase()}${label.slice(1)} minimal ${min}.`)
    .max(max, `${label[0].toUpperCase()}${label.slice(1)} maksimal ${max}.`);

const normalName = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

/**
 * A vehicle type added or edited in Kelola Kendaraan. The name must not be used by another type
 * (`existing`, without the one being edited), the minimum passengers fit in the seats, and the
 * units owned are not fewer than the `inUse` ones borrowed today.
 */
export function createVehicleSchema(existing: Vehicle[], editingId: string | null = null, inUse = 0) {
  const taken = new Set(existing.filter((vehicle) => vehicle.id !== editingId).map((vehicle) => normalName(vehicle.name)));
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Tulis nama minimal 3 karakter.")
        .max(60, "Nama maksimal 60 karakter.")
        .refine((value) => !taken.has(normalName(value)), "Jenis kendaraan dengan nama ini sudah ada."),
      isActive: z.boolean(),
      minPassengers: wholeNumber("minimal penumpang", 1, 100),
      capacity: wholeNumber("kapasitas kursi", 2, 100),
      unitCount: wholeNumber("total unit", 1, 99),
    })
    .superRefine((values, ctx) => {
      if (values.minPassengers > values.capacity) {
        ctx.addIssue({ code: "custom", path: ["minPassengers"], message: "Minimal penumpang tidak boleh melebihi kapasitas kursi." });
      }
      if (values.unitCount < inUse) {
        ctx.addIssue({ code: "custom", path: ["unitCount"], message: `Total unit tidak boleh kurang dari ${inUse} unit yang sedang dipinjam.` });
      }
    });
}

export type VehicleInput = z.input<ReturnType<typeof createVehicleSchema>>;
export type VehicleValues = z.output<ReturnType<typeof createVehicleSchema>>;

/** Name contains the query; case and extra spaces do not matter. */
export function searchVehicles(vehicles: Vehicle[], query: string): Vehicle[] {
  const needle = normalName(query);
  if (!needle) return vehicles;
  return vehicles.filter((vehicle) => normalName(vehicle.name).includes(needle));
}
