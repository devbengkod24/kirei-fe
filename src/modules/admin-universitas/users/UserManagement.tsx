"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { INPUT_CLASS } from "@/components/form/Field";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
import { useLiveState } from "@/hooks/useLiveData";
import { usePagination } from "@/hooks/usePagination";
import { useLiveBuildings } from "@/shared/live-data/useLiveFacilities";
import type { Fakultas } from "@/types/fakultas";
import type { Building } from "@/types/facility";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";
import { AddUserDialog } from "./AddUserDialog";
import { UserDetailDialog } from "./UserDetailDialog";
import { managedUsersSchema, searchUsers, toManagedUser } from "./userSchema";
import { USER_TABS } from "./userTabs";
import { UserTabsNav } from "./UserTabsNav";

export interface UserManagementProps {
  role: ManagedRole;
  users: ManagedUser[];
  fakultasOptions: Fakultas[];
  /** Buildings and floors, to show and pick where an operator works. */
  buildings: Building[];
}

const TH = `${TABLE_HEAD_CELL} text-left`;
const TD = TABLE_CELL;

/** Long addresses may only wrap before the "@", never in the middle of a name or domain. */
function Email({ address }: { address: string }) {
  const at = address.indexOf("@");
  if (at < 0) return address;
  return (
    <>
      {address.slice(0, at)}
      <wbr />
      {address.slice(at)}
    </>
  );
}

function StatusBadge({ isActive, size = "md" }: { isActive: boolean; size?: "sm" | "md" }) {
  return (
    <Badge tone={isActive ? "success" : "danger"} size={size} className="uppercase">
      {isActive ? "Aktif" : "Tidak aktif"}
    </Badge>
  );
}

/** Accounts of one kind: search, add, switch on or off, and set a new password. Columns follow USER_TABS. */
export function UserManagement({ role, users: initial, fakultasOptions, buildings: serverBuildings }: UserManagementProps) {
  // "Empty" data mode: the accounts of this kind and the saved floor plans are kept in this browser.
  const [users, setUsers] = useLiveState(`users-${role}`, managedUsersSchema, initial);
  const buildings = useLiveBuildings(serverBuildings);
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState<ManagedUser | null>(null);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState("");
  const searchId = useId();
  const visible = searchUsers(users, query);
  const paging = usePagination(visible, 10);
  const { label, fields } = USER_TABS[role];

  // Ormawa belong to nothing; dosen belong to a faculty, admin gedung to a building, operators to one floor.
  const fakultasById = new Map(fakultasOptions.map((fakultas) => [fakultas.id, fakultas]));
  const fakultasOf = (user: ManagedUser) => (user.fakultasId ? fakultasById.get(user.fakultasId) : undefined);
  const buildingOf = (user: ManagedUser) => buildings.find((item) => item.id === user.buildingId)?.name;
  const floorOf = (user: ManagedUser) => {
    if (!user.floor) return undefined;
    const building = buildings.find((item) => item.id === user.floor?.buildingId);
    const floor = building?.floors.find((item) => item.id === user.floor?.floorId);
    return building && floor ? `${building.name} · Lantai ${floor.number}` : undefined;
  };
  const placementOf = (user: ManagedUser) => {
    if (fields.floor) return floorOf(user);
    if (fields.building) return buildingOf(user);
    return fakultasOf(user)?.name;
  };

  const viewButton = (user: ManagedUser) => (
    <button
      type="button"
      onClick={() => setViewing(user)}
      aria-label={`Lihat detail ${user.name}`}
      className="flex size-11 items-center justify-center rounded-md border border-border transition-colors hover:bg-page"
    >
      <Image src="/icons/admin/view.svg" alt="" width={14} height={11} />
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      <UserTabsNav active={role} />

      <Card as="section" aria-labelledby="users-title" className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="users-title" className="text-base font-semibold">
            {label}
          </h2>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <label htmlFor={searchId} className="sr-only">
              Cari {label.toLowerCase()}
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                paging.setPage(1);
              }}
              placeholder={fields.npp ? "Cari nama, email, atau NPP" : fields.name ? "Cari nama atau email" : "Cari gedung atau email"}
              className={`${INPUT_CLASS} min-w-0 flex-1 sm:w-64`}
            />
            <Button onClick={() => setAdding(true)}>+ {label}</Button>
          </div>
        </div>

        <p role="status" className={notice ? "text-sm text-success" : "sr-only"}>
          {notice}
        </p>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            {users.length === 0 ? `Belum ada akun ${label.toLowerCase()}.` : `Tidak ada ${label.toLowerCase()} yang cocok dengan "${query.trim()}".`}
          </p>
        ) : (
          <>
            <table className={`hidden ${TABLE} text-left lg:table`}>
              <caption className="sr-only">Daftar akun {label.toLowerCase()}</caption>
              <thead>
                <tr className={TABLE_ROW}>
                  <th scope="col" className={TH}>No</th>
                  {fields.name && <th scope="col" className={TH}>Nama</th>}
                  {fields.npp && <th scope="col" className={TH}>NPP</th>}
                  <th scope="col" className={TH}>Email</th>
                  {fields.fakultas && <th scope="col" className={TH}>Fakultas</th>}
                  {fields.building && <th scope="col" className={TH}>Gedung</th>}
                  {fields.floor && <th scope="col" className={TH}>Tempat tugas</th>}
                  <th scope="col" className={TH}>Status</th>
                  <th scope="col" className={TH}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paging.items.map((user, index) => (
                  <tr key={user.id} className={TABLE_ROW}>
                    <td className={TD}>{(paging.page - 1) * paging.pageSize + index + 1}</td>
                    {fields.name && <td className={TD}>{user.name}</td>}
                    {fields.npp && <td className={`${TD} tabular-nums`}>{user.npp}</td>}
                    <td className={TD}>
                      <Email address={user.email} />
                    </td>
                    {fields.fakultas && (
                      <td className={`${TD} whitespace-nowrap`} title={fakultasOf(user)?.name}>
                        {fakultasOf(user)?.shortName ?? "-"}
                      </td>
                    )}
                    {fields.building && <td className={TD}>{buildingOf(user) ?? "-"}</td>}
                    {fields.floor && <td className={TD}>{floorOf(user) ?? "-"}</td>}
                    <td className={TD}>
                      <StatusBadge isActive={user.isActive} />
                    </td>
                    <td className={TD}>{viewButton(user)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Below lg the table becomes a list, like the other admin tables. */}
            <ul className="flex flex-col lg:hidden">
              {paging.items.map((user) => (
                <li key={user.id} className="flex items-start justify-between gap-3 border-b border-border py-3 first:pt-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-sm font-medium break-words">{user.name}</span>
                    <span className="text-xs text-muted">
                      <Email address={user.email} />
                    </span>
                    {/* Accounts without a name are already named after their place. */}
                    {fields.name && (fields.npp || placementOf(user)) && (
                      <span className="text-xs text-muted">
                        {[fields.npp && user.npp && `NPP ${user.npp}`, placementOf(user)].filter(Boolean).join(" · ")}
                      </span>
                    )}
                    <StatusBadge isActive={user.isActive} size="sm" />
                  </div>
                  {viewButton(user)}
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
      </Card>

      {viewing && (
        <UserDetailDialog
          user={viewing}
          placement={placementOf(viewing)}
          onClose={() => setViewing(null)}
          onSave={({ isActive, newPassword }) => {
            // TODO: PATCH the status and PUT the new password through the orval client; the password never enters state.
            setUsers(users.map((user) => (user.id === viewing.id ? { ...user, isActive } : user)));
            const changes = [
              isActive !== viewing.isActive && `sekarang ${isActive ? "aktif" : "tidak aktif"}`,
              newPassword && "memakai kata sandi baru",
            ].filter(Boolean);
            setNotice(`Akun ${viewing.name} ${changes.join(" dan ")}.`);
            setViewing(null);
          }}
        />
      )}
      {adding && (
        <AddUserDialog
          role={role}
          existing={users}
          fakultasOptions={fakultasOptions}
          buildings={buildings}
          onClose={() => setAdding(false)}
          onAdd={(values) => {
            const user = toManagedUser(values, role, `${role}-new-${Date.now().toString(36)}`, buildings);
            // TODO: POST the account (with its password) through the orval client; the password never enters state.
            setUsers([user, ...users]);
            setQuery("");
            paging.setPage(1);
            setNotice(`Akun ${user.name} ditambahkan. Pemilik akun bisa masuk dengan ${user.email} dan kata sandi yang Anda buat.`);
            setAdding(false);
          }}
        />
      )}
    </div>
  );
}
