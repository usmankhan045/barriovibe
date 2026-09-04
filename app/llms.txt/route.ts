import { BRAND, TAGLINE, CONTACT } from '@/content/site';
import { PRACTICE_GROUPS, SERVICES, serviceHref, practiceHref } from '@/content/services';
import { TOOL_GROUPS, toolHref } from '@/content/tools';
import { absoluteUrl } from '@/lib/seo';

/**
 * llms.txt, the proposed convention for telling an AI assistant what a site is
 * and where its substance lives.
 *
 * Generated from the same content layer as the sitemap rather than written by
 * hand, for the same reason: a service added to `content/services/` should not
 * need a second edit here to be discoverable.
 *
 * Plain text, not markdown-rendered HTML, so it stays readable to a crawler
 * that fetches it directly.
 */

export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${BRAND.name}`);
  lines.push('');
  lines.push(`> ${TAGLINE}`);
  lines.push('');
  lines.push(
    `${BRAND.name} is a firm in ${CONTACT.address.city}, Pakistan, offering ${SERVICES.length} services across software and AI, growth and e-commerce, and corporate, tax and legal work. One contract, one accountable team.`,
  );
  lines.push('');

  lines.push('## Contact');
  lines.push('');
  lines.push(`- Email: ${CONTACT.email}`);
  lines.push(`- Phone: ${CONTACT.phone}`);
  lines.push(`- Hours: ${CONTACT.hours}`);
  lines.push(`- Enquiries: ${absoluteUrl('/contact')}`);
  lines.push('');

  for (const { practice, groups } of PRACTICE_GROUPS) {
    lines.push(`## ${practice.title}`);
    lines.push('');
    lines.push(`- [${practice.title}](${absoluteUrl(practiceHref(practice.slug))})`);
    for (const group of groups) {
      for (const service of group.services) {
        lines.push(
          `- [${service.title}](${absoluteUrl(serviceHref(service))}): ${service.oneLiner}`,
        );
      }
    }
    lines.push('');
  }

  // Derived from TOOLS, the same way the services above are derived from
  // SERVICES. The calculator used to be written out here by hand, which was
  // fine while it was the only one and would have quietly omitted the second.
  lines.push('## Tools');
  lines.push('');
  lines.push(`- [Tools](${absoluteUrl('/tools')}): free calculators, computed in the browser.`);
  for (const group of TOOL_GROUPS) {
    for (const tool of group.tools) {
      lines.push(`- [${tool.title}](${absoluteUrl(toolHref(tool))}): ${tool.card}`);
    }
  }
  lines.push('');

  lines.push('## About');
  lines.push('');
  lines.push(`- [How we work](${absoluteUrl('/about')})`);
  lines.push(`- [Results](${absoluteUrl('/work')})`);
  lines.push(`- [Privacy](${absoluteUrl('/privacy')}): no analytics, no cookies, no third-party trackers.`);
  lines.push(`- [Terms](${absoluteUrl('/terms')})`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
