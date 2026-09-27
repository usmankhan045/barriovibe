import {
  RATES_BASIS,
  RATES_DISCLAIMER,
  RATES_REVIEWED,
  RATES_REVIEWER,
  SOURCES_DISCLAIMER,
} from '@/content/provenance';

/**
 * Where the figures came from, who checked them, and when.
 *
 * Sits directly under the calculator on every tool page, which is the placement
 * the content argues for: a reader who has just been handed a number is exactly
 * the reader who should be told what it rests on, and one who scrolled no
 * further has still seen it.
 *
 * Rendered as prose in a bordered block rather than as a badge or a pill. A
 * badge reads as a trust ornament, the kind every site awards itself; a
 * sentence naming an Act and a date is a checkable claim, which is the only
 * kind worth making. See content/provenance.ts for why this exists at all.
 */
export function RateProvenance({
  basis,
  reviewedOn,
}: {
  /**
   * A guide's own sources, for a guide that is not about tax rates. Unset, the
   * block states the Income Tax Ordinance, which is right for every calculator
   * and every tax guide and wrong for a patent or a Companies House guide. See
   * `basis` in content/guides/types.ts.
   */
  basis?: string;
  /** When `basis` was last read. Required in practice whenever `basis` is set. */
  reviewedOn?: string;
} = {}) {
  const ownSources = Boolean(basis);
  const reviewedIso = ownSources && reviewedOn ? reviewedOn : RATES_REVIEWED;
  const reviewed = new Date(reviewedIso);
  // en-GB gives "4 September 2026": unambiguous to a Pakistani reader, where a
  // numeric date is not. `timeZone` is pinned so the rendered string cannot
  // shift by a day depending on where the build ran.
  const reviewedLabel = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(reviewed);

  return (
    <div className="u-tile mt-8 p-6 md:p-7">
      <h2 className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-body">
        Where these figures come from
      </h2>

      <dl className="mt-4 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
        <div>
          <dt className="text-[12.5px] text-ink-body">{ownSources ? 'Sources' : 'Statutory basis'}</dt>
          <dd className="mt-1 text-[14px] leading-[1.6] text-ink-strong">{basis ?? RATES_BASIS}</dd>
        </div>

        <div>
          <dt className="text-[12.5px] text-ink-body">
            {ownSources ? 'Last checked against the sources' : 'Last checked against the statute'}
          </dt>
          <dd className="mt-1 text-[14px] leading-[1.6] text-ink-strong">
            {/* A machine-readable date beside the human one: this is the value
                the page's dateModified is emitted from, and a crawler that
                reads the markup rather than the schema still gets it. */}
            <time dateTime={reviewedIso}>{reviewedLabel}</time> by{' '}
            {RATES_REVIEWER.name}
            {RATES_REVIEWER.credential ? `, ${RATES_REVIEWER.credential}` : ''}
            {/* The standing is a tax claim (it files through IRIS), so it is
                said only where the figures are tax figures. */}
            {ownSources ? '.' : <>, which {RATES_REVIEWER.standing}.</>}
          </dd>
        </div>
      </dl>

      <p className="mt-5 max-w-[68ch] border-t border-line pt-5 text-[13.5px] leading-[1.6] text-ink-body">
        {ownSources ? SOURCES_DISCLAIMER : RATES_DISCLAIMER}
      </p>
    </div>
  );
}
