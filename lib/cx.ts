/**
 * Minimal class-name joiner.
 *
 * `clsx` and `classnames` are excellent, but this is 6 lines and covers every
 * use in the codebase. One fewer dependency in the client bundle.
 */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
