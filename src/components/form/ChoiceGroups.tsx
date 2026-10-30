"use client";

export interface Choice<T extends string> {
  value: T;
  label: string;
}

interface GroupProps<T extends string> {
  legend: string;
  name: string;
  options: Choice<T>[];
}

const LEGEND = "mb-2 text-sm font-medium";

/** Radio buttons laid out in a row. */
export function RadioRow<T extends string>({ legend, name, options, value, onChange }: GroupProps<T> & { value: T; onChange: (value: T) => void }) {
  return (
    <fieldset>
      <legend className={LEGEND}>{legend}</legend>
      <div className="flex flex-wrap gap-x-5">
        {options.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Single choice shown as chips (radio inputs underneath). */
export function ChipRadios<T extends string>({ legend, name, options, value, onChange }: GroupProps<T> & { value: T; onChange: (value: T) => void }) {
  return (
    <fieldset>
      <legend className={LEGEND}>{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex min-h-11 items-center rounded-md px-3 text-xs has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus ${
                checked ? "bg-primary-soft font-semibold text-primary" : "bg-page text-ink hover:bg-primary-soft"
              }`}
            >
              <input type="radio" name={name} checked={checked} onChange={() => onChange(option.value)} className="sr-only" />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Multiple choice as checkboxes; an empty selection is left to the caller to interpret. */
export function CheckboxGrid<T extends string>({ legend, name, options, values, onChange }: GroupProps<T> & { values: T[]; onChange: (values: T[]) => void }) {
  return (
    <fieldset>
      <legend className={LEGEND}>{legend}</legend>
      <div className="flex flex-wrap gap-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              name={name}
              checked={values.includes(option.value)}
              onChange={(event) =>
                onChange(event.target.checked ? [...values, option.value] : values.filter((value) => value !== option.value))
              }
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
