import { notFound } from 'next/navigation';
import { CLUSTERS } from '@/content/guides';
import { getAdminContent } from '@/lib/admin/content';
import ContentEditor from '../../ContentEditor';
import { PageHeader } from '../../ui';

export default async function EditGuidePage({ params }: { params: Promise<{ sourceKey: string }> }) {
  const { sourceKey } = await params;
  const entry = await getAdminContent('guide', decodeURIComponent(sourceKey));
  if (!entry) notFound();
  return <><PageHeader title="Edit guide" description={entry.isSourceControlled ? 'Saving creates a database override; the source file remains an untouched fallback.' : 'Dashboard-created guide.'} /><ContentEditor kind="guide" entry={entry} clusters={CLUSTERS} now={new Date().toISOString()} /></>;
}
