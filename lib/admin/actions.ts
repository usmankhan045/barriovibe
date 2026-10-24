'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ALL_GUIDES, CLUSTERS, type Guide } from '@/content/guides';
import { ALL_POSTS, POST_CLUSTERS, type Post } from '@/content/posts';
import {
  deleteEditorialRow,
  saveEditorialRow,
  type EditorialKind,
  type EditorialStatus,
} from '@/lib/editorial-content';
import { endSession, requireSession, startSession, verifyPassword } from './session';
import { loginAllowed, loginFailed, loginSucceeded } from './throttle';

export interface ActionState {
  ok?: boolean;
  error?: string;
}

const baseSchema = z.object({
  kind: z.enum(['guide', 'article']),
  sourceKey: z.string().trim().optional(),
  title: z.string().trim().min(3).max(220),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens.'),
  cluster: z.string().trim().min(1),
  navLabel: z.string().trim().min(1).max(160),
  card: z.string().trim().min(1).max(600),
  answer: z.string().trim().min(1).max(5000),
  seoTitle: z.string().trim().min(1).max(220),
  seoDescription: z.string().trim().min(1).max(500),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']),
  publishedAt: z.string().trim().min(1),
});

const faqSchema = z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) }));
const sectionSchema = z.array(z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('prose'), heading: z.string().optional(), body: z.array(z.string()) }),
  z.object({ kind: z.literal('list'), heading: z.string(), intro: z.string().optional(), items: z.array(z.string()) }),
  z.object({ kind: z.literal('steps'), heading: z.string(), intro: z.string().optional(), steps: z.array(z.object({ title: z.string(), body: z.string() })) }),
  z.object({ kind: z.literal('note'), tone: z.enum(['warning', 'info']), heading: z.string(), body: z.string() }),
  z.object({ kind: z.literal('table'), heading: z.string(), intro: z.string().optional(), columns: z.array(z.string()), rows: z.array(z.array(z.string())) }),
  z.object({ kind: z.literal('calculator'), toolSlug: z.string(), heading: z.string(), body: z.string() }),
]));
const ctaSchema = z.object({ heading: z.string(), body: z.string(), buttonLabel: z.string(), href: z.string().optional() }).optional();
const sourcesSchema = z.array(z.object({ label: z.string().min(1), url: z.url(), readOn: z.iso.date(), supports: z.string().optional() })).min(1);

function parseAs<T>(formData: FormData, name: string, schema: z.ZodType<T>, fallback: T): T {
  const value = parseJson<unknown>(formData, name, fallback);
  const result = schema.safeParse(value);
  if (!result.success) throw new Error(`${name}: ${result.error.issues[0]?.message ?? 'invalid value'}`);
  return result.data;
}

function parseJson<T>(formData: FormData, name: string, fallback: T): T {
  const raw = String(formData.get(name) ?? '').trim();
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`${name} must contain valid JSON.`);
  }
}

function localToIso(value: string): string {
  const date = /(?:Z|[+-]\d\d:\d\d)$/.test(value)
    ? new Date(value)
    : new Date(`${value.length === 16 ? `${value}:00` : value}+05:00`);
  if (Number.isNaN(date.getTime())) throw new Error('Publish date is invalid.');
  return date.toISOString();
}

function text(formData: FormData, name: string): string | undefined {
  const value = String(formData.get(name) ?? '').trim();
  return value || undefined;
}

export async function loginAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get('password') ?? '');
  const requested = String(formData.get('next') ?? '/admin');
  const incoming = await headers();
  const key = incoming.get('x-forwarded-for')?.split(',')[0]?.trim() || incoming.get('x-real-ip') || 'unknown';
  const gate = loginAllowed(key);
  if (!gate.allowed) return { error: `Too many attempts. Try again in ${Math.ceil(gate.retryAfter / 60)} minutes.` };
  try {
    if (!verifyPassword(password)) {
      loginFailed(key);
      return { error: 'Incorrect password.' };
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Login is not configured.' };
  }
  loginSucceeded(key);
  await startSession();
  redirect(requested.startsWith('/admin') ? requested : '/admin');
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect('/admin/login');
}

export async function saveContentAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();
  const result = baseSchema.safeParse({
    kind: formData.get('kind'),
    sourceKey: formData.get('sourceKey') || undefined,
    title: formData.get('title'),
    slug: formData.get('slug'),
    cluster: formData.get('cluster'),
    navLabel: formData.get('navLabel'),
    card: formData.get('card'),
    answer: formData.get('answer'),
    seoTitle: formData.get('seoTitle'),
    seoDescription: formData.get('seoDescription'),
    status: formData.get('status'),
    publishedAt: formData.get('publishedAt'),
  });
  if (!result.success) return { error: result.error.issues[0]?.message ?? 'Check the form.' };

  try {
    const value = result.data;
    const allowedClusters = value.kind === 'guide' ? CLUSTERS.map((c) => c.slug) : POST_CLUSTERS.map((c) => c.slug);
    if (!allowedClusters.includes(value.cluster as never)) throw new Error('Choose a valid cluster.');
    const sections = parseAs(formData, 'sections', sectionSchema, []);
    const faqs = parseAs(formData, 'faqs', faqSchema, []);
    const publishedAt = localToIso(value.publishedAt);
    const common = {
      slug: value.slug,
      cluster: value.cluster,
      title: value.title,
      navLabel: value.navLabel,
      card: value.card,
      answer: value.answer,
      sections,
      faqs,
      publishedAt,
      related: parseAs(formData, 'related', z.array(z.string()), []),
      cta: parseAs(formData, 'cta', ctaSchema, undefined),
      seo: { title: value.seoTitle, description: value.seoDescription },
    };
    const data = value.kind === 'guide'
      ? ({ ...common, cluster: value.cluster as Guide['cluster'], basis: text(formData, 'basis'), reviewedOn: text(formData, 'reviewedOn') } satisfies Guide)
      : ({
          ...common,
          cluster: value.cluster as Post['cluster'],
          reviewedOn: text(formData, 'reviewedOn'),
          sources: parseAs(formData, 'sources', sourcesSchema, [] as unknown as Post['sources']),
          limits: parseAs(formData, 'limits', z.array(z.string()), []),
        } satisfies Post);

    const sourceKey = value.sourceKey || `dashboard:${value.kind}:${crypto.randomUUID()}`;
    await saveEditorialRow({
      sourceKey,
      kind: value.kind,
      slug: value.slug,
      cluster: value.cluster,
      status: value.status satisfies EditorialStatus,
      publishedAt,
      data,
    });
    revalidateEditorial();
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not save content.' };
  }
}

export async function archiveContentAction(formData: FormData): Promise<void> {
  await requireSession();
  const kind = String(formData.get('kind')) as EditorialKind;
  const sourceKey = String(formData.get('sourceKey') ?? '');
  if (!['guide', 'article'].includes(kind) || !sourceKey) throw new Error('Invalid content item.');
  const source = kind === 'guide'
    ? ALL_GUIDES.find((item) => `guide:${item.slug}` === sourceKey)
    : ALL_POSTS.find((item) => `article:${item.slug}` === sourceKey);
  if (source) {
    await saveEditorialRow({
      sourceKey,
      kind,
      slug: source.slug,
      cluster: source.cluster,
      status: 'archived',
      publishedAt: source.publishedAt,
      data: source,
    });
  } else {
    await deleteEditorialRow(sourceKey, kind);
  }
  revalidateEditorial();
  redirect(kind === 'guide' ? '/admin/guides?archived=1' : '/admin/articles?archived=1');
}

function revalidateEditorial(): void {
  revalidatePath('/');
  revalidatePath('/guides', 'layout');
  revalidatePath('/blog', 'layout');
  revalidatePath('/admin', 'layout');
  revalidatePath('/sitemap.xml');
}
