import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

/** Body of a Laravel 422 response. */
export interface LaravelValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export function isLaravelValidationError(value: unknown): value is LaravelValidationError {
  if (typeof value !== "object" || value === null) return false;
  const { message, errors } = value as Record<string, unknown>;
  return (
    typeof message === "string" &&
    typeof errors === "object" &&
    errors !== null &&
    Object.values(errors).every((messages) => Array.isArray(messages))
  );
}

export type FormErrorEntry<TField extends string> = { field: TField | "root.server"; message: string };

/**
 * Pairs each Laravel error key (snake_case, maybe dotted like `files.0`) with a form field.
 * Keys missing from `fieldMap` go to `root.server` so the message is still shown somewhere.
 */
export function toFormErrors<TField extends string>(
  error: LaravelValidationError,
  fieldMap: Partial<Record<string, TField>>,
): FormErrorEntry<TField>[] {
  const entries = Object.entries(error.errors)
    .filter(([, messages]) => messages.length > 0)
    .map(([key, messages]) => ({
      field: fieldMap[key] ?? fieldMap[key.split(".")[0]] ?? ("root.server" as const),
      message: messages[0],
    }));

  // first message per field wins, so the form shows one error each
  const seen = new Set<string>();
  const unique = entries.filter((entry) => !seen.has(entry.field) && seen.add(entry.field));

  return unique.length > 0 ? unique : [{ field: "root.server", message: error.message }];
}

export function applyFormErrors<TValues extends FieldValues>(
  error: LaravelValidationError,
  setError: UseFormSetError<TValues>,
  fieldMap: Partial<Record<string, FieldPath<TValues>>>,
) {
  for (const { field, message } of toFormErrors(error, fieldMap)) {
    setError(field as FieldPath<TValues> | `root.${string}`, { type: "server", message });
  }
}
