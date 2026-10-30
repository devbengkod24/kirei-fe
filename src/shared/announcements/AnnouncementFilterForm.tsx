"use client";

import { useState } from "react";
import { CheckboxGrid, ChipRadios, RadioRow } from "@/components/form/ChoiceGroups";
import { Button } from "@/components/ui/Button";
import { TIME_PERIOD_OPTIONS } from "@/lib/period";
import { SORT_OPTIONS } from "@/shared/reports/ReportFilterForm";
import type { AnnouncementCategory } from "@/types/announcement";
import { ANNOUNCEMENT_CATEGORY } from "./announcement-labels";
import { DEFAULT_ANNOUNCEMENT_FILTER, type AnnouncementFilter } from "./filterAnnouncements";

export interface AnnouncementFilterFormProps {
  value: AnnouncementFilter;
  authors: string[];
  onApply: (filter: AnnouncementFilter) => void;
}

export function AnnouncementFilterForm({ value, authors, onApply }: AnnouncementFilterFormProps) {
  const [draft, setDraft] = useState(value);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onApply(draft);
      }}
      className="flex flex-col gap-3"
    >
      <RadioRow legend="Urutkan" name="announcement-sort" options={SORT_OPTIONS} value={draft.sort} onChange={(sort) => setDraft({ ...draft, sort })} />
      <ChipRadios
        legend="Periode Waktu"
        name="announcement-period"
        options={TIME_PERIOD_OPTIONS}
        value={draft.period}
        onChange={(period) => setDraft({ ...draft, period })}
      />
      <CheckboxGrid
        legend="Kategori"
        name="announcement-category"
        options={Object.entries(ANNOUNCEMENT_CATEGORY).map(([category, { label }]) => ({
          value: category as AnnouncementCategory,
          label,
        }))}
        values={draft.categories}
        onChange={(categories) => setDraft({ ...draft, categories })}
      />
      {authors.length > 1 && (
        <CheckboxGrid
          legend="Dibuat Oleh"
          name="announcement-author"
          options={authors.map((author) => ({ value: author, label: author }))}
          values={draft.authors}
          onChange={(selected) => setDraft({ ...draft, authors: selected })}
        />
      )}
      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setDraft(DEFAULT_ANNOUNCEMENT_FILTER);
            onApply(DEFAULT_ANNOUNCEMENT_FILTER);
          }}
        >
          Reset
        </Button>
        <Button type="submit">Terapkan</Button>
      </div>
    </form>
  );
}
