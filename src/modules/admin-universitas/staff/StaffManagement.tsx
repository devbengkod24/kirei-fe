"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { INPUT_CLASS } from "@/components/form/Field";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useStaff } from "@/shared/staff/useStaff";
import type { Staff } from "@/types/staff";
import { UserTabsNav } from "../users/UserTabsNav";
import { StaffDialog } from "./StaffDialog";
import { STAFF_ROLE_LABEL, licenseLabel, searchStaff, type StaffValues } from "./staffSchema";

export interface StaffManagementProps {
  staff: Staff[];
}

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;

function StatusBadge({ isActive, size = "md" }: { isActive: boolean; size?: "sm" | "md" }) {
  return (
    <Badge tone={isActive ? "success" : "danger"} size={size} className="uppercase">
      {isActive ? "Aktif" : "Tidak aktif"}
    </Badge>
  );
}

/** Staf tab of Kelola Pengguna: drivers and co-drivers of the campus vehicles. Search, add, change, and switch off. */
export function StaffManagement({ staff: initial }: StaffManagementProps) {
  const [staff, setStaff] = useStaff(initial);
  const [query, setQuery] = useState("");
  // undefined: no dialog; null: adding; a driver: editing them.
  const [editing, setEditing] = useState<Staff | null | undefined>(undefined);
  const [notice, setNotice] = useState("");
  const searchId = useId();
  const visible = searchStaff(staff, query);
  const paging = usePagination(visible, 10);

  const editButton = (member: Staff) => (
    <button
      type="button"
      onClick={() => setEditing(member)}
      aria-label={`Lihat detail ${member.name}`}
      className="flex size-11 items-center justify-center rounded-md border border-border transition-colors hover:bg-page"
    >
      <Image src="/icons/admin/view.svg" alt="" width={14} height={11} />
    </button>
  );

  const save = (values: StaffValues) => {
    // TODO: POST a new driver or PATCH an existing one through the orval client.
    if (editing) {
      setStaff(staff.map((member) => (member.id === editing.id ? { ...member, ...values } : member)));
      setNotice(`Data ${values.name} diperbarui${values.isActive === editing.isActive ? "" : `, sekarang ${values.isActive ? "aktif" : "tidak aktif"}`}.`);
    } else {
      setStaff([{ ...values, id: `staff-new-${Date.now().toString(36)}` }, ...staff]);
      setQuery("");
      paging.setPage(1);
      setNotice(`${STAFF_ROLE_LABEL[values.role]} ${values.name} ditambahkan.`);
    }
    setEditing(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <UserTabsNav active="staf" />
      <Card as="section" aria-labelledby="staff-title" className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="staff-title" className="text-base font-semibold">
            Sopir dan Kenek
          </h2>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <label htmlFor={searchId} className="sr-only">
              Cari staf
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                paging.setPage(1);
              }}
              placeholder="Cari nama atau no telp"
              className={`${INPUT_CLASS} min-w-0 flex-1 sm:w-72`}
            />
            <Button onClick={() => setEditing(null)}>+ Tambah Staf</Button>
          </div>
        </div>

        <p role="status" className={notice ? "text-sm text-success" : "sr-only"}>
          {notice}
        </p>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            {staff.length === 0 ? "Belum ada sopir atau kenek." : `Tidak ada staf yang cocok dengan "${query.trim()}".`}
          </p>
        ) : (
          <>
            <table className={`hidden ${TABLE} text-left lg:table`}>
              <caption className="sr-only">Daftar sopir dan kenek</caption>
              <thead>
                <tr className={TABLE_ROW}>
                  <th scope="col" className={TH}>No</th>
                  <th scope="col" className={TH}>Nama</th>
                  <th scope="col" className={TH}>No Telp</th>
                  <th scope="col" className={TH}>SIM</th>
                  <th scope="col" className={TH}>Tipe</th>
                  <th scope="col" className={TH}>Status</th>
                  <th scope="col" className={TH}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paging.items.map((member, index) => (
                  <tr key={member.id} className={TABLE_ROW}>
                    <td className={TD}>{(paging.page - 1) * paging.pageSize + index + 1}</td>
                    <td className={TD}>{member.name}</td>
                    <td className={`${TD} tabular-nums`}>{member.phone}</td>
                    <td className={TD}>{licenseLabel(member)}</td>
                    <td className={TD}>{STAFF_ROLE_LABEL[member.role]}</td>
                    <td className={TD}>
                      <StatusBadge isActive={member.isActive} />
                    </td>
                    <td className={TD}>{editButton(member)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Below lg the table becomes a list, like the other admin tables. */}
            <ul className="flex flex-col lg:hidden">
              {paging.items.map((member) => (
                <li key={member.id} className="flex items-start justify-between gap-3 border-b border-border py-3 first:pt-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-sm font-medium break-words">{member.name}</span>
                    <span className="text-xs text-muted">
                      {STAFF_ROLE_LABEL[member.role]} · {member.phone}
                    </span>
                    <span className="text-xs text-muted">{licenseLabel(member)}</span>
                    <StatusBadge isActive={member.isActive} size="sm" />
                  </div>
                  {editButton(member)}
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
          <StaffDialog staff={editing} onClose={() => setEditing(undefined)} onSave={save} />
        )}
      </Card>
    </div>
  );
}
