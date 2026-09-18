import Image from 'next/image';
import PriceLockup from './PriceLockup';
import ZipChecker from './ZipChecker';
import Reveal from './Reveal';
import Aurora from './Aurora';
import { hero, leadPlan, speedLabel, topSpeedPlan } from '@/lib/content';
import { resolve } from '@/lib/images';

/**
 * Editorial hero on the brand's navy canvas.
 *
 * No boxed order card: the headline, the availability check and the numbers
 * each get their own band, which reads as a considered layout rather than a
 * template.
 *
 * Motion is ambient and CSS-only - a drifting colour field, a slow light
 * beam, a sheen across the accent words, floating trust marks and a staggered
 * entrance. Everything animates transform or opacity, so it composites without
 * layout or paint, and all of it stops under prefers-reduced-motion. No WebGL
 * and no 3D, per the brief.
 *
 * Per the current brief the hero carries the ZIP checker only; the call
 * button lives in the sticky header, which is on screen at all times.
 */
export default function Hero() {
  const lead = leadPlan();
  const top = topSpeedPlan();
  const rail = hero.statRail;
  const mobileShot = resolve('heroBackground');

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-navy-dark"
      aria-labelledby="hero-heading"
    >
      <BrandCanvas />

      <div className="shell relative">
        {/*
          Headline block. Entrance runs on `.hero-rise` rather than the
          scroll-triggered `.reveal` used elsewhere: this content is above the
          fold, so it should not wait on an IntersectionObserver. Delays
          cascade down the block.
        */}
        <div className="copy-scrim max-w-3xl pt-8 pb-10 sm:pt-11 sm:pb-12 lg:pt-14 lg:pb-14">
          <p
            className="hero-rise inline-flex items-center gap-2 rounded-full border border-teal/45 bg-teal/10 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-teal"
            style={{ '--rise-delay': '0ms' } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className="dot-pulse h-1.5 w-1.5 rounded-full bg-teal"
            />
            {hero.eyebrow}
          </p>

          {/* `headline-bloom` paints a soft light behind the type via ::before
              at z-index -1, so the headline sits in its own pool of light
              rather than flat on the photograph. */}
          <div
            className="hero-rise headline-bloom relative isolate mt-6"
            style={{ '--rise-delay': '110ms' } as React.CSSProperties}
          >
            <h1
              id="hero-heading"
              className="text-on-media heading-brand font-display text-[2.15rem] font-bold leading-[1.06] text-ivory sm:text-5xl lg:text-[3.75rem]"
            >
              {hero.headline}{' '}
              {/* The sheen carries its own colour via background-clip, and the
                  reduced-motion rule restores a flat sprout fill. */}
              <span className="text-sheen">{hero.headlineAccent}</span>
            </h1>

            {/* Luminous rule closing the headline block. */}
            <span
              aria-hidden="true"
              className="accent-rule mt-6 block h-[3px] w-24 rounded-full"
            />
          </div>

          {/* ivory/90, not /75: against the lightened scrim the subline
              measured 4.21:1 at its right-hand end, under the 4.5:1 that AA
              requires for body text. */}
          <p
            className="hero-rise text-on-media mt-6 max-w-2xl text-base leading-relaxed text-ivory/90 sm:text-lg"
            style={{ '--rise-delay': '220ms' } as React.CSSProperties}
          >
            {hero.subline}
          </p>

          {/* Availability check, inline - no surrounding card. */}
          <div
            className="hero-rise mt-9 max-w-xl"
            style={{ '--rise-delay': '330ms' } as React.CSSProperties}
          >
            <ZipChecker />
          </div>

          <ul
            className="hero-rise mt-8 flex flex-wrap gap-x-5 gap-y-3"
            style={{ '--rise-delay': '430ms' } as React.CSSProperties}
          >
            {hero.trustChips.map((chip, index) => (
              <li
                key={chip}
                className="chip-float text-on-media inline-flex items-center gap-2 text-sm font-medium text-ivory/85"
                style={
                  { '--float-delay': `${index * 900}ms` } as React.CSSProperties
                }
              >
                <CheckIcon />
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        Mobile photograph.

        Below `md` the backdrop is hidden, because a 16:9 frame forced into a
        tall narrow hero upscales 1.7x and keeps only ~13% of its width. That
        left phones with no imagery in the hero at all, which is the majority
        of traffic for a page like this.

        Shown here as a band at its own aspect ratio instead: uncropped, sharp,
        and placed between the copy and the ribbon so it reads as part of the
        hero rather than a decoration behind it.
      */}
      {mobileShot && (
        <div className="shell relative pt-2 md:hidden">
          <Reveal>
            <Image
              src={mobileShot.src}
              alt={mobileShot.alt}
              width={mobileShot.width}
              height={mobileShot.height}
              sizes="100vw"
              className="aspect-[16/10] w-full rounded-2xl border border-ivory/15 object-cover shadow-[0_18px_40px_-24px_rgba(0,14,30,0.95)]"
            />
          </Reveal>
        </div>
      )}

      {/*
        Slim stat ribbon closing the hero.

        Both reference sites resolve this the same way: kineticfiber.us runs a
        full-width pill under its hero carrying one line of short claims, and
        bestfiberinternet.us puts a single-line chip row at the base of its
        hero. Neither uses a tall multi-line card - that was the thing making
        this element feel like a slab bolted onto the page.

        So: one line per stat, label inline before the value, no explanatory
        notes. Roughly half the height it was, which leaves much more of the
        photograph visible.
      */}
      {/* Weighted to sit low in the hero: most of the spare space goes above
          the ribbon, leaving it close to the section's bottom edge with just
          enough clearance that it is not flush against it. */}
      <div className="shell relative pb-5 pt-10 sm:pb-6 sm:pt-14 lg:pb-6 lg:pt-16">
        <Reveal delay={120}>
          <dl className="glass-dark relative grid grid-cols-1 divide-y divide-ivory/10 overflow-hidden rounded-2xl backdrop-blur-xl backdrop-saturate-150 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Single accent rule across the whole ribbon. */}
            <span
              aria-hidden="true"
              className="accent-rule absolute inset-x-0 top-0 h-[2px]"
            />

            <StatCell label={rail.priceLabel}>
              <PriceLockup
                plan={lead}
                size="hero"
                tone="dark"
                showQualifier={false}
              />
            </StatCell>

            <StatCell label={rail.speedLabel}>
              <p className="stat-gradient stat-figure font-display font-bold">
                {speedLabel(top.speedDown)}
              </p>
            </StatCell>

            <StatCell label={rail.installLabel}>
              {/* Word rather than numeral, so it takes the smaller step. The
                  test is on the value itself rather than hard-coded, so a
                  future ribbon entry gets the right size on its own. */}
              <p
                className={`stat-gradient font-display font-bold ${
                  /^\d/.test(rail.installValue)
                    ? 'stat-figure'
                    : 'stat-figure stat-figure--word'
                }`}
              >
                {rail.installValue}
              </p>
            </StatCell>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One cell of the stat ribbon: label and value on a single baseline.
 *
 * `items-baseline` rather than `items-center` - the label is small caps and
 * the value is large, and centring them makes the label float oddly high.
 * Sitting them on a shared baseline is what makes the row read as one line.
 */
function StatCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 py-5 transition-colors duration-400 hover:bg-ivory/[0.04] sm:px-7">
      <dt className="shrink-0 font-display text-xs font-bold uppercase tracking-[0.12em] text-teal sm:tracking-[0.15em]">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

/**
 * The hero canvas, bottom to top: photograph, navy wash, drifting colour
 * field, legibility scrim, light beam, then the static sprout sweep that
 * echoes the flowing line in NextLight's own brand work.
 *
 * Order matters. The colour field goes under the scrim so it tints the canvas
 * without lifting the background behind the type; only the beam sits above,
 * and it is low enough alpha to leave the measured contrast intact.
 */
function BrandCanvas() {
  const backdrop = resolve('heroBackground');

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/*
        Photograph — md and up only.

        The hero is a tall box on narrow screens (about 320x1324 at 320px)
        while the source is 16:9. `object-cover` into that shape upscales the
        photo 1.7x and keeps only ~13% of its width, which looks broken. The
        crop is measured at 48% by 768px and 77% by 1265px, so the photo is
        shown from `md` upward and the gradient canvas carries the hero below
        that. `sizes` keeps narrow viewports from fetching a large variant of
        an image they will not display.
      */}
      {backdrop && (
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={backdrop.src}
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 640px, 100vw"
            className="object-cover object-[65%_center]"
          />
        </div>
      )}

      {/* Without a photo this radial IS the background. Where the photo shows,
          it drops to a tint that keeps the navy brand cast over it. */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(125%_95%_at_12%_0%,#004a81_0%,#00335c_48%,#002c51_100%)] ${
          backdrop ? 'md:opacity-[0.14]' : ''
        }`}
      />

      {/* Legibility scrim, weighted hard to the left. The headline and ZIP
          field occupy the left half and need solid navy behind them; the right
          half falls away to almost nothing so the photograph reads. */}
      {/* Drifting colour field. Sits under the legibility scrim, so it tints
          the canvas without eating into the contrast behind the type. */}
      <Aurora tone="dark" grid />

      {/* Light overall tint only. The work of holding contrast behind the type
          is done by `.copy-scrim`, which is pinned to the copy column, so this
          layer can stay weak enough to leave the photograph legible. */}
      {backdrop && (
        <div className="absolute inset-0 hidden bg-navy-dark/10 md:block" />
      )}

      {/* Light band crossing the canvas. Above the scrim so it reads, but at a
          very low alpha - it should feel like atmosphere, not a moving object. */}
      <div className="absolute inset-y-0 left-0 w-[45%] overflow-hidden">
        <div className="beam-sweep h-full w-full bg-gradient-to-r from-transparent via-sky/[0.07] to-transparent" />
      </div>

      <svg
        className="absolute inset-y-0 right-0 h-full w-[min(140%,1200px)] opacity-[0.18]"
        viewBox="0 0 1200 700"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
      >
        <path
          d="M-60 512C220 512 268 236 520 236c186 0 214 176 372 176 120 0 186-104 186-232"
          stroke="#d6f38e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M-60 586C264 586 300 330 596 330c206 0 232 150 382 150 108 0 240-86 340-232"
          stroke="#3eceba"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 shrink-0 text-sprout"
    >
      <path
        d="m3 8.4 3.2 3.2L13 4.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
