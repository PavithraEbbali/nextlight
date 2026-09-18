import type { PlanItem } from '@/lib/content';
import { cta } from '@/lib/content';

type LockupSize = 'card' | 'hero';
type LockupTone = 'light' | 'dark';

interface PriceLockupProps {
  plan: PlanItem;
  /** `card` = 2.5rem integer, `hero` = 3.5rem integer. */
  size?: LockupSize;
  /** `dark` inverts the type colors for use on the navy hero. */
  tone?: LockupTone;
  /** Hides the qualifier line when the surrounding card prints it itself. */
  showQualifier?: boolean;
  className?: string;
}

const SIZE = {
  card: {
    dollar: 'text-xl sm:text-2xl',
    integer: 'text-[2.5rem] sm:text-[2.75rem]',
    cents: 'text-lg sm:text-xl',
    term: 'text-sm',
    dollarPad: 'mt-1.5',
    centsPad: 'mt-1.5',
  },
  /* Matches `.stat-figure` in globals.css so the rate sits on the same visual
     scale as the speed and install figures beside it in the hero ribbon. */
  hero: {
    dollar: 'text-lg sm:text-xl',
    integer: 'text-[1.75rem] sm:text-[2rem]',
    cents: 'text-base sm:text-lg',
    term: 'text-sm',
    dollarPad: 'mt-1',
    centsPad: 'mt-1',
  },
} as const;

const TONE = {
  light: {
    dollar: 'text-navy',
    integer: 'text-navy',
    cents: 'text-navy/55',
    term: 'text-slate-ink/60',
    qualifier: 'text-slate-ink/55',
    fallback: 'text-navy',
  },
  /* On the navy canvas the rate is the highest-emphasis number on the page,
     so it takes the sprout green; the neighbouring stats stay teal. */
  dark: {
    dollar: 'text-sprout',
    /* Gradient fill plus a bloom, so the rate carries the same weight as the
       speed and install numerals beside it in the hero rail. */
    integer: 'stat-gradient-sprout',
    cents: 'text-sprout/70',
    term: 'text-ivory/70',
    qualifier: 'text-ivory/65',
    fallback: 'text-sprout',
  },
} as const;

/**
 * The single price rendering used everywhere on the site.
 *
 * Reads `price`, `cents` and `promoQualifier` straight off the PlanItem, so a
 * rate change in lib/content.ts updates the hero anchor, every plan card and
 * the fine-print grid at the same time. Plans with no published rate fall back
 * to the "Call for pricing" label rather than showing an empty lockup.
 */
export default function PriceLockup({
  plan,
  size = 'card',
  tone = 'light',
  showQualifier = true,
  className = '',
}: PriceLockupProps) {
  const s = SIZE[size];
  const t = TONE[tone];

  if (typeof plan.price !== 'number') {
    return (
      <div className={className}>
        <p
          className={`font-display font-semibold ${t.fallback} ${
            size === 'hero' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {cta.withoutPrice}
        </p>
        {showQualifier && plan.promoQualifier ? (
          <p className={`mt-2 text-xs leading-relaxed ${t.qualifier}`}>
            {plan.promoQualifier}
          </p>
        ) : null}
      </div>
    );
  }

  const cents = plan.cents ?? '00';
  const accessibleLabel = `$${plan.price}.${cents} per month`;

  return (
    <div className={className}>
      <div
        className="flex flex-row items-start gap-0.5"
        aria-label={accessibleLabel}
      >
        <span
          aria-hidden="true"
          className={`font-display font-semibold leading-none ${s.dollar} ${s.dollarPad} ${t.dollar}`}
        >
          $
        </span>
        <span
          aria-hidden="true"
          className={`font-display font-bold leading-[0.85] tracking-tight ${s.integer} ${t.integer}`}
        >
          {plan.price}
        </span>
        <span
          aria-hidden="true"
          className={`font-display font-semibold leading-none ${s.cents} ${s.centsPad} ${t.cents}`}
        >
          {cents}
        </span>
        <span
          aria-hidden="true"
          className={`self-end pb-1 pl-1.5 font-sans font-medium ${s.term} ${t.term}`}
        >
          /mo
        </span>
      </div>

      {showQualifier && plan.promoQualifier ? (
        <p className={`mt-2 text-xs leading-relaxed ${t.qualifier}`}>
          {plan.promoQualifier}
        </p>
      ) : null}
    </div>
  );
}
