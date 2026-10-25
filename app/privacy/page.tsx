import { LegalPage } from '@/components/sections/LegalPage';
import { BRAND, CONTACT } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${BRAND.name} collects, uses and stores personal data submitted through this website, and how to have it deleted.`,
  path: '/privacy',
});

/**
 * ⚠ TEMPLATE — reviewed by a lawyer before launch.
 *
 * This describes what the site actually does today, which is deliberately
 * little: one contact form and one consent-controlled advertising pixel.
 * Any change to collection or sharing must update this page in the same
 * commit so the policy continues to describe the deployed site.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Legal"
      lines={['How we handle']}
      accent="your information"
      path="/privacy"
      updated="25 October 2026"
    >
      <p>
        This policy explains what {BRAND.legalName} does with personal information
        submitted through this website. It is written to describe what actually happens,
        not to cover every theoretical possibility.
      </p>

      <h2>What we collect directly</h2>
      <p>
        Only what you type into the contact form: your name, email address, and
        optionally your phone number, company name, the service you are interested in
        and your message. We also record which page you submitted from,
        so we know what you were reading.
      </p>
      <p>
        We store a one-way hash of your IP address and your browser&rsquo;s user-agent
        string. The hash lets us identify repeated automated submissions without
        retaining your actual IP address, which we have no use for.
      </p>

      <h2>TikTok advertising measurement</h2>
      <p>
        If you select &ldquo;Allow TikTok&rdquo; in the privacy choices, this site loads
        the TikTok Pixel. It measures page visits and whether an enquiry was submitted
        so we can understand and improve our TikTok advertising. The Pixel may send
        TikTok event information, timestamps, your IP address, browser and device
        information, page metadata and cookie identifiers. The Lead event added by this
        site contains no form fields: we do not add your name, email address, phone
        number, message or selected service to it.
      </p>
      <p>
        TikTok does not load before you allow it. If you reject it, the site continues
        to work normally. Your choice is saved in your browser&rsquo;s local storage and
        can be changed at any time through &ldquo;Privacy choices&rdquo; in the footer.
      </p>

      <h2>Why we hold it</h2>
      <p>
        To reply to your enquiry and to keep a record of the conversation if you become
        a client. We do not sell or rent your enquiry details, and we do not add you to
        a mailing list. With consent, the separate TikTok Pixel data is used to measure
        and improve advertising performance as described above.
      </p>

      <h2>Where it is stored</h2>
      <p>
        Enquiries are stored in a Supabase database with access restricted to our team.
        Data is transmitted over HTTPS. Our database credentials are held on the server
        only and are never present in your browser.
      </p>
      <p>
        TikTok receives consented Pixel events directly from your browser and handles
        that information under its own privacy terms.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries that do not lead to work are deleted after 24 months. Client records
        are retained for as long as the relationship continues, and afterwards for the
        period required by Pakistani tax and corporate record-keeping law.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us at any time for a copy of what we hold about you, ask us to
        correct it, or ask us to delete it. Email{' '}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will action it
        within 30 days. There is no charge and you do not need to give a reason.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change the advertising measurement, add a chat widget, or make any other
        change to data collection, this page will be updated at the same time and the
        date at the top will change.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        , or {CONTACT.phone}.
      </p>
    </LegalPage>
  );
}
