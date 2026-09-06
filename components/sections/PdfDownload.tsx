import { Icon } from '@/components/icons';

/**
 * The download link for a generated PDF.
 *
 * ## Why a plain anchor and not a button
 *
 * Because it is navigation to a file. An `<a href>` gets middle-click,
 * cmd-click, "save link as" and "copy link address" from the browser for free,
 * and a crawler can follow it to index the PDF. A button with a click handler
 * would take all of that away in exchange for nothing.
 *
 * `download` asks the browser to save rather than open in a viewer, which is
 * what somebody clicking "Download" almost always meant. It is a hint rather
 * than a guarantee: some browsers open PDFs inline regardless, which is fine.
 *
 * ## Why the size is stated
 *
 * A download of unknown size on a metered Pakistani mobile connection is a
 * small act of faith. Saying "38 KB" removes the question, and these files are
 * small enough that saying so is reassuring rather than alarming.
 */
export function PdfDownload({
  href,
  label,
  meta,
}: {
  href: string;
  label: string;
  /** Size and page count, e.g. "PDF, 38 KB". */
  meta: string;
}) {
  return (
    <a
      href={href}
      download
      className="u-tap inline-flex items-center gap-3 rounded-chip border border-line bg-surface px-4 py-3 text-left transition-colors hover:border-blue-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
    >
      <Icon name="document" className="size-5 flex-none text-blue-600" />
      <span>
        <span className="block font-display text-[14px] font-bold text-ink">{label}</span>
        <span className="mt-0.5 block text-[12.5px] text-ink-body">{meta}</span>
      </span>
    </a>
  );
}
