'use client';

import { useActionState, useState } from 'react';
import type { Guide } from '@/content/guides';
import type { Post } from '@/content/posts';
import type { AdminContentItem } from '@/lib/admin/content';
import { saveContentAction, type ActionState } from '@/lib/admin/actions';
import type { EditorialKind } from '@/lib/editorial-content';
import ArchiveButton from './ArchiveButton';
import { Field, inputClass, Message, Panel } from './ui';

function pretty(value: unknown): string { return JSON.stringify(value ?? [], null, 2); }
function slugify(value: string): string { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 200); }
function karachiDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : new Date(date.getTime() + 5 * 60 * 60 * 1000).toISOString().slice(0, 16);
}

export default function ContentEditor({ kind, entry, clusters, now, newSourceKey }: { kind: EditorialKind; entry?: AdminContentItem; clusters: Array<{ slug: string; title: string }>; now: string; newSourceKey?: string }) {
  const item = entry?.item;
  const guide = kind === 'guide' ? item as Guide | undefined : undefined;
  const article = kind === 'article' ? item as Post | undefined : undefined;
  const [state, action, pending] = useActionState(saveContentAction, {} as ActionState);
  const [title, setTitle] = useState(item?.title ?? '');
  const [customSlug, setCustomSlug] = useState<string | null>(item?.slug ?? null);
  const slug = customSlug ?? slugify(title);
  return (
    <form action={action} className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <input type="hidden" name="kind" value={kind} />
      {entry || newSourceKey ? <input type="hidden" name="sourceKey" value={entry?.sourceKey ?? newSourceKey} /> : null}
      <div className="space-y-5">
        <Message error={state.error} success={state.ok ? 'Saved. Public pages have been refreshed.' : undefined} />
        <Panel className="space-y-4">
          <Field label="Title" htmlFor="title"><input id="title" name="title" required value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} /></Field>
          <Field label="Slug" htmlFor="slug" hint="Changing a live slug changes its URL. Add a redirect if the old URL is already indexed."><input id="slug" name="slug" required value={slug} onChange={(event) => setCustomSlug(event.target.value)} className={`${inputClass} font-mono`} /></Field>
          <Field label="Navigation label" htmlFor="navLabel"><input id="navLabel" name="navLabel" required defaultValue={item?.navLabel} className={inputClass} /></Field>
          <Field label="Card summary" htmlFor="card"><textarea id="card" name="card" required rows={3} defaultValue={item?.card} className={inputClass} /></Field>
          <Field label="Direct answer" htmlFor="answer" hint="Lead with the useful answer; this appears before the long-form sections."><textarea id="answer" name="answer" required rows={6} defaultValue={item?.answer} className={inputClass} /></Field>
        </Panel>
        <Panel className="space-y-4">
          <div><h2 className="font-display text-lg font-black">Page sections</h2><p className="mt-1 text-xs text-ink-body">Supported kinds: prose, list, steps, note, table and calculator. JSON is validated before saving.</p></div>
          <textarea id="sections" name="sections" rows={24} defaultValue={pretty(item?.sections)} spellCheck={false} className={`${inputClass} font-mono leading-relaxed`} />
        </Panel>
        <Panel className="space-y-4">
          <Field label="FAQs (JSON)" htmlFor="faqs" hint={'Example: [{"question":"…","answer":"…"}]'}><textarea id="faqs" name="faqs" rows={10} defaultValue={pretty(item?.faqs)} spellCheck={false} className={`${inputClass} font-mono`} /></Field>
          <Field label="Related slugs (JSON)" htmlFor="related"><textarea id="related" name="related" rows={4} defaultValue={pretty(item?.related ?? [])} spellCheck={false} className={`${inputClass} font-mono`} /></Field>
          <Field label="Call to action (JSON)" htmlFor="cta" hint="Use null for the default CTA."><textarea id="cta" name="cta" rows={6} defaultValue={item?.cta ? pretty(item.cta) : ''} spellCheck={false} className={`${inputClass} font-mono`} /></Field>
        </Panel>
        {kind === 'guide' ? <Panel className="space-y-4"><Field label="Source basis" htmlFor="basis"><textarea id="basis" name="basis" rows={3} defaultValue={guide?.basis} className={inputClass} /></Field><Field label="Reviewed on" htmlFor="reviewedOn"><input id="reviewedOn" name="reviewedOn" type="date" defaultValue={guide?.reviewedOn} className={inputClass} /></Field></Panel> : <Panel className="space-y-4"><Field label="Sources (JSON)" htmlFor="sources" hint="Every article requires at least one label, URL and readOn date."><textarea id="sources" name="sources" rows={10} defaultValue={pretty(article?.sources ?? [{ label: '', url: '', readOn: new Date(now).toISOString().slice(0, 10) }])} spellCheck={false} className={`${inputClass} font-mono`} /></Field><Field label="Limitations (JSON)" htmlFor="limits"><textarea id="limits" name="limits" rows={5} defaultValue={pretty(article?.limits ?? [])} spellCheck={false} className={`${inputClass} font-mono`} /></Field><Field label="Reviewed on" htmlFor="reviewedOn"><input id="reviewedOn" name="reviewedOn" type="date" defaultValue={article?.reviewedOn} className={inputClass} /></Field></Panel>}
        <Panel className="space-y-4"><Field label="SEO title" htmlFor="seoTitle"><input id="seoTitle" name="seoTitle" required defaultValue={item?.seo.title} className={inputClass} /></Field><Field label="SEO description" htmlFor="seoDescription"><textarea id="seoDescription" name="seoDescription" required rows={3} defaultValue={item?.seo.description} className={inputClass} /></Field></Panel>
      </div>
      <aside className="space-y-5 xl:sticky xl:top-8 xl:self-start">
        <Panel className="space-y-4">
          <Field label="Status" htmlFor="status"><select id="status" name="status" defaultValue={entry?.status ?? 'draft'} className={inputClass}><option value="draft">Draft</option><option value="scheduled">Scheduled</option><option value="published">Published</option><option value="archived">Archived</option></select></Field>
          <Field label="Publish at" htmlFor="publishedAt" hint="Pakistan time (UTC+5). Scheduled items become public after this time."><input id="publishedAt" name="publishedAt" type="datetime-local" required defaultValue={karachiDate(item?.publishedAt ?? now)} className={inputClass} /></Field>
          <Field label="Cluster" htmlFor="cluster"><select id="cluster" name="cluster" required defaultValue={item?.cluster ?? clusters[0]?.slug} className={inputClass}>{clusters.map((cluster) => <option key={cluster.slug} value={cluster.slug}>{cluster.title}</option>)}</select></Field>
          <button disabled={pending} className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--color-blue-800)] disabled:opacity-60">{pending ? 'Saving…' : entry ? 'Save changes' : `Create ${kind}`}</button>
        </Panel>
        {entry ? <ArchiveButton kind={kind} sourceKey={entry.sourceKey} isSourceControlled={entry.isSourceControlled} /> : null}
      </aside>
    </form>
  );
}
