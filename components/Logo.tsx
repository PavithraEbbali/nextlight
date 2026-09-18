interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Custom NextLight-styled wordmark built from the official palette: a navy
 * mark carrying a teal light burst, with the wordmark split navy/teal.
 */
export default function Logo({ tone = 'light', className = '' }: LogoProps) {
  const wordPrimary = tone === 'dark' ? 'text-ivory' : 'text-navy';
  const markBg = tone === 'dark' ? 'bg-ivory/10' : 'bg-navy';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${markBg}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 2.5v4.2M12 17.3v4.2M4.7 4.7l3 3M16.3 16.3l3 3M2.5 12h4.2M17.3 12h4.2M4.7 19.3l3-3M16.3 7.7l3-3"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            className="text-teal"
          />
          <circle cx="12" cy="12" r="3.4" className="fill-sky" />
        </svg>
      </span>

      <span className="flex flex-col gap-1">
        <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight">
          <span className={wordPrimary}>Next</span>
          <span className="text-teal">Light</span>
        </span>

        {/* Retailer status sits with the wordmark, not buried in the page.
            Hidden below `sm` so the lockup does not crowd a 320px header -
            the disclosure bar directly above states the same thing. */}
        <span
          className={`hidden font-display text-[0.68rem] font-bold uppercase leading-none tracking-[0.1em] sm:block ${
            tone === 'dark' ? 'text-sprout/90' : 'text-navy/65'
          }`}
        >
          Authorized Retailer
        </span>
      </span>
    </span>
  );
}
