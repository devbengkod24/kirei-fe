"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { CAPS_LABEL_CLASS } from "@/components/form/Field";

export interface ProfileSummaryProps {
  name: string;
  email: string;
  /** e.g. "Admin Fakultas" */
  roleLabel: string;
  avatarUrl?: string;
}

const TERM = CAPS_LABEL_CLASS;
const VALUE = "text-xs tracking-[0.1em] uppercase";

export function ProfileSummary({ name, email, roleLabel, avatarUrl }: ProfileSummaryProps) {
  const [preview, setPreview] = useState<string>();

  useEffect(() => () => (preview ? URL.revokeObjectURL(preview) : undefined), [preview]);

  return (
    <section aria-label="Data profil" className="flex flex-col items-center gap-6 md:items-start">
      <div className="relative self-center">
        <Avatar src={preview ?? avatarUrl} name={name} size={156} />
        <label className="absolute right-1 bottom-1 flex size-11 cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-primary-hover has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus">
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          <Image src="/icons/admin/avatar-edit.svg" alt="" width={15} height={15} />
          <span className="sr-only">Ganti foto profil</span>
        </label>
      </div>
      {preview && (
        <p role="status" className="-mt-3 self-center text-center text-xs text-muted">
          {/* TODO: upload the photo through the orval client once the endpoint exists. */}
          Ini pratinjau. Foto belum tersimpan karena unggah ke server belum tersedia.
        </p>
      )}

      <dl className="flex flex-col gap-3 md:pl-10">
        <div>
          <dt className={TERM}>Status</dt>
          <dd className={VALUE}>{roleLabel}</dd>
        </div>
        <div>
          <dt className={TERM}>Nama lengkap</dt>
          <dd className={VALUE}>{name}</dd>
        </div>
        <div>
          <dt className={TERM}>Email</dt>
          <dd className="text-xs tracking-[0.1em] break-all">{email}</dd>
        </div>
      </dl>
    </section>
  );
}
