import CallButton from './CallButton';
import PriceLockup from './PriceLockup';
import { ctaLabel, speedLabel, type PlanItem } from '@/lib/content';

interface PlanCardProps {
  plan: PlanItem;
}

/**
 * One plan card. Every value shown here comes from the PlanItem, so nothing in
 * this file needs editing when rates, speeds or terms change.
 */
export default function PlanCard({ plan }: PlanCardProps) {
  const featured = Boolean(plan.isPopular);
  const label = ctaLabel(plan);
  const hasSpeed = typeof plan.speedDown === 'number';

  return (
    <article
      className={`glow-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-[transform,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 sm:p-7 ${
        featured
          ? 'border-navy/25 bg-gradient-to-b from-white via-white to-teal/[0.07] shadow-[0_20px_44px_-28px_rgba(0,74,129,0.5)] ring-1 ring-teal/25'
          : 'border-mist bg-gradient-to-b from-white to-navy-050/60 shadow-sm hover:border-teal/40'
      }`}
    >
      {/* Panning gradient rail along the top edge. Full strength on the
          featured card, held back until hover on the rest so the row still
          has a clear focal point. */}
      <span
        aria-hidden="true"
        className={`accent-rule absolute inset-x-0 top-0 h-[3px] transition-opacity duration-400 ${
          featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
      {/* Badge rail */}
      {(featured || plan.badge) && (
        <div className="absolute right-5 top-4 flex gap-2">
          {featured && (
            <span className="rounded-full bg-sprout px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-navy-dark shadow-[0_0_20px_-4px_rgba(214,243,142,0.9)]">
              Most Popular
            </span>
          )}
          {plan.badge && (
            <span className="rounded-full bg-teal px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-navy-dark shadow-[0_0_20px_-4px_rgba(62,206,186,0.9)]">
              {plan.badge}
            </span>
          )}
        </div>
      )}

      {/* Identity */}
      <header className={featured || plan.badge ? 'pr-28' : undefined}>
        <h3 className="heading-brand font-display text-lg font-bold text-navy sm:text-xl">
          {plan.name}
        </h3>
        {plan.tagline && (
          <p className="mt-1.5 text-sm leading-relaxed text-slate-ink/75">
            {plan.tagline}
          </p>
        )}
      </header>

      {/* Symmetrical speed readout */}
      {hasSpeed && (
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-teal/25 bg-gradient-to-br from-teal/[0.14] to-sky/[0.08] p-3.5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">
              Download
            </p>
            <p className="mt-0.5 font-display text-base font-bold text-navy">
              {speedLabel(plan.speedDown)}
            </p>
          </div>
          <div className="border-l border-navy/12 pl-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy/60">
              Upload
            </p>
            <p className="mt-0.5 font-display text-base font-bold text-navy">
              {speedLabel(plan.speedUp)}
            </p>
          </div>
        </div>
      )}

      {/* Price */}
      <div className="mt-6">
        <PriceLockup plan={plan} size="card" />
      </div>

      {plan.bestFor && (
        <p className="mt-4 inline-flex self-start rounded-full bg-sprout/45 px-3 py-1 text-xs font-semibold text-navy-dark">
          {plan.bestFor}
        </p>
      )}

      {/* Features */}
      <ul className="mt-5 space-y-2.5 border-t border-mist pt-5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm leading-relaxed">
            <CheckIcon />
            <span className="text-slate-ink/85">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA pinned to the bottom so cards align across the row */}
      <div className="mt-auto pt-6">
        <CallButton
          variant={featured ? 'solid' : 'outline'}
          size="lg"
          className="w-full"
          ariaLabel={`${label} — ${plan.name}`}
        >
          {label}
        </CallButton>

        <dl className="mt-4 space-y-1 text-xs text-slate-ink/60">
          {plan.dataPolicy && (
            <div className="flex gap-1.5">
              <dt className="sr-only">Data policy</dt>
              <dd>{plan.dataPolicy}</dd>
            </div>
          )}
          {plan.contractTerm && (
            <div className="flex gap-1.5">
              <dt className="sr-only">Term</dt>
              <dd>{plan.contractTerm}</dd>
            </div>
          )}
          {plan.equipmentFee && (
            <div className="flex gap-1.5">
              <dt className="sr-only">Equipment</dt>
              <dd>{plan.equipmentFee}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 h-4 w-4 shrink-0 text-teal"
    >
      <circle cx="8" cy="8" r="7.2" className="fill-teal/15" />
      <path
        d="m4.8 8.2 2.2 2.2 4.2-4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
