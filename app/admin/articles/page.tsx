import ContentList from '../ContentList';

export default function ArticlesAdminPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; archived?: string }> }) {
  return <ContentList kind="article" searchParams={searchParams} />;
}
