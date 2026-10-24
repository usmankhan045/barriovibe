import Link from 'next/link';
import type { EditorialKind } from '@/lib/editorial-content';
import { listAdminContent } from '@/lib/admin/content';
import { LinkButton, PageHeader, StatusPill, inputClass } from './ui';

export default async function ContentList({
  kind,
  searchParams,
}: {
  kind: EditorialKind;
  searchParams: Promise<{ q?: string; status?: string; archived?: string }>;
}) {
  const query = await searchParams;
  const singular = kind === 'guide' ? 'guide' : 'article';
  const route = kind === 'guide' ? 'guides' : 'articles';
  const entries = (await listAdminContent(kind)).filter((entry) => {
    const needle = (query.q ?? '').trim().toLowerCase();
    const matchesSearch = !needle || entry.item.title.toLowerCase().includes(needle) || entry.item.slug.includes(needle);
    const matchesStatus = !query.status || entry.status === query.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageHeader title={kind === 'guide' ? 'Guides' : 'Articles'} description={`${entries.length} ${entries.length === 1 ? singular : `${singular}s`} match the current view.`} action={<LinkButton href={`/admin/${route}/new`}>New {singular}</LinkButton>} />
      {query.archived ? <p className="mb-5 rounded-xl border border-success bg-success-bg px-4 py-3 text-sm font-semibold text-success">Content archived.</p> : null}
      <form className="mb-5 flex flex-wrap items-end gap-3">
        <div className="min-w-56 flex-1"><label htmlFor="q" className="mb-1.5 block text-sm font-bold">Search</label><input id="q" name="q" defaultValue={query.q} placeholder="Title or slug" className={inputClass} /></div>
        <div><label htmlFor="status" className="mb-1.5 block text-sm font-bold">Status</label><select id="status" name="status" defaultValue={query.status} className={inputClass}><option value="">All</option><option value="published">Published</option><option value="scheduled">Scheduled</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div>
        <button className="rounded-xl border border-silver-300 bg-white px-4 py-2.5 text-sm font-bold hover:border-blue-600">Filter</button>
      </form>
      <div className="overflow-x-auto rounded-2xl border border-silver-300 bg-white shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead><tr className="border-b border-silver-300 bg-silver-100 text-left"><th className="px-4 py-3">Title</th><th className="px-4 py-3">Cluster</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Origin</th><th className="px-4 py-3 text-right">Action</th></tr></thead>
          <tbody>{entries.map((entry) => {
            const edit = `/admin/${route}/${encodeURIComponent(entry.sourceKey)}`;
            return <tr key={entry.sourceKey} className="border-b border-silver-200 last:border-0"><td className="px-4 py-3"><Link href={edit} className="font-bold text-ink hover:text-blue-600">{entry.item.title}</Link><p className="mt-0.5 font-mono text-xs text-ink-body">/{entry.item.slug}</p></td><td className="px-4 py-3 text-ink-body">{entry.item.cluster}</td><td className="px-4 py-3"><StatusPill status={entry.status} /></td><td className="px-4 py-3 text-ink-body">{entry.isSourceControlled ? (entry.databaseId ? 'Override' : 'Source') : 'Dashboard'}</td><td className="px-4 py-3 text-right"><Link href={edit} className="rounded-lg border border-silver-300 px-3 py-1.5 font-bold hover:border-blue-600 hover:text-blue-600">Edit</Link></td></tr>;
          })}</tbody>
        </table>
        {entries.length === 0 ? <p className="p-10 text-center text-sm text-ink-body">No content matches these filters.</p> : null}
      </div>
    </>
  );
}
