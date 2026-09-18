import Image from 'next/image';
import PlanCard from './PlanCard';
import Reveal from './Reveal';
import Aurora from './Aurora';
import SectionHeading from './SectionHeading';
import { activeServiceSections, plansFor } from '@/lib/content';
import { resolve } from '@/lib/images';

/**
 * Renders every service line that actually has plans, in the canonical
 * merchandising order defined in lib/content.ts:
 *
 *   fiber -> cable -> bundle -> tv -> mobile -> phone
 *
 * A line with no plans is omitted completely - no placeholder section, no
 * empty card. Adding plans for a new line to lib/content.ts is enough to make
 * its section appear in the right position.
 */
export default function ServiceSections() {
  const sections = activeServiceSections();

  return (
    <>
      {sections.map((section, index) => {
        const linePlans = plansFor(section.line);
        const count = linePlans.length;

        // Column count follows the number of plans so rows never look sparse.
        const grid =
          count === 1
            ? 'mx-auto max-w-xl grid-cols-1'
            : count === 2
              ? 'mx-auto max-w-4xl grid-cols-1 sm:grid-cols-2'
              : count === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';

        // The phone line carries a single card on a wide band, which looks
        // thin next to the multi-card sections. A backdrop gives it weight.
        const backdrop =
          section.line === 'phone' ? resolve('phoneBackground') : null;

        return (
          <section
            key={section.line}
            id={section.anchor}
            aria-labelledby={`${section.anchor}-heading`}
            className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${
              backdrop
                ? 'bg-navy-dark'
                : index % 2 === 0
                  ? 'bg-ivory'
                  : 'bg-white'
            }`}
          >
            {/* Ambient colour on the light bands. On the phone section the
                photograph and its scrim already carry the background, so the
                field would only muddy it. */}
            {!backdrop && <Aurora tone="light" />}

            {backdrop && (
              <div aria-hidden="true" className="absolute inset-0">
                {/*
                  md and up only, same reason as the hero: this section is a
                  tall box on a narrow screen (320x1123 at 320px) against a
                  16:9 source, so `object-cover` upscales 1.46x and keeps just
                  16% of the frame. The section's own navy background carries
                  it below that, which still reads as a deliberate dark band.
                */}
                <div className="absolute inset-0 hidden md:block">
                  <Image
                    src={backdrop.src}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 640px, 100vw"
                    className="object-cover object-center"
                  />
                  {/* Flat scrim: unlike the hero, content sits across the full
                      width here, so it cannot fall away to one side. 0.70 is
                      the measured floor at which the heading, the sprout
                      eyebrow and the description all still clear AA over this
                      photograph. */}
                  <div className="absolute inset-0 bg-navy-dark/70" />
                </div>
              </div>
            )}

            <div className="shell relative">
              <SectionHeading
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
                headingId={`${section.anchor}-heading`}
                tone={backdrop ? 'dark' : 'light'}
              />

              <div className={`mt-12 grid gap-6 lg:gap-7 ${grid}`}>
                {linePlans.map((plan, planIndex) => (
                  <Reveal
                    key={plan.id}
                    delay={Math.min(planIndex * 90, 360)}
                    className="h-full"
                  >
                    <PlanCard plan={plan} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
