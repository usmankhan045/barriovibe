import type { Guide } from './types';

/**
 * Cluster 10: filing a return.
 *
 * Written from FBR's own IRIS 2.0 manual rather than from a competitor's
 * description of it, which is why the amount codes are here. Those codes are
 * what the reader is actually looking at on screen, and no ranking page
 * carries them.
 *
 * The section that earns this guide its place is the section 182 tapering
 * relief: the late-filing penalty falls by 75, 50 or 25 percent if you file
 * within one, two or three months of the due date. It is directly actionable
 * for anyone reading in October, and it is almost universally omitted.
 */

const FILING_A_RETURN: Guide = {
  slug: 'how-to-file-your-tax-return',
  cluster: 'filing',
  title: 'How to File Your Income Tax Return in Pakistan',
  navLabel: 'Filing your return',
  card: 'The IRIS screens in order with the amount codes you will actually see, the wealth statement nobody expects, and what it costs if you are late.',

  answer:
    'File through IRIS by 30 September. A salaried person enters annual income under Employment, reads the Admitted Income Tax figure, enters it against the section 149 withholding line so it nets to zero, then completes the wealth statement and reconciles it to zero. Every resident individual who files a return must also file a wealth statement, whatever their income.',

  sections: [
    {
      kind: 'list',
      heading: 'What to have in front of you first',
      intro:
        'The return is mostly transcription. Gathering these before you log in turns an evening into twenty minutes.',
      items: [
        'Your salary certificate for the year, showing gross salary and tax deducted',
        'Bank statements for every account, and any withholding certificates the bank issued',
        'Last year\'s wealth statement, because this year reconciles against it',
        'Details of any property, vehicle, or investment bought or sold during the year',
        'Receipts for pension contributions or donations you intend to claim',
      ],
    },

    {
      kind: 'steps',
      heading: 'The IRIS route, screen by screen',
      intro:
        'From FBR\'s own IRIS 2.0 manual. The codes in brackets are what appears on screen, which is the thing most guides leave out.',
      steps: [
        {
          title: 'Declaration, then Normal Return',
          body: 'In IRIS, open the Declaration menu and choose Returns/Statements (Original), then Normal Return. Enter the tax period when prompted.',
        },
        {
          title: 'Data tab, then Employment',
          body: 'Enter your annual figure under "Pay, Wages or Other Remuneration (including Arrears of Salary)", which carries code 1009. Then press Calculate.',
        },
        {
          title: 'Read the Admitted Income Tax',
          body: 'Under Tax Chargeable and Payments, open Computations and note the Admitted Income Tax figure, code 9203. That is your liability before credit for what your employer already deducted.',
        },
        {
          title: 'Claim what was already withheld',
          body: 'Under Adjustable Tax, enter that figure against "Salary of Employees u/s 149", code 64020004, and Calculate again. The amount moves across to Withholding Income Tax, code 9201. If your employer deducted correctly, the admitted tax now nets to zero.',
        },
        {
          title: 'Complete the wealth statement',
          body: 'The 116 tab has three parts: personal expenses, personal assets and liabilities, and the reconciliation of net assets. All three must be filled.',
        },
        {
          title: 'Reconcile to zero',
          body: 'FBR states it plainly: the return completes only when the Unreconciled Amount, code 703000, is zero. This is the step that stops most people.',
        },
        {
          title: 'Save, then Submit',
          body: 'Submitting brings up a declaration and asks for your four-digit PIN. If tax is payable, IRIS generates a PSID for the payment.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'How to know it actually filed',
      body: 'Both the return and the wealth statement must move out of the Draft folder and into Completed Task. If either is still sitting in Draft, you have not filed, whatever else the screen appeared to say.',
    },

    {
      kind: 'prose',
      heading: 'The wealth statement is not optional',
      body: [
        'Section 116(2) requires every resident taxpayer who is an individual and files a return to furnish a wealth statement and a wealth reconciliation statement with it. Every member of an association of persons must do the same alongside the association\'s return.',
        'There is no income threshold. The old Rs 1 million floor was removed by the Finance Act 2013, so any page still quoting one is thirteen years out of date. The statement covers assets and liabilities including foreign ones, those of a spouse where the spouse is dependent, those of minor children and dependents, assets transferred during the year and the consideration for them, and total expenditure.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Making the reconciliation balance',
      body: [
        'The reconciliation asks a simple question in an unfriendly way: your net assets went up or down by some amount this year, and the inflows minus the outflows should explain exactly that. When they do not, the difference sits in the Unreconciled Amount and IRIS will not let you finish.',
        'The usual causes are ordinary rather than sinister. Personal expenses understated, because nobody tracks them and the figure entered is a guess. An asset valued differently this year than last. A gift, a loan repaid, or a sale whose proceeds were never entered as an inflow. Work through inflows first, then expenses, and the gap usually names itself.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The deadline, and what an extension actually is',
      body: 'For an individual the return is due by 30 September following the end of the tax year. Two different things get called an extension. Section 119 is an application you make in writing to the Commissioner, by the due date, on limited grounds: absence from Pakistan, sickness or other misadventure, or other reasonable cause. Section 214A is FBR extending the date for everyone, which it has done in several recent years. The first is yours to ask for; the second is not something you can plan around.',
    },

    {
      kind: 'table',
      heading: 'What it costs to file late',
      intro:
        'Under section 182 the penalty is the higher of 0.1% of tax payable per day or Rs 1,000 per day, subject to a minimum, and capped at 200% of tax payable. The relief in the last column is the part almost nobody publishes.',
      columns: ['Situation', 'Minimum penalty', 'Reduction'],
      rows: [
        ['Individual with 75% or more income from salary', 'Rs 10,000', '-'],
        ['Any other case', 'Rs 50,000', '-'],
        ['Filed within one month of the due date', '-', 'Reduced by 75%'],
        ['Filed within two months', '-', 'Reduced by 50%'],
        ['Filed within three months', '-', 'Reduced by 25%'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Late is much better than later',
      body: 'The tapering relief means the difference between filing in early October and letting it drift to January is most of the penalty. Separately, getting back on the Active Taxpayer List after a late filing now costs a section 182A surcharge of Rs 25,000 for an individual, unless you give the Commissioner an undertaking not to acquire property for six months.',
    },

    {
      kind: 'prose',
      heading: 'What happens after you submit',
      body: [
        'A complete return is treated as an assessment order deemed issued by the Commissioner under section 120, which is what self-assessment means in practice: nobody approves it, it simply stands.',
        'It is then run through an automated system that can correct arithmetical errors, disallow claims that are wrong on the face of the return, and adjust losses. FBR must issue a system-generated notice first and consider your response, and if you do not respond within thirty days the adjustment is made anyway. If no adjustment happens within six months of filing, the return as you declared it stands.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Getting it wrong, and fixing it',
      body: [
        'Section 114(6) allows a revised return, and the condition everyone quotes is that the Commissioner must approve it in writing. What competitors omit is that four separate carve-outs mostly disapply that requirement.',
        'Approval is not needed at all if you revise within sixty days of filing the original. It is deemed granted if the Commissioner does not pass a written order within sixty days of your asking. It is deemed granted where the revision declares more taxable income or less loss than was determined. And the Commissioner shall grant approval in the case of a bona fide omission or wrong statement.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'If you live abroad, check before assuming you need not file',
      body: 'Section 82(d) makes a Pakistani citizen resident if they are not present in any other single country for more than 182 days during the tax year, or are not a resident taxpayer of any other country. A person living in a country that issues no tax residency certificate, or moving between several, can be resident in Pakistan without setting foot in it. IRIS does offer a dedicated declaration for a non-resident Pakistan-origin person with no Pakistan-source income, but the residency question comes first.',
    },
  ],

  faqs: [
    {
      question: 'What is the last date to file an income tax return in Pakistan?',
      answer:
        '30 September following the end of the tax year, for an individual. FBR has extended that date in several recent years under section 214A, but an extension is a decision it makes for everyone rather than something you can rely on in advance.',
    },
    {
      question: 'Do I have to file a wealth statement?',
      answer:
        'Yes, if you are a resident individual filing a return. Section 116(2) requires a wealth statement and a wealth reconciliation statement with every such return, and there is no income threshold. The old Rs 1 million floor was removed by the Finance Act 2013.',
    },
    {
      question: 'My employer already deducted my tax. Do I still need to file?',
      answer:
        'Yes. Deduction at source and filing are separate obligations, and without a filed return you will not appear on the Active Taxpayer List. In the return you enter the tax your employer withheld against the section 149 line, code 64020004, so that your admitted tax nets to zero.',
    },
    {
      question: 'Why will IRIS not let me submit my return?',
      answer:
        'Most often because the Unreconciled Amount in the wealth statement, code 703000, is not zero. FBR states that the return process completes only when it has been adjusted to zero. The usual cause is understated personal expenses or an inflow that was never entered.',
    },
    {
      question: 'What is the penalty for filing a tax return late in Pakistan?',
      answer:
        'Under section 182 it is the higher of 0.1% of tax payable per day or Rs 1,000 per day, with a minimum of Rs 10,000 for an individual with 75% or more income from salary and Rs 50,000 otherwise, capped at 200% of tax payable. It is reduced by 75%, 50% or 25% if you file within one, two or three months of the due date.',
    },
    {
      question: 'Can I revise my tax return after filing?',
      answer:
        'Yes. Section 114(6) sets conditions including the Commissioner\'s written approval, but approval is not required if you revise within sixty days of the original filing, is deemed granted if the Commissioner does not respond within sixty days, is deemed granted where you declare more income or less loss, and must be granted for a bona fide omission or wrong statement.',
    },
    {
      question: 'How do I get an extension to file my return?',
      answer:
        'Apply in writing to the Commissioner under section 119, by the due date, on one of the stated grounds: absence from Pakistan, sickness or other misadventure, or other reasonable cause. That is different from the blanket extension FBR sometimes grants everyone under section 214A.',
    },
    {
      question: 'Do overseas Pakistanis have to file a return?',
      answer:
        'It depends on residency, and the test catches people out. Under section 82(d) a Pakistani citizen is resident if not present in any other single country for more than 182 days in the tax year, or not a resident taxpayer of any other country. Living abroad is not by itself an answer.',
    },
  ],

  publishedAt: '2026-09-16T03:00:00Z',
  related: ['salary-tax-slabs', 'how-to-become-a-filer'],

  seo: {
    title: 'How to File Your Income Tax Return in Pakistan (IRIS)',
    description:
      'The IRIS screens in order with the amount codes, why the wealth statement is compulsory for every filer, how to reconcile it to zero, and the late-filing relief nobody mentions.',
  },
};


/**
 * Guide 27: paying FBR.
 *
 * The correction that leads is a source-attribution one. "A PSID is valid for
 * 7 days" is everywhere, and it is PTA's rule for mobile device registration
 * under DIRBS, not an FBR income tax rule. Six FBR sources mention validity
 * exactly zero times, so the honest publication is the negative: FBR documents
 * no expiry, and we assert neither seven days nor "never".
 *
 * The second is another FBR-contradicts-FBR case, the same shape as the ATL
 * weekly-versus-daily one: the Pay Income Tax page still says deposit the slip
 * at NBP or SBP, while FBR's own ADC list shows NBP with ATM and internet
 * banking both disabled across 28 enabled banks.
 */

const PAYING_FBR: Guide = {
  slug: 'how-to-pay-fbr-tax',
  cluster: 'filing',
  title: 'How to Pay Your Tax to FBR',
  navLabel: 'Paying your tax',
  card: 'What a PSID is, where the seven-day expiry story actually comes from, which banks take which channels, and what to do when the receipt does not appear.',

  answer:
    'Create a Payment Slip ID in IRIS, which you can do without logging in, then pay it through your bank: at an ATM, in internet or mobile banking, or over the counter. FBR publishes a list of ADC-enabled banks with a channel-by-channel matrix, and coverage is not uniform. The Computerized Payment Receipt appears in IRIS within 24 hours of payment.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The seven-day PSID expiry is not an FBR rule',
      body: 'Nearly every page on this subject states that a PSID is valid for seven days. That figure comes from a Pakistan Telecommunication Authority press release, and its own title scopes it: "7 Days Validity of Mobile Device Registration Application/Payment Slip Identification". It is a handset registration rule under the DIRBS system, transplanted onto income tax by repetition. We searched FBR\'s e-payment guides, its Pay Income Tax page, its ADC bank list and its ePayment press release for any mention of validity, expiry or seven days, and found none. So the honest position is the negative one: FBR does not document a validity period for an income tax PSID. We are not telling you it lasts seven days, and we are not telling you it never expires either, because neither is sourced. If a slip is old, generate a fresh one, which costs nothing.',
    },

    {
      kind: 'steps',
      heading: 'Creating the payment slip',
      intro:
        'The PSID is the number your bank needs. Everything else follows from it.',
      steps: [
        {
          title: 'Open the e-Payments interface',
          body: 'It sits inside IRIS at the payment route. You do not have to be logged in: the form accepts a CNIC, an NTN or FTN, or a registration number, so it is available to unregistered taxpayers as well as registered ones.',
        },
        {
          title: 'Choose the right head',
          body: 'Income Tax offers Admitted Income Tax, Advance Income Tax, Demanded Income Tax, WPPF and WWF, and miscellaneous. Admitted is what you owe on your own return. Demanded is what an assessment or notice has raised. Advance is a section 147 instalment. Getting this wrong is how a payment goes missing against the wrong liability.',
        },
        {
          title: 'Enter the tax year and the amount',
          body: 'The slip carries the tax year, your registration number, your name, the nature of the payment, your email and mobile, and the amount.',
        },
        {
          title: 'Generate and note the PSID',
          body: 'That number is what you quote at the bank, the ATM or in your banking app.',
        },
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'FBR\'s own page tells you to pay somewhere its own bank list contradicts',
      body: 'Two FBR surfaces disagree and both are live. The Pay Income Tax page still instructs you to log into efile and says the payment slip "can be deposited in any National Bank (NBP)/State Bank (SBP) branch", asking you to pick a city. FBR\'s own List of ADC Enabled Banks shows twenty-eight banks with per-channel flags, and National Bank of Pakistan appears there with ATM and internet banking both marked unavailable. Meanwhile FBR\'s ePayment 2.0 announcement says the separate portal outside IRIS is gone and payment creation now sits directly within IRIS 2.0. Read the bank list rather than the instruction page.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Check your own bank before assuming the channel works',
      body: 'The ADC list is a matrix rather than a yes or no. Some banks support all five channels: ATM, retail internet banking, corporate internet banking, mobile app, and over the counter. Others support one. A large bank supporting internet banking but not its mobile app, or over the counter but nothing electronic, is common in that table. The page carries no last-updated date, which is itself worth knowing, so treat the flags as indicative and confirm with your branch if a channel fails.',
    },

    {
      kind: 'prose',
      heading: 'After you pay: the CPR',
      body: [
        'The Computerized Payment Receipt is the proof, and FBR states it is generated after paying the tax due and reflected in IRIS within twenty-four hours of the payment being deposited. It also goes out by email and SMS.',
        'Twenty-four hours is the documented expectation rather than an instant confirmation, so a receipt that has not appeared an hour after paying is not yet a problem.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Paid at the bank and no receipt appeared: check FBR\'s own record first',
      body: 'This is the scenario that causes the most anxiety and it has a concrete first step nobody publishes. IRIS 2.0 exposes a public Online Verifications menu that works without logging in, and it includes Payment Slip ID and Computerized Payment Receipt verification. Look the PSID up there before doing anything else: it tells you whether FBR has the payment against your slip, which is a different question from whether your bank debited you. If FBR has it, the CPR is a timing matter. If FBR does not have it after twenty-four hours, you have a bank-side problem to raise with the branch, with your PSID and the debit on your statement.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'What we could not establish, and will not invent',
      body: 'FBR documents the twenty-four hour expectation and the verification tool, and does not document what to do if the receipt still has not appeared afterwards. The advice that circulates, to take your bank statement and PSID to your RTO, is plausible and we have not found it in any FBR source. We are telling you it is what the field advises rather than presenting it as FBR procedure. FBR\'s own documented support channels are helpline@fbr.gov.pk and the helpline on (051) 111 772 772, open 9am to 11pm Monday to Friday. A widely circulated 0800 number appears in no FBR source we could find.',
    },

    {
      kind: 'prose',
      heading: 'Advance tax is a different payment on a different timetable',
      body: [
        'Admitted tax on a return is due on the return\'s due date. Advance tax under section 147 is separate, and the dates depend on who you are: an individual pays by the fifteenth of September, December, March and June, while an association of persons or a company pays by the twenty-fifth for the first three and the fifteenth in June. Only the June quarter is shared, and tables printing one set of dates for everyone are wrong for half their readers.',
        'Advance tax does not reach an individual whose latest assessed taxable income, excluding salary already taxed under section 149, is below one million rupees. And note the test is on assessed history rather than on what you expect to earn, so a first year of self-employment generally has nothing to compute against.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Late payment is a surcharge, not the late-filing penalty',
      body: 'Two charges get run together. The section 182 penalty is for filing late, tapering by 75, 50 or 25 per cent if you file within one, two or three months of the due date. The section 205 default surcharge is for paying late, computed at twelve per cent a year or KIBOR plus three per cent, whichever is higher, running from the due date to the date of payment. Filing on time and paying late attracts the second and not the first.',
    },
  ],

  faqs: [
    {
      question: 'How long is a PSID valid in Pakistan?',
      answer:
        'FBR does not document a validity period for an income tax PSID. The seven-day figure that circulates is a Pakistan Telecommunication Authority rule for mobile device registration under DIRBS, and the PTA notice says so in its own title. If a slip is old, generate a new one.',
    },
    {
      question: 'Can I create a PSID without logging into IRIS?',
      answer:
        'Yes. The e-Payments interface accepts a CNIC, an NTN or FTN, or a registration number without a login, so both registered and unregistered taxpayers can create one.',
    },
    {
      question: 'Where can I pay my FBR tax?',
      answer:
        'Through a bank on FBR\'s List of ADC Enabled Banks, which covers twenty-eight banks across five channels: ATM, retail and corporate internet banking, mobile app, and over the counter. Coverage differs by bank, so check the matrix rather than assuming your channel works.',
    },
    {
      question: 'How long does a CPR take to appear?',
      answer:
        'FBR states the Computerized Payment Receipt is reflected in IRIS within twenty-four hours of the payment being deposited, and is also sent by email and SMS.',
    },
    {
      question: 'I paid but no CPR appeared. What do I do?',
      answer:
        'Use the public PSID and CPR verification service in the IRIS Online Verifications menu, which needs no login, to see whether FBR has the payment against your slip. That separates a timing question from a bank-side failure. FBR does not document an escalation route beyond that; the common advice to take your statement and PSID to your RTO is field practice rather than published procedure.',
    },
    {
      question: 'Which payment head do I choose in IRIS?',
      answer:
        'Admitted Income Tax for what you owe on your own return, Demanded Income Tax for an amount raised by an assessment or notice, and Advance Income Tax for a section 147 instalment. Choosing the wrong head is how a payment ends up credited against the wrong liability.',
    },
    {
      question: 'When is advance tax due in Pakistan?',
      answer:
        'For an individual, by 15 September, 15 December, 15 March and 15 June. For an association of persons or a company, by 25 September, 25 December, 25 March and 15 June. Only the June quarter is the same for everyone.',
    },
    {
      question: 'What is the penalty for paying tax late?',
      answer:
        'Paying late attracts the section 205 default surcharge, at twelve per cent a year or KIBOR plus three per cent, whichever is higher, from the due date until payment. That is separate from the section 182 penalty, which is for filing late.',
    },
  ],

  publishedAt: '2026-09-23T03:00:00Z',
  related: ['how-to-file-your-tax-return', 'filer-vs-non-filer'],

  seo: {
    title: 'How to Pay Your Tax to FBR: PSID, Challan and CPR',
    description:
      'Creating a payment slip without logging in, why the seven-day expiry is a PTA rule, which banks support which channels, and what to do when the receipt does not appear.',
  },
};


/**
 * Guide 28: getting back into IRIS.
 *
 * The finding that carries it: IRIS has a self-service Account Recovery branch
 * for people who have lost access to BOTH their registered email and mobile,
 * verified verbatim from the live portal. Essentially every competitor sends
 * that reader to an RTO or a paid recovery agent, and TaxationPk reported the
 * feature was introduced precisely because people were doing exactly that.
 *
 * Second: there is no forgot-PIN flow. Change PIN requires being logged in, so
 * a lost PIN is recovered password-first. Guides telling readers to "reset your
 * PIN" describe something that does not exist.
 *
 * Third, and the structural explanation for everything else: a mobile number
 * can be changed online through Form 181, and an email cannot. That asymmetry
 * is why losing the email is the harder problem, and it is why the Account
 * Recovery branch works by updating the mobile against your CNIC.
 */

const IRIS_ACCESS: Guide = {
  slug: 'iris-login-and-account-recovery',
  cluster: 'filing',
  title: 'Getting Back Into IRIS',
  navLabel: 'IRIS access',
  card: 'The recovery route for people who have lost both their registered email and phone, why there is no forgot-PIN link, and what you can change online.',

  answer:
    'IRIS has two recovery routes, not one. Forgot Password works where you still have your registered email and mobile. Account Recovery exists for where you have lost access to either, and recovers the account by updating the mobile number registered against your CNIC. It is self-service: you do not need to visit an RTO, and you should not be paying an agent for it.',

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'If you have lost your email and your phone, there is still a route',
      body: 'This is the thing worth knowing and almost nothing published says it. The IRIS recovery screen offers two branches in its own words. "Forgot Password? Where you have access to your Email Address and Mobile Number registered with FBR." And separately: "Account Recovery? Where you do not have access to either your Mobile Number or Email Address registered with FBR and want to recover your account by updating your Mobile Number registered against your CNIC." The second branch is the one people are told does not exist. It is self-service, and it was introduced precisely because taxpayers in that position were visiting RTOs or paying recovery agents.',
    },

    {
      kind: 'prose',
      heading: 'Why Forgot Password fails for so many people',
      body: [
        'The ordinary route requires both channels. FBR issues a code to your registered email and a code to your registered mobile, and you need both, so losing either one breaks it. That is stricter than most portals and it is why the second branch had to exist.',
        'It also explains a common frustration: someone who still has their phone but registered with an old work email finds Forgot Password unusable even though they can receive the SMS. That is the case Account Recovery covers.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'There is no forgot-PIN link, and looking for one wastes an afternoon',
      body: 'IRIS uses two credentials. The password logs you in; the PIN authorises submissions, which is why you are asked for it when you file rather than when you sign in. Both are issued together at enrollment, to your email and your mobile. FBR documents e-enrollment, Forgot Password, Change Password and Change PIN, and Change PIN requires you to be logged in already. So there is no recovery flow for a forgotten PIN as such: you log in with your password and have a new PIN issued to your registered email. If you have lost both, the password comes first and the PIN follows.',
    },

    {
      kind: 'table',
      heading: 'What you can change online, and what needs a visit',
      intro:
        'From FBR\'s own change-of-particulars page. The split is the reason a lost email is a harder problem than a lost phone.',
      columns: ['Change', 'How'],
      rows: [
        ['Mobile number', 'Online, through Form 181'],
        ['Email address', 'RTO visit'],
        ['Residential or business address', 'Online, through Form 181'],
        ['Bank account', 'Online, through Form 181'],
        ['CNIC number', 'RTO visit'],
        ['Jurisdiction, or deregistration', 'RTO visit'],
      ],
    },

    {
      kind: 'prose',
      heading: 'The asymmetry explains the design',
      body: [
        'A mobile number can be updated online and an email cannot. That is exactly why the Account Recovery branch works the way it does: it recovers your account by updating the mobile registered against your CNIC, using the one channel FBR is willing to let you change without a counter visit.',
        'A modification is decided by the Commissioner, and where it is refused there is a representation to the Chief Commissioner available within thirty days. No FBR source we read documents a biometric or NADRA verification requirement for changing particulars, although vendors frequently assert one.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'The SIM has to be in your own name, and not already used with FBR',
      body: 'Registration requires a mobile with a SIM registered against your own CNIC, and a personal email address belonging to you. For an association of persons or a company registering at a facilitation counter, FBR adds a constraint people trip over: the SIM must be registered against the person\'s own CNIC and not already registered with FBR. So a principal officer whose number is already tied to their personal registration cannot reuse it for the company. Plan a second number before the appointment rather than discovering it there.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Sessions close after fifteen minutes',
      body: 'IRIS closes a session automatically after fifteen minutes of inactivity, which is short enough to catch you mid-return while you look for a figure. It does permit multiple simultaneous sessions, so you can have the return open in one tab and a verification service in another. Save often: the fifteen-minute timeout has cost more unsaved returns than any other feature of the portal.',
    },

    {
      kind: 'prose',
      heading: 'Registration is not finished when you can log in',
      body: [
        'This is a different problem that presents the same way, and it is worth ruling out before assuming an access fault. FBR\'s own guide warns that just after login you cannot file a return unless the registration process is completed by submitting the registration application.',
        'Form 181 has to be submitted from the Draft folder. Creating the login, seeing a dashboard and stopping there is the single most common structural failure in the whole process, and the symptom is that filing options appear absent rather than that anything looks broken.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'If Form 181 itself is unavailable, that may not be your account',
      body: 'A note on something that looks like a personal fault and is not. FBR suspended the Form 181 change-in-particulars facility during 2026, reported in August, and the Pakistan Tax Bar Association wrote to the Member Inland Revenue asking for it to be restored. If the modification route is simply missing rather than rejecting you, it is worth checking whether the facility is available at all before assuming your registration is at fault. We have not been able to establish whether it has since been restored.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'What we could not establish about account suspension',
      body: 'FBR documents cancellation of registration by the Commissioner, where there is no outstanding liability and the particulars warrant it. It does not document account suspension or lockout: what causes it, or how to get out of it. The advice that too many failed logins locks the account and that you should ring a particular 0800 number is tier-four material, and that number appears in no FBR source we could find. FBR\'s documented channels are helpline@fbr.gov.pk and (051) 111 772 772, 9am to 11pm Monday to Friday.',
    },
  ],

  faqs: [
    {
      question: 'I lost access to my registered email and phone. Can I still recover my IRIS account?',
      answer:
        'Yes, and without visiting an RTO. The IRIS recovery screen has a second branch, Account Recovery, for exactly that case: where you do not have access to either your registered mobile or email, and want to recover the account by updating the mobile number registered against your CNIC.',
    },
    {
      question: 'How do I reset my IRIS password?',
      answer:
        'Through Forgot Password, which requires both your registered email and your registered mobile, because FBR sends a code to each. If you have lost access to either, use the Account Recovery branch instead.',
    },
    {
      question: 'How do I reset my IRIS PIN?',
      answer:
        'There is no forgot-PIN flow. Change PIN requires you to be logged in, so recovery is password-first: log in with your password and have a new PIN issued to your registered email. Guides describing a PIN reset link are describing something that does not exist.',
    },
    {
      question: 'What is the difference between the IRIS password and the PIN?',
      answer:
        'The password logs you in. The PIN authorises submissions, which is why it is asked for when you file rather than when you sign in. Both are issued together at e-enrollment, to your email and mobile.',
    },
    {
      question: 'Can I change my registered email in IRIS online?',
      answer:
        'No. FBR allows the mobile number, addresses and bank account to be changed online through Form 181, but the email address, CNIC, jurisdiction and deregistration all require an RTO visit. That asymmetry is why a lost email is harder than a lost phone.',
    },
    {
      question: 'Can I use the same mobile number for my company registration?',
      answer:
        'Not if it is already registered with FBR. For an association or company registering at a facilitation counter, the SIM must be registered against the person\'s own CNIC and not already registered with FBR, so a principal officer generally needs a second number.',
    },
    {
      question: 'Why can I log into IRIS but not file a return?',
      answer:
        'Most likely because registration was never completed. FBR warns that just after login you cannot file unless the registration application has been submitted, which means Form 181 has to go from the Draft folder. A dashboard appearing does not mean registration finished.',
    },
    {
      question: 'What is FBR\'s helpline number for IRIS problems?',
      answer:
        'helpline@fbr.gov.pk, and (051) 111 772 772 nationally, 9am to 11pm Monday to Friday. A widely circulated 0800 number appears in no FBR source we could find.',
    },
  ],

  publishedAt: '2026-09-23T07:00:00Z',
  related: ['how-to-file-your-tax-return', 'how-to-get-an-ntn'],

  seo: {
    title: 'Getting Back Into IRIS: Password, PIN and Account Recovery',
    description:
      'The self-service route for people who have lost both their registered email and phone, why there is no forgot-PIN link, and what needs an RTO visit.',
  },
};


/**
 * Guide 29: when FBR amends your assessment.
 *
 * Written for someone who has just received a notice, which shapes it: the
 * useful things are the limitation period and the right to be heard, and both
 * belong near the top rather than after ten paragraphs of background.
 *
 * The correction is the limitation period. It runs five years from the end of
 * the FINANCIAL YEAR in which the order issued, not five years from filing,
 * which typically buys the reader several extra months over the version they
 * have read.
 */

const AMENDED_ASSESSMENT: Guide = {
  slug: 'when-fbr-amends-your-assessment',
  cluster: 'filing',
  title: 'When FBR Amends Your Assessment',
  navLabel: 'Amended assessments',
  card: 'How long FBR has to reopen a return, the hearing it cannot skip, and why filing is itself an assessment order.',

  answer:
    'Your filed return is treated as an assessment order deemed issued by the Commissioner, and section 122 lets him amend it within five years from the end of the financial year in which that order issued. No amendment can be made without giving you an opportunity of being heard, and that applies even to the broad power to correct an assessment prejudicial to revenue.',

  sections: [
    {
      kind: 'note',
      tone: 'info',
      heading: 'Your return is already an assessment order',
      body: 'This surprises people and it explains the shape of everything else. Under section 120 a complete return is treated as an assessment order deemed to have been issued by the Commissioner on the day it was furnished. Nobody approves it. That is what self-assessment means, and it is why section 122 talks about AMENDING an assessment rather than making one: there is already an order in existence, and it is yours.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Five years from the end of the financial year, not five years from filing',
      body: 'Section 122(2) says no order shall be amended after the expiry of five years from the end of the financial year in which the Commissioner issued, or is treated as having issued, the assessment order. The distinction matters and most summaries flatten it. The clock does not start when you filed, and it does not start at the end of the tax year the return relates to. It starts at the end of the financial year in which the order came into existence, which for a self-assessed return is the year you filed in. In practice that gives FBR longer than a naive reading suggests, and it is the figure to work from when someone tells you a year is closed.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'You cannot be assessed without being heard',
      body: 'Section 122(9) is short and it is the provision to know if a notice has arrived: no assessment shall be amended, or further amended, under this section unless the taxpayer has been provided with an opportunity of being heard. Note where it bites hardest. Section 122(5A) gives the Commissioner a broad power to amend where he considers an assessment erroneous in so far as it is prejudicial to the interest of revenue, and that sub-section opens by making itself subject to sub-section (9). The widest power in the section is expressly conditioned on hearing you first.',
    },

    {
      kind: 'prose',
      heading: 'An amended assessment can itself be amended',
      body: [
        'Section 122(4) allows further amendment of an assessment that has already been amended, and it says so in terms: as many times as may be necessary. So a first amendment is not a settlement.',
        'The window for that is the later of two periods: five years from the end of the financial year of the original order, or one year from the end of the financial year in which the amended order issued. The second limb is what keeps a late amendment open a little longer, and it is why a revision late in the five-year window does not close the matter the following month.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Revising your own return is an amendment too',
      body: [
        'Section 122(3) treats a revised return under section 114(6) as an amended assessment made by the Commissioner, deemed issued on the day you furnished it. Your revision is not a request that someone then processes; it takes effect as an order.',
        'That is worth knowing alongside the conditions on revising. Approval is not needed at all within sixty days of the original filing, is deemed granted if the Commissioner does not pass a written order within sixty days of your asking, is deemed granted where the revision declares more income or less loss, and must be granted for a bona fide omission or wrong statement.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'What a notice is asking for, and what it is not',
      body: 'A notice under section 122 is the start of a process in which you are entitled to respond, not a demand that has already been decided. The Commissioner must record his reasons in writing where he forms an opinion that an amendment is needed, and section 122(9) requires the hearing. Answering it properly and on time is the whole of the opportunity the section gives you, and the most expensive thing a reader can do with one is to ignore it and deal with the consequence later.',
    },

    {
      kind: 'prose',
      heading: 'Where the return is automatically corrected instead',
      body: [
        'Not everything that changes a return goes through section 122. A complete return is run through an automated system that can correct arithmetical errors, disallow claims that are wrong on the face of the return, and adjust losses.',
        'FBR must issue a system-generated notice first and consider your response, and if you do not respond within thirty days the adjustment is made anyway. If no adjustment happens within six months of filing, the return as you declared it stands. So a small correction arriving shortly after filing is usually this rather than an assessment being reopened.',
      ],
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Foreign assets sit outside the ordinary limitation',
      body: 'One important carve-out for anyone with assets abroad. Where an asset is situated outside Pakistan, section 111(2)(ii) charges an unexplained amount in the tax year immediately preceding the year in which the Commissioner discovers it, which is effectively an open-ended lookback rather than a fixed window. Section 123(1A) separately allows a provisional assessment at any time where an undeclared offshore asset comes to light. The five-year comfort in section 122 does not extend to an undeclared foreign asset.',
    },
  ],

  faqs: [
    {
      question: 'How long can FBR reopen my tax return?',
      answer:
        'Five years from the end of the financial year in which the assessment order was issued or treated as issued, under section 122(2). For a self-assessed return that means the financial year you filed in, not the tax year the return covers.',
    },
    {
      question: 'Can FBR amend my assessment without telling me?',
      answer:
        'No. Section 122(9) provides that no assessment shall be amended or further amended unless the taxpayer has been provided with an opportunity of being heard, and the broad power in section 122(5A) is expressly made subject to it.',
    },
    {
      question: 'Is my filed return an assessment order?',
      answer:
        'Yes. Section 120 treats a complete return as an assessment order deemed issued by the Commissioner on the day it was furnished. That is why section 122 speaks of amending an assessment rather than making one.',
    },
    {
      question: 'Can an amended assessment be amended again?',
      answer:
        'Yes. Section 122(4) permits further amendment as many times as may be necessary, within the later of five years from the end of the financial year of the original order or one year from the end of the financial year in which the amended order issued.',
    },
    {
      question: 'Does revising my own return count as an amendment?',
      answer:
        'Yes. Section 122(3) treats a revised return under section 114(6) as an amended assessment made by the Commissioner and deemed issued on the day you furnished it.',
    },
    {
      question: 'What is section 122(5A)?',
      answer:
        'The power to amend where the Commissioner considers an assessment erroneous in so far as it is prejudicial to the interest of revenue. It is the widest power in the section and it opens by making itself subject to sub-section (9), the right to be heard.',
    },
    {
      question: 'Does the five-year limit apply to foreign assets?',
      answer:
        'Not in the same way. Section 111(2)(ii) charges an unexplained offshore asset in the tax year immediately preceding the year the Commissioner discovers it, and section 123(1A) allows a provisional assessment at any time for an undeclared offshore asset.',
    },
    {
      question: 'FBR corrected my return a few weeks after filing. Is that an amended assessment?',
      answer:
        'Probably not. A complete return is run through an automated process that corrects arithmetical errors and disallows claims wrong on the face of the return, after a system-generated notice. If no adjustment is made within six months of filing, the return as declared stands.',
    },
  ],

  publishedAt: '2026-09-24T03:00:00Z',
  related: ['how-to-file-your-tax-return', 'how-to-pay-fbr-tax'],

  seo: {
    title: 'When FBR Amends Your Assessment: Section 122',
    description:
      'How long FBR has to reopen a return, why the clock runs from the financial year rather than from filing, the hearing that cannot be skipped, and the offshore carve-out.',
  },
};


/**
 * Guide 30: advance tax under section 147.
 *
 * Two corrections carry it, and the first was one of our own. The instalment
 * dates are NOT the same for everyone: s.147(5) gives an individual the 15th
 * of September, December, March and June, while s.147(5A) gives an association
 * or company the 25th for the first three and the 15th in June. Tables
 * printing one set of dates are wrong for half their readers.
 *
 * The second is who is caught at all. The s.147(2) threshold measures LATEST
 * ASSESSED taxable income, excluding salary already withheld under s.149, so a
 * first-year self-employed reader has nothing to compute against and a purely
 * salaried reader is generally outside the section entirely.
 */

const ADVANCE_TAX: Guide = {
  slug: 'advance-tax-section-147',
  cluster: 'filing',
  title: 'Advance Tax in Pakistan: Who Pays and When',
  navLabel: 'Advance tax',
  card: 'Why most salaried people are outside it, why a first year of self-employment usually is too, and the quarterly dates that differ by who you are.',

  answer:
    'Advance tax under section 147 is paid quarterly by taxpayers whose latest assessed taxable income, excluding salary already withheld, reaches one million rupees. An individual pays by the fifteenth of September, December, March and June. An association or company pays by the twenty-fifth for the first three quarters and the fifteenth in June.',

  sections: [
    {
      kind: 'note',
      tone: 'warning',
      heading: 'The dates are not the same for everyone',
      body: 'This is the most commonly copied error on the subject. Section 147(5) sets an individual\'s dates as the fifteenth day of September, December, March and June. Section 147(5A) sets separate dates for an association of persons or a company: the twenty-fifth of September, the twenty-fifth of December, the twenty-fifth of March, and the fifteenth of June. Three of the four differ by ten days, and only the June quarter is shared. A table giving one set of dates for all taxpayers is wrong for whichever half of its readers it does not describe.',
    },

    {
      kind: 'table',
      heading: 'When each instalment falls due',
      intro:
        'Sections 147(5) and 147(5A). Note that June is the exception in both columns.',
      columns: ['Quarter', 'Individual', 'Association or company'],
      rows: [
        ['September', '15 September', '25 September'],
        ['December', '15 December', '25 December'],
        ['March', '15 March', '25 March'],
        ['June', '15 June', '15 June'],
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'If you are salaried, this probably does not reach you',
      body: 'Section 147(1)(c) excludes income subject to deduction at source under section 149, which is salary. Section 147(2) then measures the threshold on taxable income EXCLUDING that. So a salaried person whose employer is deducting correctly does not reach the one million rupee test on salary alone, and is generally outside advance tax entirely. The people actually caught are those with business income, property income or other unwithheld income above the threshold.',
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'A first year of self-employment usually has nothing to pay',
      body: 'Read section 147(2) closely: it turns on the individual\'s LATEST ASSESSED taxable income, not on what you expect to earn this year. Someone in their first year of freelancing or business has no assessed history to measure against, so there is nothing for the section to compute an instalment from. That is a genuine and widely misunderstood point: advance tax is backward-looking, and the anxiety about owing quarterly instalments on a business that has only just started is usually misplaced. The liability catches up the following year, once a year has been assessed.',
    },

    {
      kind: 'prose',
      heading: 'How an individual\'s instalment is computed',
      body: [
        'Section 147(4B) gives the formula for an individual with latest assessed income of one million rupees or more: A divided by four, less B. A is the tax assessed for the latest tax year. B is tax already paid in that quarter and creditable under section 168, other than tax deducted under section 149.',
        'So it is last year\'s assessed tax, spread across four quarters, reduced by whatever has already been collected from you during the quarter. The exclusion of section 149 salary deductions from B is deliberate and matches the exclusion of salary from the threshold itself.',
      ],
    },

    {
      kind: 'prose',
      heading: 'Where the estimate matters',
      body: [
        'The formula runs on last year, which is a problem in a year when income has moved. Section 147 provides for an estimate: a taxpayer required to pay under the company formula must estimate the tax payable for the relevant year before the second instalment is due, and where the figure is likely to exceed what the formula produces, furnish that estimate and pay half of it by the second quarter, with the remainder in two equal instalments in the third and fourth quarters.',
        'Note the direction. The machinery is aimed at a year when income has RISEN above last year\'s, not at reducing instalments in a bad year. A business having a poor year should take advice rather than assume it can simply pay less.',
      ],
    },

    {
      kind: 'note',
      tone: 'info',
      heading: 'Minimum and super tax count toward it',
      body: 'Section 147(4AA) provides that liability under sections 4C, 113 and 113C is also taken into account in working out advance tax under the section. So a company computing instalments cannot look only at ordinary income tax: the super tax under 4C and the minimum turnover tax under 113 form part of the figure being spread across the quarters.',
    },

    {
      kind: 'note',
      tone: 'warning',
      heading: 'Paying late is a surcharge, and it is not the filing penalty',
      body: 'Missing an instalment attracts the section 205 default surcharge, computed at twelve per cent a year or KIBOR plus three per cent, whichever is higher, and advance tax is dealt with specifically in section 205(1A). That is a different charge from the section 182 penalty for filing a return late, which tapers if you file within one, two or three months of the due date. The two are routinely conflated, and someone who has filed on time but paid late is looking at the surcharge only.',
    },

    {
      kind: 'prose',
      heading: 'Advance tax is a credit, not an extra tax',
      body: [
        'Everything paid under section 147 is creditable against your liability for the year when you file. It is a timing mechanism rather than an additional charge, which is worth stating because the quarterly demand feels like a new tax when it first arrives.',
        'Where the instalments exceed what the return eventually shows, the excess is recoverable through the return in the ordinary way. Where they fall short, the balance is due on the return\'s due date.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Who has to pay advance tax in Pakistan?',
      answer:
        'A taxpayer whose income was charged to tax for the latest tax year, subject to exclusions. For an individual, section 147(2) disapplies the section where latest assessed taxable income, excluding salary withheld under section 149 and certain other categories, is less than one million rupees.',
    },
    {
      question: 'When is advance tax due?',
      answer:
        'For an individual, 15 September, 15 December, 15 March and 15 June. For an association of persons or a company, 25 September, 25 December, 25 March and 15 June. Only the June quarter is the same for both.',
    },
    {
      question: 'Do salaried people pay advance tax?',
      answer:
        'Generally not. Section 147(1)(c) excludes income subject to section 149 salary withholding, and the section 147(2) threshold is measured excluding it, so a salaried person whose employer deducts correctly does not reach the test on salary alone.',
    },
    {
      question: 'I just started freelancing. Do I owe advance tax this year?',
      answer:
        'Usually not. The threshold in section 147(2) is measured on your LATEST ASSESSED taxable income, so with no assessed year behind you there is nothing for the section to compute an instalment from. It generally begins to apply once a year has been assessed.',
    },
    {
      question: 'How is an individual\'s advance tax instalment calculated?',
      answer:
        'Under section 147(4B), as A divided by four less B, where A is the tax assessed for the latest tax year and B is tax already paid in the quarter creditable under section 168 other than section 149 salary deductions.',
    },
    {
      question: 'What happens if I miss an advance tax instalment?',
      answer:
        'The section 205 default surcharge applies, at twelve per cent a year or KIBOR plus three per cent, whichever is higher, with advance tax dealt with in section 205(1A). That is separate from the section 182 penalty for late filing.',
    },
    {
      question: 'Is advance tax an extra tax?',
      answer:
        'No, it is a timing mechanism. Everything paid under section 147 is creditable against your liability for the year, and any excess is recoverable through your return.',
    },
    {
      question: 'Does super tax count toward advance tax?',
      answer:
        'Yes. Section 147(4AA) provides that liability under sections 4C, 113 and 113C is taken into account in working out the advance tax liability, so super tax and minimum turnover tax form part of the figure spread across the quarters.',
    },
  ],

  publishedAt: '2026-09-24T07:00:00Z',
  related: ['how-to-pay-fbr-tax', 'tax-for-freelancers'],

  seo: {
    title: 'Advance Tax in Pakistan: Section 147 Explained',
    description:
      'Why most salaried people and most first-year freelancers are outside it, the quarterly dates that differ between individuals and companies, and how the instalment is computed.',
  },
};

export const FILING_GUIDES: Guide[] = [
  FILING_A_RETURN,
  PAYING_FBR,
  IRIS_ACCESS,
  AMENDED_ASSESSMENT,
  ADVANCE_TAX,
];




