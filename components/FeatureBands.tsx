import Image from 'next/image';
import Reveal from './Reveal';
import { featureBands } from '@/lib/content';
import { resolve } from '@/lib/images';

/**
 * Alternating photograph and copy blocks, the pattern the brand uses on its
 * own pages.
 *
 * Rendered inside the "Why NextLight" section rather than as a section of its
 * own. The two used to be separate and said the same things twice - the card
 * grid that lived in `#why` has been removed and these bands took its place.
 *
 * Each band is skipped unless its photograph exists in `public/images/`, and
 * the whole block returns null when none do, so the page stays coherent if a
 * photo is ever removed.
 */
export default function FeatureBands() {
  const bands = featureBands
    .map((band) => ({ ...band, photo: resolve(band.image) }))
    .filter((band) => band.photo !== null);

  if (bands.length === 0) return null;

  return (
    <div className="space-y-14 lg:space-y-20">
      {bands.map((band, index) => {
        const photo = band.photo!;
        const imageFirst = index % 2 === 0;

        return (
          <Reveal key={band.id}>
            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              {/* Photograph */}
              <div
                className={`relative overflow-hidden rounded-2xl bg-navy-050 ${
                  imageFirst ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Copy */}
              <div className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
                <p className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-navy">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-6 rounded-full bg-teal"
                  />
                  {band.eyebrow}
                </p>

                <h3 className="heading-brand mt-3 font-display text-2xl font-bold leading-[1.15] text-navy sm:text-3xl">
                  {band.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-slate-ink/80">
                  {band.body}
                </p>

                <ul className="mt-6 space-y-3">
                  {band.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-slate-ink/85"
                    >
                      <CheckIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 h-4 w-4 shrink-0 text-navy"
    >
      <circle cx="8" cy="8" r="7.2" className="fill-sprout" />
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
