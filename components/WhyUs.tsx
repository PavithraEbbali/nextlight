import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import CallButton from './CallButton';
import FeatureBands from './FeatureBands';
import Aurora from './Aurora';
import { cta, howItWorks, whyUs } from '@/lib/content';

export default function WhyUs() {
  return (
    <>
      {/* ------------------------------ How it works ----------------------- */}
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      >
        <Aurora tone="light" />

        <div className="shell relative">
          <SectionHeading
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            description={howItWorks.description}
            headingId="how-it-works-heading"
          />

          <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7">
            {howItWorks.steps.map((step, index) => (
              <Reveal
                key={step.step}
                delay={index * 90}
                as="li"
                className="h-full"
              >
                <div className="flex h-full flex-col rounded-2xl border border-mist bg-ivory p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-md sm:p-7">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sprout font-display text-sm font-bold text-navy-dark">
                    {step.step}
                  </span>
                  <h3 className="heading-brand mt-4 font-display text-lg font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-ink/80">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------ Why NextLight ---------------------- */}
      <section
        id="why"
        aria-labelledby="why-heading"
        className="relative overflow-hidden bg-ivory py-16 sm:py-20 lg:py-24"
      >
        <Aurora tone="light" />

        <div className="shell relative">
          <SectionHeading
            eyebrow={whyUs.eyebrow}
            title={whyUs.title}
            description={whyUs.description}
            headingId="why-heading"
          />

          {/*
            The six-card grid that used to sit here has been removed. It
            restated what the photo bands below and the How It Works steps
            above already said - "Free professional installation", "No caps, no
            throttling", "Uploads match downloads" and "Room to grow" each
            appeared twice on the page, some of them word for word. The bands
            carry those arguments now, with the photography attached.
          */}
          <div className="mt-14">
            <FeatureBands />
          </div>

          {/* Mid-page conversion band */}
          <Reveal delay={120} className="mt-14">
            <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl bg-navy p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
              <Aurora tone="dark" grid />
              <div className="relative">
                <h3 className="heading-brand font-display text-xl font-bold text-ivory sm:text-2xl">
                  Not sure which speed fits your household?
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/75 sm:text-base">
                  Tell us how many devices you run and what you do online. We
                  will match you to the right tier and book the installation on
                  the same call.
                </p>
              </div>
              <CallButton
                variant="solid"
                size="lg"
                className="relative w-full shrink-0 lg:w-auto"
                ariaLabel={`${cta.withPrice} by phone`}
              >
                {cta.withPrice}
              </CallButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
