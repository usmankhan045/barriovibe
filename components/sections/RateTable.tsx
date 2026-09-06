import Link from 'next/link';
import { RATE_GROUPS } from '@/lib/tax/rate-card';

/**
 * The withholding rate card, rendered from lib/tax/rate-card.ts.
 *
 * ## Why this is a server component with no state
 *
 * Everything else under /tools computes. This does not: it states the rates
 * and gets out of the way. There is nothing to type, so there is nothing to
 * make interactive, and a table that renders on the server is a table a search
 * engine can read and a printer can print.
 *
 * ## The two columns are the point
 *
 * Filer and non-filer sit side by side rather than behind a toggle, because
 * the gap between them is the entire argument for filing a return. On several
 * of these rows the non-filer column is more than double, and on two of them
 * a filer pays nothing at all. A toggle would hide exactly the comparison
 * somebody came here to make.
 *
 * ## Rows link to their calculator
 *
 * A rate card answers "what is the rate". The next question is almost always
 * "what does that cost me", and for most of these rows this site already has
 * the page that answers it. Linking the row is cheaper for the reader than
 * making them find it from the hub.
 */
export function RateTable() {
  return (
    <div className="space-y-10">
      {RATE_GROUPS.map((group) => (
        <section key={group.title} aria-labelledby={`rates-${group.title.replace(/\s+/g, '-').toLowerCase()}`}>
          <h2
            id={`rates-${group.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="font-display text-h3 text-ink"
          >
            {group.title}
          </h2>

          {/* The table scrolls inside its own box on a narrow screen rather
              than making the page scroll sideways. Four columns of rates do
              not compress usefully below about 620px. */}
          <div className="u-tile mt-4 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.08em] text-ink-body">
                    <th scope="col" className="px-5 py-3.5 font-bold">
                      Section
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-bold">
                      Nature of payment
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right font-bold">
                      Filer
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right font-bold">
                      Non-filer
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right font-bold">
                      Nature
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr
                      key={`${row.section}-${row.payment}`}
                      className="border-b border-line align-top last:border-0"
                    >
                      <td className="px-5 py-4 tabular-nums text-ink-body">{row.section}</td>
                      <td className="px-5 py-4 text-ink-strong">
                        {row.toolSlug ? (
                          <Link
                            href={`/tools/${row.toolSlug}`}
                            className="u-tap underline decoration-line underline-offset-4 hover:decoration-blue-600"
                          >
                            {row.payment}
                          </Link>
                        ) : (
                          row.payment
                        )}
                        {row.note ? (
                          <span className="mt-1 block max-w-[52ch] text-[12.5px] leading-[1.5] text-ink-body">
                            {row.note}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-medium text-ink-strong">
                        {row.filer}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-medium text-ink-strong">
                        {row.nonFiler}
                      </td>
                      <td className="px-5 py-4 text-right text-[13px] text-ink-body">
                        {row.nature}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
