# Supabase — lead capture

**Status: architected, not provisioned.** No Supabase project has been created
and no credentials exist. Everything on this page is ready to run when you say
so; nothing has been applied to any of your existing projects.

## What already works without it

The contact form is fully built and behaves correctly with no database:

- The form renders, validates and reports field errors client-side.
- `/api/contact` re-validates server-side with zod, then checks for missing
  environment variables **first** and returns a clear message: *"Our contact
  form is temporarily unavailable. Please email us directly and we will reply
  the same day."*
- The contact page also shows the email address and WhatsApp link directly, so
  a visitor always has a working route to you.

Nothing looks broken to a visitor in this state. It just doesn't store anything.

## What is already written

| File | Purpose |
|---|---|
| `supabase/migrations/0001_create_leads.sql` | The `public.leads` table, indexes, constraints and RLS lockdown |
| `app/api/contact/route.ts` | The only server route on the site. Validates, applies spam gates, inserts |
| `lib/leads.server.ts` | The zod schema. `import 'server-only'` keeps it out of the browser bundle |
| `lib/leads.ts` | Client-safe half: types, cheap validation, and `submitLead()` |
| `.env.example` | The three variables to set, with an explanation of why two of them are server-only |

## Setup, when you're ready

### 1. Create the project

A **dedicated project** rather than adding a table to `nothungry`,
`Notsleeping` or `Not_Welll`. Reasons: the leads table holds customer contact
details, so it should not sit in a database belonging to an unrelated app;
access can be granted to whoever handles enquiries without exposing anything
else; and it can be handed over or shut down independently.

Region: **ap-south-1 (Mumbai)** is the closest to Pakistan and gives the lowest
insert latency. The free tier is more than sufficient for a contact form.

### 2. Apply the migration

Either paste `migrations/0001_create_leads.sql` into the project's SQL editor,
or with the CLI:

```bash
supabase link --project-ref <your-new-project-ref>
supabase db push
```

### 3. Set the environment variables

Copy `.env.example` to `.env.local` for development, and set the same three in
your host's environment for production:

```bash
SUPABASE_URL="https://<project-ref>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<service role key>"   # Project Settings → API
LEAD_IP_SALT="$(openssl rand -hex 32)"
```

Neither Supabase variable carries the `NEXT_PUBLIC_` prefix, and that is
deliberate — Next only inlines prefixed variables into the client bundle. The
service-role key bypasses row-level security; if it ever reached a browser,
every stored enquiry would be readable by anyone.

### 4. Verify

```bash
pnpm build && pnpm start
```

Submit the form at `/contact`, then confirm the row landed:

```sql
select id, created_at, name, email, service_slug, source_path, status
from public.leads
order by created_at desc
limit 5;
```

Then confirm the lockdown actually holds. Using the **publishable** (anon) key,
not the service-role key:

```sql
select * from public.leads;   -- must return zero rows / permission denied
```

If that query returns data, the RLS setup did not apply and must be fixed
before launch.

Finally, check the spam gates:

- Submitting in under 2 seconds should return success but store nothing.
- Six submissions from one IP within an hour: the sixth should be rejected.

## Security model, in one paragraph

RLS is enabled on `public.leads` with **zero policies**, and the default grants
to `anon` and `authenticated` are revoked. With RLS on and no policy granting
access, those roles can neither read nor write the table at all. The only
writer is `/api/contact`, using the service-role key, which lives in a
server-side environment variable and bypasses RLS by design. The practical
consequence is that a leaked publishable key cannot expose a single customer
enquiry.

## What is stored, and what is not

Stored: name, email, and optionally phone, company, chosen service, budget
band, message, the page the enquiry came from, and a submission timestamp.

Also stored: a **salted SHA-256 prefix of the submitter's IP** and their
user-agent string. The hash exists to identify repeated automated submissions
without retaining the IP address itself, which we have no use for. Changing
`LEAD_IP_SALT` is safe — it only means old and new hashes stop matching.

Not stored, anywhere on the site: analytics, cookies, advertising identifiers,
or any third-party tracking. `/privacy` states this, so it must be updated in
the same commit as any change that makes it untrue.
