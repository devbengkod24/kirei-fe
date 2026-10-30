"use client";

import { useState } from "react";
import { CheckboxGrid, ChipRadios, RadioRow } from "@/components/form/ChoiceGroups";
import { INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { TIME_PERIOD_OPTIONS } from "@/lib/period";
import type { ReportCategory } from "@/types/report";
import { DEFAULT_REPORT_FILTER, type ReportFilter, type SortOrder } from "./filterReports";
import { REPORT_CATEGORY_LABEL } from "./report-labels";

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "terbaru", label: "Terbaru" },
  { value: "terlama", label: "Terlama" },
];

export interface ReportFilterFormProps {
  value: ReportFilter;
  onApply: (filter: ReportFilter) => void;
}

/** Edits a draft; nothing changes in the list until "Terapkan". */
export function ReportFilterForm({ value, onApply }: ReportFilterFormProps) {
  const [draft, setDraft] = useState(value);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onApply(draft);
      }}
      className="flex flex-col gap-3"
    >
      <RadioRow legend="Urutkan" name="report-sort" options={SORT_OPTIONS} value={draft.sort} onChange={(sort) => setDraft({ ...draft, sort })} />
      <ChipRadios
        legend="Periode Waktu"
        name="report-period"
        options={TIME_PERIOD_OPTIONS}
        value={draft.period}
        onChange={(period) => setDraft({ ...draft, period })}
      />
      <CheckboxGrid
        legend="Kategori"
        name="report-category"
        options={Object.entries(REPORT_CATEGORY_LABEL).map(([category, label]) => ({ value: category as ReportCategory, label }))}
        values={draft.categories}
        onChange={(categories) => setDraft({ ...draft, categories })}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="report-room" className="text-sm font-medium">
          Ruangan
        </label>
        <input
          id="report-room"
          value={draft.room}
          onChange={(event) => setDraft({ ...draft, room: event.target.value })}
          placeholder="Contoh: H.5.6"
          className={INPUT_CLASS}
        />
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setDraft(DEFAULT_REPORT_FILTER);
            onApply(DEFAULT_REPORT_FILTER);
          }}
        >
          Reset
        </Button>
        <Button type="submit">Terapkan</Button>
      </div>
    </form>
  );
}
