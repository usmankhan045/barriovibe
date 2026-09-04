import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Real modification dates for the sitemap.
 *
 * ── The problem this replaces ──
 *
 * app/sitemap.ts stamped every URL with `new Date()`, so all eighty-four
 * claimed to change at the instant of each build. Google treats `lastmod` as a
 * hint it is free to distrust, and a sitemap where the terms page and a tax
 * calculator always move together is exactly the pattern that earns distrust.
 * Once discounted, the field stops helping the pages that genuinely do change,
 * which for this site is the calculators after a Finance Act: the one signal
 * worth having.
 *
 * ── Where the dates come from ──
 *
 * Git, which already knows. Each route is generated from a content module, so
 * the commit that last touched that module is the date the page's content last
 * changed. One `git log` call per file at build time, on a tree of this size,
 * is unmeasurable next to the render itself.
 *
 * ── Failing loudly rather than lying quietly ──
 *
 * A shallow clone (`fetch-depth: 1`, the CI default almost everywhere) has no
 * history to read, and `git log` returns empty rather than failing. Falling
 * back to the file's mtime there would reintroduce the original bug wearing a
 * disguise: checkout mtimes are all the moment CI cloned the repo, which is a
 * uniform build timestamp again.
 *
 * So the fallback is the file mtime, which is right for a new uncommitted file
 * and wrong for every file in a shallow clone. `hasGitHistory` below tells the
 * two apart, and `pnpm check:content` asserts it, turning a misconfigured CI
 * checkout into a failed build naming the fix rather than a sitemap that
 * quietly starts lying again.
 */

const REPO_ROOT = process.cwd();

/**
 * Whether the repository has readable commit history at all.
 *
 * This is the condition worth failing a build over, and it is NOT the same as
 * "some file had no commit date". A file added in the working tree and not yet
 * committed has no history either, and that is ordinary: it is what every new
 * file looks like until it is committed, and its mtime is genuinely the moment
 * it was written, so the fallback is correct rather than a lie.
 *
 * A shallow clone is the case that matters, because there the fallback is
 * wrong for every file at once. Distinguishing the two is a single probe: ask
 * git for any commit at all. If the repository has history and one file lacks
 * it, that file is new. If the repository has none, the checkout is shallow and
 * every date this module returns is a checkout timestamp wearing a disguise.
 *
 * A function rather than an exported `let`, because importers bind to a live
 * binding only under some module formats and a getter is unambiguous.
 */
export function hasGitHistory(): boolean {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out.length > 0;
  } catch {
    return false;
  }
}

const cache = new Map<string, Date>();

/**
 * The last commit date of `relPath`, or its mtime if git history is unreadable.
 *
 * `relPath` is repo-relative, e.g. 'content/tools.ts'.
 */
export function fileLastModified(relPath: string): Date {
  const cached = cache.get(relPath);
  if (cached) return cached;

  let date: Date | null = null;

  try {
    // `-1` is the newest commit touching the path; `%cI` is its committer date
    // in strict ISO 8601. execFileSync (not exec) so the path is an argument
    // rather than a string the shell reparses.
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', relPath],
      { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();

    if (out) {
      const parsed = new Date(out);
      if (!Number.isNaN(parsed.getTime())) date = parsed;
    }
  } catch {
    // No git binary, or not a repository. Handled by the fallback below.
  }

  if (!date) {
    try {
      date = statSync(join(REPO_ROOT, relPath)).mtime;
    } catch {
      // The path does not exist. Only reachable if a caller names a file that
      // was deleted, so the build date is the honest answer rather than a
      // fabricated older one.
      date = new Date();
    }
  }

  cache.set(relPath, date);
  return date;
}

/**
 * The newest commit date across several files.
 *
 * A page usually renders from more than one module: a service page reads its
 * own content file, and every page reads the layout and the site constants. The
 * page changed when the most recent of them changed.
 */
export function newestLastModified(relPaths: string[]): Date {
  return relPaths
    .map(fileLastModified)
    .reduce((newest, d) => (d > newest ? d : newest), new Date(0));
}
