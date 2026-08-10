-- ============================================================================
-- leads — contact form submissions
-- ============================================================================
--
-- Apply with either:
--   supabase db push
--   (or paste into the SQL editor of the target project)
--
-- SECURITY MODEL
--
-- RLS is enabled with ZERO policies. That is not an oversight — it is the
-- design. With RLS on and no policy granting access, the anon and
-- authenticated roles can neither read nor write this table at all. Even
-- someone holding the publishable key from the browser bundle gets nothing.
--
-- The only writer is the /api/contact route handler, which uses the
-- service-role key. That key bypasses RLS by design, lives in a server-side
-- environment variable, and is never shipped to a browser.
--
-- The practical consequence: a leaked publishable key cannot expose a single
-- customer enquiry.
-- ============================================================================

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- Submitted by the visitor. Validated by lib/leads.ts (zod) on both the
  -- client and the server before reaching here; the length caps below are the
  -- last line of defence, not the first.
  name         text not null check (char_length(name) between 2 and 100),
  email        text not null check (char_length(email) between 3 and 200),
  phone        text check (char_length(phone) <= 40),
  company      text check (char_length(company) <= 150),

  -- Slug from content/services, or 'not-sure'. Intentionally NOT a foreign key:
  -- services live in TypeScript, not the database, and a renamed slug should
  -- not be able to fail an insert and lose a lead.
  service_slug text check (char_length(service_slug) <= 80),
  budget_band  text check (char_length(budget_band) <= 40),
  message      text not null check (char_length(message) between 10 and 4000),

  -- Which page the enquiry came from, e.g. /services/finance-tax/income-tax-filing
  source_path  text check (char_length(source_path) <= 300),

  -- Salted SHA-256 prefix of the submitter's IP, never the IP itself. Enough to
  -- spot repeat automated submissions; not personal data we have any use for.
  ip_hash      text check (char_length(ip_hash) <= 64),
  user_agent   text check (char_length(user_agent) <= 300),

  -- Simple pipeline state so the team can work the list.
  status       text not null default 'new'
                 check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),
  notes        text
);

comment on table public.leads is
  'Contact form submissions. Written only by the /api/contact route handler using the service-role key; RLS denies all access to anon and authenticated roles.';

-- The list is worked newest-first, and filtered by status.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
-- Supports "have we heard from this person before?"
create index if not exists leads_email_idx      on public.leads (lower(email));

-- ── Lock it down ────────────────────────────────────────────────────────────
alter table public.leads enable row level security;

-- No policies are created, so anon and authenticated have no access whatsoever.
-- Revoke the default table grants as well, so the denial does not depend on RLS
-- alone.
revoke all on public.leads from anon, authenticated;
