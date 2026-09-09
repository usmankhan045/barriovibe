# Workflows

## publish-guides.yml

Publishes scheduled guides by asking Vercel to rebuild once a day.

### How the scheduling actually works

Guides carry a `publishedAt` date. `content/guides/index.ts` filters on the
build date, so a guide appears when the site is next built on or after its
date. Nothing in the repository changes when a guide goes live: the schedule is
purely a property of when the build runs.

Vercel builds on push, and no push means no rebuild, so a guide dated tomorrow
would sit unpublished until some unrelated commit happened to land. This
workflow is what makes the date mean something.

Committing an empty change to force a push would also work and was rejected: it
writes a commit a day into the history for nothing, races with real work on
main, and makes `git log` useless for finding what actually changed.

### Setup, one time

1. In Vercel: **Project > Settings > Git > Deploy Hooks**. Create a hook on the
   `main` branch and copy the URL.
2. In GitHub: **Settings > Secrets and variables > Actions > New repository
   secret**, named `VERCEL_DEPLOY_HOOK`, with that URL as the value.

The hook URL is a bearer credential. Anyone holding it can trigger a build, so
it belongs in a secret rather than in this file or the workflow.

Until the secret exists the workflow will fail on days a guide is due, with an
error naming the missing secret. That is deliberate: failing loudly beats
silently not publishing.

### What it does each day

At 03:00 UTC, which is 08:00 in Pakistan:

1. Runs `scripts/guides-due.ts`, which reports whether any guide has today's
   date and logs which one.
2. If nothing is due, stops. No rebuild, no deploy.
3. If something is due, runs `pnpm verify` and `pnpm build` first. A guide that
   has sat in the repo for a week is still unverified against today's build,
   and publishing a broken page automatically is worse than publishing late.
4. Calls the deploy hook. Vercel rebuilds, the date filter admits the guide,
   and it is live.

Checking first means the hook fires only on days something is due, rather than
365 rebuilds a year to publish 54 guides.

### Running it by hand

The **Run workflow** button on the Actions tab. Useful to publish something
early, or to retry a failed day without waiting.

### Checking the schedule locally

    pnpm tsx scripts/guides-due.ts             # today
    pnpm tsx scripts/guides-due.ts 2026-09-13  # any date

### Rendering unpublished guides for review

    GUIDE_BUILD_DATE=2026-12-31 pnpm build

That override exists for QA and is never set in CI, so a normal build always
uses the real date.
