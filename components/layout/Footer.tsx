import Link from 'next/link';
import { Container } from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Wordmark } from './Wordmark';
import { BRAND, CONTACT, SOCIALS, SHORT_TAGLINE } from '@/content/site';
import { COMPANY_LINKS, LEGAL_LINKS, MEGA_MENU_COLUMNS } from '@/content/nav';
import { SERVICE_COUNT } from '@/content/services';

/**
 * Mega footer.
 *
 * Every service is linked here, one column per practice with the disciplines
 * as headings inside it. That is partly the site's internal-linking backbone
 * for search — every service page is one hop from every other page — and
 * partly the last guarantee that nothing is hidden: a visitor who scrolls to
 * the bottom of any page sees the complete offering.
 *
 * Three columns rather than the seven a per-discipline layout would need. At
 * seven, the columns were too narrow for a nav label and the grid wrapped into
 * a ragged second row on every breakpoint below xl. Grouping under the
 * practices puts the width back and makes the footer agree with the mega-menu
 * rather than presenting a different taxonomy at the other end of the page.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-band">
      <Container>
        {/* ── Service columns ─────────────────────────────────────────── */}
        {/* items-start, or the three columns stretch to the tallest and the
            practice headings stop aligning with each other. */}
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {MEGA_MENU_COLUMNS.map((column) => (
            <div key={column.practice.slug}>
              <div
                // min-height reserves two lines. "Performance Marketing &
                // E-commerce" wraps at every column width the grid produces
                // while the other two do not, which would otherwise put the
                // underline rules and link lists at different heights across
                // the row.
                className="mb-5 flex min-h-[3.25rem] items-baseline gap-2 border-b border-silver-300 pb-3"
              >
                <span className="font-display text-caption font-bold text-ink">
                  {column.practice.title}
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {column.groups.map((group) => (
                  <div key={group.pillar.slug}>
                    {/* Suppressed when the practice holds a single discipline:
                        a heading repeating the column head above it adds a
                        rule and a line of type and no information. */}
                    {column.groups.length > 1 && (
                      <Link
                        href={group.href}
                        className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[0.08em] text-ink-body transition-colors hover:text-blue-600"
                      >
                        {group.pillar.title}
                      </Link>
                    )}
                    <ul className="flex flex-col gap-2.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-caption text-ink-body transition-colors hover:text-blue-600"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Brand, company, contact ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 border-t border-silver-300 py-14 md:grid-cols-[1.5fr_1fr_1.2fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[38ch] text-caption text-ink-body">{SHORT_TAGLINE}</p>
            <p className="mt-4 text-caption text-ink-body">
              {SERVICE_COUNT} services. One accountable team.
            </p>
          </div>

          <nav aria-label="Company">
            <h2 className="mb-4 font-display text-caption font-bold text-ink">Company</h2>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-ink-body transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-display text-caption font-bold text-ink">Get in touch</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2.5 text-caption text-ink-body transition-colors hover:text-blue-600"
                >
                  <Icon name="mail" size={16} className="text-ink-body" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-caption text-ink-body transition-colors hover:text-blue-600"
                >
                  <Icon name="whatsapp" size={16} className="text-ink-body" />
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-caption text-ink-body">
                <Icon name="building" size={16} className="mt-0.5 flex-none text-ink-body" />
                {/* A placeholder street line rendered as a lone hyphen above
                    the city, which read as a broken empty row. Omit it until
                    there is a real address. */}
                <span>
                  {CONTACT.address.line1 !== '-' && (
                    <>
                      {CONTACT.address.line1}
                      <br />
                    </>
                  )}
                  {CONTACT.address.city}, {CONTACT.address.country}
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-caption text-ink-body">
                <Icon name="clock" size={16} className="mt-0.5 flex-none text-ink-body" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex rounded-chip border border-silver-300 bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-body transition-colors hover:border-blue-200 hover:text-blue-600"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Legal ───────────────────────────────────────────────────── */}
        <div className="flex flex-col-reverse gap-4 border-t border-silver-300 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-body">
            © {year} {BRAND.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-ink-body transition-colors hover:text-blue-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
