import { POST_CLUSTERS } from '@/content/posts';
import ContentEditor from '../../ContentEditor';
import { PageHeader } from '../../ui';
import crypto from 'node:crypto';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/admin/session';

export default async function NewArticlePage() {
  if (!(await getSession())) redirect('/admin/login?next=/admin/articles/new');
  return <><PageHeader title="New article" description="Create a dated, sourced article and publish now or schedule it." /><ContentEditor kind="article" clusters={POST_CLUSTERS} now={new Date().toISOString()} newSourceKey={`dashboard:article:${crypto.randomUUID()}`} /></>;
}
