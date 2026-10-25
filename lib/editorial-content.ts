import 'server-only';
import { cache } from 'react';
import { neon } from '@neondatabase/serverless';
import { ALL_GUIDES, type Guide } from '@/content/guides';
import { ALL_POSTS, type Post } from '@/content/posts';

export type EditorialKind = 'guide' | 'article';
export type EditorialStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type EditorialItem = Guide | Post;

export interface EditorialRow {
  id: string;
  source_key: string;
  kind: EditorialKind;
  slug: string;
  cluster: string;
  status: EditorialStatus;
  published_at: string | null;
  data: EditorialItem;
  created_at: string;
  updated_at: string;
}

/* Neon decodes Postgres timestamptz columns to JavaScript Date objects. Keep
 * that driver-specific shape at this boundary; the rest of the content layer
 * intentionally deals in ISO strings, matching the source-controlled dates. */
type DatabaseEditorialRow = Omit<
  EditorialRow,
  'published_at' | 'created_at' | 'updated_at'
> & {
  published_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

function isoTimestamp(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value;
}

function normalizeRow(row: DatabaseEditorialRow): EditorialRow {
  return {
    ...row,
    published_at: row.published_at instanceof Date
      ? row.published_at.toISOString()
      : row.published_at,
    created_at: isoTimestamp(row.created_at),
    updated_at: isoTimestamp(row.updated_at),
  };
}

function databaseUrl(required = false): string | null {
  const value = process.env.DATABASE_URL;
  if (!value && required) throw new Error('DATABASE_URL is required.');
  return value ?? null;
}

const rows = cache(async (): Promise<EditorialRow[]> => {
  const connectionString = databaseUrl();
  if (!connectionString) return [];
  try {
    const sql = neon(connectionString);
    const result = await sql`select * from editorial_content order by updated_at desc`;
    return (result as DatabaseEditorialRow[]).map(normalizeRow);
  } catch (error) {
    // Keep the public site available before the optional migration is applied.
    console.error('[editorial] managed content unavailable:', error instanceof Error ? error.message : error);
    return [];
  }
});

export async function saveEditorialRow(input: {
  sourceKey: string;
  kind: EditorialKind;
  slug: string;
  cluster: string;
  status: EditorialStatus;
  publishedAt: string;
  data: EditorialItem;
}): Promise<void> {
  const sql = neon(databaseUrl(true)!);
  await sql`
    insert into editorial_content
      (source_key, kind, slug, cluster, status, published_at, data, updated_at)
    values
      (${input.sourceKey}, ${input.kind}, ${input.slug}, ${input.cluster}, ${input.status},
       ${input.publishedAt}, ${JSON.stringify(input.data)}::jsonb, now())
    on conflict (source_key) do update set
      kind = excluded.kind,
      slug = excluded.slug,
      cluster = excluded.cluster,
      status = excluded.status,
      published_at = excluded.published_at,
      data = excluded.data,
      updated_at = now()
  `;
}

export async function deleteEditorialRow(sourceKey: string, kind: EditorialKind): Promise<void> {
  const sql = neon(databaseUrl(true)!);
  await sql`delete from editorial_content where source_key = ${sourceKey} and kind = ${kind}`;
}

function sourceKey(kind: EditorialKind, slug: string): string {
  return `${kind}:${slug}`;
}

export function inferredStatus(item: EditorialItem): EditorialStatus {
  return Date.parse(item.publishedAt) <= Date.now() ? 'published' : 'scheduled';
}

function isPublic(status: EditorialStatus, publishedAt: string | null): boolean {
  return status === 'published' || (status === 'scheduled' && Boolean(publishedAt) && Date.parse(publishedAt!) <= Date.now());
}

async function merged<T extends EditorialItem>(
  kind: EditorialKind,
  originals: T[],
  includeUnpublished: boolean,
): Promise<T[]> {
  const managed = (await rows()).filter((row) => row.kind === kind);
  const bySource = new Map(managed.map((row) => [row.source_key, row]));
  const seen = new Set<string>();
  const result: T[] = [];

  for (const original of originals) {
    const row = bySource.get(sourceKey(kind, original.slug));
    if (row) seen.add(row.id);
    const item = (row?.data ?? original) as T;
    const status = row?.status ?? inferredStatus(original);
    const publishedAt = row?.published_at ?? original.publishedAt;
    if (includeUnpublished || isPublic(status, publishedAt)) result.push(item);
  }

  for (const row of managed) {
    if (seen.has(row.id)) continue;
    if (includeUnpublished || isPublic(row.status, row.published_at)) result.push(row.data as T);
  }
  return result;
}

export async function managedGuides(includeUnpublished = false): Promise<Guide[]> {
  return merged('guide', ALL_GUIDES, includeUnpublished);
}

export async function managedArticles(includeUnpublished = false): Promise<Post[]> {
  return merged('article', ALL_POSTS, includeUnpublished);
}

export async function editorialRows(): Promise<EditorialRow[]> {
  return rows();
}

export async function getManagedGuide(cluster: string, slug: string): Promise<Guide | undefined> {
  return (await managedGuides()).find((item) => item.cluster === cluster && item.slug === slug);
}

export async function getManagedArticle(cluster: string, slug: string): Promise<Post | undefined> {
  return (await managedArticles()).find((item) => item.cluster === cluster && item.slug === slug);
}
