import type { ReactNode } from 'react';
import { site } from '@/lib/content';

type Variant = 'solid' | 'outline' | 'navy' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface CallButtonProps {
  /**
   * Button text. Plan cards and section CTAs must pass "Call to order" or
   * "Call for pricing"; only the header and footer show the raw number.
   */
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Extra context for screen readers, e.g. the plan name. */
  ariaLabel?: string;
}

/**
 * Sprout green on navy text is the primary action colour across the NextLight
 * brand - it is what "Get Connected" uses on the live site. Navy-on-ivory is
 * the secondary, reserved for surfaces where sprout would fight the layout.
 */
const VARIANT: Record<Variant, string> = {
  solid:
    'bg-sprout text-navy-dark hover:bg-sun active:bg-sun shadow-sm hover:shadow-md',
  outline:
    'border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-ivory active:bg-navy-dark',
  navy: 'bg-navy text-ivory hover:bg-navy-dark active:bg-navy-dark shadow-sm hover:shadow-md',
  ghost: 'text-navy hover:text-navy-dark hover:bg-sprout/30',
};

/* min-h-11 is 44px - the floor for a touch target. The header button in
   particular was 36px tall on phones, which is the single most important
   control on the page. */
const SIZE: Record<Size, string> = {
  sm: 'min-h-11 px-4 py-2 text-sm',
  md: 'min-h-11 px-5 py-2.5 text-sm sm:text-base',
  lg: 'min-h-12 px-6 py-3.5 text-base',
};

/**
 * Every outbound call link on the site renders through this component, which
 * guarantees two things: the number always comes from lib/content.ts, and the
 * anchor always carries `data-call-cta` for call tracking.
 */
export default function CallButton({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  ariaLabel,
}: CallButtonProps) {
  return (
    <a
      href={`tel:${site.phoneTel}`}
      data-call-cta
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-colors duration-200 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      <PhoneIcon />
      <span>{children}</span>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <path d="M2.5 4.2a1.7 1.7 0 0 1 1.7-1.7h1.6c.74 0 1.38.5 1.56 1.21l.6 2.4a1.6 1.6 0 0 1-.43 1.55l-.9.9a11.4 11.4 0 0 0 4.81 4.81l.9-.9a1.6 1.6 0 0 1 1.55-.42l2.4.6c.72.18 1.21.82 1.21 1.56v1.6a1.7 1.7 0 0 1-1.7 1.7h-.8C8.28 17.5 2.5 11.72 2.5 5v-.8Z" />
    </svg>
  );
}
