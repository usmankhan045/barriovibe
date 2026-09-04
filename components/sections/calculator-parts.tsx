'use client';

import { useId } from 'react';
import { cx } from '@/lib/cx';

/**
 * The shared parts of every calculator under /tools.
 *
 * These began inside components/sections/SalaryCalculator.tsx, which was right
 * while there was one calculator. There are now ten, and a money formatter or
 * a numeric field copied ten times is ten chances for one page to group digits
 * differently from the page next to it, or to accept a pasted "Rs 1,50,000"
 * everywhere but one.
 *
 * So the formatting, the field, the choice control and the result row live
 * here, and each calculator supplies only its own inputs, its own arithmetic
 * (from lib/tax/) and its own result panel.
 *
 * Everything in this file is presentational. Not one tax figure appears here:
 * the rates live in lib/tax/ with their statutory section attached, and a
 * component that hard-coded one would be a second source no check can see.
 */

/* ── Formatting ─────────────────────────────────────────────────────────────
   `en-PK` gives the digit grouping Pakistani readers expect. Rupee amounts are
   rendered to whole rupees: the arithmetic is exact in the engine and the
   paisa on a salary figure is noise. */
export const money = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });
export const percent = new Intl.NumberFormat('en-PK', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

/**
 * The largest figure any field accepts.
 *
 * One trillion rupees: comfortably above the largest turnover, property value
 * or salary anyone could enter in earnest, and comfortably below 2^53, where a
 * JavaScript number stops holding integers exactly. See the note in
 * NumberField's onChange for what happens without it.
 */
export const MAX_INPUT = 1_000_000_000_000;

export function Rs(value: number): string {
  return `Rs ${money.format(Math.round(value))}`;
}

/**
 * A number the visitor types.
 *
 * `inputMode="numeric"` rather than `type="number"`: a number input on a phone
 * still offers a spinner nobody uses here, and it silently discards a value
 * the browser considers malformed, which loses what someone typed while they
 * are mid-way through typing it. Text plus a numeric keypad keeps every
 * keystroke and lets this component decide what a number is.
 */
export function NumberField({
  label,
  value,
  onChange,
  hint,
  prefix = 'Rs',
  placeholder = '0',
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  hint?: string;
  prefix?: string | null;
  placeholder?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display text-[14px] font-bold text-ink">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-ink-body"
            aria-hidden="true"
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value === 0 ? '' : money.format(value)}
          placeholder={placeholder}
          aria-describedby={hint ? hintId : undefined}
          onChange={(event) => {
            // Strip grouping separators and anything else non-numeric, so a
            // pasted "1,50,000" or "Rs 150000" both work. This is also what
            // keeps NaN and Infinity out of the tax engines entirely: no
            // sequence of digits parses to either.
            const digits = event.target.value.replace(/[^\d]/g, '');
            if (digits === '') {
              onChange(0);
              return;
            }
            // Clamp before the value can lose precision.
            //
            // A JavaScript number holds integers exactly only below 2^53. Paste
            // twenty-five digits into a salary field and every figure on the
            // page becomes a float artifact: correct arithmetic on a number the
            // visitor did not type, rendered with full confidence. It cannot
            // crash anything, but "Rs 12,000,000,000,000,002,000,000,000" is
            // not a number this site should ever print.
            //
            // The cap is far above any real salary, rent, turnover or property
            // value, so nothing legitimate reaches it.
            onChange(Math.min(Number(digits), MAX_INPUT));
          }}
          className={cx(
            'w-full rounded-chip border border-line bg-surface py-3 text-[15px] text-ink',
            'placeholder:text-ink-body focus:border-blue-600',
            'transition-colors duration-200',
            prefix ? 'pl-11 pr-4' : 'px-4',
          )}
        />
      </div>
      {hint && (
        <p id={hintId} className="text-[12.5px] leading-[1.5] text-ink-body">
          {hint}
        </p>
      )}
    </div>
  );
}

/** One line in a results list. `tone` marks the headline row. */
export function Row({
  label,
  value,
  note,
  tone = 'normal',
}: {
  label: string;
  value: string;
  note?: string;
  tone?: 'normal' | 'muted' | 'total';
}) {
  return (
    <div
      className={cx(
        'flex items-baseline justify-between gap-4 py-2.5',
        tone === 'total' && 'border-t border-line pt-4',
      )}
    >
      <span className="min-w-0">
        <span
          className={cx(
            'block text-[14.5px]',
            tone === 'total' ? 'font-display font-bold text-ink' : 'text-ink-body',
          )}
        >
          {label}
        </span>
        {note && <span className="mt-0.5 block text-[12.5px] text-ink-body">{note}</span>}
      </span>
      <span
        className={cx(
          'flex-none tabular-nums',
          tone === 'total'
            ? 'font-display text-[19px] font-bold text-ink'
            : tone === 'muted'
              ? 'text-[14.5px] text-ink-body'
              : 'text-[14.5px] font-medium text-ink-strong',
        )}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * A segmented choice: two or three options, all visible.
 *
 * A `<select>` would be shorter, but every one of these changes what the
 * number beside it means (monthly against annual, filer against non-filer),
 * and a reader should be able to see the alternative they did not pick without
 * opening anything. Above three options this stops being true and a select is
 * the better control; nothing here has more than three.
 */
export function ChoiceField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (next: T) => void;
  hint?: string;
}) {
  const id = useId();

  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend id={id} className="font-display text-[14px] font-bold text-ink">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={id}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cx(
              'u-tap flex-1 cursor-pointer rounded-chip border px-4 py-2.5 text-center',
              'text-[14px] font-medium transition-colors',
              // The input itself is `sr-only`, so the browser's own focus ring
              // has nothing visible to draw around. Without this, a keyboard
              // user arrowing through the options gets no indication of where
              // they are: the control works, and looks like it does not.
              // `focus-within` puts the ring on the label instead.
              'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600',
              value === option.value
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-line bg-surface text-ink-body hover:border-blue-600',
            )}
          >
            <input
              type="radio"
              name={id}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
      {hint && <p className="text-[12.5px] leading-[1.5] text-ink-body">{hint}</p>}
    </fieldset>
  );
}

/**
 * The headline figure a calculator exists to produce.
 *
 * One per page, at the top of the results panel. It is deliberately large and
 * deliberately alone: a visitor who reads nothing else should still leave with
 * the right number.
 */
export function Headline({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-body">{label}</p>
      <p className="mt-1.5 font-display text-[34px] font-bold leading-[1.1] text-ink tabular-nums md:text-[40px]">
        {value}
      </p>
      {note && <p className="mt-2 text-[13.5px] leading-[1.5] text-ink-body">{note}</p>}
    </div>
  );
}

/**
 * The empty state, shown before anything has been typed.
 *
 * Every calculator here computes from zero, so without this the visitor's
 * first sight of the results panel is a column of "Rs 0" that looks like an
 * answer. Naming what to type instead is both friendlier and more honest.
 */
export function AwaitingInput({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
      <span className="grid size-11 place-items-center rounded-pill bg-blue-50 text-blue-600" aria-hidden="true">
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M8 6h8M8 11h8M8 16h5" strokeLinecap="round" />
        </svg>
      </span>
      <p className="max-w-[32ch] text-[14px] leading-[1.6] text-ink-body">{children}</p>
    </div>
  );
}

/**
 * The panel that shows a calculator's working.
 *
 * Collapsed by default and marked up as a real `<details>`, so it is reachable
 * by keyboard and findable by in-page search without any JavaScript of its own.
 * Every calculator here shows its arithmetic: a number a visitor cannot check
 * is a number they have to take on trust, and this site's argument for its own
 * calculators is that they do not ask for that.
 */
export function Working({ children }: { children: React.ReactNode }) {
  return (
    <details className="group mt-6 border-t border-line pt-5">
      <summary className="u-tap flex cursor-pointer list-none items-center justify-between gap-3 text-[13.5px] font-semibold text-ink-strong transition-colors hover:text-blue-600">
        How this was worked out
        <svg
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="flex-none transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m5.5 9 6.5 6.5L18.5 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="mt-4 text-[13.5px] leading-[1.65] text-ink-body">{children}</div>
    </details>
  );
}
