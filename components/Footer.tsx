import Logo from './Logo';
import { footer, site } from '@/lib/content';
import { footerLegalLinks } from '@/lib/legal';

/**
 * Footer laid out to match bestfiberinternet.us, which is the pattern asked
 * for. Three blocks stacked on one dark surface, separated by hairline rules
 * rather than by colour:
 *
 *   1. Top      - four columns: brand blurb, Shop, Learn, Talk to a human.
 *   2. Disclosures - the "Offer details & required disclosures" block. This is
 *                    the part a retailer footer actually needs and the part
 *                    ours was missing; it carries the pricing, speed,
 *                    availability and billing small print.
 *   3. Bottom   - policy links, then the copyright and compliance lines.
 *
 * The bright sprout bar that used to close the page is gone. It was borrowed
 * from the brand site, and it cut the footer in two just where the reference
 * keeps one continuous dark surface.
 *
 * Colours stay on the NextLight palette rather than copying the reference's
 * blue-greys: navy-dark ground, ivory at graded opacities for the type,
 * sprout for the column headings.
 */
export default function Footer() {
  // Derived from the policy documents, so a new policy appears here on its own.
  const legalLinks = footerLegalLinks();

  return (
    <footer className="bg-navy-dark text-ivory/60">
      <div className="shell pb-8 pt-16 sm:pt-20">
        {/* ------------------------------- Top ---------------------------- */}
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Brand */}
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
              {footer.blurb}
            </p>
            <p className="mt-4 inline-flex rounded-full bg-teal px-3.5 py-1.5 font-display text-xs font-semibold text-navy-dark">
              {site.disclosureShort}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-sprout">
                {column.heading}
              </h2>
              <ul className="mt-3 space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex min-h-11 items-center text-sm text-ivory/80 transition-colors duration-200 hover:text-sprout"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact. One of only two places the raw number appears. */}
          <div>
            <h2 className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-sprout">
              {footer.contactHeading}
            </h2>
            <a
              href={`tel:${site.phoneTel}`}
              data-call-cta
              className="mt-3 inline-flex min-h-11 items-center font-display text-2xl font-bold text-ivory transition-colors duration-200 hover:text-sprout"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-1 text-sm leading-relaxed text-ivory/70">
              {site.salesHours}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">
              {site.mailingAddress}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">
              {site.serviceArea}
            </p>
          </div>
        </div>

        {/* --------------------------- Disclosures ------------------------ */}
        <section
          aria-labelledby="footer-disclosures"
          className="mt-10 border-t border-ivory/12 pt-7"
        >
          <h2
            id="footer-disclosures"
            className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-ivory/75"
          >
            {footer.disclosuresHeading}
          </h2>

          <div className="mt-4 space-y-2.5">
            {footer.disclosures.map((item) => (
              <p
                key={item}
                className="max-w-[80ch] text-xs leading-relaxed text-ivory/50"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* ------------------------------ Bottom -------------------------- */}
        <div className="mt-8 border-t border-ivory/10 pt-6">
          <nav aria-label="Policies">
            <ul className="flex flex-wrap gap-x-6">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-ivory/80 underline-offset-4 transition-colors duration-200 hover:text-sprout hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-4 max-w-[80ch] text-xs leading-relaxed text-ivory/45">
            {footer.compliance}
          </p>
          <p className="mt-2 max-w-[80ch] text-xs leading-relaxed text-ivory/45">
            {footer.copyright} {site.disclosureLong}
          </p>
        </div>
      </div>
    </footer>
  );
}
