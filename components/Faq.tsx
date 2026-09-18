import Reveal from './Reveal';
import Aurora from './Aurora';
import SectionHeading from './SectionHeading';
import { faqSection, faqs } from '@/lib/content';

/**
 * Accordion built on native <details>/<summary>: keyboard accessible and
 * usable before hydration, with no JavaScript of its own.
 */
export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <Aurora tone="light" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={faqSection.eyebrow}
          title={faqSection.title}
          description={faqSection.description}
          headingId="faq-heading"
        />

        <div className="mt-12 grid gap-3 lg:mx-auto lg:max-w-4xl">
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index * 55, 330)}>
              <details className="group rounded-xl border border-mist bg-ivory px-5 shadow-sm transition-colors duration-200 open:border-teal hover:border-teal sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sprout text-navy-dark transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pb-5 pr-1 text-sm leading-relaxed text-slate-ink/80 sm:text-[0.95rem]">
                  {item.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
