import { CLUSTERS } from '@/content/guides';
import ContentEditor from '../../ContentEditor';
import { PageHeader } from '../../ui';
import crypto from 'node:crypto';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/admin/session';

export default async function NewGuidePage() {
  if (!(await getSession())) redirect('/admin/login?next=/admin/guides/new');
  return <><PageHeader title="New guide" description="Create a reference page and keep it in draft until it is ready." /><ContentEditor kind="guide" clusters={CLUSTERS} now={new Date().toISOString()} newSourceKey={`dashboard:guide:${crypto.randomUUID()}`} /></>;
}
