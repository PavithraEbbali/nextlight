import Reveal from './Reveal';
import Aurora from './Aurora';
import SectionHeading from './SectionHeading';
import { finePrint, plans, site, speedLabel } from '@/lib/content';

/** Formats a PlanItem rate the same way everywhere in the table. */
function rate(price?: number, cents?: string) {
  if (typeof price !== 'number') return 'Call for pricing';
  return `$${price}.${cents ?? '00'}/mo`;
}

/**
 * Side-by-side comparison of every plan on the page, plus the hardware and
 * one-time costs. Rows are generated from the same `plans` array the cards
 * use, so the two can never drift apart.
 */
export default function FinePrintGrid() {
  return (
    <section
      id="fine-print"
      aria-labelledby="fine-print-heading"
      className="relative overflow-hidden bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <Aurora tone="light" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={finePrint.eyebrow}
          title={finePrint.title}
          description={finePrint.description}
          headingId="fine-print-heading"
        />

        {/* ------------------------- Monthly service ------------------------- */}
        <Reveal className="mt-12">
          <div className="scroll-x rounded-2xl border border-mist bg-white shadow-sm">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Monthly service rates, speeds and terms for every plan
              </caption>
              <thead>
                <tr className="bg-navy text-ivory">
                  <th
                    scope="col"
                    className="px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-ivory"
                  >
                    Plan
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-ivory"
                  >
                    Monthly
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-ivory"
                  >
                    Speed (down / up)
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-ivory"
                  >
                    Equipment &amp; install
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-ivory"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-display text-xs font-bold uppercase tracking-wider text-ivory"
                  >
                    Term
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="border-t border-mist align-top transition-colors duration-200 hover:bg-teal/8"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-display text-sm font-semibold text-navy"
                    >
                      {plan.name}
                    </th>
                    <td className="px-5 py-4 font-display font-bold text-navy">
                      {rate(plan.price, plan.cents)}
                    </td>
                    <td className="px-5 py-4 text-slate-ink/85">
                      {plan.speedDown
                        ? `${speedLabel(plan.speedDown)} / ${speedLabel(plan.speedUp)}`
                        : 'Voice service'}
                    </td>
                    <td className="px-5 py-4 text-slate-ink/85">
                      {plan.equipmentFee ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-ink/85">
                      {plan.dataPolicy ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-ink/85">
                      {plan.contractTerm ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-slate-ink/55 sm:hidden">
            Scroll the table sideways to see every column.
          </p>
        </Reveal>

        {/* -------------------- Hardware and one-time costs ------------------- */}
        <Reveal delay={90} className="mt-12">
          <h3 className="heading-brand font-display text-xl font-bold text-navy">
            {finePrint.addOnsHeading}
          </h3>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finePrint.addOns.map((item) => (
              <li
                key={item.name}
                className="flex flex-col rounded-xl border border-mist bg-white p-5 shadow-sm transition-colors duration-200 hover:border-navy/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-sm font-semibold text-navy-dark">
                    {item.name}
                  </p>
                  <p className="shrink-0 whitespace-nowrap rounded-full bg-sprout/45 px-3 py-1 font-display text-sm font-bold text-navy-dark">
                    {item.cost}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-ink/75">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl border-l-2 border-teal pl-4 text-sm leading-relaxed text-slate-ink/70">
            {site.disclosureLong}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
