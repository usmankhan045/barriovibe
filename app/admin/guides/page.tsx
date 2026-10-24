import ContentList from '../ContentList';

export default function GuidesAdminPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; archived?: string }> }) {
  return <ContentList kind="guide" searchParams={searchParams} />;
}
