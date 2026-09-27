import type { Guide } from './types';

/**
 * Cluster 5, continued: patents and copyright.
 *
 * The siblings of the trademark guide, written so the Patent Registration and
 * Copyright Registration service pages have reference content behind them.
 *
 * Every fee below is read from the two gazette notifications of March 2019:
 * the one substituting the First Schedule to the Patents Rules 2003 (effective
 * 9 March 2019) and the one substituting the Second Schedule to the Copyright
 * Rules 1967 (effective 14 March 2019). Both were cross-checked against IPO's
 * live Fee & Forms pages on 27 September 2026, which match. Findings are in
 * research/findings.jsonl under the `pat-` and `cr-` prefixes.
 *
 * Two things here are published as open questions rather than facts, on
 * purpose: IPO's own pages disagree with the statute text IPO hosts on whether
 * software is excluded from patents (`pat-software-exclusion-text-vs-ipo`), and
 * IPO's documents disagree about which amendments to the Patents Ordinance
 * exist (`pat-consolidation-vintage`). IPO's copyright FAQ is also recorded as
 * rejected, because it restates US law (`cr-ipo-faq-us-derived`).
 */

const PATENT_REGISTRATION: Guide = {
  slug: 'patent-registration-in-pakistan',
  cluster: 'trademark',
  title: 'Patent Registration in Pakistan: The Procedure, Fees and Deadlines',
  navLabel: 'Patent registration',
  card: 'Every official fee from the gazette, the provisional-or-complete choice, the four statutory deadlines, and why Pakistan is outside the PCT.',

  answer:
    'File with IPO Pakistan\'s Patent Office on Form P-1, with a complete specification (Rs 6,750) or a provisional one (Rs 2,025) followed by the complete specification within twelve months. It is examined, advertised, open to opposition for four months, then sealed on Form P-10 for Rs 6,750. A patent lasts twenty years from filing, with yearly renewal fees from year five. Pakistan is not a PCT member.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'Three rules that catch applicants out',
      body: 'First, Pakistan is not a Contracting State of the Patent Cooperation Treaty, so there is no PCT national phase here: a foreign applicant has twelve months from the first filing to file a Convention application in Pakistan, not thirty. Second, a person resident in Pakistan who files abroad first, without the Controller\'s written permission, commits an offence under sections 26 and 71 of the Patents Ordinance 2000. Third, under section 12 an employee\'s invention belongs to the inventor by default, not the employer, unless a contract says otherwise.',
    },

    {
      kind: 'table',
      heading: 'The official fee schedule',
      intro:
        'From the notification substituting the First Schedule to the Patents Rules 2003, effective 9 March 2019, issued under section 105 of the Patents Ordinance 2000. IPO\'s live fee page matched it when this guide was reviewed, and no later revision is linked from IPO\'s patent pages.',
      columns: ['Form', 'What it is for', 'Fee'],
      rows: [
        ['P-1 / P-1A', 'Application for a patent (P-1A where the inventor is not an applicant)', 'Rs 6,750'],
        ['P-2 / P-2A', 'Convention application claiming foreign priority', 'Rs 6,750'],
        ['P-1 to P-2C', 'Each page of specification beyond 40', 'Rs 90'],
        ['P-1 to P-2C', 'Each claim beyond 20', 'Rs 225'],
        ['P-3', 'Provisional specification', 'Rs 2,025'],
        ['P-3A', 'Complete specification', 'Rs 4,725'],
        ['P-27', 'Request for a search', 'Rs 1,500'],
        ['P-4', 'Extension of time, per month', 'Rs 1,125'],
        ['P-7', 'Notice of opposition', 'Rs 2,250'],
        ['P-9', 'Third party observations on patentability', 'Rs 5,000'],
        ['P-10', 'Request for sealing (grant)', 'Rs 6,750'],
        ['P-12', 'Renewal, per year, years 5–8', 'Rs 12,000'],
        ['P-12', 'Renewal, per year, years 9–12', 'Rs 18,000'],
        ['P-12', 'Renewal, per year, years 13–16', 'Rs 24,000'],
        ['P-12', 'Renewal, per year, years 17–20', 'Rs 32,000'],
        ['P-13', 'Restoration of a lapsed patent', 'Rs 13,500'],
        ['P-24 / P-25', 'Recording an assignment', 'Rs 2,250'],
        ['P-28', 'Authorising an agent', 'Stamp duty only'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Complete or provisional specification',
      body: [
        'Section 14(1) requires every ordinary application to carry either a complete specification or a provisional one. A Convention application, one claiming priority from an earlier foreign filing, must carry a complete specification from the start.',
        'A provisional specification fixes your filing date without the formalities of a complete one. IPO\'s filing guidelines say it is not examined, and that claims and drawings can follow later. The catch is section 14(2): the complete specification must be filed within twelve months of the filing date, or the application is deemed abandoned. Unlike several other deadlines in the Ordinance, section 14(2) provides for no extension.',
        'IPO\'s guidelines put the filing fee at Rs 6,750 with a complete specification and Rs 2,025 with a provisional one. The gazette then prices the later complete specification on Form P-3A at Rs 4,725, and Rs 2,025 plus Rs 4,725 is exactly Rs 6,750. On that reading the provisional route costs the same in the end and only defers Rs 4,725 by up to a year. IPO does not state the sum itself, so confirm the forms and fees the Patent Office will charge on your application before you pay.',
      ],
    },

    {
      kind: 'table',
      heading: 'What a patent costs over twenty years',
      intro:
        'Official fees only, for a specification within 40 pages and 20 claims. Agent or attorney charges are separate and are not set by the gazette. Renewals start before the end of year four, for year five, under rule 24 of the Patents Rules 2003, and may be paid in advance.',
      columns: ['Stage', 'Calculation', 'Total'],
      rows: [
        ['Filing', 'Form P-1 with a complete specification', 'Rs 6,750'],
        ['Sealing', 'Form P-10', 'Rs 6,750'],
        ['Renewals, years 5–8', '4 x Rs 12,000', 'Rs 48,000'],
        ['Renewals, years 9–12', '4 x Rs 18,000', 'Rs 72,000'],
        ['Renewals, years 13–16', '4 x Rs 24,000', 'Rs 96,000'],
        ['Renewals, years 17–20', '4 x Rs 32,000', 'Rs 128,000'],
        ['Full term', 'Filing, sealing and every renewal', 'Rs 357,500'],
      ],
    },

    {
      kind: 'steps',
      heading: 'The procedure, with the law behind each stage',
      intro:
        'Section numbers are from the Patents Ordinance 2000 and rule numbers from the Patents Rules 2003.',
      steps: [
        {
          title: 'Search, on Form P-27',
          body: 'Optional, at Rs 1,500. IPO\'s own FAQ says the Patent Office has no online patent database, so a search of Pakistani records is requested on this form. Search international databases too, because novelty under section 8 is judged against everything disclosed anywhere in the world.',
        },
        {
          title: 'File the application, under sections 13 and 14',
          body: 'Form P-1 (or P-1A if the inventor is not an applicant) with Form P-3 or P-3A as the first page of the specification, plus Form P-28 if an agent acts for you. IPO\'s guidelines ask for two copies of each and accept filing by hand or post at the Patent Office in Karachi, IPO\'s head office in Islamabad or its Lahore regional office, with the fee by pay order or demand draft in favour of the Director General, IPO-Pakistan.',
        },
        {
          title: 'File the complete specification, under section 14(2)',
          body: 'Within twelve months if you began with a provisional specification. It must describe the invention fully, end with claims defining its scope, and carry an abstract, under section 15.',
        },
        {
          title: 'Examination, under section 16',
          body: 'An examiner reports on novelty, inventive step and compliance. You get at least one opportunity to answer objections and amend. See the note below on the eighteen-month clock.',
        },
        {
          title: 'Acceptance and advertisement, under section 21',
          body: 'Acceptance is advertised in the official Gazette and the file opens to public inspection. Within thirty days of the notice of acceptance, rule 17(2) requires you to send a copy of the accepted abstract by registered post to the institutions listed in the Fourth Schedule, and you will need proof of that later.',
        },
        {
          title: 'Opposition, under section 23',
          body: 'Anyone may oppose within four months of the advertisement, on Form P-7. If you are opposed, rule 18 gives you two months to file a counter-statement, followed by rounds of evidence.',
        },
        {
          title: 'Sealing, under section 27',
          body: 'Request the grant on Form P-10 with Rs 6,750 and the evidence of the abstract dispatch, within six months of the publication of the complete specification. The Controller can extend that by six months on application and fee.',
        },
        {
          title: 'Renewal, under rule 24',
          body: 'On Form P-12, before the end of year four for year five and then year by year. Section 32 ends the patent if a renewal goes unpaid, subject to a six-month extension with an additional fee.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The eighteen-month clock, and IPO\'s own average',
      body: 'Section 16(6) deems an application refused unless it is accepted within eighteen months of the date of the application, unless an appeal is pending. A request on Form P-4, made before or within three months after that period, keeps it alive for up to three months more. IPO separately publishes its average time to the first examination report as eighteen months. IPO publishes nothing reconciling the two figures, so diarise the section 16(6) date yourself and file the P-4 in time rather than assuming the office will.',
    },

    {
      kind: 'table',
      heading: 'How long each stage takes',
      intro:
        'The left column is IPO\'s published average for each stage. The right is what the Ordinance or Rules actually fix, where they fix anything.',
      columns: ['Stage', 'IPO\'s published average', 'Statutory period'],
      rows: [
        ['Acknowledgement of filing', 'One week', 'None'],
        ['Complete specification after a provisional', 'Not applicable', '12 months from filing, s.14(2)'],
        ['First examination report', 'Eighteen months', 'Before 18 months from filing, s.16(2)'],
        ['Review of your reply', 'Three months', 'Acceptance within 18 months, extendable by 3, s.16(6)'],
        ['Acceptance and publication', 'Two months', 'None'],
        ['Opposition window', 'Included in six months to "sealing is due"', '4 months from advertisement, s.23(1)'],
        ['Request for sealing', 'Certificate ten days after Form P-10', 'Within 6 months of publication, s.27(2)'],
        ['Opposition proceedings, if any', 'Two years', 'None'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Who can apply, and who owns an employee\'s invention',
      body: [
        'Section 11 lets the true and first inventor apply, alone or jointly, as can the inventor\'s assignee or successor in interest and the legal representative of a deceased inventor. A company can therefore apply as assignee. Under rule 8, if the inventor is not a party to the application the company must produce the original deed of assignment, unless Form P-1A is endorsed by the inventor in front of two witnesses. An inventor who is not an applicant is still entitled to be named.',
        'Section 12 is the rule most employers do not expect. An invention made by an employee in the course of employment, in the employer\'s area of activity, belongs to the inventor unless there is a contractual obligation to the contrary, or the employer proves the invention could not have been made without the employer\'s facilities and equipment. Even where the employer owns it, an invention of exceptional economic value entitles the inventor to equitable remuneration.',
        'That is the reverse of the copyright position, where section 13(c) of the Copyright Ordinance 1962 makes the employer first owner of an employee\'s work by default. An employment contract that deals with copyright and says nothing about inventions leaves patents with the employee, unless the employer can prove the facilities exception.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Foreign applicants, agents and the missing PCT route',
      body: [
        'WIPO\'s list of PCT Contracting States, which stood at 159 when this guide was reviewed, does not include Pakistan. An international application therefore cannot enter a national phase here, and the thirty-month PCT timetable does not apply. The route in is a Convention application under section 2(c): filed in Pakistan within twelve months of the first application in a Convention country, which section 2(d) defines as a WTO member or a country declared by notification. Pakistan has also been party to the Paris Convention since 22 July 2004.',
        'With a Convention application, section 88 requires a certified copy of the foreign specification, with the application or within three months, and a verified English translation of anything not in English. Rule 8(8) allows extensions on Form P-4 of no more than three periods of three months. Rule 5 requires every application document to be in English.',
        'Rule 7 requires every applicant to give an address for service in Pakistan, and without one the Controller need not proceed. Section 84(2) obliges the Controller to refuse to recognise as agent anyone who neither resides nor has a place of business in Pakistan. Section 81(2) lets a registered patent agent sign and verify an application for an applicant who is absent from Pakistan. Registration as a patent agent is limited by section 80 to Pakistani citizens aged twenty-one or over with the prescribed qualifications, and section 82(2) bars companies from practising as patent agents. IPO has published an electronic register of patent agents since 1 January 2024.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Filing abroad first needs permission',
      body: 'Section 26 bars anyone resident in Pakistan from filing a patent application outside Pakistan without the Controller\'s written authority, unless the same invention was filed in Pakistan at least six weeks earlier and no secrecy direction is in force. Section 71 makes breach punishable with up to two years\' imprisonment, a fine of up to twenty thousand rupees, or both. IPO\'s standard operating procedure says foreign filing permission is usually issued within three weeks, sometimes within fourteen days on request, and cannot be obtained retrospectively. A Pakistani founder filing a US provisional first is exactly the case this catches.',
    },

    {
      kind: 'prose',
      heading: 'What cannot be patented, and the software question',
      body: [
        'Section 7 requires an invention to be new, involve an inventive step and be capable of industrial application. Section 7(2) says discoveries, scientific theories and mathematical methods, artistic and purely aesthetic creations, schemes or methods for mental acts, games or doing business, the presentation of information, and substances found in nature are not inventions. Section 7(4) bars patents for inventions contrary to public order or morality, plants and animals other than micro-organisms, diagnostic, therapeutic and surgical methods, new uses of known products or processes, and mere changes in the physical appearance of a chemical product.',
        'On software, IPO\'s own material disagrees with the statute text it publishes. The consolidation of the Ordinance on IPO\'s site lists only "the presentation of information" in section 7(2)(d). IPO\'s patent introduction page lists "computer software" in the same place, and IPO\'s FAQ summarises the exclusions as including computer software and methods of doing business. Section 7(3) confines every exclusion to the thing "as such". IPO\'s documents also disagree about which amendments to the Ordinance exist, citing amendments in 2006, 2007 and 2010 that the consolidation does not show, so we have not been able to settle which text is current.',
        'The practical position is that IPO describes software as excluded, and a claim to software as such should be expected to draw an objection. Source code and compiled programs are protected as literary works under the Copyright Ordinance 1962 without registration, and our copyright registration guide covers that route.',
      ],
    },

    {
      kind: 'prose',
      heading: 'When the rights actually start',
      body: [
        'Under section 22, from acceptance until sealing the applicant has the same privileges as if the patent had been sealed on the date of acceptance, but cannot bring infringement proceedings until the patent is sealed. IPO puts it more bluntly: patent protection does not start until the actual grant.',
        'Once sealed, a patent runs for twenty years from the filing date under section 31. An infringement suit is brought in the District Court under section 60, and moves to the High Court if the defendant counter-claims for revocation.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A missed renewal is recoverable, within limits',
      body: 'Section 32 allows up to six months after a renewal falls due to pay it with an additional fee. After that the patent lapses, and section 45 allows an application to restore it, on Form P-13 at Rs 13,500, within eighteen months of the date it ceased to have effect. Restoration is not automatic: the Controller must be satisfied that reasonable care was taken and that the failure was due to circumstances beyond the proprietor\'s control.',
    },
  ],

  faqs: [
    {
      question: 'How much does it cost to register a patent in Pakistan?',
      answer:
        'The official fees are Rs 6,750 to file with a complete specification and Rs 6,750 to request sealing on Form P-10, so Rs 13,500 to grant for a specification within 40 pages and 20 claims. Each extra page costs Rs 90 and each extra claim Rs 225. Renewals from year five add Rs 344,000 over the full term. Agent fees are separate.',
    },
    {
      question: 'How long does it take to get a patent in Pakistan?',
      answer:
        'IPO publishes averages of eighteen months to the first examination report, three months to review a reply, two months to acceptance and publication, and six months from there to "sealing is due" where there is no opposition. Section 16(6) requires acceptance within eighteen months of the application, extendable by three months on Form P-4.',
    },
    {
      question: 'What is a provisional patent application in Pakistan?',
      answer:
        'An application filed with a provisional specification, which fixes the filing date without the full formalities and is not examined. The complete specification must follow within twelve months under section 14(2), or the application is deemed abandoned. The provisional filing fee is Rs 2,025.',
    },
    {
      question: 'Is Pakistan a member of the PCT?',
      answer:
        'No. Pakistan is not on WIPO\'s list of PCT Contracting States, so there is no PCT national phase entry. A foreign applicant must file a Convention application in Pakistan within twelve months of the first filing in a WTO member or declared Convention country.',
    },
    {
      question: 'Can a foreign company file a patent in Pakistan?',
      answer:
        'Yes, as the inventor\'s assignee. It must give an address for service in Pakistan under rule 7, and may authorise an advocate or registered patent agent on Form P-28. The Controller must refuse to recognise an agent who neither resides nor has a place of business in Pakistan. Where the applicant is absent from Pakistan, section 81(2) lets the authorised agent sign and verify the application.',
    },
    {
      question: 'Can I file a patent abroad before filing in Pakistan?',
      answer:
        'Not without permission if you are resident in Pakistan. Section 26 requires the Controller\'s written authority unless you filed in Pakistan at least six weeks earlier. Breach carries up to two years\' imprisonment, a fine of up to twenty thousand rupees, or both, under section 71. IPO says permission usually takes up to three weeks.',
    },
    {
      question: 'Can software be patented in Pakistan?',
      answer:
        'IPO describes computer software as excluded from patent protection, although the statute text IPO publishes names only "the presentation of information" and confines exclusions to the thing "as such". Expect an objection to software claims. Software is protected as a literary work under the Copyright Ordinance 1962 without any registration.',
    },
    {
      question: 'Who owns an invention made by an employee in Pakistan?',
      answer:
        'The inventor, by default. Section 12 gives the employee the right to the patent unless a contract provides otherwise or the employer proves the invention could not have been made without its facilities. An employer that wants its employees\' inventions needs a written term saying so.',
    },
    {
      question: 'How long does a patent last in Pakistan?',
      answer:
        'Twenty years from the filing date under section 31, provided the yearly renewal fees are paid from year five. They rise from Rs 12,000 to Rs 32,000 a year across the term.',
    },
  ],

  publishedAt: '2026-10-03T07:00:00Z',
  basis:
    'Sourced from the Patents Ordinance 2000, the Patents Rules 2003 and IPO Pakistan\'s gazetted fee schedule of March 2019.',
  reviewedOn: '2026-09-27',
  related: ['copyright-registration-in-pakistan', 'trademark-registration-cost'],

  cta: {
    heading: 'Planning to file a patent?',
    body: 'Tell us what the invention does, where you want protection and whether anything has already been filed or disclosed. We will set out the route, the forms, the deadlines and the official fees for your case before anything is filed.',
    buttonLabel: 'Ask about patent registration',
    href: '/contact?service=patent-registration',
  },

  seo: {
    title: 'Patent Registration in Pakistan: Fees, Steps and Timeline',
    description:
      'Every IPO patent fee from the 2019 gazette, provisional versus complete filing, four statutory deadlines, foreign applicants, and why the PCT does not apply.',
  },
};

const COPYRIGHT_REGISTRATION: Guide = {
  slug: 'copyright-registration-in-pakistan',
  cluster: 'trademark',
  title: 'Copyright Registration in Pakistan: What It Adds and How to File',
  navLabel: 'Copyright registration',
  card: 'Why you register something you already own, the gazette fee for each kind of work, the Form II procedure, and the ownership rules that matter for software.',

  answer:
    'Copyright in Pakistan exists without registration, so registering does not create it. What it adds is a certificate that section 42(2) of the Copyright Ordinance 1962 makes prima facie evidence that copyright subsists and that you own it. You apply to IPO\'s Copyright Office on Form II, one work per application. The fee is Rs 2,000 for most works, Rs 5,000 for software and Rs 10,000 for a film.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'IPO\'s own copyright FAQ describes American law',
      body: 'The FAQ on IPO\'s copyright pages talks about "phonorecords", "fair use" and "work made for hire", which are terms of the US Copyright Act, and it says an employer is the author of an employee\'s work only if both sign a written agreement saying so. Pakistani law says the opposite. Section 13(c) of the Copyright Ordinance 1962 makes the employer the first owner of a work made in the course of employment unless there is an agreement to the contrary. Rely on the Ordinance, not the FAQ.',
    },

    {
      kind: 'prose',
      heading: 'What registration adds',
      body: [
        'Section 10 says copyright subsists in original literary, dramatic, musical and artistic works, cinematographic works and records, and nothing in it depends on registration. IPO\'s Copyright Office describes registration as voluntary.',
        'What registration buys is evidence. Under section 42(2), a certificate of registration is prima facie evidence that copyright subsists in the work and that the person named as owner is the owner. Under section 42(1), certified extracts from the Register are admissible in every court without further proof. Without a certificate you prove authorship and ownership from scratch, with drafts, files and witnesses, at the point you can least afford delay.',
        'Registration also puts the work on a public register that anyone may inspect under section 38, which is a quieter benefit: someone checking before they copy can find you.',
      ],
    },

    {
      kind: 'table',
      heading: 'The registration fee for each kind of work',
      intro:
        'From the notification substituting the Second Schedule to the Copyright Rules 1967, effective 14 March 2019, issued under section 82 of the Copyright Ordinance. IPO\'s live fee page matched it when this guide was reviewed. Every fee is per work.',
      columns: ['Kind of work', 'Examples', 'Fee'],
      rows: [
        ['Literary work', 'Books, articles, lectures, compilations', 'Rs 2,000'],
        ['Computer programme or software', 'Source code, applications', 'Rs 5,000'],
        ['Artistic work', 'Paintings, photographs, drawings, sculptures, architectural works', 'Rs 2,000'],
        ['Artistic work used with goods or services', 'Logos, labels and monograms used in trade', 'Rs 6,000'],
        ['Cinematographic work', 'Films, dramas, animated movies and games', 'Rs 10,000'],
        ['Record work', 'Music, sounds, songs', 'Rs 2,000 per song or sound'],
        ['Musical work with video', 'A song with its video', 'Rs 2,000 per song'],
      ],
    },

    {
      kind: 'table',
      heading: 'Other copyright fees',
      columns: ['Application', 'Section', 'Fee'],
      rows: [
        ['Opposition to someone else\'s registration', 's.39', 'Rs 6,000'],
        ['Registering an assignment, on Form III', 's.40', 'Rs 3,000'],
        ['Copies or extracts from the Register, per page', 's.38', 'Rs 300'],
        ['Stopping import or export of infringing copies, on Form VI', 's.58', 'Rs 20,000'],
        ['Rectification of the Register before the Copyright Board', 's.41(2)', 'Rs 6,000'],
        ['Appeal to the Copyright Board', 's.76', 'Rs 10,000'],
      ],
    },

    {
      kind: 'list',
      heading: 'What can be registered',
      intro:
        'Rule 3 of the Copyright Rules 1967 divides the Register into four parts, which match the classes of work in section 10.',
      items: [
        'Literary, dramatic and musical works. Section 2(p) defines literary work to include tables, compilations and computer programmes, meaning programmes on any storage device that can reproduce information when fed into a computer. Software is therefore a literary work, registered at its own fee of Rs 5,000.',
        'Artistic works, including paintings, photographs, drawings, sculptures and architectural works. A logo, label or monogram used in trade is registered here at Rs 6,000, and IPO asks for the trade mark number if the work is also filed as a trade mark.',
        'Cinematographic works, including films, dramas, animation and games.',
        'Records, meaning sound recordings, registered per song or sound.',
      ],
    },

    {
      kind: 'steps',
      heading: 'The procedure',
      intro:
        'Section numbers are from the Copyright Ordinance 1962 and rule numbers from the Copyright Rules 1967.',
      steps: [
        {
          title: 'Decide who applies, under section 39(1)',
          body: 'The author, the publisher, the owner of the copyright, or any other person interested in it may apply. If a business applies for work someone else created, it needs the creator\'s assignment or no-objection certificate first.',
        },
        {
          title: 'Complete Form II, under rule 4(1)',
          body: 'In triplicate, one work per application, with the statement of particulars: the class of work, title, language, author, whether and where it was first published, and who owns each right in it, including any assignments or licences.',
        },
        {
          title: 'Notify every other interested person, under rule 4(3)',
          body: 'A copy of the application goes to every other person interested in the copyright at the same time as you file it.',
        },
        {
          title: 'Advertise, for artistic works only',
          body: 'Under the proviso to section 39(2) and rule 4(3-A), the work itself must be advertised in a national Urdu or English daily circulating where you live or do business, within one month of filing, and two copies sent to the Registrar. IPO publishes a set format for the advertisement.',
        },
        {
          title: 'The objection window',
          body: 'Rule 4(4) lets the Registrar register if no objection arrives within thirty days of receiving the application. For artistic works, section 39(2) requires one month after the advertisement without objection, extendable to two. An objector pays Rs 6,000.',
        },
        {
          title: 'Examination and certificate',
          body: 'The Registrar enters the particulars and issues a certificate, or records in writing why not. IPO\'s published averages are nine months for examination and two months to issue the certificate, eleven months from filing to registration.',
        },
      ],
    },

    {
      kind: 'list',
      heading: 'The documents IPO asks for',
      intro:
        'From IPO\'s published procedure for copyright registration. The fee is paid by demand draft or pay order in the name of the Director General, IPO-Pakistan.',
      items: [
        'Three copies of Form II, for every kind of work.',
        'Copies of the work itself: two for literary works, including software, three for artistic works, and two on disc or USB for films and recordings.',
        'An affidavit that the work is original, in IPO\'s format.',
        'A no-objection certificate or assignment from the author or creator where the applicant is someone else, and from every contributor to a film or recording.',
        'For artistic works, two original copies of the newspaper carrying the advertisement.',
        'A vakalatnama if an advocate files for you.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Who owns software before anyone registers it',
      body: [
        'Section 13 makes the author the first owner, with exceptions. Under 13(c) an employer owns work made by an employee in the course of employment, unless they agree otherwise. Under 13(b) a person who commissions a photograph, painting, portrait, engraving or film for payment owns it, again unless agreed otherwise.',
        'Software commissioned from an independent developer fits none of those exceptions, so the developer is the first owner even though you paid for it. Ownership passes only by assignment, and section 15 says no assignment is valid unless it is in writing and signed by the assignor. An invoice and a delivered repository are not an assignment.',
        'Once you have the written assignment, you can register it on Form III for Rs 3,000 under section 40, which puts the transfer on the public record alongside the work.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'An assignment from an individual author has a ten-year limit',
      body: 'The second proviso to section 14(1) says that where the owner of the copyright is its author, no assignment is effective for more than ten years from the calendar year after it is made, and the copyright then reverts to the author. Assignments to the Government or to educational, charitable, religious or non-profit institutions are excepted. On the text, a business buying software or a logo outright from a freelancer holds it for ten years, not for the full term. It does not affect works an employer owns from the outset under section 13(c). How to structure a long-lived acquisition around this is a question for legal advice on your facts.',
    },

    {
      kind: 'table',
      heading: 'How long copyright lasts',
      columns: ['Work', 'Term', 'Section'],
      rows: [
        ['Literary, dramatic, musical and artistic works published in the author\'s lifetime', 'Life of the author plus 50 years, from the start of the next calendar year', 's.18'],
        ['Anonymous and pseudonymous works', '50 years from the year after first publication', 's.21'],
        ['Cinematographic works', '50 years from the year after publication', 's.20(1)'],
        ['Records', '50 years from the year after publication', 's.20(2)'],
        ['Photographs', '50 years from the year after publication', 's.20(3)'],
      ],
    },

    {
      kind: 'prose',
      heading: 'Copyright, trade mark or patent',
      body: [
        'A logo can be registered as an artistic work and as a trade mark, and the two do different jobs: copyright protects the drawing against copying, while a trade mark protects the brand in trade in the classes you register. IPO\'s procedure asks for the trade mark number when an artistic work is also used as a mark, which assumes you will often do both.',
        'Software is the other overlap. IPO describes computer software as excluded from patent protection, so for most software copyright is the protection available, and it needs no registration to exist.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Is copyright registration compulsory in Pakistan?',
      answer:
        'No. Copyright subsists under section 10 of the Copyright Ordinance 1962 without registration, and IPO describes registration as voluntary. Registering gives you a certificate that section 42(2) makes prima facie evidence that copyright subsists and that you own it.',
    },
    {
      question: 'How much does copyright registration cost in Pakistan?',
      answer:
        'Per work: Rs 2,000 for a literary or artistic work, Rs 5,000 for software, Rs 6,000 for an artistic work used with goods or services such as a logo, Rs 10,000 for a film, and Rs 2,000 per song or sound for records. These are the fees in force since 14 March 2019.',
    },
    {
      question: 'How long does copyright registration take in Pakistan?',
      answer:
        'IPO publishes an average of eleven months from filing to registration: about nine months for examination and two months to issue the certificate. Artistic works also need a newspaper advertisement and a one-month objection window.',
    },
    {
      question: 'Can I register software copyright in Pakistan?',
      answer:
        'Yes. Section 2(p) of the Copyright Ordinance 1962 includes computer programmes in the definition of literary work, and the fee schedule prices software registration at Rs 5,000. IPO asks for two copies of the work and an affidavit of originality.',
    },
    {
      question: 'Which form is used for copyright registration in Pakistan?',
      answer:
        'Form II, filed in triplicate with a statement of particulars under rule 4 of the Copyright Rules 1967. Changes to registered particulars use Form III, which is also the form for registering an assignment.',
    },
    {
      question: 'Who owns copyright in work made by an employee in Pakistan?',
      answer:
        'The employer, unless they agree otherwise. Section 13(c) makes the employer first owner of a work made in the course of employment under a contract of service. No written agreement is needed for the employer to own it, only to change that.',
    },
    {
      question: 'Do I own the software I paid a freelancer to write?',
      answer:
        'Not unless the developer assigned it to you in writing. A freelancer is not an employee, so under section 13 the developer is the first owner. Section 15 requires any assignment to be in writing and signed, and section 14(1) limits an assignment by an individual author to ten years.',
    },
    {
      question: 'Do I need to advertise my copyright application?',
      answer:
        'Only for artistic works. Section 39(2) and rule 4(3-A) require the work to be advertised in a national Urdu or English daily within one month of filing, with two copies sent to the Registrar, and registration waits for a month without objection.',
    },
  ],

  publishedAt: '2026-10-04T03:00:00Z',
  basis:
    'Sourced from the Copyright Ordinance 1962, the Copyright Rules 1967 and IPO Pakistan\'s gazetted fee schedule of March 2019.',
  reviewedOn: '2026-09-27',
  related: ['patent-registration-in-pakistan', 'trademark-registration-cost'],

  cta: {
    heading: 'Registering a work, or buying one?',
    body: 'Tell us what the work is, who created it and on what terms. We will set out the form, the fee and the documents, and flag anything in the ownership chain that needs a written assignment before you file.',
    buttonLabel: 'Ask about copyright registration',
    href: '/contact?service=copyright-registration',
  },

  seo: {
    title: 'Copyright Registration in Pakistan: Fees, Forms, Process',
    description:
      'Why register copyright you already own, the 2019 gazette fee for each kind of work, the Form II procedure, and the ownership rules that matter for software.',
  },
};

export const IP_GUIDES: Guide[] = [PATENT_REGISTRATION, COPYRIGHT_REGISTRATION];
