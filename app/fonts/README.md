# Fonts

Both files are variable fonts covering the full 300–900 weight range in a
single request each.

| File | Family | Source | License |
|---|---|---|---|
| `Satoshi-Variable.woff2` | Satoshi | [Fontshare](https://www.fontshare.com/fonts/satoshi) (Indian Type Foundry) | ITF Free Font License — free for personal **and** commercial use |
| `Inter-Variable-latin.woff2` | Inter | [Google Fonts](https://fonts.google.com/specimen/Inter) (Rasmus Andersson) | SIL Open Font License 1.1 |

`Inter-Variable-latin.woff2` is the **latin subset only** (48KB vs ~350KB for
the full multi-script family). If the site ever needs Urdu, Arabic or extended
Latin glyphs, download the matching subset rather than swapping in the full
file — see `app/fonts.ts`.

Neither font is loaded from a third-party origin at runtime. Both are served
from this app's own domain with immutable caching, so there is no
`fonts.gstatic.com` or `cdn.fontshare.com` request in production.
