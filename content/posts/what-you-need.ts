import type { Post } from './types';

/**
 * Category 4 of research/CATALOGUE.md: do I actually need this?
 *
 * The smallest demand cluster in the catalogue and the purest intent. Every
 * published answer is written by somebody selling the thing, which is what
 * makes an honest answer worth something: sometimes it is no.
 *
 * The capability claims here are the most perishable content on the site, so
 * they were re-verified against MDN browser-compat-data and the WebKit release
 * notes the day before writing, and the limits section says so.
 */
export const WHAT_YOU_NEED_POSTS: Post[] = [
  {
    slug: 'do-you-need-an-app-or-a-website',
    cluster: 'what-you-need',
    title: 'Do You Need an App, or Is Your Website Enough?',
    navLabel: 'App or website',
    card: 'The decision reduces to two questions with checkable answers, and most businesses answer no to both.',

    answer:
      'There are exactly two things a native app can do that a web app cannot: reach hardware over Bluetooth, NFC, USB or serial, and keep running while closed. If your idea needs neither, no documented platform capability requires you to build a native app. What remains are real but different arguments about distribution, notifications and what people expect, and those are worth weighing honestly rather than dressing up as technical necessity.',

    sections: [
      {
        kind: 'prose',
        heading: 'The question is usually answered by whoever is selling',
        body: [
          'Ask an app developer whether you need an app and you will get a yes. Ask a web agency and you will get a no. We build both, which does not make us neutral, so this post cites the platform documentation rather than our judgement wherever it can.',
          'The useful news is that the decision has a factual core. Platform capability is documented, it is checkable, and almost everything published about it is out of date.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The test, in two questions',
        body:
          'Does it need to talk to hardware over Bluetooth, NFC, USB or a serial port? Does it need to keep running while the app is closed, doing work in the background? If both answers are no, there is no documented capability on iOS or Android that forces you into a native app. That is a narrower list than most people expect, and it is where the genuine gaps actually sit.',
      },
      {
        kind: 'table',
        heading: 'What the web cannot do on iOS',
        intro:
          'Read from MDN browser-compat-data on 12 September 2026, against Safari iOS 26.6. The pattern is worth noticing: the gaps cluster in two areas rather than being scattered.',
        columns: ['Capability', 'iOS Safari', 'Chrome on Android'],
        rows: [
          ['Web Bluetooth', 'Not supported', 'Supported'],
          ['Web NFC', 'Not supported', 'Supported'],
          ['WebUSB', 'Not supported', 'Supported'],
          ['Background Sync', 'Not supported', 'Supported'],
          ['Periodic Background Sync', 'Not supported', 'Supported'],
          ['Background Fetch', 'Not supported', 'Supported'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'Note what is NOT on that list, because these are the things people assume are missing.',
          'Camera and microphone work. Geolocation works. Service workers work, so a site can run offline. Push notifications work. Payment Request works, and so does Apple Pay on the web. Passkeys and WebAuthn work. Local storage and IndexedDB work.',
          'The asymmetry is also worth sitting with: Chrome on Android ships every capability in that table. So "the web cannot do it" usually means "Apple has not implemented it", and in the case of Web Bluetooth Apple has formally registered a position of opposition rather than a backlog item.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Push notifications work, with three conditions',
        body: [
          'This is the single most common out-of-date belief in this area. iOS has supported web push since 16.4, released February 2023. Notifications are delivered by Apple\'s own push service to the Lock Screen and to Apple Watch, whether or not the web app is open, and it requires no Developer Program membership.',
          'Three conditions attach, and they matter. The web app must have been added to the Home Screen: push does not work in a Safari tab. The permission prompt must follow a direct user tap rather than firing on page load. And every push must display a visible notification, because silent pushes are not allowed, which rules out using push as a background sync mechanism.',
          'So if your requirement is notifications, the web can do it. If your requirement is silent background updating, it cannot.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The real gap is installation, not capability',
        body:
          'On iOS there is no install prompt of any kind. A user installs a web app by tapping Share and then Add to Home Screen, and you cannot trigger that flow, cannot detect whether it happened, and cannot measure your own install rate: the relevant APIs are all unsupported on iOS while present on Chrome for Android. That is the honest disadvantage. Not that the web app is less capable once installed, but that getting it installed depends on a user discovering a menu item in a share sheet.',
      },
      {
        kind: 'prose',
        heading: 'What a native app genuinely gets you',
        body: [
          'The short list, from Apple\'s own developer documentation: Live Activities, which is the one that decides it for delivery tracking and bookings and has no web equivalent at all. Background location. Home screen widgets. Then HealthKit, CallKit, App Clips and Siri integration.',
          'Also store presence, which is a distribution argument rather than a technical one, and worth separating out. Being findable in the App Store is real value for some businesses and irrelevant for others, and it is not the same claim as needing native capability.',
          'A caveat from Apple\'s own documentation against overclaiming the background case: background push delivery is not guaranteed and is throttled, with advice not to send more than two or three an hour. Native background execution is more capable than the web\'s, and it is not unlimited.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Two commercial claims that are usually wrong',
        body: [
          'The first is that Apple takes 30%. Its Small Business Program charges 15% on proceeds up to one million dollars, which covers most businesses reading this. Regional terms vary, and the EU terms change on 1 October 2026 with the Core Technology Fee, Initial Acquisition Fee and Store Services Fee all being eliminated. If you are reading this after that date, re-check, because our figures predate it.',
          'The second is that you need an app to accept Apple Pay. You do not: Apple documents two JavaScript APIs for accepting Apple Pay on a website, and has since iOS 10. This one is widely repeated and easy to check.',
          'The real commercial difference is not the commission, it is the gate. Every update to a native app passes through review, and the outcome can be rejection rather than merely delay. Apple states that on average 90% of submissions are reviewed in under 24 hours, so this is not usually about speed. It is about not controlling your own release.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'Apple\'s own position on this',
        body:
          'From the preamble to the App Store Review Guidelines: "For everything else there is always the open Internet. If the App Store model and guidelines... are not best for your app or business idea that\'s okay, we provide Safari for a great web experience too." Read alongside guideline 4.2, which requires an app to "elevate it beyond a repackaged website", and 4.2.6, which rejects apps built from commercialised templates on a client\'s behalf. Apple is telling you not to ship a wrapper, on its own authority.',
      },
      {
        kind: 'steps',
        heading: 'Working through the decision',
        intro:
          'In this order, because the first two steps resolve most cases and cost nothing.',
        steps: [
          {
            title: 'Answer the two capability questions',
            body:
              'Hardware over Bluetooth, NFC, USB or serial? Background execution while closed? If both are no, native is a choice rather than a requirement, and everything below is about what kind of choice.',
          },
          {
            title: 'Separate distribution from capability',
            body:
              'Wanting to be in the App Store is a marketing argument. It may be a good one. It is not a technical reason, and conflating the two is how projects get approved on false premises.',
          },
          {
            title: 'Check whether people would install it',
            body:
              'On iOS you cannot prompt for installation, and an app people install once and never open is worse than a good website. Ask honestly how often a customer would use this, because that is what decides whether either route is worth it.',
          },
          {
            title: 'Price the full lifetime, not the build',
            body:
              'Two codebases or one, developer accounts, review cycles on every update, and the ongoing work of keeping up with OS releases. The build is the smaller number.',
          },
          {
            title: 'Consider shipping the web version first',
            body:
              'It is testable immediately, requires no review, and tells you whether anyone wants it. If usage justifies native later you will know exactly what to build, which is a considerably better position than guessing now.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we tell clients who ask for an app',
        body: [
          'We build both web applications and native apps, so this is a choice between two things we sell rather than a pitch for one.',
          'The request that arrives most often is a website turned into an app, and that is the one we push back on hardest, because Apple rejects it under guideline 4.2 and because the client usually wants something the wrapper will not deliver: presence on the home screen, notifications, a sense of permanence. An installed web app provides all three on both platforms.',
          'The projects where we say build native without hesitation are the ones that fail the two questions: anything talking to a physical device, anything needing genuine background work, and anything where Live Activities are the product rather than a decoration.',
          'For everything in between we usually suggest the web version first, and we say plainly that this is the cheaper piece of work for us to do. It is also the one that tells you whether the expensive version is worth building.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Do I need a mobile app for my business?',
        answer:
          'Only if it needs to reach hardware over Bluetooth, NFC, USB or serial, or to keep running while closed. If neither applies, no documented platform capability requires native. Distribution and discoverability are separate arguments, and they are marketing rather than technical ones.',
      },
      {
        question: 'Can a website send push notifications on iPhone?',
        answer:
          'Yes, since iOS 16.4 in February 2023, delivered to the Lock Screen and Apple Watch whether or not the app is open. Three conditions: it must be added to the Home Screen, the permission request must follow a user tap, and every push must show a visible notification.',
      },
      {
        question: 'What can a native app do that a website cannot?',
        answer:
          'Talk to hardware over Bluetooth, NFC, USB and serial; run in the background while closed; and use Live Activities, widgets, background location, HealthKit, CallKit, App Clips and Siri. Camera, microphone, location, offline, payments and passkeys all work on the web.',
      },
      {
        question: 'Does Apple really take 30%?',
        answer:
          'Not for most small businesses. The Small Business Program charges 15% on proceeds up to one million dollars. Regional terms differ, and EU terms change on 1 October 2026, so verify against Apple\'s current published terms rather than any article including this one.',
      },
      {
        question: 'Can I take Apple Pay without an app?',
        answer:
          'Yes. Apple documents two JavaScript APIs for accepting Apple Pay on a website, available since iOS 10. The belief that Apple Pay requires a native app is one of the most commonly repeated errors in this area.',
      },
    ],

    publishedAt: '2026-10-26T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'MDN browser-compat-data, iOS Safari versus Chrome Android',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API',
        readOn: '2026-09-12',
        supports: 'The capability table, and that install-prompt APIs are unsupported on iOS. Checked against browser-compat-data v8.1.1 tracking Safari iOS 26.6.',
      },
      {
        label: 'WebKit, Web Push for Web Apps on iOS and iPadOS',
        url: 'https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/',
        readOn: '2026-09-12',
        supports: 'That web push has worked since iOS 16.4, the Home Screen requirement, the permission-on-tap rule and the visible-notification requirement.',
      },
      {
        label: 'Apple, App Store Small Business Program',
        url: 'https://developer.apple.com/app-store/small-business-program/',
        readOn: '2026-09-12',
        supports: 'The 15% commission rate on proceeds up to one million dollars.',
      },
      {
        label: 'Apple, Apple Pay on the Web',
        url: 'https://developer.apple.com/apple-pay/',
        readOn: '2026-09-12',
        supports: 'That Safari supports two JavaScript APIs for accepting Apple Pay on a website.',
      },
      {
        label: 'Apple, App Store Review Guidelines',
        url: 'https://developer.apple.com/app-store/review/guidelines/',
        readOn: '2026-09-12',
        supports: 'The preamble on the open internet, guideline 4.2 on repackaged websites and 4.2.6 on template-built apps.',
      },
    ],

    limits: [
      'Platform capability is the most perishable material on this site. Everything here was re-checked on 12 September 2026 against Safari iOS 26.6, and a point release can change it.',
      'Apple\'s EU commission terms change on 1 October 2026, after this was written. If you are reading it on or after that date, treat the commercial section as out of date and check Apple\'s current terms.',
      'This covers capability and commercial structure. It does not cover which is cheaper to build for your specific case, which depends on what you are building.',
      'We build both web applications and native apps, so we sell whichever answer you arrive at. The platform documentation is public and every claim here is checkable against it.',
    ],

    cta: {
      heading: 'Trying to decide between the two?',
      body: 'The two capability questions usually settle it in one conversation, and where they do not, shipping the web version first tells you whether the expensive version is worth building. That is the cheaper piece of work for us, and the one that answers the question.',
      buttonLabel: 'Talk it through',
      href: '/contact?service=app-development',
    },

    related: ['ios-pwa-what-changed', 'agent-chatbot-or-a-form'],

    seo: {
      title: 'Do You Need an App, or Is Your Website Enough?',
      description:
        'Two capability questions decide it: hardware over Bluetooth or NFC, and background execution. Most businesses answer no to both. What the platforms actually document.',
    },
  },

  {
    slug: 'ios-pwa-what-changed',
    cluster: 'what-you-need',
    title: 'Everything You Have Read About iOS Web Apps Is Probably Out of Date',
    navLabel: 'iOS web apps, current',
    card: 'Push has worked since 2023. Storage eviction has an exemption. The gaps are narrower and more specific than the articles say.',

    answer:
      'Three claims dominate writing about web apps on iOS and all three are wrong or incomplete. Push notifications have worked since iOS 16.4 in February 2023. The seven-day storage eviction rule has an exemption for installed web apps. And the real gaps are a short, specific list rather than a general incapability: hardware access over Bluetooth, NFC, USB and serial, plus background execution. Checked against Safari iOS 26.6 on 12 September 2026.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why this is worth a post of its own',
        body: [
          'Almost every article comparing web apps to native apps on iOS was written before February 2023, or copied from one that was. The result is a body of received wisdom that was accurate once and has been repeated ever since.',
          'That matters because the decision it informs is expensive. Teams build native apps they did not need, on the basis of limitations that were removed three years ago.',
        ],
      },
      {
        kind: 'table',
        heading: 'The three claims, and what is actually true',
        intro:
          'Checked against MDN browser-compat-data and the WebKit release notes on 12 September 2026.',
        columns: ['The claim', 'The current position'],
        rows: [
          ['iOS does not support web push', 'It has since 16.4, February 2023, for Home Screen web apps'],
          ['Safari deletes your data after seven days', 'True for tabs; installed web apps are exempt'],
          ['Web apps cannot do much on iOS', 'Camera, location, offline, payments and passkeys all work'],
          ['You just need a wrapper', 'Apple rejects those under guideline 4.2'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Push, and the conditions that come with it',
        body: [
          'WebKit shipped web push in iOS and iPadOS 16.4. Notifications are delivered through Apple\'s own push service to the Lock Screen and to Apple Watch, whether or not the app is open, and no Developer Program membership is required.',
          'The conditions are specific and worth knowing before you plan around them. The web app must be added to the Home Screen, so push does not work from a Safari tab. The permission request must follow a direct user interaction rather than firing on load. And every push must result in a visible notification, because silent push is not permitted.',
          'That last one is the real constraint, and it is usually stated as though it were a bug. It means web push cannot be used as a background sync mechanism: you cannot wake the app quietly to refresh data. If notifications are what you want, it works. If invisible background updating is what you want, it does not.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Storage eviction, and the exemption nobody mentions',
        body: [
          'The seven-day rule is real: Safari evicts script-writable storage after seven days of Safari use without interaction with the site. It is a genuine problem for a site in a tab that a user visits occasionally.',
          'What is almost never mentioned is that WebKit documented an exemption for installed web apps. A web app on the Home Screen keeps its own counter of days of use and is not expected to have its data evicted in the same way.',
          'So the correct version of this warning is conditional rather than absolute. Do not store anything you cannot lose in a site running in a tab. An installed web app is a different case, and that distinction is the difference between an unusable offline experience and a workable one.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'A useful lesson from one bug',
        body:
          'Screen Wake Lock is supported on iOS, and from 16.4 to 18.3 it did not work in installed Home Screen web apps specifically. It was fixed in 18.4. That is the only such fix we found in the compatibility record, and it teaches something general: "supported on iOS" and "works in an installed iOS web app" are different questions, and the compatibility tables answer the first. If a capability is load-bearing for you, test it in the installed context rather than in a tab.',
      },
      {
        kind: 'prose',
        heading: 'What actually changed in the last twelve months',
        body: [
          'We checked every Safari release from 26.0 through 26.6 and the Safari 27 beta notes, looking specifically for anything that closes one of the known gaps.',
          'Nothing does. The Web Apps sections of those releases contain bug fixes only: a fix for the Add to Home Screen flow failing to load page data, and a fix for audio failing to play when reopening an installed web app. The year\'s substantial additions were rendering and language features rather than capability.',
          'So no release in the past year shipped Bluetooth, NFC, USB, background sync or an install prompt. The stability is itself the finding, and it is the reason a post like this has a shelf life at all. It also means it expires when Safari 27 ships.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The gap that has not moved, and will not soon',
        body: [
          'Installation remains the honest weakness, and it is worse than a missing prompt.',
          'On iOS there is no programmatic install prompt. There is also no way to detect that installation happened, and no way to check whether a related app is installed. The relevant APIs are recorded in the compatibility data as unsupported, while all of them are present on Chrome for Android.',
          'The practical consequence is not only that you cannot ask. It is that you cannot measure. You cannot report an install conversion rate for iOS, because the platform does not tell you. Any figure you have seen for iOS web app install rates was inferred rather than counted.',
          'Apple has also registered a formal position of opposition to Web Bluetooth rather than treating it as unimplemented, which is a signal about direction rather than backlog. Web NFC, by contrast, has no registered position at all, so it is fair to describe it as unimplemented and unfair to describe it as refused.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Checking this yourself, because it will change',
        intro:
          'This post has a shelf life measured in Safari releases. Here is how to verify it rather than trusting it.',
        steps: [
          {
            title: 'Check MDN browser-compat-data for the exact API',
            body:
              'Look up the specific dotted path rather than the feature name, and read the top-level entry rather than a nested sub-feature. Nested entries are how people conclude the camera does not work on iOS when it has since version 11.',
          },
          {
            title: 'Read the WebKit release notes, not summaries of them',
            body:
              'They are published per release and have a Web Apps section. Summaries lag by months and tend to repeat each other.',
          },
          {
            title: 'Test in the installed context specifically',
            body:
              'Add it to the Home Screen and test there. The Wake Lock case shows that a capability can be supported on iOS and broken in an installed web app at the same time.',
          },
          {
            title: 'Re-check before you make the decision, not after',
            body:
              'Anything you read about this, including this post, should be verified against the current release before it informs a build decision. Ours says the date it was checked for exactly this reason.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'Why we keep checking this',
        body: [
          'We build both web applications and native apps, so we have no stake in which answer a client arrives at, and a direct stake in the answer being right.',
          'The cost of getting it wrong is asymmetric and lands on the client. A business that builds native because it read that iOS web apps cannot send notifications has paid for two codebases, two review processes and an install funnel it did not need. Nobody discovers that mistake, because the app works.',
          'So we re-check the compatibility data before advising on it rather than relying on what we knew last year, and when a client brings us an article making one of the claims above, we look it up together. It is a short conversation and it occasionally changes what gets built.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Can iOS web apps send push notifications?',
        answer:
          'Yes, since iOS 16.4 in February 2023, delivered to the Lock Screen and Apple Watch whether or not the app is open. The app must be added to the Home Screen, the permission prompt must follow a user tap, and every push must show a visible notification.',
      },
      {
        question: 'Does Safari delete my web app data after seven days?',
        answer:
          'For a site in a tab, yes, after seven days of Safari use without interaction. WebKit documented an exemption for installed Home Screen web apps, which keep their own counter and are not expected to have data evicted the same way.',
      },
      {
        question: 'What can iOS web apps still not do?',
        answer:
          'Reach hardware over Bluetooth, NFC, USB or serial, and run in the background while closed, which covers Background Sync, Periodic Sync and Background Fetch. Camera, microphone, geolocation, offline, payments and passkeys all work.',
      },
      {
        question: 'Why can I not prompt users to install my web app on iOS?',
        answer:
          'Because the install-prompt APIs are unsupported on iOS while present on Chrome for Android. You cannot trigger installation, detect that it happened, or measure your install rate. Any published iOS web app install rate was inferred rather than counted.',
      },
      {
        question: 'Has anything changed recently?',
        answer:
          'Not in capability. Every Safari release from 26.0 to 26.6 contained only bug fixes in the Web Apps sections, and no release in the past year shipped Bluetooth, NFC, background sync or an install prompt. Checked on 12 September 2026, and it expires when Safari 27 ships.',
      },
    ],

    publishedAt: '2026-10-27T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'MDN browser-compat-data',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API',
        readOn: '2026-09-12',
        supports: 'The capability positions, the unsupported install-prompt APIs and the Wake Lock history. Version 8.1.1, tracking Safari iOS 26.6.',
      },
      {
        label: 'WebKit, Web Push for Web Apps on iOS and iPadOS',
        url: 'https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/',
        readOn: '2026-09-12',
        supports: 'That push shipped in 16.4, the Home Screen and user-gesture conditions, and that silent pushes are not allowed.',
      },
      {
        label: 'WebKit, storage policy for installed web apps',
        url: 'https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/',
        readOn: '2026-09-12',
        supports: 'The seven-day eviction rule and the exemption for web apps added to the Home Screen.',
      },
      {
        label: 'WebKit release notes, Safari 26.0 to 26.6',
        url: 'https://webkit.org/blog/',
        readOn: '2026-09-12',
        supports: 'That the Web Apps sections in the last twelve months contain bug fixes only and no new capability.',
      },
    ],

    limits: [
      'This is the most perishable post on the site. It reflects Safari iOS 26.6 as of 12 September 2026 and a point release can invalidate any line in it.',
      'Compatibility data records what is implemented, not what works reliably in every context. The Wake Lock case shows a capability can be supported and broken in installed web apps simultaneously.',
      'Android is mentioned only as a contrast. This is about iOS, which is where the gaps and the stale advice both concentrate.',
      'We build both web and native applications, so we sell either outcome. Everything here is checkable against public platform documentation.',
    ],

    cta: {
      heading: 'Working from an article that might be out of date?',
      body: 'If a capability decides your build, it is worth ten minutes looking it up together against the current release rather than against an article from 2022. It occasionally changes what gets built, and it costs nothing to check.',
      buttonLabel: 'Check it with us',
      href: '/contact?service=web-development',
    },

    related: ['do-you-need-an-app-or-a-website'],

    seo: {
      title: 'Everything About iOS Web Apps Is Probably Out of Date',
      description:
        'Push has worked since 2023, storage eviction exempts installed apps, and the real gaps are a short list. Checked against Safari iOS 26.6 in September 2026.',
    },
  },

  {
    slug: 'agent-chatbot-or-a-form',
    cluster: 'what-you-need',
    title: 'Agent, Chatbot, or a Form? A Decision Tree That Can End in a Form',
    navLabel: 'Agent, chatbot or form',
    card: 'The three-way comparison nobody writes, because every two-way version is written by somebody selling agents.',

    answer:
      'A form collects structured input and is right whenever you know what you need. A chatbot answers questions from a body of knowledge and is right when people do not know what to ask for. An agent takes actions across systems and is right only when the task genuinely needs decisions made between steps. Most requests for an agent describe work a form would do faster, more reliably, and at no running cost.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why this comparison is hard to find',
        body: [
          'The comparison that gets published is agent versus chatbot, and it is nearly always written by somebody selling agents. The conclusion is reliably that you need an agent.',
          'The three-way version is more useful and almost nobody writes it, because one of the three options is free and involves hiring nobody.',
          'We sell all three, which does not make us impartial. It does mean we are not obliged to reach a particular answer, and the honest answer is that the simplest of the three wins more often than the market implies.',
        ],
      },
      {
        kind: 'table',
        heading: 'What each one actually is',
        intro:
          'Stripped of positioning. The third column is the one that decides most cases.',
        columns: ['', 'What it does', 'Right when'],
        rows: [
          ['Form', 'Collects structured input, triggers a defined process', 'You know what you need from the user'],
          ['Chatbot', 'Answers questions from a body of knowledge', 'People do not know what to ask for'],
          ['Agent', 'Takes actions across systems, deciding between steps', 'The path genuinely varies by case'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The case for a form, which nobody makes',
        body: [
          'A form is deterministic. It cannot hallucinate, it has no running cost per submission, it works offline, it is accessible by default, it can be validated, and anybody in the business can change it without a deployment.',
          'It also produces structured data at the point of capture rather than requiring extraction afterwards, which is usually where the effort actually goes.',
          'The standard objection is that forms feel dated and conversational interfaces feel modern. That is a real consideration about how a product is perceived, and it is worth weighing as that rather than as a functional argument. A form that takes thirty seconds is a better experience than a conversation that takes three minutes to establish the same four fields.',
          'The test that settles it: if you can list the information you need in advance, you need a form. The conversation is decoration over a known schema.',
        ],
      },
      {
        kind: 'prose',
        heading: 'When a chatbot earns its place',
        body: [
          'The genuine case is when the user does not know what they need, or does not know the vocabulary to ask for it.',
          'Someone searching your documentation for a term you do not use. A customer describing a symptom rather than naming the product. Somebody who needs one paragraph out of a forty-page policy and cannot be expected to know which page.',
          'That is a retrieval problem, and a chatbot over a real corpus is a good answer to it. What makes it work is the corpus rather than the model: if the answer is not in your documents, the system has nothing to find, and no amount of conversational polish substitutes.',
          'What it is not is a replacement for navigation. If people are asking your bot where the pricing page is, the fix is the pricing page.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The test for whether you need an agent',
        body:
          'An agent is warranted when the sequence of steps cannot be determined in advance, because it depends on what earlier steps returned. If you can draw the flowchart, you do not need an agent, you need that flowchart implemented, which will be faster, cheaper, testable and will not surprise you. The honest question is whether the branching is genuinely open-ended or merely complicated. Complicated has a flowchart. Open-ended does not.',
      },
      {
        kind: 'prose',
        heading: 'What the agent costs that the others do not',
        body: [
          'This is the part usually left out of the comparison, and it is not mainly the token bill.',
          'An agent needs an evaluation set, because there is no other way to know whether it still works after a model version changes. It needs monitoring that watches for silent failure, because its characteristic failure mode produces no error. It needs idempotency on anything with a side effect, because retries will duplicate actions. It needs permission scoping, because anything it reads can instruct it.',
          'None of that is required for a form. Most of it is not required for a chatbot that only reads. The gap between the three is not capability, it is the operational surface you take on, and that surface persists for as long as the system runs.',
          'A form you built three years ago still works. An agent you built three years ago is running against models that have been deprecated twice.',
        ],
      },
      {
        kind: 'steps',
        heading: 'The decision, in order',
        intro:
          'Work down. Stop at the first yes, because everything below is more expensive and more work to keep alive.',
        steps: [
          {
            title: 'Can you list what you need in advance?',
            body:
              'If yes, build a form. This is most cases and it is the answer people skip past. Structured input, no running cost, no failure mode more exotic than a validation error.',
          },
          {
            title: 'Do people need to find things they cannot name?',
            body:
              'If yes, and you have a real corpus of documents, a chatbot over retrieval is the right tool. The work is in the corpus rather than the conversation.',
          },
          {
            title: 'Can you draw the flowchart for the actions?',
            body:
              'If yes, implement the flowchart. Deterministic automation is cheaper to build, cheaper to run, testable, and does not need an evaluation set to tell you it still works.',
          },
          {
            title: 'Does the path genuinely depend on what earlier steps return?',
            body:
              'If yes, and only then, you have an agent-shaped problem. Scope the operational surface honestly at this point: evaluation, monitoring, idempotency and permissions are part of the build rather than optional extras.',
          },
          {
            title: 'Consider building the simpler one first anyway',
            body:
              'A form or a scripted flow that covers the common cases, with an escalation path for the rest, frequently covers enough to be worth shipping while you learn what the hard cases actually look like.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'The combination that usually wins',
        body: [
          'The best answer is rarely one of the three. It is a form for the structured part, a retrieval system for the questions, and deterministic automation for the actions, with an agent only where the branching is genuinely open.',
          'That is less satisfying than a single technology and it is what the components are actually good at. It also degrades well: if the agent part is unavailable, the form still works and the documents are still searchable, whereas an all-agent system fails all the way down.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What we actually recommend, and how often',
        body: [
          'We build all three: forms and workflow automation, chatbots over retrieval, and agentic systems. So the following is against our own interest in the narrow sense and not in the broader one.',
          'The most common conversation we have is somebody arriving wanting an agent and leaving with a form and a scripted workflow. Not because the agent could not do it, but because the task turned out to have a flowchart, and a flowchart implemented directly is faster, cheaper, and does not need an evaluation set to prove it still works in March.',
          'The second most common is somebody wanting a chatbot who needs better documentation. If the corpus is thin, a retrieval system over it will be thin, and building one is an expensive way to discover that.',
          'Where we do build agents, it is usually narrower than the original request: agentic behaviour for the part that genuinely branches, deterministic automation either side of it. That is more work to design and less work to operate, which is the right trade for something that has to keep running.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What is the difference between an AI agent and a chatbot?',
        answer:
          'A chatbot answers questions from a body of knowledge. An agent takes actions across systems and decides what to do next based on what earlier steps returned. The difference is doing rather than saying, and it is what brings the operational requirements: evaluation, monitoring, idempotency and permissions.',
      },
      {
        question: 'When should I use a form instead of AI?',
        answer:
          'Whenever you can list in advance what you need from the user. A form is deterministic, free to run, accessible by default, editable without a deployment, and produces structured data at capture. If the conversation is establishing four known fields, it is decoration over a schema.',
      },
      {
        question: 'How do I know if I need an agent?',
        answer:
          'Try to draw the flowchart. If you can, implement the flowchart: it will be faster, cheaper and testable. An agent is warranted when the sequence genuinely cannot be determined in advance because it depends on what earlier steps returned.',
      },
      {
        question: 'What does an agent cost beyond the token bill?',
        answer:
          'An evaluation set, monitoring designed for failures that produce no error, idempotency on every side-effecting tool, and permission scoping. None of that is needed for a form and most is not needed for a read-only chatbot. That operational surface persists for the life of the system.',
      },
      {
        question: 'Can I combine them?',
        answer:
          'That is usually the best answer: a form for the structured part, retrieval for the questions, deterministic automation for the actions, and agentic behaviour only where the branching is genuinely open. It also degrades better, because the parts fail independently.',
      },
    ],

    publishedAt: '2026-10-28T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Anthropic, Building effective agents',
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
        readOn: '2026-09-12',
        supports: 'The recommendation to find the simplest solution possible and increase complexity only when needed, including not building agentic systems at all.',
      },
      {
        label: 'Ragas documentation, agentic and tool use metrics',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/',
        readOn: '2026-09-12',
        supports: 'That evaluating an agent requires defining expected tool calls, reference outcomes or permitted topics, which is the operational surface a form does not carry.',
      },
    ],

    limits: [
      'This is a framework for choosing, not a cost comparison. What each option costs to build depends entirely on your case.',
      'The claim that most agent requests are really form requests is our experience rather than a measured finding, and it is stated as such.',
      'It does not cover voice interfaces or the case where conversational interaction is itself the product rather than a route to something else.',
      'We build all three, so we benefit from any of these answers. The bias to watch for is the opposite of the usual one: we have an interest in the more complex build, and this post argues against it.',
    ],

    cta: {
      heading: 'Not sure which of the three you are describing?',
      body: 'It is usually settled by trying to draw the flowchart. If one exists, the answer is deterministic automation and the conversation takes twenty minutes. We would rather have that conversation than build the expensive version of something simpler.',
      buttonLabel: 'Work it out with us',
      href: '/contact?service=workflow-automation',
    },

    related: ['do-you-need-an-app-or-a-website', 'ios-pwa-what-changed'],

    seo: {
      title: 'Agent, Chatbot, or a Form? The Three-Way Comparison',
      description:
        'Every two-way version is written by somebody selling agents. If you can draw the flowchart you do not need one, and most requests describe work a form would do better.',
    },
  },

  {
    slug: 'is-your-business-ready-for-an-ai-agent',
    cluster: 'what-you-need',
    title: 'Is Your Business Ready for an AI Agent?',
    navLabel: 'Are you ready for an agent',
    card: 'The readiness question is not about technology. It is whether you have the management capacity to change how work is done.',

    answer:
      'Readiness is not about your data or your technology stack, which is what readiness quizzes ask about. It is about whether you can absorb a process change: whether the work is written down, whether somebody will own the system after launch, and whether you have the spare management attention to redesign around it. Research on general purpose technologies is clear that the return comes after that complementary investment, not with the purchase.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why the usual readiness assessment misses',
        body: [
          'Vendor readiness quizzes ask about your data, your cloud maturity and your appetite for innovation. They are designed to conclude that you are ready, and they measure the wrong things.',
          'The economics research points somewhere else entirely, and it explains why organisations with identical technology get very different results.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The finding that reframes the question',
        body:
          'Adopting a general purpose technology requires large complementary investments: redesigning the process, retraining people, changing who decides what. Those costs are immediate and invisible in the accounts, while the benefits arrive later. Measured productivity therefore falls before it rises, which is known as the productivity J-curve. The consequence is that "will this pay for itself?" is the wrong question at the outset. The right one is whether you have the capacity to make the complementary investment, because that is what converts the dip into a return.',
      },
      {
        kind: 'prose',
        heading: 'Which is why small organisations are genuinely worse placed',
        body: [
          'This is worth saying plainly because it cuts against how AI is marketed to smaller businesses.',
          'A firm with no spare management attention cannot do the process redesign that the return depends on. It can buy the tool, and the tool will sit alongside the existing process rather than replacing it, which produces cost without benefit.',
          'The official statistics show the size gradient clearly. US Census data puts national AI use at 19.8 percent, rising to 37 percent among firms with at least 250 employees and under 20 percent among firms with four or fewer.',
          'Cost is no longer the barrier it was, since the tools are cheap. What separates the two ends is the capacity to change how work is done, and that is a reason for a small firm to be selective rather than a reason to feel behind.',
        ],
      },
      {
        kind: 'table',
        heading: 'The readiness questions that predict something',
        intro:
          'None of these is about technology. A no on the first two is usually decisive.',
        columns: ['Question', 'What a no means'],
        rows: [
          ['Is the process written down anywhere?', 'The project before the project'],
          ['Will somebody own this after launch?', 'It will degrade quietly'],
          ['Do you have management attention spare?', 'The redesign will not happen'],
          ['Can you name what correct output looks like?', 'You cannot evaluate it'],
          ['Is the process stable quarter to quarter?', 'You will rebuild it repeatedly'],
          ['What proportion of cases are exceptions?', 'High means a different project'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The first question is the one that stops most projects',
        body: [
          'If the process only exists in people\'s heads, that is the project before the project, and it is worth doing regardless of whether anything automated follows.',
          'It is also where the disagreement surfaces. Ask three people how a process works and you will frequently get three descriptions, all sincere. Reconciling them is uncomfortable and it is the useful part, because a system built on one person\'s version of the process will be wrong for the others.',
          'Businesses that go through this sometimes find they no longer need the automation, because writing the process down revealed that half of it existed to work around something fixable.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The exception rate decides what you are actually buying',
        body: [
          'The academic work on process automation converges on a short list of properties that predict success: high volume, clear rules, few exceptions, a stable process and structured data. The one that most often determines the shape of a project is the exception rate.',
          'If ten percent of cases need a human decision, you are not buying automation, you are buying a triage system that needs a rota, an escalation path, and a way for the human to see what the machine already did. That is a legitimate thing to build and a larger project than the one usually approved.',
          'The honest caveat on those criteria: they are documented consensus rather than validated predictors, because the literature they come from studies only successful projects. Treat them as a checklist that catches obvious mistakes, not a score.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What readiness does not require',
        body: [
          'Three things people think they need and do not.',
          'Clean data. Most useful systems work with imperfect data, and waiting for a data cleanup that never finishes is a common way to never start. What matters is whether the data is structured enough to read, not whether it is tidy.',
          'Technical staff. Plenty of organisations run useful systems without engineers, provided somebody owns the relationship and the evaluation. Ownership is not the same as technical ability.',
          'A strategy. A single well-chosen process, done properly and measured, teaches more than a strategy document and costs less. The strategy is worth writing after you have one working system, not before.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Getting ready, in order',
        intro:
          'The first three cost nothing but attention, and they are the ones that decide the outcome.',
        steps: [
          {
            title: 'Write the process down as it actually runs',
            body:
              'Including the workarounds. Reconcile the different accounts of it. This is the step that most often changes what the project should be.',
          },
          {
            title: 'Count the exceptions over a real week',
            body:
              'What proportion needed somebody to decide something, and what did they decide. This tells you whether you are scoping automation or a human-in-the-loop workflow.',
          },
          {
            title: 'Name the owner before you commission anything',
            body:
              'The person responsible when the output degrades in March. Not the builder. If nobody will take it, the honest answer is that the organisation is not ready, and that is a legitimate conclusion.',
          },
          {
            title: 'Define what correct looks like, in cases',
            body:
              'Twenty real examples with the right answer written down, including ones the system should refuse. If this is hard, that difficulty is the finding, and it does not get easier after launch.',
          },
          {
            title: 'Start with one process, measured',
            body:
              'Not a programme. One process, with a before measurement so that the after means something. The J-curve says the first months may look worse, and only a baseline lets you tell a dip from a failure.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'When we say a client is not ready',
        body: [
          'We build agentic AI and automation, so declining work is the part of this worth stating plainly.',
          'The clearest signal is when nobody will own the thing afterwards. We have taken projects where the answer was vague and watched them degrade within a year, not because the system stopped working but because nothing was watching, the corpus went stale and people quietly stopped trusting it. We now ask for a name and treat its absence as a reason to wait.',
          'The second is a process still changing every quarter. Automating it means rebuilding it repeatedly, which is good revenue for us and bad value for the client, and we would rather say so.',
          'Where a client is not ready, the useful work is usually the preparation: writing the process down, measuring the exception rate, deciding what correct means. That is a smaller engagement and it frequently changes what gets built, occasionally to nothing, which is a fine outcome.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I know if my business is ready for AI?',
        answer:
          'Ask whether the process is written down, whether somebody will own the system after launch, and whether you have management attention spare for the process redesign. Those predict outcomes better than data maturity or technical readiness, which is what most assessments measure.',
      },
      {
        question: 'Do I need clean data first?',
        answer:
          'Usually not. Most useful systems work with imperfect data, and waiting for a cleanup that never finishes is a common way never to start. What matters is whether the data is structured enough to be read reliably, not whether it is tidy.',
      },
      {
        question: 'Why do smaller businesses get less from AI?',
        answer:
          'Because the return depends on complementary investment in redesigning the work, and a firm with no spare management capacity cannot make it. The official statistics show the gradient: 37 percent adoption among firms of 250 or more against under 20 percent among the smallest.',
      },
      {
        question: 'Should we write an AI strategy first?',
        answer:
          'Usually after rather than before. One well-chosen process done properly and measured teaches more than a strategy document and costs less. Write the strategy once you have a working system and know what actually helped.',
      },
      {
        question: 'What if nobody wants to own it?',
        answer:
          'That is a genuine reason to wait. A system with no owner degrades quietly: the corpus goes stale, the evaluation stops running, and people stop trusting it without anyone deciding to. Ownership is a better predictor of outcome than any technical factor.',
      },
    ],

    publishedAt: '2026-11-09T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Brynjolfsson, Rock and Syverson, The Productivity J-Curve, AEJ Macroeconomics 13(1), 2021',
        url: 'https://www.nber.org/system/files/working_papers/w25148/w25148.pdf',
        readOn: '2026-09-11',
        supports: 'That complementary intangible investment causes measured productivity to fall before it rises.',
      },
      {
        label: 'US Census Bureau, Business Trends and Outlook Survey AI supplement',
        url: 'https://www.census.gov/library/stories/2026/05/ai-use-businesses.html',
        readOn: '2026-09-12',
        supports: 'The 19.8 percent national rate, 37 percent at firms of 250 or more, and under 20 percent at the smallest firms.',
      },
      {
        label: 'Wellmann et al., A framework to evaluate the viability of robotic process automation, BPM 2020',
        url: 'https://arxiv.org/abs/2007.10900',
        readOn: '2026-09-11',
        supports: 'The task criteria of volume, determinism, exception rate, maturity and structured data.',
      },
    ],

    limits: [
      'The task criteria are documented consensus rather than validated predictors, because the literature they come from studies only successful projects.',
      'The J-curve research concerns general purpose technologies over long periods. It explains the shape of the return rather than predicting the timing in your case.',
      'Adoption statistics describe distributions across firms. They say nothing about whether a specific application pays for itself in yours.',
      'We sell AI and automation work, so a post arguing that some businesses should wait is against our short-term interest and stated deliberately.',
    ],

    cta: {
      heading: 'Not sure whether to start now or prepare first?',
      body: 'The three questions that decide it are whether the process is written down, who owns it afterwards, and what the exception rate is. Working through those takes a conversation, and it sometimes concludes that the right first project is not an AI one.',
      buttonLabel: 'Work it out with us',
      href: '/contact?service=workflow-automation',
    },

    related: ['agent-chatbot-or-a-form', 'what-to-automate-first'],

    seo: {
      title: 'Is Your Business Ready for an AI Agent?',
      description:
        'Readiness is not about data or technology. It is whether the process is written down, who owns it afterwards, and whether you can absorb the redesign.',
    },
  },

  {
    slug: 'what-a-restaurant-actually-needs',
    cluster: 'what-you-need',
    title: 'What a Restaurant Actually Needs, and What It Does Not',
    navLabel: 'What a restaurant needs',
    card: 'Operators rank app development ninth of fifteen technology investments. The median customer keeps three restaurant apps.',

    answer:
      'A restaurant almost never needs its own app. Operators themselves rank smartphone app development ninth of fifteen technology investments, well behind digital marketing and loyalty, and the median customer keeps three restaurant apps on their phone, which belong to chains. What does move money is taking orders directly rather than through a marketplace: 68 percent of delivery customers used third-party services while 61 percent said they would rather order direct, and the commission difference is the whole margin.',

    sections: [
      {
        kind: 'prose',
        heading: 'Start with what operators actually buy',
        body: [
          'The industry surveys its own members on technology investment, and the ranking is a useful corrective to what gets pitched.',
          'Smartphone app development ranks ninth of fifteen investment areas, at 40 percent of operators, and considerably lower among full-service restaurants. Ahead of it sit digital and location-based marketing at 65 percent, loyalty and reward systems at 58 percent, point of sale at 52 percent and contactless ordering and payment at 49 percent.',
          'So the thing most often sold to restaurants is not what restaurants themselves prioritise, and the gap is not small.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The number that should settle the app question',
        body:
          'Industry research puts the median number of restaurant apps a customer keeps on their phone at three. Not three per city or three per week: three in total. Those slots belong to large chains and to the delivery marketplaces. A single independent restaurant competing for one of three slots, against businesses with national marketing budgets, is a difficult proposition, and it is the proposition an app project is actually funding.',
      },
      {
        kind: 'prose',
        heading: 'Where the money genuinely moves',
        body: [
          'The commercially interesting gap in this sector is not technological, it is about who takes the order.',
          'Industry research found 68 percent of delivery customers ordered through a third-party service in the previous six months, while 61 percent said they would rather order directly from the restaurant. A large majority using marketplaces, a large majority preferring not to.',
          'The commission difference is substantial. DoorDash publishes marketplace delivery commission tiers of 15, 25 and 30 percent depending on plan, and charges zero percent commission on orders placed through its Storefront product, which is ordering on the restaurant\'s own website, with the restaurant paying payment processing only.',
          'That is the arithmetic worth acting on. Converting even a portion of marketplace orders to direct ones changes margin in a way no app feature does, and it does not require an app.',
        ],
      },
      {
        kind: 'table',
        heading: 'Where the effort is better spent',
        intro:
          'Roughly ordered by the evidence behind each rather than by how modern it sounds.',
        columns: ['Instead of', 'Do this', 'Why'],
        rows: [
          ['A custom app', 'Ordering on your own site', 'Zero marketplace commission against 15 to 30 percent'],
          ['A custom app', 'Your listing and reviews', 'Local ranking is distance, relevance and prominence'],
          ['A loyalty app', 'Loyalty without an install', 'The install is the drop-off, not the loyalty'],
          ['A bespoke build', 'The point of sale you already pay for', 'It usually does more than is switched on'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The margin context that makes this urgent',
        body: [
          'This sector has no room for a project that does not pay back. Industry research reports that 42 percent of operators were unprofitable in the most recent year covered.',
          'And technology is not a reliable fix by the industry\'s own account: 83 percent of operators say technology gives a competitive advantage and 69 percent say it made them more efficient, while the profitability figure sits where it does. Believing technology helps and being profitable are not the same thing.',
          'So the test for any restaurant technology spend is narrow: does it reduce commission, increase order frequency, or reduce labour on a task that happens daily. Anything that does none of those is discretionary in a sector where 42 percent are losing money.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What we could not establish, and will not invent',
        body: [
          'Two gaps worth naming rather than filling.',
          'There is no methodologically sound published study of how restaurant customers actually discover restaurants: how much comes from search and maps, how much from delivery apps, how much from walking past. The most-cited figure traces to a single panel survey and measures use of a service rather than discovery share. We are not going to quote it.',
          'Second, the industry research cited here does not publish its sample size, fielding dates or margin of error, which is a real limitation on figures we are otherwise relying on. They are the best available and they are not audited.',
          'On local discovery what can be said is narrow and sourced: Google states that local results are based mainly on relevance, distance and prominence, that prominence draws partly on links and reviews, and that there is no way to pay for better local ranking. None of those three factors is improved by having an app; two are improved by web work.',
        ],
      },
      {
        kind: 'steps',
        heading: 'The order we would actually work in',
        intro:
          'Cheapest and most evidenced first. Most restaurants do not need to get past step three.',
        steps: [
          {
            title: 'Make direct ordering work properly on the phone',
            body:
              'Not an app. A fast mobile page where somebody can order in under a minute. This is the commission difference, and it is the single largest lever available.',
          },
          {
            title: 'Fix the listing, the hours and the photos',
            body:
              'Unglamorous and it is what the discovery factors actually respond to. Wrong opening hours cost more orders than most features gain.',
          },
          {
            title: 'Ask what your point of sale already does',
            body:
              'Loyalty, online ordering and reporting are frequently included and switched off. Paying twice for a capability you already own is common and avoidable.',
          },
          {
            title: 'Run loyalty without requiring an install',
            body:
              'The install is where people drop out. A scheme that works from a phone number or a wallet pass keeps the mechanism and removes the barrier.',
          },
          {
            title: 'Only then ask whether an app adds anything',
            body:
              'If you have a genuine repeat-visit business with a real reason to occupy one of three slots, it may. Most restaurants asking this question do not, and the honest answer saves a substantial amount.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we tell restaurants',
        body: [
          'We build websites, apps and ordering systems, so recommending against an app is recommending against our more expensive product.',
          'What we suggest instead is almost always direct ordering done properly, because the commission arithmetic is decisive and it is the same conversation every time. A restaurant paying a quarter of its delivery revenue to a marketplace has a larger problem than anything an app would solve.',
          'The second thing we check is what the point of sale already includes, which is frequently more than the operator realises. Enabling something already paid for is not work we bill much for, and it is the right first move often enough that we ask every time.',
          'Where we do build restaurant apps, it is for groups with several sites and a genuine repeat-visit pattern, where occupying a slot on a customer\'s phone is realistic. For a single independent restaurant we would rather say no and build the ordering page.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Does my restaurant need an app?',
        answer:
          'Almost certainly not. Operators themselves rank app development ninth of fifteen technology investments, and the median customer keeps three restaurant apps in total, which belong to chains and marketplaces. A single independent restaurant is competing for one of three slots.',
      },
      {
        question: 'What actually improves restaurant margin?',
        answer:
          'Taking orders directly rather than through a marketplace. Commission on marketplace delivery runs between 15 and 30 percent depending on plan, against zero commission for orders placed on the restaurant\'s own site, with only payment processing to pay.',
      },
      {
        question: 'Do customers prefer ordering direct?',
        answer:
          'They say so. Industry research found 68 percent of delivery customers used a third-party service in the previous six months while 61 percent said they would rather order directly from the restaurant. The preference exists and the habit has not followed it.',
      },
      {
        question: 'How do customers find restaurants?',
        answer:
          'There is no methodologically sound published answer, and we are not going to quote the figure that circulates because it measures use of a service rather than discovery share. What Google states is that local results turn mainly on relevance, distance and prominence, and that ranking cannot be paid for.',
      },
      {
        question: 'Is a loyalty app worth it?',
        answer:
          'Loyalty is worth it and the app is usually the obstacle. Operators rank loyalty systems second of fifteen investments, well above app development. Running the scheme without requiring an install keeps the mechanism and removes the point where people drop out.',
      },
    ],

    publishedAt: '2026-11-12T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'National Restaurant Association, State of the Restaurant Industry',
        url: 'https://restaurant.org/research-and-media/research/research-reports/state-of-the-industry/',
        readOn: '2026-09-11',
        supports: 'The technology investment ranking, the profitability figure, and the gap between perceived technology advantage and profitability.',
      },
      {
        label: 'National Restaurant Association, Off-Premises Restaurant Trends 2025',
        url: 'https://restaurant.org/research-and-media/research/',
        readOn: '2026-09-11',
        supports: 'The median of three restaurant apps per customer, and that 68 percent used third-party delivery while 61 percent preferred ordering direct.',
      },
      {
        label: 'DoorDash merchant pricing',
        url: 'https://merchants.doordash.com/en-us/pricing',
        readOn: '2026-09-11',
        supports: 'The marketplace commission tiers of 15, 25 and 30 percent, and zero percent commission on Storefront orders.',
      },
      {
        label: 'Google, how local results are determined',
        url: 'https://support.google.com/business/answer/7091',
        readOn: '2026-09-11',
        supports: 'That local results are based on relevance, distance and prominence, and that ranking cannot be paid for.',
      },
    ],

    limits: [
      'The industry research does not publish sample size, fielding dates or margin of error. It is the best available evidence on operator priorities and it is not audited.',
      'There is no sound published data on how restaurant customers discover restaurants. The commonly cited figure measures use of a service rather than discovery share and is deliberately absent here.',
      'Commission rates and plan structures change, and vary by market. The figures cited were read in September 2026.',
      'We build apps as well as websites and ordering systems, so recommending against an app is recommending against our more expensive product.',
    ],

    cta: {
      heading: 'Paying a quarter of delivery revenue in commission?',
      body: 'Direct ordering that works properly on a phone is the lever with the clearest arithmetic behind it, and it is a smaller project than an app. We would rather build that and have you keep the margin.',
      buttonLabel: 'Talk about direct ordering',
      href: '/contact?service=web-development',
    },

    related: ['do-you-need-an-app-or-a-website', 'what-a-clinic-actually-needs'],

    seo: {
      title: 'What a Restaurant Actually Needs, and What It Does Not',
      description:
        'Operators rank apps ninth of fifteen investments and customers keep three. The lever with real arithmetic is direct ordering against 15 to 30 percent commission.',
    },
  },

  {
    slug: 'what-a-clinic-actually-needs',
    cluster: 'what-you-need',
    title: 'What a Clinic Actually Needs, and the 30-Point Swing Nobody Buys',
    navLabel: 'What a clinic needs',
    card: 'No evidence exists that patients want your clinic\'s app. Meanwhile front desk behaviour moves portal use by 30 points.',

    answer:
      'There is no evidence that patients want a clinic-specific app: no peer-reviewed study, government brief or survey compares preference for a single clinic\'s app against web access, and national data shows patients overwhelmingly use the portal their clinic\'s records system already provides. Meanwhile 87 percent of patients accessed their portal when staff encouraged them against 57 percent when not. A 30-point swing, on software you already pay for, from something nobody sells.',

    sections: [
      {
        kind: 'prose',
        heading: 'A sourced negative, stated as one',
        body: [
          'We went looking for evidence that patients want a clinic to have its own app. There is none.',
          'No peer-reviewed study, no government data brief and no national survey compares patient preference for an individual clinic\'s branded app against access through the web or through the records system\'s own portal. That is an absence of evidence rather than evidence of absence, and it is worth knowing before commissioning one.',
          'What the national data does show points the other way. A government brief records that patients overwhelmingly use patient portal apps supplied by their electronic health record vendor rather than by individual providers. The app question for most clinics is therefore a question about which records system they are on, not a development project.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The finding worth the whole post',
        body:
          'Government survey data found that 87 percent of patients accessed their patient portal when they were encouraged to do so by a healthcare professional, against 57 percent when they were not. A thirty percentage point difference, produced by what staff say at the desk and on the phone, using software the practice has already bought. No project, no procurement, no vendor. It is the largest single lever in the available evidence and it is the one nobody is selling, because there is nothing to sell.',
      },
      {
        kind: 'prose',
        heading: 'Why that finding gets ignored',
        body: [
          'It is worth being honest about why a thirty point swing sits unused while clinics are pitched apps.',
          'Nobody makes money from it. There is no product, no licence and no implementation fee attached to receptionists mentioning the portal, so it does not appear in any sales conversation or any conference agenda.',
          'It is also unglamorous internally. It requires a change in what staff say rather than something new to point at, and it produces no launch. That makes it a harder thing to champion than a project, despite being larger in effect and free.',
        ],
      },
      {
        kind: 'table',
        heading: 'Where clinic technology effort is better spent',
        intro:
          'Ordered by the strength of evidence behind each rather than by how modern it looks.',
        columns: ['Instead of', 'Do this', 'Evidence'],
        rows: [
          ['A clinic app', 'Staff actively encouraging portal use', '87 percent against 57 percent'],
          ['A clinic app', 'The portal your records system includes', 'Patients overwhelmingly use those'],
          ['A booking app', 'Booking that works on a mobile web page', 'No install, no App Store'],
          ['A reminder app', 'Text and phone reminders', 'Trial-grade evidence exists'],
          ['A bespoke build', 'Accurate listing, hours and directions', 'Relevance, distance and prominence'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The intervention with actual trial evidence',
        body: [
          'For attendance, which is the operational problem most clinics actually have, the intervention with the strongest evidence is not new.',
          'A 2026 meta-analysis covering 8,236 participants examined reminders and found a positive effect on attendance, with a risk ratio of 1.11.',
          'One honest qualification that most coverage drops: text message reminders alone did not reach statistical significance, with a confidence interval running from 0.99 to 1.31. The overall effect is driven by reminders including phone contact. So a clinic replacing phone reminders with an automated text-only system on the strength of this literature may be weakening the thing it is trying to improve.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The app case, where it exists',
        body: [
          'There are clinics for which an app makes sense, and the pattern is specific rather than general.',
          'It requires something the two capability tests identify: hardware over Bluetooth or NFC, such as a connected monitoring device, or genuine background execution. A clinic app that is a booking form and a message inbox has neither, and everything it does works in an installed web app that requires no store review and no install prompt.',
          'The other case is a large group with genuine repeat contact, where occupying space on a patient\'s phone is realistic. For a single practice, the app is competing for attention against the records system\'s own portal, which the patient already has and which holds their whole history rather than one provider\'s slice of it.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What we would do first',
        intro:
          'In order of evidence and cost. The first step is free and larger than anything below it.',
        steps: [
          {
            title: 'Change what the front desk says',
            body:
              'Have staff actively mention the portal at check-in, at discharge and on the phone. This is the thirty point intervention, it costs a briefing, and it uses software the practice already pays for.',
          },
          {
            title: 'Find out what your records system already includes',
            body:
              'Portal, messaging, booking and reminders are frequently part of the licence and switched off. Paying separately for a capability you already own is common and avoidable.',
          },
          {
            title: 'Keep phone contact in the reminder mix',
            body:
              'The trial evidence supports reminders overall, and text alone did not reach significance. Automating the cheap channel entirely is not what the research supports.',
          },
          {
            title: 'Make booking work on a phone browser',
            body:
              'Most patients booking are doing it once, from a search result, on a phone. An install requirement at that moment loses them, and no app solves a problem that only arises because there is an app.',
          },
          {
            title: 'Only then consider an app, on the capability test',
            body:
              'Does it need hardware over Bluetooth or NFC, or genuine background execution? If not, an installed web app does everything a clinic app would do without a store review or an install prompt.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How we handle clinic enquiries',
        body: [
          'We build web applications and native apps, and clinic app enquiries are among the ones we most often talk people out of.',
          'The first question is which records system they are on, because the answer usually makes the project unnecessary. A patient using their EHR vendor\'s portal has their whole history in one place, and a clinic app offers them a subset of that with an extra login.',
          'The second is whether anyone has tried the front desk intervention, and the answer is almost always no, because nobody presents it as an option. Suggesting it costs us a project and it is the thing with the largest evidenced effect, so we suggest it.',
          'Where we do build for clinics, it is usually booking and communication on the web, done properly on a phone, and integration with what they already run. That is less impressive than an app and it is what the evidence supports.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Does my clinic need a patient app?',
        answer:
          'There is no evidence that patients want a clinic-specific app: no study or survey compares preference for one against web access, and national data shows patients overwhelmingly use the portal their records system provides. For most practices the app question is really a question about which records system they are on.',
      },
      {
        question: 'What is the single most effective thing a clinic can do?',
        answer:
          'Have staff actively encourage portal use. Government survey data found 87 percent of patients accessed their portal when encouraged by a healthcare professional against 57 percent when not. That is a thirty point swing on software already paid for, and it costs a staff briefing.',
      },
      {
        question: 'Do appointment reminders reduce missed appointments?',
        answer:
          'A 2026 meta-analysis of 8,236 participants found a positive effect with a risk ratio of 1.11. One qualification usually dropped: text messages alone did not reach statistical significance, with a confidence interval from 0.99 to 1.31, so the effect is driven by reminders including phone contact.',
      },
      {
        question: 'When does a clinic genuinely need an app?',
        answer:
          'When it needs hardware over Bluetooth or NFC, such as a connected monitoring device, or genuine background execution. A booking form and a message inbox need neither, and both work in an installed web app with no store review and no install prompt.',
      },
      {
        question: 'Should we build a booking app?',
        answer:
          'Usually not. Most patients booking are doing it once, from a search result, on a phone. Requiring an install at that moment loses them, and the problem the app solves largely exists because there is an app.',
      },
    ],

    publishedAt: '2026-11-13T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'ASTP/ONC Data Brief on individuals access to and use of patient portals',
        url: 'https://www.healthit.gov/data/data-briefs',
        readOn: '2026-09-11',
        supports: 'The 87 percent against 57 percent portal access finding, and that patients overwhelmingly use portal apps from EHR developers.',
      },
      {
        label: 'Meta-analysis of appointment reminder interventions, 2026',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        readOn: '2026-09-11',
        supports: 'The 8,236 participant sample, the risk ratio of 1.11, and that SMS alone did not reach significance.',
      },
      {
        label: 'Google, how local results are determined',
        url: 'https://support.google.com/business/answer/7091',
        readOn: '2026-09-11',
        supports: 'That local results turn on relevance, distance and prominence, none of which an app improves.',
      },
    ],

    limits: [
      'The absence of evidence that patients want clinic-specific apps is a sourced negative from searching for it. It is not proof that no patient wants one.',
      'The portal access figures come from a national survey in one country and reflect that health system. The direction is likely general and the figures are not.',
      'This does not cover clinical software, regulatory requirements for patient data, or anything that varies by health system and jurisdiction.',
      'We build both web applications and native apps, so recommending against an app is recommending against our more expensive product.',
    ],

    cta: {
      heading: 'Been quoted for a clinic app?',
      body: 'Two questions usually settle it: which records system you are on, and whether anyone has tried actively encouraging portal use. The second is free and has the largest evidenced effect of anything in this area.',
      buttonLabel: 'Talk it through first',
      href: '/contact?service=web-development',
    },

    related: ['what-a-restaurant-actually-needs', 'do-you-need-an-app-or-a-website'],

    seo: {
      title: 'What a Clinic Actually Needs, and the 30-Point Swing',
      description:
        'No evidence exists that patients want a clinic app. Staff encouraging portal use moves access from 57 to 87 percent, on software already paid for.',
    },
  },
];
