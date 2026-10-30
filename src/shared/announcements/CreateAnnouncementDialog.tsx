"use client";

import { useState } from "react";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { AnnouncementCategory } from "@/types/announcement";
import { ANNOUNCEMENT_CATEGORY } from "./announcement-labels";

export interface NewAnnouncement {
  category: AnnouncementCategory;
  title: string;
  body: string;
}

export interface CreateAnnouncementDialogProps {
  onClose: () => void;
  onCreate: (announcement: NewAnnouncement) => void;
}

type Errors = Partial<Record<keyof NewAnnouncement, string>>;

export function CreateAnnouncementDialog({ onClose, onCreate }: CreateAnnouncementDialogProps) {
  const [category, setCategory] = useState<AnnouncementCategory | "">("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!category) next.category = "Pilih tipe pengumuman.";
    if (!title.trim()) next.title = "Judul wajib diisi.";
    if (!body.trim()) next.body = "Isi pengumuman wajib diisi.";
    setErrors(next);
    if (Object.keys(next).length > 0 || !category) return;
    // TODO: POST through the orval client and map 422 errors with lib/api/form-errors.
    onCreate({ category, title: title.trim(), body: body.trim() });
  };

  const describedBy = (field: keyof NewAnnouncement, id: string) => (errors[field] ? `${id}-error` : undefined);

  return (
    <Modal
      open
      onClose={onClose}
      title="Tambah Pengumuman"
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Kembali
          </Button>
          <Button type="submit" form="create-announcement-form" variant="primary-outline">
            Simpan
          </Button>
        </>
      }
    >
      <form id="create-announcement-form" onSubmit={submit} noValidate className="flex flex-col gap-3">
        <Field label="Tipe Pengumuman" htmlFor="announcement-type" error={errors.category}>
          <SelectInput
            id="announcement-type"
            value={category}
            onChange={(event) => setCategory(event.target.value as AnnouncementCategory)}
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={describedBy("category", "announcement-type")}
            className={category ? "" : "text-muted"}
          >
            <option value="" disabled>
              Pilih tipe
            </option>
            {Object.entries(ANNOUNCEMENT_CATEGORY).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Judul Pengumuman" htmlFor="announcement-title" error={errors.title}>
          <input
            id="announcement-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Contoh: Perbaikan AC lantai 5"
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={describedBy("title", "announcement-title")}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Isi Pengumuman" htmlFor="announcement-body" error={errors.body}>
          <textarea
            id="announcement-body"
            rows={4}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Tulis informasi yang perlu diketahui peminjam."
            aria-invalid={errors.body ? true : undefined}
            aria-describedby={describedBy("body", "announcement-body")}
            className={INPUT_CLASS}
          />
        </Field>
      </form>
    </Modal>
  );
}
