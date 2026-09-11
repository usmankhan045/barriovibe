import type { Post } from './types';

/**
 * Cluster: shipping software.
 *
 * The App Development service page answers "What if Apple rejects the app?" and
 * "Why does Android take longer to launch than iOS?" in a sentence each. Both
 * deserve more, and the research turned up something the service page does not
 * say because we only established it while writing: guideline 4.2.6 puts an
 * agency submitting client apps from its own account directly in scope for
 * rejection. That is worth telling clients plainly.
 */
export const SHIPPING_POSTS: Post[] = [
  {
    slug: 'app-store-rejection-what-actually-blocks-you',
    cluster: 'shipping',
    title: 'What Actually Gets Your App Rejected, and What It Costs in Time',
    navLabel: 'What gets an app rejected',
    card: 'The guidelines that catch real apps, the 14-day gate on Google Play, and why your agency should not submit your app.',

    answer:
      'Apple states that over 40 percent of unresolved review issues are app completeness: crashes, placeholder content and broken links, not policy disputes. The rules that block a finished, working app are narrower: Apple rejects apps that are mostly a repackaged website, and rejects apps submitted by an agency on a client\'s behalf. On Google Play the bigger delay is a testing gate, where a new personal account must run a closed test with 12 testers for 14 continuous days before it can ship at all.',

    sections: [
      {
        kind: 'prose',
        heading: 'Most rejections are not interesting',
        body: [
          'The published genre of app-rejection content is about dramatic policy fights. The reality Apple describes is duller and more useful: "On average, over 40% of unresolved issues are related to guideline 2.1: App Completeness, which covers crashes, placeholder content, incomplete information, and more."',
          'Apple names the specific offenders: crashes and bugs, broken links, placeholder content, incomplete information, privacy policy issues, and unclear data access requests. And it is explicit about links: "All links in your app must be functional. A link to user support with up-to-date contact information and a link to your privacy policy is required for all apps."',
          'That is a checklist, not a philosophy. Most rejected submissions are rejected because something was unfinished, and most of those are avoidable in the hour before submitting.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'One number to read carefully',
        body:
          'Apple\'s 40 percent figure is the share OF UNRESOLVED ISSUES attributable to guideline 2.1. It is not a rejection rate. Neither Apple nor Google publishes what proportion of submissions get rejected, and any article giving you that number invented it. We looked specifically, and Apple\'s old "Common App Rejections" page, which used to rank the top reasons, now returns a 404 and no longer exists to be quoted.',
      },
      {
        kind: 'prose',
        heading: 'The rule that catches agency-built apps',
        body: [
          'This one is worth knowing before you commission an app, because it determines whose account it ships from, and it surprises people.',
          'Apple\'s guideline 4.2.6 reads: "Apps created from a commercialized template or app generation service will be rejected unless they are submitted directly by the provider of the app\'s content. These services should not submit apps on behalf of their clients."',
          'Read strictly, an agency that builds apps for clients and submits them from its own developer account is in scope. Apple\'s stated remedies are that the client submits under their own account, or that the provider ships one aggregated app rather than many similar ones.',
          'The practical consequence is that your app should be submitted from your own Apple Developer account, with your agency added to it, rather than from theirs. That also means you own the listing, the reviews and the relationship with Apple, which is where they should sit anyway. Any agency that wants to keep your app on its own account is arranging things for its convenience and against your interest, and now has a guideline problem as well.',
        ],
      },
      {
        kind: 'prose',
        heading: 'If you want a website turned into an app',
        body: [
          'This is the single most common request that fails review, and it fails on a guideline written specifically for it.',
          'Guideline 4.2: "Your app should include features, content, and UI that elevate it beyond a repackaged website. If your app is not particularly useful, unique, or app-like, it doesn\'t belong on the App Store." And 4.2.2: "Other than catalogs, apps shouldn\'t primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links."',
          'Google Play has its own version, rejecting apps "that only have limited functionality and content", naming "apps that are static without app-specific functionalities, for example, text only or PDF file apps".',
          'The answer is not a better wrapper. It is to identify what the app does that the website cannot: offline access, notifications, camera, location, a genuinely different interaction. If there is no such thing, a good mobile website is the honest product and it costs less.',
        ],
      },
      {
        kind: 'table',
        heading: 'The two stores, side by side',
        intro:
          'Read from Apple and Google\'s own current documentation on 11 September 2026. Where a vendor publishes no figure, this says so rather than estimating.',
        columns: ['', 'Apple App Store', 'Google Play'],
        rows: [
          ['Account cost', '$99 per membership year', '$25 one-time'],
          ['Published review time', '90% of submissions in under 24 hours', 'No median published; up to 7 days or longer for some accounts'],
          ['Testing gate before first release', 'None', '12 testers, 14 continuous days, personal accounts created after 13 Nov 2023'],
          ['Account deletion requirement', 'In-app, if the app supports account creation', 'In-app AND on an external web resource'],
          ['Privacy policy', 'Required, with a working link', 'Required even for apps collecting no data'],
          ['Published rejection rate', 'None', 'None'],
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The Google Play gate that costs two weeks',
        body:
          'Google requires that "developers with personal accounts created after November 13, 2023, must run a closed test for their app with a minimum of 12 testers who have been opted in continuously for at least 14 days". The continuity is strict: testers who opt out early do not count, and if someone opts back in, the 14 days must be consecutive. Production stays disabled until it is met. Note the count is now 12, reduced from 20, so most published guidance is out of date. Google states the requirement for personal accounts, so registering as an organisation appears to be the way around it, though Google does not state that converse explicitly.',
      },
      {
        kind: 'prose',
        heading: 'Two requirements that are easy to build wrong',
        body: [
          'Account deletion is the one that catches teams who build for Apple first. Apple requires that "if your app supports account creation, you must also offer account deletion within the app". Google goes further and requires the deletion path to exist both in-app and on a web resource, and states that "account freezing is not a valid substitute".',
          'Build Apple\'s version only and you will pass Apple and fail Play. It is cheaper to build the stricter requirement once.',
          'The second is public identity, and it matters more for individual developers than most realise. Apple\'s EU trader requirements state that "even if you don\'t distribute apps in the EU, you\'ll still need to declare a trader status", and an individual must publish an address, phone number and email on the product page. Google similarly displays verified developer information. If you are an individual developer, your home address can end up publicly listed. An organisation account with a D-U-N-S number avoids that, which is our reading of the rules rather than something either store spells out.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What happens when you are rejected',
        body: [
          'Less than the anxiety suggests, usually. Most rejections name a specific guideline and a specific problem, you fix it and resubmit, and the second review is typically fast because Apple reviews 90 percent of submissions in under 24 hours.',
          'Apple also grants a useful concession on bug-fix updates: "If you\'re submitting a bug fix update for your app and we find additional issues during review, you have the option to resolve the additional issues with your next submission, as long as there are no legal or safety concerns." So a bug fix does not get held hostage to an unrelated finding.',
          'If you believe the rejection is wrong, there is an appeal to the App Review Board, for cases where "we misunderstood your app\'s concept and functionality, or that you were treated unfairly". Apple asks for specific reasons and permits "only one appeal per submission". Expedited review exists for genuine emergencies, with a warning that abusing it affects future requests.',
          'What nobody publishes is how long any of that takes. Apple gives no appeal or expedite turnaround, and Google gives no median review time at all. Anyone quoting you a number for a rejection-to-relaunch cycle is quoting experience, not policy, and should say so.',
        ],
      },
      {
        kind: 'steps',
        heading: 'The hour before you submit',
        intro:
          'Ordered by how often each one is what went wrong, based on what Apple itself names as the common issues.',
        steps: [
          {
            title: 'Open every link in the app',
            body:
              'Support, privacy policy, terms, any external link. A dead link is a named rejection reason and it is the most embarrassing one to be caught by, because it takes two minutes to check.',
          },
          {
            title: 'Search the build for placeholder content',
            body:
              'Lorem ipsum, test entries, a screen still showing dummy data. Apple names placeholder content explicitly under the guideline it says accounts for most unresolved issues.',
          },
          {
            title: 'Test the account deletion path on both stores\' terms',
            body:
              'In-app for Apple, in-app plus a web route for Google. Confirm it deletes rather than disables, since Google states freezing is not a substitute.',
          },
          {
            title: 'Check the demo account works',
            body:
              'If anything sits behind a login, the reviewer needs working credentials. An expired or wrong demo account reads to a reviewer as an app that does not function.',
          },
          {
            title: 'Confirm whose account this is shipping from',
            body:
              'Yours, with the agency invited in. Not the agency\'s, both because of guideline 4.2.6 and because the listing and its reviews should belong to you.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'How long does App Store review take?',
        answer:
          'Apple publishes one figure: "on average, 90% of submissions are reviewed in less than 24 hours". That is a distribution point rather than a median, and Apple publishes no figure for how long a rejection, fix and resubmission cycle takes in total.',
      },
      {
        question: 'Why does Google Play take longer than the App Store?',
        answer:
          'Usually the testing gate rather than the review. A personal developer account created after 13 November 2023 must run a closed test with 12 testers opted in continuously for 14 days before production is unlocked. Google also states some accounts face reviews "of up to seven days or longer".',
      },
      {
        question: 'Can my agency publish the app under its own developer account?',
        answer:
          'It should not. Apple\'s guideline 4.2.6 says services creating apps from templates "should not submit apps on behalf of their clients". Ship from your own account with the agency added to it. You also keep the listing, the reviews and the store relationship, which is where they belong.',
      },
      {
        question: 'Will Apple reject an app that is just my website?',
        answer:
          'Very likely. Guideline 4.2 requires features that "elevate it beyond a repackaged website", and 4.2.2 excludes apps that are primarily web clippings or collections of links. Google Play has an equivalent rule on limited functionality. If the app does nothing the website cannot, a good mobile site is the better product.',
      },
      {
        question: 'What does it cost to publish on both stores?',
        answer:
          'Apple charges 99 US dollars per membership year, so it recurs. Google charges a 25 US dollar one-time registration fee and notes that prepaid cards are not accepted, which is a real obstacle for some Pakistani developers.',
      },
    ],

    publishedAt: '2026-10-06T03:00:00Z',

    sources: [
      {
        label: 'Apple App Store Review Guidelines',
        url: 'https://developer.apple.com/app-store/review/guidelines/',
        readOn: '2026-09-11',
        supports: 'Guidelines 4.2, 4.2.2, 4.2.6 and 5.1.1. Page states Last Updated 8 June 2026.',
      },
      {
        label: 'Apple App Review',
        url: 'https://developer.apple.com/distribute/app-review/',
        readOn: '2026-09-11',
        supports: 'The 40 percent guideline 2.1 figure, the 24-hour review figure, appeals and the bug-fix concession.',
      },
      {
        label: 'Google Play, closed testing requirements',
        url: 'https://support.google.com/googleplay/android-developer/answer/14151465',
        readOn: '2026-09-11',
        supports: 'The 12-tester, 14-continuous-day requirement for personal accounts.',
      },
      {
        label: 'Google Play, User Data policy',
        url: 'https://support.google.com/googleplay/android-developer/answer/10144311',
        readOn: '2026-09-11',
        supports: 'The in-app and web account deletion requirement, and that freezing is not a substitute.',
      },
      {
        label: 'Apple Developer Program enrolment',
        url: 'https://developer.apple.com/programs/enroll/',
        readOn: '2026-09-11',
        supports: 'The 99 US dollar annual membership fee.',
      },
      {
        label: 'Google Play, developer registration fee',
        url: 'https://support.google.com/googleplay/android-developer/answer/6112435',
        readOn: '2026-09-11',
        supports: 'The 25 US dollar one-time fee and that prepaid cards are not accepted.',
      },
    ],

    limits: [
      'Neither Apple nor Google publishes a rejection rate, a median review time for Play, or an appeal turnaround. Where this post gives no number, it is because the vendor gives none.',
      'Apple\'s guidelines carry a last-updated date and are cited with it. Google does not display last-updated dates on its policy pages, so Play policies cannot be version-pinned the same way.',
      'Two readings are ours rather than the vendors\': that an agency submitting client apps is exposed under 4.2.6, and that an organisation account avoids the personal-account testing gate and the public home address. Both follow from the quoted rules, but neither store states the converse explicitly.',
      'Neither store publishes rules specific to Pakistan-based developers. The geography rules here are the EU trader regime and general verification requirements.',
    ],

    related: ['us-llc-filings-pakistani-founders-miss'],

    cta: {
      heading: 'Shipping an app and want the gates handled?',
      body: 'We build for both stores and deal with these queues routinely, including the parts that are administrative rather than technical. If you are planning a launch date, the testing gate is the thing to know about now rather than in two weeks.',
      buttonLabel: 'Talk about your app',
      href: '/contact?service=app-development',
    },

    seo: {
      title: 'What Actually Gets Your App Rejected',
      description:
        'Apple says 40 percent of unresolved issues are app completeness, not policy. The rules that block finished apps, and the 14-day gate that delays Google Play launches.',
    },
  },
];
