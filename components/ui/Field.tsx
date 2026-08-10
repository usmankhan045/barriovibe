import { cx } from '@/lib/cx';
import type { FieldProps, SelectFieldProps, TextareaFieldProps } from './contracts';

/**
 * SLOT — form fields. See ./README.md.
 *
 * Server Components with no client JS: validation state arrives as props from
 * the form above them.
 *
 * Three details that are easy to get wrong and matter here:
 *
 *   • The error message is linked by `aria-describedby`, not just placed
 *     nearby, so a screen reader announces it with the field.
 *   • `aria-invalid` is what actually communicates the error state; the red
 *     border alone is invisible to assistive tech and to colour-blind users.
 *   • Required fields are marked in text ("Required"), not with a bare
 *     asterisk that has no accessible meaning.
 */

const CONTROL = [
  'w-full rounded-chip border bg-surface px-4 py-3 text-[15px] text-ink',
  'placeholder:text-ink-body',
  'transition-colors duration-200',
  // The border tint is a secondary cue only.
  //
  // This line previously also carried `focus:outline-none
  // focus-visible:outline-none`, which cancelled the global 2px
  // `:focus-visible` ring on all seven controls and left a 1px border colour
  // change as the only focus indicator — weaker than every other focusable
  // element on the site, and easy to miss. An audit caught it. Do not
  // reintroduce outline suppression here.
  'focus:border-blue-600',
].join(' ');

function Label({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={name} className="flex items-baseline justify-between gap-3">
      <span className="font-display text-[14px] font-bold text-ink">{label}</span>
      {!required && <span className="text-[12.5px] text-ink-body">Optional</span>}
    </label>
  );
}

function Messages({
  name,
  error,
  hint,
}: {
  name: string;
  error?: string;
  hint?: string;
}) {
  if (error) {
    return (
      <p id={`${name}-error`} className="text-[13px] text-danger">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${name}-hint`} className="text-[13px] text-ink-body">
        {hint}
      </p>
    );
  }
  return null;
}

function describedBy(name: string, error?: string, hint?: string) {
  if (error) return `${name}-error`;
  if (hint) return `${name}-hint`;
  return undefined;
}

export function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  defaultValue,
  error,
  hint,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label name={name} label={label} required={required} />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={cx(CONTROL, error ? 'border-danger' : 'border-line')}
      />
      <Messages name={name} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  required,
  options,
  placeholder,
  defaultValue,
  error,
  hint,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label name={name} label={label} required={required} />
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ''}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, error, hint)}
          className={cx(
            CONTROL,
            'appearance-none pr-11',
            error ? 'border-danger' : 'border-line',
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Decorative chevron; the native control still handles interaction. */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-body"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5.5 9 6.5 6.5L18.5 9" />
        </svg>
      </div>
      <Messages name={name} error={error} hint={hint} />
    </div>
  );
}

export function TextareaField({
  name,
  label,
  required,
  placeholder,
  defaultValue,
  rows = 5,
  error,
  hint,
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label name={name} label={label} required={required} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={cx(CONTROL, 'resize-y', error ? 'border-danger' : 'border-line')}
      />
      <Messages name={name} error={error} hint={hint} />
    </div>
  );
}
