# Neon — editorial dashboard

The dashboard database is provisioned and linked to this repository.

| Setting | Value |
|---|---|
| Project | `barriovibe` |
| Project ID | `super-unit-97166899` |
| Region | AWS Asia Pacific (Singapore) |
| PostgreSQL | 17 |
| Branch | `main` |
| Database | `barriovibe` |

`DATABASE_URL` is pulled into the gitignored `.env.local`. The project link is
stored in `.neon`; it contains only the public project ID, never credentials.

## Schema

`migrations/0001_editorial_content.sql` creates the `editorial_content` table.
Existing TypeScript guides and articles remain the fallback. Saving one in the
dashboard writes an override; dashboard-created items live entirely in Neon.
Drafts and archived items stay private, and scheduled items become public at
their configured time.

Apply the migration to another branch with:

```bash
neon psql <branch> --project-id super-unit-97166899 \
  --database-name barriovibe \
  --file neon/migrations/0001_editorial_content.sql
```

The app uses the Neon serverless driver over its pooled `DATABASE_URL`. The URL
must remain server-only and must also be configured in the production host.
