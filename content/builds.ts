import type { PillarSlug } from './types';

/**
 * Systems we have built and run ourselves.
 *
 * ── Why this is NOT `cases.ts` ──
 *
 * A case study is client work: a brief someone else set, a result they agreed
 * we could publish, and figures we can evidence from an account we actually
 * ran for them. `cases.ts` holds those, and it is still empty on purpose.
 *
 * These are different. They are our own products and internal systems, built
 * to our own brief and run against our own accounts. They prove capability,
 * not client outcomes, and the page says so in those words. Mixing the two
 * would quietly upgrade "we built this for ourselves" into "we did this for a
 * client", which is the exact dishonesty the empty state in `cases.ts` was
 * written to avoid.
 *
 * ── The rules for anything added here ──
 *
 * 1. We wrote it. `repo` points at our own commit history, and a reader who
 *    follows the link must find exactly what this entry describes.
 * 2. Every capability listed is one that exists in the shipped code. Not
 *    planned, not scaffolded, not a stub.
 * 3. No invented performance figures. `facts` carries countable things:
 *    scheduled jobs, tables, integrations, cadence. Anything that would need
 *    an analytics account to prove belongs in `cases.ts` once a client agrees
 *    to it, not here.
 * 4. Known limits are stated in `limits`. A system described without its
 *    constraints reads as a sales claim; one that names them reads as
 *    engineering, and it is the thing a technical buyer actually checks.
 */

export interface Build {
  slug: string;
  /** Which practice this demonstrates, so the page can link to what we sell. */
  pillar: PillarSlug;
  /**
   * What the thing IS, which is how /work groups and labels it.
   *
   * Distinct from `pillar` on purpose: see the note on BuildCategory. A build
   * belongs to exactly one, because a card shows one label and a project that
   * claims two categories is really two projects or a miscategorised one.
   */
  category: BuildCategory;
  /** The product name a reader will see. */
  name: string;
  /** One line under the name. No adjectives that cannot be checked. */
  tagline: string;
  /**
   * The long-form account: the problem, then the architecture.
   *
   * NOT RENDERED ANYWHERE TODAY, and kept deliberately. /work is a grid of
   * summary cards and the detail page is built from `page`, so neither has a
   * place for three paragraphs of continuous prose; rendering them was what
   * made /work read as two stacked documents rather than a portfolio.
   *
   * It stays because it is the source material the `page` sections were drawn
   * from, and a build that has not earned a `page` block yet still has its
   * reasoning written down. Delete it only if you are also deleting the build.
   */
  body?: string[];
  /** Countable properties of the shipped system. Never a performance metric. */
  facts?: { value: string; label: string }[];
  /** What the system actually does, each verifiable in the repository. */
  capabilities: { title: string; detail: string }[];
  /**
   * Named constraints.
   *
   * NOT RENDERED since the detail page was compacted: it had grown to seven
   * sections and this was the second of three consecutive prose blocks at the
   * end of it. Kept because rule 4 above still holds and these are true, and
   * because a limit we have written down is one we will not accidentally
   * claim the opposite of in a pitch.
   */
  limits?: string[];
  /**
   * Stack tags.
   *
   * NOT RENDERED ANYWHERE, and that is the point. Naming every service,
   * database and API a system runs on is an architecture disclosure: it hands
   * anyone who wants to copy the build a shopping list, and for an automation
   * that sources our own leads it is most of the recipe. The labelled spec
   * table that used to sit on the detail page was the same problem, larger,
   * and has been deleted outright.
   *
   * Kept as data because it is true and useful internally, for answering "what
   * did we use on that" without opening the repository. If a stack ever goes
   * back on the page, put it there as a short list of disciplines (Flutter,
   * Supabase) rather than an inventory of every dependency and endpoint.
   */
  stack?: string[];
  repo?: string;
  site?: string;

  /**
   * A page of its own at /work/{slug}.
   *
   * Optional, because the /work card is a complete account of a build on its
   * own and most of them need nothing more. A build sets this when it has more
   * to say than a card can hold without turning /work into a document: the
   * spec table, the decisions behind it, and what it demonstrates we can do.
   *
   * When it is absent the build renders on /work and no route is generated, so
   * adding a page is opt-in rather than a second file to keep in sync.
   */
  page?: BuildPage;
}

export interface BuildPage {
  /** The H1, split for the two-line treatment every page title uses. */
  headline: { lines: string[]; accent: string };
  /** Hero paragraph. Two or three sentences, distinct from the card tagline. */
  intro: string;
  /** Platforms or surfaces it ships on, for the hero chip row. */
  platforms: string[];
  /**
   * The engineering choices worth defending.
   *
   * NO LONGER RENDERED on the detail page. It was a section explaining offline
   * sync and credential handling to someone who arrived asking whether we
   * could build their thing and what it would cost: written for an engineer
   * reviewing a codebase, not for a prospect. `means` replaced it.
   *
   * Kept because the decisions are true and are exactly what to send a
   * technical buyer who asks, and because they are the source the `means`
   * lines were drawn from.
   */
  decisions: { title: string; body: string }[];
  /**
   * What the build means for a client's own project.
   *
   * The translation layer: each decision above, restated as the thing a
   * prospect actually weighs. Not "the food log is written to on-device
   * storage first" but "it works with no signal". Three or four, and the
   * section ends in the CTA.
   */
  means: { title: string; body: string }[];

  /**
   * What this build demonstrates we can do for a client.
   *
   * NOT RENDERED, removed with the limits list for the same reason: it
   * restated in a list what the capabilities and decisions above had already
   * shown, which is the definition of a section that can go. Useful as notes
   * when writing a proposal, which is why it stays in the file.
   */
  proves: string[];
  /**
   * Which structured-data type describes this build.
   *
   * 'mobile-app' emits `MobileApplication`, which asserts something installed
   * from a store. Anything else emits none at all, deliberately: a server-side
   * automation is not a `SoftwareApplication` a visitor can install, and
   * inventing a type to have one is the kind of claim a rich result repeats
   * and a manual action punishes. Absent means no application schema, and the
   * page still carries its breadcrumb and organisation references.
   */
  schemaType?: 'mobile-app';
  /**
   * Service slugs this build is the evidence for, linked from the closing
   * section. Resolved through `getService`, so a renamed slug fails the build
   * rather than shipping a dead link.
   */
  services?: string[];
  /**
   * The closing line, written for this build specifically.
   *
   * `line` is the headline and `sub` the sentence under it. They exist as data
   * rather than as one string in the route because a generic close ("We can
   * build one for you") is the single most skippable thing on a page like
   * this: it is what every agency site says, so it reads as the end of the
   * content rather than as an invitation. A close that names what this
   * particular build was is the one a reader who got this far will answer.
   */
  close: { line: string; sub: string };
  /**
   * Where it can be downloaded, if it can be.
   *
   * `live` gates the buttons. Both listings returned 404 when this was written,
   * which is what a store page does before a listing goes public, and a button
   * that leads to a 404 is worse than no button. Flip `live` the day they are
   * public and the buttons appear; nothing else needs editing.
   */
  store?: { live: boolean; appStore?: string; playStore?: string };
  seo: { title: string; description: string };
}

export const BUILDS_ENABLED = true;

export const BUILDS: Build[] = [
  {
    slug: 'nothungry',
    pillar: 'software-ai',
    category: 'mobile-apps',
    name: 'nothungry',
    tagline:
      'An AI nutrition tracker for iOS and Android that turns a photograph of a meal into a logged entry with calories and macros, built and shipped to both app stores.',
    body: [
      'Every calorie tracker asks the same thing of its user: look up each item, find the closest match in a database, guess the portion, type it in, repeat. It works for about a week. The effort is front-loaded onto the person at exactly the moment they are least willing to spend it, which is why the category has the retention problem it has.',
      'nothungry removes that step. Photograph the plate and a vision model identifies what is on it, estimates the portions, and returns calories, protein, carbohydrates and fat per item. The result lands on a confirmation screen where every value can be corrected before anything is saved, because an estimate a user cannot argue with is one they stop trusting after the first mistake. Barcode scanning and a name search against the USDA food database cover the cases a photograph cannot.',
      'The engineering is where the product actually lives. The food log is written to on-device storage first and synced afterwards, so logging a meal with no signal behaves exactly as it does on wifi. No API key ships inside the app: the vision model and the food database are both reached through our own server functions, which authenticate the user, enforce a per-account daily quota so one user cannot run up an unbounded model bill, and keep the keys where an unpacked binary cannot reach them. Every table in the database carries a row-level policy scoped to the signed-in user.',
    ],
    facts: [
      { value: '21', label: 'product features in the shipped app' },
      { value: '44k', label: 'lines of hand-written Dart' },
      { value: '9', label: 'server functions behind the app' },
      { value: '70', label: 'test files covering the logic' },
    ],
    capabilities: [
      { title: 'Photograph a meal', detail: 'Point the camera at a plate. Items, portions and macros come back in seconds.' },
      { title: 'Correct it before it saves', detail: 'Nothing goes straight into the log. Change any item, quantity or unit first.' },
      { title: 'Scan a barcode', detail: 'Anything with a label skips the camera entirely.' },
      { title: 'Search by name', detail: 'Ranked on the food itself, so a search for rice returns rice.' },
      { title: 'A day, a diary, a trend', detail: 'A daily ring against a target derived from the user’s own measurements.' },
      { title: 'Writes to Apple and Android health', detail: 'Off until switched on, and write-only so the app never reads back.' },
      { title: 'Works with no signal', detail: 'Logging on a plane behaves exactly as it does on wifi.' },
      { title: 'Accounts and deletion', detail: 'Delete from inside the app, and the data goes rather than hides.' },
    ],
    limits: [
      'A portion estimated from a photograph is an estimate, and the app says so rather than presenting it as a measurement. That is why the confirmation screen exists and why nothing saves without passing through it.',
      'A photograph cannot see what it cannot see. Oil in a pan, sugar in a sauce and the inside of a mixed dish are all inferred, so packaged food is better served by the barcode path and the app offers both.',
      'It is not a medical device and gives no clinical advice. Nothing in it labels food as good or bad, and there is no language about earning or burning off what you eat. That was a product rule written before the screens were.',
      'The source is not public. It is a commercial product with a live subscriber base rather than a demonstration, so the code is shown in a walkthrough rather than linked.',
    ],
    stack: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Hive',
      'Supabase',
      'PostgreSQL',
      'Edge Functions',
      'HealthKit',
      'Health Connect',
      'RevenueCat',
    ],
    page: {
      headline: { lines: ['A photograph of a meal into'], accent: 'calories and macros' },
      intro:
        'A nutrition tracker for iOS and Android. Photograph a plate and a vision model returns the items, portions and macros, on a confirmation screen where every value can be corrected before it saves. Designed, engineered and shipped to both app stores.',
      platforms: ['iOS', 'Android'],
      decisions: [
        {
          title: 'The device is the source of truth',
          body:
            'The log is written locally first and synced after, so nothing the user types waits on a request. The cost is reconciliation, a trade we would make again.',
        },
        {
          title: 'Credentials never ship inside the app',
          body:
            'Anything the app cannot be trusted with runs on our server instead, which is the only arrangement that survives someone unpacking the binary.',
        },
        {
          title: 'Fallible calls return a value, not an exception',
          body:
            'A malformed response, an unknown barcode, a timeout: each is a screen the user can act on. None can reach them as a crash.',
        },
        {
          title: 'One account cannot read another',
          body:
            'Access is enforced at the data layer, not in app code, so a query written wrong still cannot return somebody else’s log.',
        },
        {
          title: 'The estimate is presented as an estimate',
          body:
            'A model guessing the weight of a serving is doing exactly that, and the interface says so rather than presenting a guess as a measurement.',
        },
        {
          title: 'No diet-culture language anywhere in it',
          body:
            'Nothing labels food good or bad, and nothing talks about earning or burning it off. A product rule written before any of the screens.',
        },
      ],
      proves: [
        'A production mobile app on both stores, designed and engineered by one team.',
        'An AI feature with the keys held server-side and per-user cost control in front of the model.',
        'An offline-first data layer where the device keeps working with no connection.',
        'Health platform integration on both Apple and Android, with the privacy declarations to match.',
        'Subscriptions and entitlements wired to a billing provider and resolved server-side.',
        'A store submission taken through Apple and Google review.',
      ],
      store: {
        live: false,
        appStore: 'https://apps.apple.com/app/id6780540137',
        playStore: 'https://play.google.com/store/apps/details?id=com.taz.nothungry',
      },
      schemaType: 'mobile-app' as const,
      services: ['app-development', 'agentic-ai-development'],
      means: [
        {
          title: 'It works before it is finished',
          body: 'We ship something you can put in front of real users early, then harden it. You see the product working rather than a status report about it.',
        },
        {
          title: 'The awkward cases are handled first',
          body: 'No signal, a bad response from the model, a barcode nobody has seen: these get designed for at the start, because they are what decides whether people keep using a product.',
        },
        {
          title: 'Your keys and your data stay yours',
          body: 'Nothing sensitive ships inside an app someone can unpack, access is enforced at the database rather than trusted to app code, and deletion actually deletes.',
        },
        {
          title: 'Built to be handed over',
          body: 'Typed, tested and documented, so the next developer is not us by necessity. You own what we build.',
        },
      ],
      close: {
        line: 'Mobile applications, built to ship',
        sub: 'We design, engineer and ship to both app stores. Send us the brief and we will scope the build.',
      },
      seo: {
        title: 'nothungry: AI nutrition tracker for iOS and Android',
        description:
          'A production iOS and Android nutrition tracker we designed, engineered and shipped: photograph a meal and get calories and macros back, correct anything before it saves, and log it with or without a connection.',
      },
    },
  },
  {
    slug: 'linkedin-fte',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'LinkedIn FTE',
    tagline:
      'An autonomous content and business-development system that carries a full-time social media manager’s workload, with a human holding every approval.',
    body: [
      'Consistent presence on LinkedIn is a full-time job that almost nobody does consistently. It means planning a week of posts, writing each one for a specific audience, producing branded artwork, publishing on schedule, reading every comment, separating a buying signal from small talk, and drafting a reply while the thread is still warm. Done properly that is a salaried role. Done in gaps between client work it decays within a month.',
      'LinkedIn FTE is our answer to that, built and running against our own account. It is a Python system on scheduled infrastructure that handles the whole loop: it drafts next week’s posts from a topic bank, renders the artwork, queues each post to a weekday, publishes through the official LinkedIn API, triages the comments that come back, hunts for leads matching a defined profile, and reports on the week. Nothing reaches the network without a person approving it from a Discord card.',
      'The architecture is a deliberate split we use across our automation work: written procedures define the objective and the edge cases, an orchestration layer decides what runs and in what order, and deterministic Python scripts do the execution. Language models are confined to the judgement steps, writing, classifying, scoring, where they are genuinely better than code. Every step that must be exact, scheduling, deduplication, publishing, state, is ordinary tested code. That boundary is the reason the system is reliable enough to leave running.',
    ],
    facts: [
      { value: '7', label: 'scheduled and operational jobs' },
      { value: '5+1', label: 'weekday posts plus a Saturday story' },
      { value: '7', label: 'database tables holding system state' },
      { value: '6', label: 'external services integrated' },
    ],
    capabilities: [
      { title: 'Plans the week', detail: 'Drafts the coming week from a topic bank, each day written for a named audience.' },
      { title: 'Makes the artwork', detail: 'Branded graphics rendered from the post it just wrote.' },
      { title: 'Waits for a human', detail: 'Every post and message needs approval before it can publish.' },
      { title: 'Publishes on schedule', detail: 'Posts at the planned time, with a defined recovery for every failure.' },
      { title: 'Reads the comments', detail: 'Sorts replies into three lanes: a buying signal, an idea, or noise.' },
      { title: 'Finds the leads', detail: 'Scores people describing problems we solve, and never repeats a prospect.' },
      { title: 'Drafts the outreach', detail: 'Turns a qualified lead into a reply or message, ready to send.' },
      { title: 'Reports every week', detail: 'What went out, what it earned, and how that compares to last week.' },
    ],
    limits: [
      'A person approves every post and every outbound message. The system drafts and queues, it does not speak for you unprompted.',
      'LinkedIn restricts its comments and analytics endpoints unless an application holds elevated programme access. Where that access is absent the system detects the refusal and raises a single warning per week rather than retrying into a wall.',
      'It does not rotate proxies, solve CAPTCHAs, or automate two-factor sign-in. Those are the techniques that get accounts restricted, and leaving them out is the choice that keeps the account healthy.',
      'It runs on the official API within its documented scopes. Anyone operating a system like this remains responsible for the platform terms that apply to their own account.',
    ],
    stack: [
      'Python 3.11',
      'GitHub Actions',
      'Supabase',
      'Playwright',
      'LinkedIn API v2',
      'Discord',
      'Google Sheets',
      'PM2',
    ],
    repo: 'https://github.com/usmankhan045/linkedin-automation',
    page: {
      headline: { lines: ['A full social media'], accent: 'operation, automated' },
      intro:
        'An autonomous system covering the work of a full-time social media manager: planning the week, writing the posts, rendering the artwork, publishing on schedule, triaging comments and identifying leads. A person approves everything before it goes out. Running in production, source public.',
      platforms: ['Autonomous agent', 'Scheduled infrastructure', 'Human in the loop'],
      decisions: [
        {
          title: 'The model decides, the code executes',
          body:
            'Models handle judgement: writing, classifying, scoring. Everything that must be exact is ordinary tested code. That boundary is why this can be left running.',
        },
        {
          title: 'Nothing reaches the network without a person',
          body:
            'A deliberate ceiling. A system that posts unsupervised eventually posts something you would not have, on the account you find clients with.',
        },
        {
          title: 'The official API, and none of the tricks',
          body:
            'No scraping, no spoofing, no automated sign-in. An automation that costs you the account it automates has negative value however well it works.',
        },
        {
          title: 'Every external call assumes failure',
          body:
            'Expired credentials, rate limits and refused endpoints each have a defined recovery, and failures report where someone will see them.',
        },
        {
          title: 'Nothing is processed twice',
          body:
            'Every job is safe to re-run, which is what makes a scheduled system debuggable rather than something you are afraid to touch.',
        },
      ],
      proves: [
        'We can build an agentic system that runs unattended for weeks and is still trusted with an account that matters.',
        'We know where to put a human in an automated loop, and where automation stops paying for itself.',
        'We integrate whatever the job needs: six external services here, each with its own auth, rate limits and failure modes.',
        'We build on official APIs and documented scopes rather than techniques that work until the platform notices.',
        'We treat scheduled jobs as production software: idempotent, observable, and safe to re-run.',
      ],
      services: ['digital-fte', 'workflow-automation', 'agentic-ai-development'],
      means: [
        {
          title: 'You stay in control of what goes out',
          body: 'Every automation we build puts a person at the point where it would embarrass you. Nothing reaches a customer, a platform or your own audience unapproved.',
        },
        {
          title: 'It runs without being watched',
          body: 'Failures recover on their own, jobs are safe to re-run, and anything that needs you reports where you will see it. An automation you have to supervise has not saved you anything.',
        },
        {
          title: 'We use the official way in',
          body: 'Documented APIs within their terms, never the scraping tricks that work until a platform notices. The point is a system that is still running next year.',
        },
        {
          title: 'The model does judgement, code does the rest',
          body: 'Writing and scoring go to a model; scheduling, deduplication and delivery are ordinary tested code. That boundary is why the output is consistent.',
        },
      ],
      close: {
        line: 'Automation for the work you repeat',
        sub: 'We build systems that run unattended with a person holding approval. Tell us the process and we will scope it.',
      },
      seo: {
        title: 'LinkedIn FTE: autonomous content and lead generation system',
        description:
          'An autonomous system that plans, writes, illustrates and publishes LinkedIn content, triages comments and identifies leads, with a person approving every post before it goes out.',
      },
    },
  },
  {
    slug: 'lead-research-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Lead Research & Qualification System',
    tagline:
      'Describe your ideal customer and it returns researched, scored leads with the evidence behind every score, ready for a person to approve.',
    capabilities: [
      { title: 'Builds the profile', detail: 'You define the customer you want; it holds that definition and works to it.' },
      { title: 'Researches the company', detail: 'Finds the business, the decision maker and the detail that makes an approach land.' },
      { title: 'Scores and evidences', detail: 'Every score carries its source, so a rejected lead can be argued with.' },
      { title: 'Never repeats a prospect', detail: 'Deduplicated against everything already seen, so nobody is contacted twice.' },
      { title: 'Syncs to your CRM', detail: 'Approved leads land where your team already works.' },
    ],
    page: {
      headline: { lines: ['Researched and scored leads,'], accent: 'with the evidence' },
      intro:
        'Prospecting is two jobs: finding companies that fit, then learning enough about each one to write something worth reading. This does both and hands you the result with its working shown, so a lead you reject can be rejected for a reason.',
      platforms: ['Web application', 'CRM integrated', 'Human approved'],
      decisions: [
        {
          title: 'Every score carries its evidence',
          body: 'A qualification score with nothing behind it is a number your sales team learns to ignore. Each one links to what it was based on, so a rep can disagree with it before spending an hour on the call.',
        },
        {
          title: 'Nobody is contacted twice',
          body: 'Deduplication runs against everything already seen, across campaigns and across time. The same prospect arriving twice under a slightly different company name is the failure that makes outreach look amateur.',
        },
        {
          title: 'A person approves before anything syncs',
          body: 'Research lands in a review queue, not straight into your CRM. Bad data in a CRM outlives the campaign that put it there.',
        },
        {
          title: 'Unverifiable is dropped, not guessed',
          body: 'Where a detail cannot be confirmed it is left empty and flagged rather than filled with the model’s best guess. A confidently wrong job title is worse than a blank one.',
        },
      ],
      means: [
        {
          title: 'You define who you want',
          body: 'The profile is yours to write and to change. Saved, so a campaign next quarter starts from what worked this one.',
        },
        {
          title: 'Research that would take a day takes minutes',
          body: 'Company, decision maker and the context for an approach, gathered per lead rather than per hour of someone’s time.',
        },
        {
          title: 'It lands where your team already works',
          body: 'Approved leads sync to your CRM in the shape your pipeline expects. No export, no spreadsheet.',
        },
        {
          title: 'Built for your definition of a good lead',
          body: 'The scoring rubric is configured to what actually closes for you, not to a generic template.',
        },
      ],
      proves: [
        'We can build research systems that gather from many sources and keep every claim traceable.',
        'We know where a human belongs in an automated pipeline and where they are only a bottleneck.',
        'We integrate with the tools a sales team already uses rather than asking them to adopt another one.',
      ],
      services: ['agentic-ai-development', 'workflow-automation'],
      close: {
        line: 'Lead research, built to your profile',
        sub: 'Configured to your ideal customer profile, your scoring rubric and your CRM. We will scope it against your pipeline.',
      },
      seo: {
        title: 'AI Lead Research & Qualification System',
        description:
          'An agentic system that turns your ideal customer profile into researched, scored leads with the evidence behind every score, approved by a person before it reaches your CRM.',
      },
    },
  },
  {
    slug: 'sales-follow-up-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Sales Follow-Up & CRM Assistant',
    tagline:
      'Turns CRM activity into a daily list of who to contact and what to say, with every message approved before it sends.',
    capabilities: [
      { title: 'Summarises the lead', detail: 'What has happened, where it stands, and what it is waiting on.' },
      { title: 'Names the next action', detail: 'One clear recommendation per opportunity, not a dashboard to interpret.' },
      { title: 'Drafts the message', detail: 'Written in context, ready to send once you approve it.' },
      { title: 'Catches the stalls', detail: 'Flags the opportunities going quiet before they go cold.' },
      { title: 'Keeps the CRM current', detail: 'Fields filled and next touches scheduled without anyone typing them.' },
    ],
    page: {
      headline: { lines: ['Pipeline activity into'], accent: 'daily sales actions' },
      intro:
        'Most pipeline is not lost to competitors. It is lost to a follow-up nobody sent on a week nobody had time. This watches the pipeline, decides what needs a touch today, and writes it, so the only thing left is to read it and send.',
      platforms: ['Web application', 'CRM integrated', 'Human approved'],
      decisions: [
        {
          title: 'Sending is a human action, always',
          body: 'Drafts wait for approval. An automation that emails your prospects unsupervised will eventually send the wrong message to the wrong person, and that is not a bug you can apologise your way out of.',
        },
        {
          title: 'One recommendation, not a dashboard',
          body: 'Each opportunity gets a single suggested next action. A screen of charts asks the rep to do the analysis; the point of the system is that it already did.',
        },
        {
          title: 'Opt-outs are permanent and enforced',
          body: 'Someone who asked not to be contacted is removed at the data layer, so no later campaign can reach them by accident. This is a legal obligation, not a preference.',
        },
        {
          title: 'The CRM stays the source of truth',
          body: 'Everything written back goes to your CRM in its own fields. We do not build a second system that your team has to remember to check.',
        },
      ],
      means: [
        {
          title: 'Nothing goes quiet unnoticed',
          body: 'Stalled opportunities surface before they are cold, which is the difference between a follow-up and a re-introduction.',
        },
        {
          title: 'Your reps start the day with a list',
          body: 'Who to contact, why, and a draft ready. Not a pipeline to interpret at nine in the morning.',
        },
        {
          title: 'Written in your voice',
          body: 'Tuned on the messages that have worked for you, so approving a draft is a read rather than a rewrite.',
        },
        {
          title: 'Managers see the pipeline honestly',
          body: 'Stage inference from actual activity, not from whatever a rep last remembered to update.',
        },
      ],
      proves: [
        'We can put a language model inside a sales process without letting it speak unsupervised.',
        'We build to the compliance rules that apply to outbound contact, not around them.',
        'We integrate with CRMs as the system of record rather than replacing them.',
      ],
      services: ['agentic-ai-development', 'digital-fte'],
      close: {
        line: 'Sales follow-up, built to your pipeline',
        sub: 'Configured to your pipeline stages, your messaging and your CRM. We will scope it against your sales process.',
      },
      seo: {
        title: 'AI Sales Follow-Up & CRM Assistant',
        description:
          'An agentic system that turns CRM activity into a daily list of who to contact and what to say, with every message approved by a person before it sends.',
      },
    },
  },
  {
    slug: 'proposal-builder-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Proposal & Quotation Builder',
    tagline:
      'Turns a client brief into a priced, formatted proposal in minutes, using your own pricing rules and approved content.',
    capabilities: [
      { title: 'Reads the brief', detail: 'Pulls the scope out of whatever the client actually sent you.' },
      { title: 'Prices it to your rules', detail: 'Your rates, your margins, locked so nothing is quoted off-policy.' },
      { title: 'Builds the document', detail: 'Scope, milestones and terms from your approved library, as a sendable PDF.' },
      { title: 'Holds for approval', detail: 'Nothing reaches a client until someone has signed off the numbers.' },
      { title: 'Tracks what happened', detail: 'Sent, opened, won or lost, with follow-up reminders.' },
    ],
    page: {
      headline: { lines: ['Client briefs into priced,'], accent: 'formatted proposals' },
      intro:
        'A proposal is mostly assembly: the same scope language, the same terms, the same rates, rearranged for this client. The judgement is in the pricing and the fit. This does the assembly and leaves the judgement with you.',
      platforms: ['Web application', 'PDF output', 'Human approved'],
      decisions: [
        {
          title: 'Pricing is locked to your rules',
          body: 'Rates and margins come from a rules engine you control, and the commercial fields cannot be edited freely. A model inventing a discount is the one failure that costs real money.',
        },
        {
          title: 'Content comes from an approved library',
          body: 'Scope and terms are drawn from language you have already signed off. Generated prose in a contractual document is a liability, not a time saving.',
        },
        {
          title: 'The totals are checked by code',
          body: 'Arithmetic is verified before a proposal can be sent. A model is good at describing scope and should never be trusted to add up.',
        },
        {
          title: 'Every version is kept',
          body: 'What was sent, when, and what changed between drafts. A disputed proposal is settled by the record rather than by memory.',
        },
      ],
      means: [
        {
          title: 'Same day instead of next week',
          body: 'The gap between a good conversation and a proposal landing is where deals cool. This closes it.',
        },
        {
          title: 'Quotes that are right the first time',
          body: 'Your pricing rules applied consistently, so nothing goes out underpriced and nothing needs a correction email.',
        },
        {
          title: 'It looks like your firm',
          body: 'Your template, your language, your terms. The client sees a document, not a generated one.',
        },
        {
          title: 'You find out what wins',
          body: 'Sent, opened, won or lost, tracked per proposal, so pricing decisions stop being guesses.',
        },
      ],
      proves: [
        'We can build commercial tooling where a mistake has a cost, and design the controls that prevent one.',
        'We know which parts of a document a model should write and which parts it must never touch.',
        'We produce documents a business is willing to put its name on.',
      ],
      services: ['agentic-ai-development', 'workflow-automation'],
      close: {
        line: 'Proposals, built to your pricing rules',
        sub: 'Configured to your rate card, your templates and your approval rules. We will scope it against your quoting process.',
      },
      seo: {
        title: 'AI Proposal & Quotation Builder',
        description:
          'An agentic system that turns a client brief into a priced, formatted proposal using your own pricing rules and approved content, with every total checked before it sends.',
      },
    },
  },
  {
    slug: 'meeting-to-action-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Meeting-to-Action Assistant',
    tagline:
      'Every meeting becomes decisions, owned tasks and drafted follow-ups, instead of notes nobody opens again.',
    capabilities: [
      { title: 'Summarises the meeting', detail: 'What was discussed and what was actually decided.' },
      { title: 'Extracts the actions', detail: 'Each with an owner and a date, pulled from what was said.' },
      { title: 'Creates the tasks', detail: 'Straight into the tool your team already uses, once you approve.' },
      { title: 'Drafts the follow-up', detail: 'The message that should go out after, written and waiting.' },
      { title: 'Stays searchable', detail: 'Every meeting findable later by what was said in it.' },
    ],
    page: {
      headline: { lines: ['Meetings into decisions,'], accent: 'tasks and follow-ups' },
      intro:
        'The value of a meeting is in what happens after it. This takes the recording, works out what was actually decided, who owns each action and when it is due, and puts those tasks where your team will see them.',
      platforms: ['Web application', 'Calendar integrated', 'Human approved'],
      decisions: [
        {
          title: 'Every action links back to what was said',
          body: 'An extracted task carries the moment in the transcript it came from. When someone disputes an action item, the answer is a timestamp rather than an argument.',
        },
        {
          title: 'Tasks are created on approval, not on arrival',
          body: 'A meeting that generates fourteen speculative tasks in your project tool is worse than one that generates none. You confirm the list before it lands.',
        },
        {
          title: 'Decisions and actions are kept apart',
          body: 'A decision is a record; an action has an owner and a date. Merging them produces a list where nothing is clearly anybody’s job.',
        },
        {
          title: 'Summaries stay editable',
          body: 'The system produces a first draft of the record, not the final one. Whoever ran the meeting can correct it, and the correction is what persists.',
        },
      ],
      means: [
        {
          title: 'Nothing depends on who took notes',
          body: 'The record exists whether or not anyone remembered to write one, which is usually the difference between a follow-up and a forgotten commitment.',
        },
        {
          title: 'Actions arrive owned and dated',
          body: 'In the tool your team already uses, assigned to the person who agreed to it in the room.',
        },
        {
          title: 'The follow-up is already written',
          body: 'The message that should go out after a client call, drafted from what was discussed, ready to review.',
        },
        {
          title: 'Searchable months later',
          body: 'What was agreed with that client in March, found by what was said rather than by who might remember.',
        },
      ],
      proves: [
        'We can extract structure from unstructured speech and keep it traceable to the source.',
        'We integrate with the calendar, task and CRM tools a team already runs on.',
        'We design for the case where the model is wrong, which in transcription is routine.',
      ],
      services: ['agentic-ai-development', 'workflow-automation'],
      close: {
        line: 'Meeting capture, built to your workflow',
        sub: 'Configured to your task tooling, your CRM and your calendar. We will scope it against how your team runs meetings.',
      },
      seo: {
        title: 'AI Meeting-to-Action Business Assistant',
        description:
          'An agentic system that turns meetings into decisions, owned tasks and drafted follow-ups, with every action traceable to the moment it was agreed.',
      },
    },
  },
  {
    slug: 'document-processing-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Document Processing Agent',
    tagline:
      'Invoices, forms and contracts arrive as PDFs and leave as checked, structured data, with anything uncertain flagged for a person.',
    capabilities: [
      { title: 'Takes them however they arrive', detail: 'Uploaded, emailed or pushed through an API.' },
      { title: 'Reads scans and photographs', detail: 'Not just clean PDFs: the phone picture of a receipt too.' },
      { title: 'Extracts to your schema', detail: 'The fields your business needs, in the shape your systems expect.' },
      { title: 'Checks its own work', detail: 'Validates against your rules and against related documents.' },
      { title: 'Escalates what it is unsure of', detail: 'Low confidence goes to a review queue, not into your database.' },
    ],
    page: {
      headline: { lines: ['Business documents into'], accent: 'validated data' },
      intro:
        'Every business has a pile of documents that somebody retypes into a system. Invoices, forms, contracts, delivery notes. This reads them however they arrive, extracts the fields you need, checks its own work, and sends anything it is unsure about to a person.',
      platforms: ['Web application', 'API and email intake', 'Human reviewed'],
      decisions: [
        {
          title: 'Confidence decides what a person sees',
          body: 'Every extracted field carries a confidence score, and anything below your threshold goes to review rather than into your database. The alternative is silent corruption of the records you rely on.',
        },
        {
          title: 'Validated against your rules and related documents',
          body: 'A total that does not match its line items, or a delivery note that disagrees with its purchase order, is caught by checking documents against each other, not by trusting one in isolation.',
        },
        {
          title: 'Review shows the source beside the field',
          body: 'The reviewer sees the original document next to the extracted value. Reviewing data without the page it came from is retyping with extra steps.',
        },
        {
          title: 'Retention is a setting, not an afterthought',
          body: 'How long documents are kept and when they are destroyed is configured per document type, because for most of this paperwork that is a legal requirement rather than a preference.',
        },
      ],
      means: [
        {
          title: 'It reads what it is actually sent',
          body: 'A scan, a phone photograph, a forwarded email attachment. Not just the clean PDF that exists in demonstrations.',
        },
        {
          title: 'The fields are the ones your systems need',
          body: 'Extraction schemas configured to your data, so what comes out fits where it is going without a transformation step.',
        },
        {
          title: 'Exceptions are a queue, not a surprise',
          body: 'The uncertain cases are collected and presented for a decision, rather than discovered later in a reconciliation.',
        },
        {
          title: 'Everything is auditable',
          body: 'Who reviewed what, what they changed, and which document a figure came from.',
        },
      ],
      proves: [
        'We can build extraction pipelines that stay accurate on documents that are genuinely messy.',
        'We treat confidence and human review as architecture rather than as a fallback.',
        'We handle retention, encryption and audit requirements as first-class constraints.',
      ],
      services: ['agentic-ai-development', 'workflow-automation'],
      close: {
        line: 'Document processing, built to your schema',
        sub: 'Configured to your document types, your extraction schema and your validation rules. Send a sample and we will scope it.',
      },
      seo: {
        title: 'AI Document Processing Agent',
        description:
          'An agentic system that converts PDFs, scans and emailed documents into checked, structured business data, with anything uncertain routed to a person for review.',
      },
    },
  },
  {
    slug: 'invoice-agent',
    pillar: 'finance-tax',
    category: 'agentic-systems',
    name: 'AI Finance & Invoice Assistant',
    tagline:
      'Matches invoices against purchase orders, catches duplicates and routes approvals, while a person still signs off every payment.',
    capabilities: [
      { title: 'Matches against the order', detail: 'Two and three way matching, so what was billed is what was agreed.' },
      { title: 'Catches the duplicates', detail: 'The same invoice twice is the most common and most expensive error.' },
      { title: 'Checks the arithmetic', detail: 'Totals and tax verified rather than trusted.' },
      { title: 'Routes for approval', detail: 'To the right person by value, with segregation of duties enforced.' },
      { title: 'Syncs to your accounts', detail: 'Approved and payment-ready, in the system your accountant uses.' },
    ],
    page: {
      headline: { lines: ['Invoice checks automated,'], accent: 'approvals kept human' },
      intro:
        'Accounts payable is a sequence of checks that are tedious to do and expensive to skip: does this match the order, have we paid it already, do the numbers add up, who is allowed to approve it. This runs the checks. A person still signs off every payment.',
      platforms: ['Web application', 'Accounting integrated', 'Human approved'],
      decisions: [
        {
          title: 'Approval is never automated',
          body: 'The system prepares and routes; it does not release money. Every payment has a named person behind it, which is a control requirement before it is a design choice.',
        },
        {
          title: 'Segregation of duties is enforced in the data',
          body: 'The person who entered an invoice cannot be the person who approves it. Enforced by the permission model rather than by policy nobody checks.',
        },
        {
          title: 'Duplicate detection runs before anything else',
          body: 'Paying the same invoice twice is the most common and most expensive error in accounts payable, and it is entirely preventable.',
        },
        {
          title: 'The activity history cannot be edited',
          body: 'Who did what and when is append-only. An audit trail that can be rewritten is not an audit trail.',
        },
      ],
      means: [
        {
          title: 'Matched against the order automatically',
          body: 'Two and three way matching, so what was invoiced is what was agreed and what was received.',
        },
        {
          title: 'The arithmetic is verified, not trusted',
          body: 'Totals and tax checked by code before an invoice reaches anyone for approval.',
        },
        {
          title: 'Routed to the right approver by value',
          body: 'Your thresholds, your hierarchy, so nothing waits on the wrong desk.',
        },
        {
          title: 'Month end stops being an event',
          body: 'Reconciliation support and a checklist, rather than a week of chasing paper.',
        },
      ],
      proves: [
        'We can build financial tooling to the controls an auditor expects to find.',
        'We understand where automation stops in a finance process and why.',
        'We integrate with accounting and ERP systems as the system of record.',
      ],
      services: ['agentic-ai-development', 'financial-accounting'],
      close: {
        line: 'Invoice processing, built to your controls',
        sub: 'Configured to your approval thresholds, your matching rules and your accounting system. We will scope it against your controls.',
      },
      seo: {
        title: 'AI Finance & Invoice Assistant',
        description:
          'An agentic system that matches invoices against purchase orders, catches duplicates and routes approvals, while every payment stays under human sign-off.',
      },
    },
  },
  {
    slug: 'business-intelligence-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Business Intelligence Agent',
    tagline:
      'Ask your own data a question in plain English and get the answer, the chart, and the working behind it.',
    capabilities: [
      { title: 'Connects to what you have', detail: 'Spreadsheets or databases, whichever the numbers live in.' },
      { title: 'Learns your definitions', detail: 'What your business means by revenue, churn or a good month.' },
      { title: 'Answers in plain English', detail: 'A question, an answer and the chart that shows it.' },
      { title: 'Shows the working', detail: 'Every number traceable to the query that produced it.' },
      { title: 'Watches for anomalies', detail: 'Tells you what moved before you think to ask.' },
    ],
    page: {
      headline: { lines: ['Questions about your data,'], accent: 'answered with evidence' },
      intro:
        'Most businesses have the numbers and no time to interrogate them. This connects to what you already have, learns what your business means by its own terms, and answers questions in plain English with the chart and the working attached.',
      platforms: ['Web application', 'Read-only access', 'Evidence shown'],
      decisions: [
        {
          title: 'Read-only by default',
          body: 'An analytics system has no reason to be able to write to the data it reads. The access it holds is the least it needs, which limits what any mistake can cost.',
        },
        {
          title: 'Every query is validated before it runs',
          body: 'Generated queries pass through a validation layer rather than going straight to your database. A language model writing unchecked SQL against production data is not a risk worth taking.',
        },
        {
          title: 'Your definitions, not the model’s',
          body: 'What counts as revenue, an active customer or a good month is defined once in a semantic layer. Without it, the same question asked twice returns two different numbers.',
        },
        {
          title: 'Answers show their working',
          body: 'Every figure links to how it was calculated. A number you cannot trace is a number nobody will act on.',
        },
      ],
      means: [
        {
          title: 'It works with the data you already have',
          body: 'Spreadsheets or a database, whichever your numbers actually live in. No migration required first.',
        },
        {
          title: 'Anyone can ask',
          body: 'A question in plain English instead of a request to whoever knows the reporting tool.',
        },
        {
          title: 'It tells you what moved',
          body: 'Anomalies surfaced without anyone thinking to check, which is how most problems are found late.',
        },
        {
          title: 'Permissions respected per row',
          body: 'People see the data they are allowed to see, enforced at the query rather than in the interface.',
        },
      ],
      proves: [
        'We can put a model in front of a database without giving it unchecked access to one.',
        'We build the semantic layer that makes business metrics consistent across a company.',
        'We treat traceability as a requirement, because a figure nobody can verify gets ignored.',
      ],
      services: ['agentic-ai-development', 'rag-development'],
      close: {
        line: 'Analytics, built to your definitions',
        sub: 'Configured to your data sources, your metric definitions and your access rules. We will scope it against your reporting.',
      },
      seo: {
        title: 'AI Business Intelligence Agent',
        description:
          'An agentic system that answers questions about your own data in plain English, with validated queries, your business definitions and the working shown behind every figure.',
      },
    },
  },
  {
    slug: 'weekly-report-agent',
    pillar: 'software-ai',
    category: 'agentic-systems',
    name: 'AI Weekly Business Report & Owner Copilot',
    tagline:
      'Every Monday, one briefing: what moved, what broke and what to do about it, drawn from your own numbers.',
    capabilities: [
      { title: 'Pulls the week together', detail: 'Sales, marketing, finance and operations in one place.' },
      { title: 'Compares like for like', detail: 'Against last week, last month and the target you set.' },
      { title: 'Writes the commentary', detail: 'Grounded in the calculated figures, never invented around them.' },
      { title: 'Recommends the actions', detail: 'What the numbers suggest you do next.' },
      { title: 'Lands in your inbox', detail: 'Scheduled, as a PDF or an email, without anyone assembling it.' },
    ],
    page: {
      headline: { lines: ['Scattered numbers into'], accent: 'one weekly briefing' },
      intro:
        'The numbers that tell you how the business is doing are spread across four systems, so nobody looks at all of them in the same week. This pulls them together, compares the week against the last one and the target, and writes the short version.',
      platforms: ['Scheduled delivery', 'Email and PDF', 'Evidence grounded'],
      decisions: [
        {
          title: 'The commentary is grounded in the calculation',
          body: 'Narrative is written from figures the system has already computed, never around them. A model asked to describe a good week will describe one whether or not it happened.',
        },
        {
          title: 'Incomplete data is reported as incomplete',
          body: 'If a source did not refresh, the report says so rather than quietly comparing a partial week against a full one. A silently wrong report is worse than a late one.',
        },
        {
          title: 'Metric definitions live in one place',
          body: 'What the business counts as revenue or a new customer is defined once. Otherwise the weekly report and the dashboard disagree, and both stop being believed.',
        },
        {
          title: 'Every report is kept',
          body: 'Versioned history, so what you were told in March can be checked in June, and a changed definition does not silently rewrite the past.',
        },
      ],
      means: [
        {
          title: 'It arrives without anyone assembling it',
          body: 'Scheduled and delivered, so the week is reviewed even in the weeks when nobody has time.',
        },
        {
          title: 'Compared against something',
          body: 'Last week, last month, the target you set. A number on its own tells you nothing.',
        },
        {
          title: 'Wins and problems separated',
          body: 'What went well, what did not, and what the figures suggest you do about it.',
        },
        {
          title: 'You can ask it follow-ups',
          body: 'The report is a starting point, not a dead end. Ask why a figure moved and get the answer.',
        },
      ],
      proves: [
        'We can build reporting that a business owner will actually read on a Monday morning.',
        'We keep generated commentary anchored to computed figures rather than letting it invent a narrative.',
        'We treat data completeness as something to report on, not something to hope for.',
      ],
      services: ['agentic-ai-development', 'digital-fte'],
      close: {
        line: 'Reporting, built to your metrics',
        sub: 'Configured to your KPIs, your targets and your delivery schedule. We will scope it against the numbers you track.',
      },
      seo: {
        title: 'AI Weekly Business Report & Owner Copilot',
        description:
          'An agentic system that pulls your business numbers together each week and writes the briefing: what moved, what broke, and what the figures suggest you do next.',
      },
    },
  },
  {
    slug: 'ecommerce-ops-agent',
    pillar: 'ecommerce',
    category: 'agentic-systems',
    name: 'AI E-commerce Operations Agent',
    tagline:
      'Watches orders, stock and returns across your store and tells you what needs attention before a customer does.',
    capabilities: [
      { title: 'Warns before a stockout', detail: 'Demand signals read early enough to actually reorder.' },
      { title: 'Catches the bad orders', detail: 'The ones stuck, mispriced or about to become a complaint.' },
      { title: 'Explains the returns', detail: 'Not just the rate: which product, and why.' },
      { title: 'Triages the support queue', detail: 'Sorted by urgency, with the context already gathered.' },
      { title: 'Briefs you daily', detail: 'One summary of what changed and what needs a decision.' },
    ],
    page: {
      headline: { lines: ['Store operations,'], accent: 'monitored continuously' },
      intro:
        'Running a store is watching four things at once: what is selling, what is running out, what is stuck, and who is unhappy. This watches them continuously and tells you what needs a decision, rather than leaving you to find out from a complaint.',
      platforms: ['Store integrated', 'Real-time events', 'Human approved'],
      decisions: [
        {
          title: 'Anything that touches money needs approval',
          body: 'Refunds, price changes and inventory adjustments are prepared and then wait for a person. An automation with unsupervised write access to a live store is a bad day waiting to happen.',
        },
        {
          title: 'Recommendations carry their context',
          body: 'An alert that says reorder is useless; one that says reorder because of sell-through, lead time and what is already in transit can be acted on immediately.',
        },
        {
          title: 'Reconciliation runs on a schedule',
          body: 'Webhooks get missed. A periodic reconciliation against the store catches what the event stream dropped, so the picture does not quietly drift out of date.',
        },
        {
          title: 'Every action is verified after the fact',
          body: 'The system confirms the change actually landed in the store rather than assuming the API call succeeded.',
        },
      ],
      means: [
        {
          title: 'Stockouts caught early enough to fix',
          body: 'Demand signals read against lead times, so a reorder alert arrives while reordering is still an option.',
        },
        {
          title: 'The stuck orders surface themselves',
          body: 'The ones that will become a complaint in three days, found today.',
        },
        {
          title: 'Returns explained, not just counted',
          body: 'Which product, and why, which is the only version of that number you can act on.',
        },
        {
          title: 'One briefing a day',
          body: 'What changed and what needs you, instead of four dashboards nobody opens.',
        },
      ],
      proves: [
        'We can build event-driven systems against store APIs and keep them accurate over time.',
        'We put approval gates on exactly the actions that need them and nowhere else.',
        'We understand retail operations well enough to know which signals matter.',
      ],
      services: ['agentic-ai-development', 'ecommerce-management'],
      close: {
        line: 'Store operations, built to your platform',
        sub: 'Configured to your store platform, your stock thresholds and your approval gates. We will scope it against your operations.',
      },
      seo: {
        title: 'AI E-commerce Operations Agent',
        description:
          'An agentic system that watches orders, stock and returns across your store and surfaces what needs attention, with approval gates on anything that touches money.',
      },
    },
  },
  {
    slug: 'reviews-agent',
    pillar: 'growth-marketing',
    category: 'agentic-systems',
    name: 'AI Reviews & Reputation Manager',
    tagline:
      'Every review in one inbox, sorted by urgency, with a drafted reply and the recurring complaints surfaced.',
    capabilities: [
      { title: 'One inbox for every platform', detail: 'Wherever customers are leaving reviews, they arrive here.' },
      { title: 'Sorts by what matters', detail: 'The angry one from three days ago before the five star from today.' },
      { title: 'Drafts the reply', detail: 'In your voice, checked against what you will not say.' },
      { title: 'Escalates the serious ones', detail: 'Sensitive complaints go to a person, never to an auto-reply.' },
      { title: 'Finds the pattern', detail: 'The same complaint five times is an operations problem, and it says so.' },
    ],
    page: {
      headline: { lines: ['Customer reviews,'], accent: 'triaged and answered' },
      intro:
        'Reviews arrive across several platforms, at all hours, and the ones that matter most are the ones you want to answer carefully and quickly. This collects them in one place, sorts them by what needs you first, and drafts the reply.',
      platforms: ['Multi-platform', 'Web application', 'Human approved'],
      decisions: [
        {
          title: 'Sensitive complaints never auto-send',
          body: 'Anything touching safety, health, legal exposure or a named member of staff is escalated to a person regardless of policy settings. These are the replies that end up screenshotted.',
        },
        {
          title: 'Prohibited responses are checked before sending',
          body: 'Drafts are checked against the things your business must not say. In regulated trades that is a compliance boundary, not a tone preference.',
        },
        {
          title: 'Auto-response is opt-in and narrow',
          body: 'Available for unambiguous positive reviews only, and off until you switch it on. Every other reply waits for a person.',
        },
        {
          title: 'Recurring complaints are surfaced as operations problems',
          body: 'The same issue five times is not five reviews to answer, it is one thing to fix, and the system says so rather than drafting five apologies.',
        },
      ],
      means: [
        {
          title: 'One inbox for every platform',
          body: 'Wherever customers leave reviews, they arrive in the same queue.',
        },
        {
          title: 'Sorted by what needs you first',
          body: 'The angry one from Friday before the five-star from this morning.',
        },
        {
          title: 'Replies in your voice',
          body: 'Drafted from your approved templates and tone, ready to read and send.',
        },
        {
          title: 'The pattern behind the complaints',
          body: 'Trends by location, product or service, so the cause gets fixed rather than the symptom answered.',
        },
      ],
      proves: [
        'We can build systems that speak to your customers in public and still never say the wrong thing.',
        'We design escalation paths for the cases where automation must stop.',
        'We turn a stream of individual events into the operational pattern underneath it.',
      ],
      services: ['agentic-ai-development', 'social-presence-management'],
      close: {
        line: 'Review management, built to your policy',
        sub: 'Configured to your review platforms, your response templates and your escalation rules. We will scope it against your policy.',
      },
      seo: {
        title: 'AI Reviews & Reputation Manager',
        description:
          'An agentic system that collects reviews from every platform, sorts them by urgency and drafts replies in your voice, with sensitive complaints always escalated to a person.',
      },
    },
  },
];

export const BUILD_BY_SLUG: Record<string, Build> = Object.fromEntries(
  BUILDS.map((build) => [build.slug, build]),
);

/** The builds that have a page of their own. Drives the /work/[build] route. */
export const BUILD_PAGES = BUILDS.filter((build) => build.page);


/**
 * WHAT A PROJECT IS, which is how /work is organised.
 *
 * Not the practice it sells under. A visitor on a portfolio is asking "have
 * they built the kind of thing I need", and the useful answer is "a mobile
 * app" or "an agentic system", not "Software & AI", which covers a Shopify
 * theme and an autonomous agent equally and so tells them nothing.
 *
 * `pillar` stays on every build and still drives the service links on a
 * project's own page. The two answer different questions: `pillar` is what we
 * sell, `category` is what we made.
 *
 * ── Adding a category ──
 *
 * Add it here and to CATEGORIES below, in the order it should appear in the
 * filter. A category with no projects in it never renders: an empty tab is a
 * promise the page cannot keep, so the strip is built from what exists.
 */
export type BuildCategory =
  | 'agentic-systems'
  | 'mobile-apps'
  | 'websites'
  | 'ecommerce'
  | 'automations';

export interface CategoryMeta {
  slug: BuildCategory;
  /** The filter tab. Short: it sits in a row with all the others. */
  label: string;
  /** The line on the card. Names the kind of thing, not the practice. */
  cardLabel: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { slug: 'agentic-systems', label: 'Agentic systems', cardLabel: 'Agentic system' },
  { slug: 'mobile-apps', label: 'Mobile apps', cardLabel: 'Mobile app' },
  { slug: 'websites', label: 'Websites', cardLabel: 'Website' },
  { slug: 'ecommerce', label: 'E-commerce', cardLabel: 'E-commerce' },
  { slug: 'automations', label: 'Automations', cardLabel: 'Automation' },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<BuildCategory, CategoryMeta>;

export interface BuildGroup {
  category: CategoryMeta;
  builds: Build[];
}

/** Only categories that hold a project. See the note on BuildCategory. */
export const BUILD_GROUPS: BuildGroup[] = CATEGORIES.map((category) => ({
  category,
  builds: BUILDS.filter((build) => build.category === category.slug),
})).filter((group) => group.builds.length > 0);

export function buildHref(slug: string): string {
  return `/work/${slug}`;
}
