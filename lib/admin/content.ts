import 'server-only';
import { ALL_GUIDES, type Guide } from '@/content/guides';
import { ALL_POSTS, type Post } from '@/content/posts';
import {
  editorialRows,
  inferredStatus,
  type EditorialItem,
  type EditorialKind,
  type EditorialRow,
  type EditorialStatus,
} from '@/lib/editorial-content';
import { requireSession } from './session';
import { redirect } from 'next/navigation';

export interface AdminContentItem {
  sourceKey: string;
  databaseId?: string;
  kind: EditorialKind;
  status: EditorialStatus;
  item: EditorialItem;
  updatedAt?: string;
  isSourceControlled: boolean;
}

function baseItems(kind: EditorialKind): EditorialItem[] {
  return kind === 'guide' ? ALL_GUIDES : ALL_POSTS;
}

export async function listAdminContent(kind: EditorialKind): Promise<AdminContentItem[]> {
  try {
    await requireSession();
  } catch {
    redirect('/admin/login');
  }
  const dbRows = (await editorialRows()).filter((row) => row.kind === kind);
  const bySource = new Map(dbRows.map((row) => [row.source_key, row]));
  const claimed = new Set<string>();
  const items: AdminContentItem[] = baseItems(kind).map((item) => {
    const sourceKey = `${kind}:${item.slug}`;
    const row = bySource.get(sourceKey);
    if (row) claimed.add(row.id);
    return {
      sourceKey,
      databaseId: row?.id,
      kind,
      status: row?.status ?? inferredStatus(item),
      item: row?.data ?? item,
      updatedAt: row?.updated_at,
      isSourceControlled: true,
    };
  });

  for (const row of dbRows) {
    if (claimed.has(row.id)) continue;
    items.push(fromRow(row));
  }

  return items.sort((a, b) => a.item.title.localeCompare(b.item.title));
}

function fromRow(row: EditorialRow): AdminContentItem {
  return {
    sourceKey: row.source_key,
    databaseId: row.id,
    kind: row.kind,
    status: row.status,
    item: row.data,
    updatedAt: row.updated_at,
    isSourceControlled: false,
  };
}

export async function getAdminContent(
  kind: EditorialKind,
  sourceKey: string,
): Promise<AdminContentItem | null> {
  return (await listAdminContent(kind)).find((entry) => entry.sourceKey === sourceKey) ?? null;
}

export function isGuide(item: EditorialItem): item is Guide {
  return !('sources' in item);
}

export function isArticle(item: EditorialItem): item is Post {
  return 'sources' in item;
}
