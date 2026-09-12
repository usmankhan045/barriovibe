/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Why this file exists, given that next-env.d.ts says the same thing:
//
// next-env.d.ts carries these two references, and it is gitignored because
// Next rewrites it. That is fine locally, where `next dev` has always just
// regenerated it. CI never runs `next dev`, so it checks out a tree without
// it, and every `import logo from '@/public/brand/logo.png'` becomes a
// TS2307 "cannot find module" under `pnpm typecheck`.
//
// `next build` does write next-env.d.ts, but `pnpm verify` runs before
// `pnpm build` in the publish workflow and fails first, so the build never
// gets to repair it. This file is committed, so the image module types are
// present from checkout onward, whatever has or has not run.
