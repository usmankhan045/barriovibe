import { PUBLISHED_GUIDES, guideHref } from '@/content/guides';
import { PUBLISHED_POSTS, postHref } from '@/content/posts';
import { TOOLS, toolHref } from '@/content/tools';
import { SERVICES } from '@/content/services';
import { SERVICE_LINKS } from '@/content/service-links';
import type { Service } from '@/content/types';

/**
 * Resolves content/service-links.ts into things a page can render.
 *
 * Both directions read the PUBLISHED lists, never the full slate, so a
 * scheduled guide is invisible here until the build that publishes it, exactly
 * as it is everywhere else. See the note at the top of content/service-links.ts.
 */

export type EvidenceKind = 'Guide' | 'Calculator' | 'Analysis';

export interface Evidence {
  kind: EvidenceKind;
  title: string;
  card: string;
  href: string;
}

const GUIDE_BY_SLUG = new Map(PUBLISHED_GUIDES.map((g) => [g.slug, g]));
const POST_BY_SLUG = new Map(PUBLISHED_POSTS.map((p) => [p.slug, p]));
const TOOL_BY_SLUG = new Map(TOOLS.map((t) => [t.slug, t]));

/**
 * The guides, calculators and posts behind one service, in the order the map
 * lists them, guides first. Guides lead because they answer the question the
 * reader of a service page is usually still asking; the calculators turn that
 * answer into their own number; the posts are the argument around it.
 */
export function serviceEvidence(service: Service): Evidence[] {
  const links = SERVICE_LINKS[service.slug];
  if (!links) return [];

  const guides = (links.guides ?? []).flatMap((slug) => {
    const g = GUIDE_BY_SLUG.get(slug);
    return g ? [{ kind: 'Guide' as const, title: g.title, card: g.card, href: guideHref(g) }] : [];
  });
  const tools = (links.tools ?? []).flatMap((slug) => {
    const t = TOOL_BY_SLUG.get(slug);
    return t ? [{ kind: 'Calculator' as const, title: t.title, card: t.card, href: toolHref(t) }] : [];
  });
  const posts = (links.posts ?? []).flatMap((slug) => {
    const p = POST_BY_SLUG.get(slug);
    return p ? [{ kind: 'Analysis' as const, title: p.title, card: p.card, href: postHref(p) }] : [];
  });

  return [...guides, ...tools, ...posts];
}

/**
 * The reverse: which services a guide, calculator or post is evidence for.
 *
 * Service order, not map order, so a guide listed under two services always
 * names them in the order the rest of the site does.
 */
export function servicesFor(kind: 'guides' | 'tools' | 'posts', slug: string): Service[] {
  return SERVICES.filter((s) => SERVICE_LINKS[s.slug]?.[kind]?.includes(slug));
}
