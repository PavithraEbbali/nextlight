import Logo from './Logo';
import CallButton from './CallButton';
import { navLinks, site } from '@/lib/content';

/**
 * Global top chrome: the persistent retailer disclosure bar stacked above the
 * sticky header. Both travel together so the disclosure is on screen for the
 * entire session. There is no dismiss control by design.
 */
export default function TopChrome() {
  return (
    <div className="sticky top-0 z-50">
      {/* Persistent, non-dismissable retailer disclosure. Teal utility bar,
          the same slot the brand uses for its own top-of-page notice. */}
      <div className="bg-teal">
        <div className="shell">
          <p className="py-2.5 text-center font-display text-xs font-semibold leading-snug tracking-wide text-navy-dark">
            {site.disclosureShort}
          </p>
        </div>
      </div>

      <header className="border-b border-mist/60 bg-ivory/95 backdrop-blur-sm supports-[backdrop-filter]:bg-ivory/85">
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-3">
            <a
              href="#hero"
              className="flex min-h-11 shrink-0 items-center"
              aria-label={`${site.brandName} authorized retailer, back to top`}
            >
              <Logo />
            </a>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 md:flex"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[44px] items-center rounded-md px-3 font-display text-sm font-semibold text-navy transition-colors duration-200 hover:bg-sprout/30"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Header and footer are the only places the raw number is shown. */}
            <CallButton
              variant="solid"
              size="sm"
              className="shrink-0"
              ariaLabel={`Call ${site.phoneDisplay} to order`}
            >
              <span className="hidden sm:inline">{site.phoneDisplay}</span>
              <span className="sm:hidden">Call</span>
            </CallButton>
          </div>
        </div>
      </header>

      {/* Anchor nav on small screens, where the header links are hidden. */}
      <div className="border-b border-mist/60 bg-ivory md:hidden">
        <nav aria-label="Section shortcuts" className="shell">
          <ul className="scroll-x flex items-center gap-1 py-1.5">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className="flex min-h-[40px] items-center whitespace-nowrap rounded-full px-3.5 font-display text-xs font-semibold text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
