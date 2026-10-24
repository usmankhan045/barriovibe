import Link from 'next/link';
import { listAdminContent } from '@/lib/admin/content';
import { LinkButton, PageHeader, Panel, Stat, StatusPill } from './ui';

export default async function AdminPage() {
  const [guides, articles] = await Promise.all([listAdminContent('guide'), listAdminContent('article')]);
  const all = [...guides, ...articles];
  return (
    <>
      <PageHeader title="Dashboard" description="Publish, schedule and maintain every guide and article from one place." action={<LinkButton href="/admin/guides/new">New guide</LinkButton>} />
      {!process.env.DATABASE_URL ? <p className="mb-6 rounded-xl border border-danger bg-danger-bg px-4 py-3 text-sm font-semibold text-danger">Neon is not configured. You can browse source content, but saving is disabled until DATABASE_URL is connected.</p> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Guides" value={guides.length} /><Stat label="Articles" value={articles.length} /><Stat label="Live" value={all.filter((entry) => entry.status === 'published').length} /><Stat label="Drafts" value={all.filter((entry) => entry.status === 'draft').length} />
      </div>
      <Panel className="mt-6">
        <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-black">Recently managed</h2><Link href="/admin/articles" className="text-sm font-bold text-blue-600">View articles</Link></div>
        <div className="divide-y divide-silver-200">
          {all.filter((entry) => entry.updatedAt).sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')).slice(0, 8).map((entry) => (
            <Link key={entry.sourceKey} href={`/admin/${entry.kind === 'guide' ? 'guides' : 'articles'}/${encodeURIComponent(entry.sourceKey)}`} className="flex items-center justify-between gap-4 py-3 hover:text-blue-600">
              <div className="min-w-0"><p className="truncate font-bold">{entry.item.title}</p><p className="text-xs text-ink-body">{entry.kind} · {entry.item.cluster}</p></div><StatusPill status={entry.status} />
            </Link>
          ))}
          {all.every((entry) => !entry.updatedAt) ? <p className="py-6 text-sm text-ink-body">Your first saved change will appear here.</p> : null}
        </div>
      </Panel>
    </>
  );
}
