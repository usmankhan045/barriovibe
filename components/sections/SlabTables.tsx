import Link from 'next/link';
import { TAX_YEARS, DEFAULT_TAX_YEAR_ID } from '@/lib/tax/salary-years';
import { slabPdfFor } from '@/lib/pdf-files';

const money = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });

/** A rate as it should be read, with no false precision. */
const pc = (rate: number) => `${Number((rate * 100).toFixed(4))}%`;

/**
 * Every salaried slab table the site holds, newest first.
 *
 * ## Why all fifteen on one page rather than a page each
 *
 * Because the question people arrive with is comparative. "What were the
 * slabs in 2023-24" is usually the first half of "and how does that compare
 * with now", and fifteen separate pages answer the first half while making
 * the second half a navigation exercise. One page, one table per year, and
 * the browser's own find function does the rest.
 *
 * It also keeps the whole thing honest: a reader can see at a glance that
 * three consecutive years share a table, which is a real feature of the law
 * and one that a page-per-year would hide behind three identical pages.
 *
 * ## Where the tables come from
 *
 * `lib/tax/salary-years.ts`, which is the same module the calculator computes
 * with and which reconciles every table against the First Schedule on import.
 * Nothing here is retyped, so a table on this page cannot disagree with the
 * answer the calculator gives for the same year.
 */
export function SlabTables() {
  return (
    <div className="space-y-12">
      {TAX_YEARS.map((year) => {
        const isCurrent = year.id === DEFAULT_TAX_YEAR_ID;
        const pdf = slabPdfFor(year);
        return (
          <section key={year.id} id={year.id} aria-labelledby={`slabs-${year.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 id={`slabs-${year.id}`} className="font-display text-h3 text-ink">
                {year.searchLabel}
                <span className="ml-2 text-[14px] font-normal text-ink-body">
                  {year.label}
                  {isCurrent ? ', current' : ''}
                </span>
              </h2>
              <p className="text-[13px] text-ink-body">
                {year.period}. Set by the {year.authority}.
              </p>
            </div>

            {/* The year's own quirk, where it has one. These are the lines that
                stop a reader mis-reading a table that does not behave like the
                others: a flat charge, a shared table, a stated figure that is
                deliberately not the sum beneath it. */}
            {year.note ? (
              <p className="mt-3 max-w-[80ch] rounded-chip border border-line bg-surface px-4 py-2.5 text-[12.5px] leading-[1.55] text-ink-body">
                {year.note}
              </p>
            ) : null}

            <div className="u-tile mt-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-[14px]">
                  <caption className="sr-only">
                    Salaried income tax rates for {year.label}
                  </caption>
                  <thead>
                    <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.08em] text-ink-body">
                      <th scope="col" className="px-5 py-3.5 font-bold">
                        Annual taxable income
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-right font-bold">
                        Rate on the excess
                      </th>
                      <th scope="col" className="px-5 py-3.5 text-right font-bold">
                        Tax at the floor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {year.slabs.map((slab, i) => {
                      const from = i === 0 ? 0 : (year.slabs[i - 1]!.upTo ?? 0);
                      return (
                        <tr key={from} className="border-b border-line last:border-0">
                          <td className="px-5 py-3.5 text-ink-strong">
                            {slab.upTo === null
                              ? `Above Rs ${money.format(from)}`
                              : i === 0
                                ? `Up to Rs ${money.format(slab.upTo)}`
                                : `Rs ${money.format(from + 1)} to Rs ${money.format(slab.upTo)}`}
                          </td>
                          {/* A flat band has no rate to print: it charges one
                              figure across the whole band. Showing 0% beside a
                              Rs 1,000 charge would read as an error. */}
                          <td className="px-5 py-3.5 text-right tabular-nums text-ink-body">
                            {slab.flat !== undefined
                              ? 'Flat charge'
                              : slab.rate === 0
                                ? 'Nil'
                                : pc(slab.rate)}
                          </td>
                          <td className="px-5 py-3.5 text-right tabular-nums text-ink-body">
                            {slab.flat !== undefined
                              ? `Rs ${money.format(slab.flat)}`
                              : slab.fixed === 0
                                ? '-'
                                : `Rs ${money.format(slab.fixed)}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-3 text-[13px] text-ink-body">
              <Link
                href="/tools/salary-tax"
                className="u-tap underline decoration-line underline-offset-4 hover:decoration-blue-600"
              >
                Work out the tax on a salary for {year.searchLabel}
              </Link>
              {pdf ? (
                <>
                  {' · '}
                  <a
                    href={pdf.href}
                    download
                    className="u-tap underline decoration-line underline-offset-4 hover:decoration-blue-600"
                  >
                    Download {year.searchLabel} as a PDF
                  </a>
                </>
              ) : null}
              {year.surcharge.rate > 0 ? (
                <>
                  {' '}
                  A surcharge of {pc(year.surcharge.rate)} under section 4AB also applied
                  above Rs {money.format(year.surcharge.threshold)} of taxable income this
                  year.
                </>
              ) : null}
            </p>
          </section>
        );
      })}
    </div>
  );
}
