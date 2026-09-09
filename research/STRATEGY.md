# Content strategy

What six research agents found, what it means, and what to do about it.
Written 9 September 2026. Every factual claim here traces to `findings.jsonl`;
run `python3 research/query.py --publishable` for the ones safe to write from.

---

## The one finding that determines everything else

The two halves of BarrioVibe's business sit in markets with **opposite
competitive dynamics**:

| Niche | Who wins today | Quality bar | What to do |
| --- | --- | --- | --- |
| AI / automation informational queries | Zendesk, Salesforce, Atlassian, n8n, DataCamp | High | Do not attack head-on |
| Pakistani tax / corporate queries | PakFiler, Waystax, then filler | Low to medium | Winnable now |
| **The intersection of the two** | **Nobody** | - | **Own it** |

The intersection is the strategy. A compliance firm cannot write about
registering and taxing a software business with real engineering credibility. A
dev shop cannot write about it with real tax knowledge. BarrioVibe is one of
very few firms that has both, and that is not a content advantage anyone can
copy without acquiring a second competency.

Two supporting facts, both verified:

- Pakistan's largest software houses (Devsinc, Tintash, InvoZone) publish
  **nothing that ranks** on AI informational content. The home market is vacant.
- IT and e-commerce was the **largest sector** for new SECP incorporations in
  FY2025-26 at 8,700 of 43,559 new companies. The convergence audience is the
  fastest-growing segment of the market, and every one of those companies has
  recurring statutory filing obligations.

## Where the existing tooling already puts us

The Pakistani tax market's bar is set by PakFiler on tooling and Waystax on
editorial. Waystax loses to PakFiler for one structural reason: it *links* to a
calculator rather than embedding one.

BarrioVibe ships 22 calculators, each citing its Ordinance section, reconciled
against the First Schedule on every build by `pnpm check:tax`. That is at or
above the top of this market already. **The gap is coverage breadth and content
depth, not standards.**

Meanwhile the field contradicts itself in public. On the first taxable slab
above PKR 600,000 one ranking source says 2.5% and another says 1%; both rank,
so at least one is wrong. A dev.to article ranked page one while stating the
filing deadline is 30 June (it is 30 September). Citing primary law
section-by-section is therefore not table stakes here, it is a differentiator.

---

## What top-tier international buyers actually do

This changed the plan more than the demand research did. From G2's 2026 Buyer
Behavior Report (see `g2-*` findings):

- **39% cite IT security review as the biggest evaluation delay**, rising to
  **50% among enterprise buyers**. Evaluation is now the longest stage of the
  buying journey.
- **CFO involvement rose from 31% to 46% in one year**, and about **half of
  buyers report CFO vetoes**. 70% say AI's pace pushes them toward shorter
  contracts. Preference for outcome-based pricing doubled from 11% to 23%.
- **Review sites (38%) now edge out AI chatbots (37%)** as the top shortlist
  source, though 82% used chatbots for recommendations in the last 24 months.

The implications are concrete and mostly not about articles:

1. Publish a **security pack**, not more service copy. It attacks the single
   biggest documented delay in the buying process.
2. **Publish pricing.** Vague retainers now die in finance.
3. The **Clutch profile is a ranking asset**, engineered against their published
   40-point formula (Reviews 20, Clients and Experience 10, Market Presence 10).
4. Chatbots at near-parity with review sites means **GEO work pays**, which the
   site is already positioned for.

### The GDPR blocker, and why it is an opportunity

Pakistan has **no EU adequacy decision**, so EU and UK clients must use Standard
Contractual Clauses plus a post-*Schrems II* transfer impact assessment. That is
a genuine blocker, and it is neutralised entirely by paperwork. Almost no
competitor publishes a ready SCC and TIA pack. Doing so converts the top
objection into a differentiator.

### GCC is the strongest geography

- UAE leads global AI diffusion at **70.1%** against a **17.8% global average**
  (Microsoft, May 2026). The US is 31.3%.
- Pakistan at UTC+5 is **1 to 2 hours from the Gulf**: effectively the same
  working day. This is the one place the nearshore argument runs in Pakistan's
  favour rather than against it.
- Saudi PDPL **permits** cross-border transfers under conditions. There is no
  absolute localization mandate, contrary to what several vendor blogs claim.

---

## Three negative findings that save money

Recorded because a strategy is as much about what not to build.

**Do not build Urdu-script content.** Urdu is roughly 0.45% of language usage
across Pakistan's web against English at 78.4%, and most people who write Urdu
online use Romanized Urdu rather than the script. Business and tax topics skew
further to the English-literate segment.

**Do not target US healthcare.** HIPAA does not prohibit offshoring, but many
Business Associate Agreements contractually forbid PHI leaving US territory, and
OCR enforcement against offshore entities is weak. The deal dies at legal
review.

**Do not lead with "Pakistan" positioning.** Those queries are low volume and
attract buyers hunting cheap labour rather than expertise. Rank globally on cost
and failure content; let Pakistan be a margin advantage, not the pitch. Two or
three geo pages, not a content pillar.

---

## The phases

### Phase 1, months 1-3: own the convergence

The five convergence guides plus the international buyer pack. Low volume, high
intent, zero competition, and every fact already verified against primary
sources. This phase is defensible because it needs both competencies.

### Phase 2, months 3-6: extend the tooling moat

Tools earn links; articles mostly do not. Each of these is grounded in verified
regulation, which is what lets them meet the same standard as the tax
calculators (a cited section plus a check assertion):

- **Filer vs non-filer savings calculator.** Enter a property or vehicle value,
  see the actual rupee delta. Far more linkable than the ten near-identical
  prose articles on the topic.
- **PSEB break-even calculator.** At what revenue does registration pay for
  itself? Nobody has this.
- **SECP deadline calculator.** Financial year end in; AGM, Form A and Form 29
  dates out.
- **Trademark renewal tracker.** Ten-year term plus the six-month grace period.

Every tool should produce a **shareable permalink and a PDF export**. Tools that
only display a number earn far fewer links than tools that produce an artefact,
and `scripts/` already generates PDF rate cards.

### Phase 3, months 6-12: the link engine

Two assets with a higher ceiling than any article:

1. **An n8n template library.** 30 to 50 genuinely working workflows on GitHub
   under a permissive licence, plus a browsable index. n8n's own template
   library spawned entire linking domains (n8nresources.dev with 5,600+
   templates, n8n-library.com with 2,348+, GitHub repos with hundreds). This is
   on-brand rather than promotional: BarrioVibe sells workflow automation, so
   publishing working workflows is proof rather than marketing.
2. **Original research.** Nobody in Pakistan publishes an annual agency-pricing
   or freelancer-tax survey. Whoever does owns the citation, and press appetite
   for Pakistani IT export data is demonstrable.

### Phase 4, ongoing: AI content, played correctly

Not "what is RAG" and not "AI agent vs chatbot": those SERPs belong to companies
with domain authority that will not be matched soon. Instead:

- **Cost with real arithmetic.** Build cost is only 25-35% of three-year TCO.
  What ranks today are useless ranges ($10K to $450K) with no methodology.
- **Failure modes.** Near-uncontested, because admitting failure is off-brand
  for vendors. Real practitioner pain is documented on the n8n community forum:
  agents reporting actions never performed, a third tool triggering iteration
  loops, agents hallucinating instead of querying the database, no confidence
  thresholds so low-confidence decisions auto-execute.
- **The contrarian piece**, which Gartner backs: over 40% of agentic AI projects
  will be cancelled by end-2027, and of thousands of vendors claiming agentic
  AI only about 130 are real. Every ranking "do I need an agent" article is
  written by someone selling agents.

---

## Where content lives

    /guides/    reference and convergence. Evergreen, carries "last reviewed",
                updated in place rather than re-dated. A guide is not a post: it
                has no publish date in the chronological sense.
    /blog/      AI explainers, contrarian pieces, Finance Act commentary.
                Genuinely dated, genuinely occasional.
    /tools/     22 calculators, already shipped.
    /services/  44 pages, already shipped.

The reason reference content must not go on the blog: if you publish "Income Tax
Slabs 2026-27" as a post and next year publish "2027-28", you split authority
across two URLs and the old one rots while still ranking. Five years of that
leaves five half-strong pages instead of one strong one. Updating a single guide
URL keeps every backlink, share and citation it has earned.

`/blog` is currently a flag (`POSTS_ENABLED = false`) and an honest empty state.
Both `/guides` and a real post model still need building.

---

## What is still unknown

**No keyword volume data.** Every priority ordering in this document rests on
inference from SERP composition plus the demand signals in `findings.jsonl`, not
on measured volume. None of the six agents had access to a keyword tool. Google
Search Console access, or a DataForSEO key, would put real numbers underneath
this and should be treated as the highest-value missing input.

**Reddit was blocked for every agent.** All six said so explicitly rather than
substituting invented data. The practitioner discourse that would normally
supply real query phrasing is therefore missing; the n8n community forum
substituted well for the AI cluster and nothing substituted for the others.

**Four verification items still block specific articles.** See
`python3 research/query.py contested` and `unverified`. None blocks the Phase 1
slate.
