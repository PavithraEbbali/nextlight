type Tone = 'dark' | 'light';

interface AuroraProps {
  /** `dark` for navy canvases, `light` for the ivory and white sections. */
  tone?: Tone;
  /** Adds the fine dot lattice. Only legible on dark canvases. */
  grid?: boolean;
  className?: string;
}

/**
 * Ambient colour field: three brand-tinted blobs drifting on different clocks.
 *
 * Each blob is a plain div with a radial-gradient background that is moved by
 * `transform`, so the work stays on the compositor. Animating the gradient
 * itself would repaint the whole layer every frame.
 *
 * The blur came down from the 64px it started at: with eight fields on the
 * page that was two dozen large blurred layers to rasterise, and the gradients
 * already fall off to transparent on their own, so most of that radius was
 * doing no visual work. What is left only exists to kill banding on the flat
 * ivory sections - 16px on phones, 24px from `sm` up.
 *
 * Opacities are deliberately low. The dark values were cut from 40/35/25 after
 * seeing them over the hero photograph: at that strength the field lifted the
 * canvas enough to wash out the headline. The whole thing is decorative and
 * hidden from assistive tech.
 *
 * Phones get a cheaper version: a smaller blur radius, and the third blob is
 * dropped entirely. Eight fields on the page means a lot of blurred layers to
 * rasterise, and a phone GPU feels that far more than a desktop one does.
 */
export default function Aurora({
  tone = 'dark',
  grid = false,
  className = '',
}: AuroraProps) {
  const dark = tone === 'dark';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Teal, upper left */}
      <div
        className={`aurora-a absolute -left-[15%] -top-[25%] h-[65%] w-[60%] rounded-full blur-lg sm:blur-xl ${
          dark ? 'opacity-[0.22]' : 'opacity-[0.20]'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--color-teal) 0%, transparent 68%)',
        }}
      />

      {/* Sky blue, lower right */}
      <div
        className={`aurora-b absolute -bottom-[30%] -right-[10%] h-[70%] w-[55%] rounded-full blur-lg sm:blur-xl ${
          dark ? 'opacity-[0.18]' : 'opacity-[0.16]'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--color-sky) 0%, transparent 68%)',
        }}
      />

      {/* Sprout green, centre right - the brand's accent, used sparingly */}
      <div
        className={`aurora-c absolute right-[18%] top-[12%] hidden h-[50%] w-[40%] rounded-full blur-lg sm:block sm:blur-xl ${
          dark ? 'opacity-[0.14]' : 'opacity-[0.14]'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--color-sprout) 0%, transparent 70%)',
        }}
      />

      {grid && <div className="dot-grid absolute inset-0 opacity-70" />}
    </div>
  );
}
