import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  headingId?: string;
  align?: 'left' | 'center';
  /** `dark` inverts the type for sections sitting on a navy backdrop. */
  tone?: 'light' | 'dark';
}

const TONE = {
  light: {
    eyebrow: 'text-navy',
    rule: 'bg-teal',
    title: 'text-navy',
    description: 'text-slate-ink/80',
  },
  /**
   * Sprout on the eyebrow rather than teal, and the description at /90 rather
   * than /75. Measured against the Digital Voice backdrop: a teal eyebrow only
   * clears 4.5:1 with the scrim at 0.80, which buries the photograph. Sprout
   * clears it at 0.70 with room to spare, so the photo shows through.
   */
  dark: {
    eyebrow: 'text-sprout',
    rule: 'bg-teal',
    title: 'text-ivory',
    description: 'text-ivory/90',
  },
} as const;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  headingId,
  align = 'left',
  tone = 'light',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const t = TONE[tone];

  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <p
        className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] ${
          tone === 'dark'
            ? 'border-sprout/30 bg-sprout/10'
            : 'border-navy/12 bg-navy/[0.04]'
        } ${t.eyebrow}`}
      >
        <span
          aria-hidden="true"
          className={`dot-pulse h-1.5 w-1.5 rounded-full ${t.rule}`}
        />
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className={`heading-brand mt-4 font-display text-[1.75rem] font-bold leading-[1.12] sm:text-4xl ${
          tone === 'dark' ? t.title : 'heading-gradient'
        }`}
      >
        {title}
      </h2>

      {/* Luminous rule under every section title, matching the hero. */}
      <span
        aria-hidden="true"
        className={`accent-rule mt-4 block h-[3px] w-16 rounded-full ${
          centered ? 'mx-auto' : ''
        }`}
      />
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${t.description} ${
            centered ? '' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
