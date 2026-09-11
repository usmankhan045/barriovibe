import Link from "next/link";
import { Icon } from "@/components/icons";
import type { GuideSection } from "@/content/guides";
import { TOOLS, toolHref } from "@/content/tools";

/**
 * The shared section renderer, used by both GuidePage and PostPage.
 *
 * ## Why this is its own module
 *
 * It began inside GuidePage, and when posts arrived the obvious move was to
 * copy it. That is precisely the duplication research/EXECUTION.md records as a
 * shipped defect: a table that lived in two pages and could drift apart, found
 * only because someone read both. A section renderer copied into two files has
 * the same failure mode and a wider blast radius, because a spacing or heading
 * change would then land on guides and silently not on posts.
 *
 * So there is one renderer and both page types import it. A new section kind,
 * an anchor change or a schema treatment reaches every page at once, which is
 * the property that made the closed section union worth having in the first
 * place.
 */

/** A rendered block. Headings are h2 so the outline stays flat under one h1. */
/**
 * A stable anchor for a section heading.
 *
 * Purpose is citation rather than navigation: a fragment gives an assistant or
 * a reader a way to point at the specific passage that answers a question,
 * instead of at the page as a whole. Derived from the heading text so it stays
 * meaningful, and stable as long as the heading is.
 */
export function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function ContentBlock({ section }: { section: GuideSection }) {
  switch (section.kind) {
    case "prose":
      return (
        <div className="mt-12 first:mt-0">
          {section.heading && (
            <h2
              id={headingId(section.heading)}
              className="font-display text-h3 text-ink"
            >
              {section.heading}
            </h2>
          )}
          <div className={section.heading ? "mt-5" : ""}>
            {section.body.map((p) => (
              <p
                key={p}
                className="mt-4 text-[16px] leading-[1.7] text-ink-body first:mt-0"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      );

    case "list":
      return (
        <div className="mt-12">
          <h2
            id={headingId(section.heading)}
            className="font-display text-h3 text-ink"
          >
            {section.heading}
          </h2>
          {section.intro && (
            <p className="mt-5 text-[16px] leading-[1.7] text-ink-body">
              {section.intro}
            </p>
          )}
          <ul className="mt-6 flex flex-col gap-3">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span
                  className="mt-2 size-1.5 flex-none rounded-pill bg-blue-600"
                  aria-hidden="true"
                />
                <span className="text-[15.5px] leading-[1.65] text-ink-strong">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "steps":
      return (
        <div className="mt-12">
          <h2
            id={headingId(section.heading)}
            className="font-display text-h3 text-ink"
          >
            {section.heading}
          </h2>
          {section.intro && (
            <p className="mt-5 text-[16px] leading-[1.7] text-ink-body">
              {section.intro}
            </p>
          )}
          {/* An ordered list because the order is load-bearing: this is what a
              HowTo schema would be built from if the guide declared one. */}
          <ol className="mt-6 flex flex-col gap-5">
            {section.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-7 flex-none place-items-center rounded-pill bg-blue-50 text-[13px] font-bold text-blue-600">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15.5px] font-bold text-ink-strong">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-[1.65] text-ink-body">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case "note":
      return (
        <aside
          className={`u-tile mt-10 p-6 md:p-7 ${
            section.tone === "warning" ? "border-l-2 border-l-blue-600" : ""
          }`}
        >
          <h2
            id={headingId(section.heading)}
            className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-body"
          >
            {section.heading}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-ink-strong">
            {section.body}
          </p>
        </aside>
      );

    case "table":
      return (
        <div className="mt-12">
          <h2
            id={headingId(section.heading)}
            className="font-display text-h3 text-ink"
          >
            {section.heading}
          </h2>
          {section.intro && (
            <p className="mt-5 text-[16px] leading-[1.7] text-ink-body">
              {section.intro}
            </p>
          )}
          <div className="u-tile mt-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.08em] text-ink-body">
                    {section.columns.map((c) => (
                      <th key={c} scope="col" className="px-6 py-4 font-bold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row) => (
                    <tr
                      key={row.join("|")}
                      className="border-b border-line last:border-0"
                    >
                      {row.map((cell, i) => (
                        <td
                          key={cell + i}
                          className={
                            i === 0
                              ? "px-6 py-3.5 text-ink-strong"
                              : "px-6 py-3.5 tabular-nums text-ink-body"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "calculator": {
      const tool = TOOLS.find((t) => t.slug === section.toolSlug);
      if (!tool) return null;
      return (
        <div className="u-tile mt-10 p-6 md:p-7">
          <h2
            id={headingId(section.heading)}
            className="font-display text-h3 text-ink"
          >
            {section.heading}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.65] text-ink-body">
            {section.body}
          </p>
          <Link
            href={toolHref(tool)}
            className="u-arrow-link mt-5 inline-flex text-caption"
          >
            {tool.navLabel}
            <Icon name="arrow-right" size={15} className="u-arrow-link__icon" />
          </Link>
        </div>
      );
    }
  }
}

