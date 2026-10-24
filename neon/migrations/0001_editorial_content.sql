-- Dashboard-created content and overrides for source-controlled guides/articles.
-- Existing source content remains the fallback until an editor saves a row.

create table if not exists editorial_content (
  id uuid primary key default gen_random_uuid(),
  source_key text not null unique,
  kind text not null check (kind in ('guide', 'article')),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  cluster text not null check (cluster ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  status text not null default 'draft'
    check (status in ('draft', 'scheduled', 'published', 'archived')),
  published_at timestamptz,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, slug)
);

create index if not exists editorial_content_kind_status_idx
  on editorial_content (kind, status, published_at);
