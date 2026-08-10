@AGENTS.md

# Writing rules

## No em dashes

Never use an em dash (`—`, U+2014) anywhere in this repo: not in page copy, not
in `content/`, not in metadata titles or descriptions, not in JSON-LD, not in
form and error messages, not in code comments, and not in docs. This applies to
new text and to any text you touch while editing.

Use instead, whichever the sentence actually calls for:

| Instead of an em dash | Use |
| --- | --- |
| Introducing a list or an explanation | a colon |
| A parenthetical aside | commas, or round brackets |
| Joining two independent clauses | a full stop and a new sentence, or `, and` / `, but` / `, so` |
| Separating a page title from the brand | a pipe (`\|`), as in `%s \| ${BRAND.name}` |
| A "not filled in yet" placeholder value | a plain hyphen `-` |

En dashes (`–`) stay. They are correct for numeric and date ranges (`2–3 days`,
`Mon–Sat`) and for compounds like `import–export`, and the site uses them that
way throughout.

Existing code comments and `README.md` still carry em dashes from before this
rule. They are not a bug to fix in bulk, but do not add more, and clear them
from any block you are already editing.

Everything a visitor can read is clean today. The check that matters is the
rendered output, which must return nothing:

```sh
pnpm build
grep -rl "—" .next/server/app --include="*.html" --include="*.rsc"
```
