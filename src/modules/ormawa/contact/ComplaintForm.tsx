"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ResultDialog } from "@/components/feedback/ResultDialog";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { applyFormErrors } from "@/lib/api/form-errors";
import { REPORT_CATEGORY_LABEL } from "@/shared/reports/report-labels";
import { COMPLAINT_FIELD_MAP, complaintSchema, type ComplaintInput, type ComplaintValues } from "./complaintSchema";
import { sendComplaint } from "./sendComplaint";

const DEFAULTS = { category: "", body: "" } as unknown as ComplaintInput;

export function ComplaintForm() {
  const [result, setResult] = useState<"sent" | "failed" | null>(null);
  const form = useForm<ComplaintInput, unknown, ComplaintValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: DEFAULTS,
  });
  const { errors, isSubmitting } = form.formState;
  const category = useWatch({ control: form.control, name: "category" });

  const submit = form.handleSubmit(async (values) => {
    const response = await sendComplaint(values);
    if (response.ok) {
      form.reset(DEFAULTS);
      setResult("sent");
    } else if ("validation" in response) {
      applyFormErrors(response.validation, form.setError, COMPLAINT_FIELD_MAP);
    } else {
      setResult("failed");
    }
  });

  return (
    <section aria-labelledby="complaint-title" className="flex min-w-0 flex-1 flex-col gap-4">
      <h2 id="complaint-title" className="border-b border-border pb-2 text-xl font-semibold tracking-[0.05em]">
        Formulir Pengaduan
      </h2>
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-5">
        <Field label="Kategori Pengaduan" htmlFor="complaint-category" error={errors.category?.message}>
          <SelectInput
            id="complaint-category"
            {...form.register("category")}
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={errors.category ? "complaint-category-error" : undefined}
            className={category ? "" : "text-muted"}
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            {Object.entries(REPORT_CATEGORY_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Deskripsi" htmlFor="complaint-body" error={errors.body?.message}>
          <textarea
            id="complaint-body"
            rows={4}
            {...form.register("body")}
            placeholder="Masukkan deskripsi masalah Anda di sini!"
            aria-invalid={errors.body ? true : undefined}
            aria-describedby={errors.body ? "complaint-body-error" : undefined}
            className={`${INPUT_CLASS} max-h-60`}
          />
        </Field>
        <Button type="submit" disabled={isSubmitting} className="mt-auto self-start">
          {isSubmitting ? "Mengirim..." : "Laporkan Masalah"}
        </Button>
      </form>

      <ResultDialog
        open={result !== null}
        onClose={() => setResult(null)}
        tone={result === "failed" ? "failure" : "success"}
        title={result === "failed" ? "Laporan Gagal Terkirim" : "Laporan Terkirim"}
      >
        {result === "failed"
          ? "Terjadi kesalahan saat mengirim laporan. Silakan coba lagi dalam beberapa saat."
          : "Terima kasih. Admin akan meninjau laporan Anda."}
      </ResultDialog>
    </section>
  );
}
