import { notFound } from 'next/navigation';
import { POST_CLUSTERS } from '@/content/posts';
import { getAdminContent } from '@/lib/admin/content';
import ContentEditor from '../../ContentEditor';
import { PageHeader } from '../../ui';

export default async function EditArticlePage({ params }: { params: Promise<{ sourceKey: string }> }) {
  const { sourceKey } = await params;
  const entry = await getAdminContent('article', decodeURIComponent(sourceKey));
  if (!entry) notFound();
  return <><PageHeader title="Edit article" description={entry.isSourceControlled ? 'Saving creates a database override; the source file remains an untouched fallback.' : 'Dashboard-created article.'} /><ContentEditor kind="article" entry={entry} clusters={POST_CLUSTERS} now={new Date().toISOString()} /></>;
}
