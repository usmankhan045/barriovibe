import type { ReactNode } from 'react';
import { Container, Section, SectionHeading, Breadcrumb } from '@/components/primitives';
import { JsonLd, breadcrumbSchema } from '@/lib/jsonld';

/**
 * Shared shell for the two legal pages.
 *
 * Prose styling lives here rather than in a Tailwind typography plugin —
 * these are the only long-form pages on the site, and a plugin would add
 * weight to every route to serve two of them.
 */
export function LegalPage({
  title,
  eyebrow,
  accent,
  lines,
  path,
  updated,
  children,
}: {
  title: string;
  eyebrow: string;
  lines: string[];
  accent: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: title, href: path },
  ];

  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <Section tight>
        <Container>
          <Breadcrumb items={crumbs} />

          {/* Centred rather than left-pinned. At 1440 a 760px measure sitting
              hard left left the entire right half of a 1280px container blank
              for the page's full height, with nothing to balance it. */}
          <div className="mx-auto mt-8 max-w-3xl">
            <SectionHeading level={1} eyebrow={eyebrow} lines={lines} accent={accent} />
            <p className="mt-6 text-caption text-ink-body">Last updated {updated}</p>

            <div
              className={[
                'mt-12 flex flex-col gap-6',
                '[&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-h3 [&_h2]:text-ink',
                '[&_p]:text-[16.5px] [&_p]:leading-[1.75] [&_p]:text-ink-body',
                '[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 [&_ul]:pl-5',
                '[&_li]:list-disc [&_li]:text-[16.5px] [&_li]:leading-[1.7] [&_li]:text-ink-body',
                '[&_a]:font-medium [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2',
                '[&_strong]:font-bold [&_strong]:text-ink',
              ].join(' ')}
            >
              {children}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
