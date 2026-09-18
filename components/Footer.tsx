import Logo from './Logo';
import { footer, site } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-navy text-ivory/70">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">
              {footer.blurb}
            </p>
            <p className="mt-4 inline-flex rounded-full bg-teal px-3.5 py-1.5 font-display text-xs font-semibold text-navy-dark">
              {site.disclosureShort}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-sprout">
                {column.heading}
              </h2>
              <ul className="mt-3 space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex min-h-11 items-center text-sm text-ivory/70 transition-colors duration-200 hover:text-sprout"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact — the footer is one of only two places the raw number appears. */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-sprout">
              {footer.contactHeading}
            </h2>
            <a
              href={`tel:${site.phoneTel}`}
              data-call-cta
              className="mt-4 inline-flex min-h-11 items-center font-display text-2xl font-bold text-ivory transition-colors duration-200 hover:text-sprout"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-2 text-sm text-ivory/70">{site.salesHours}</p>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              {site.serviceArea}
            </p>
          </div>
        </div>
      </div>

      {/* Long-form disclosures stay on navy, where the measure is comfortable. */}
      <div className="border-t border-ivory/12">
        <div className="shell py-7">
          <p className="max-w-4xl text-xs leading-relaxed text-ivory/50">
            {footer.trademark}
          </p>
          <p className="mt-2 max-w-4xl text-xs leading-relaxed text-ivory/50">
            {site.disclosureLong}
          </p>
        </div>
      </div>

      {/* Sprout-green legal bar closes the page, as it does on the brand site. */}
      <div className="bg-sprout">
        <div className="shell py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-x-6">
              {footer.legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-xs font-semibold text-navy-dark underline-offset-4 transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-xs font-medium leading-relaxed text-navy-dark/80">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
