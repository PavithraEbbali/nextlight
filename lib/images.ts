import fs from 'node:fs';
import path from 'node:path';

/**
 * ============================================================================
 *  IMAGE MANIFEST
 * ============================================================================
 *  Every photograph on the site is declared here once, with the exact filename
 *  it must be saved as. Drop the file into `public/images/` using that name and
 *  the slot fills itself on the next build - no component edit required.
 *
 *  Until a file exists, `resolve()` returns null and the consuming component
 *  falls back to its image-free layout. That means the site is never broken by
 *  a missing photo, and photos can be added one at a time.
 *
 *  Server-only: this module touches the filesystem, so it must not be imported
 *  from a 'use client' component.
 * ============================================================================
 */

export interface SiteImage {
  /** Public path. The file must be saved at `public/<src>`. */
  src: string;
  /** Intrinsic dimensions of the source file, used to reserve layout space. */
  width: number;
  height: number;
  /**
   * Alt text. Empty string marks a purely decorative image, which is the
   * correct value for the hero backdrop - the headline already carries the
   * meaning, so announcing the backdrop would only add noise.
   */
  alt: string;
}

export const images = {
  /**
   * Full-bleed backdrop behind the navy hero, sits under a dark overlay.
   * Delivered at 1408x768 rather than the 2400x1400 originally specified, so
   * it upscales on very wide displays. Acceptable here because it sits under
   * a heavy scrim at low contrast, where softness does not read.
   */
  heroBackground: {
    src: '/images/hero-background.jpg',
    width: 1408,
    height: 768,
    alt: '',
  },

  /** Feature band 1 - makes "free professional installation" concrete. */
  installation: {
    src: '/images/fiber-installation.jpg',
    width: 1408,
    height: 768,
    alt: 'A technician connecting a fiber line at the side of a house.',
  },

  /** Feature band 2 - the household actually using the connection. */
  household: {
    src: '/images/family-streaming.jpg',
    width: 1408,
    height: 768,
    alt: 'A family watching television together in a living room at night.',
  },

  /** Feature band 3 - the symmetrical-upload argument, shown not told. */
  workFromHome: {
    src: '/images/work-from-home.jpg',
    width: 1408,
    height: 768,
    alt: 'A person on a video call at a desk in a home office.',
  },

  /**
   * Backdrop for the Digital Voice section. That section holds a single card
   * on a wide empty band, which reads thin; a photograph behind it gives the
   * service line the same visual weight as the fiber and bundle sections.
   */
  phoneBackground: {
    src: '/images/home-phone-background.jpg',
    width: 1408,
    height: 768,
    alt: '',
  },

  /** Social card used when the page is shared. */
  openGraph: {
    src: '/images/og-image.jpg',
    width: 1200,
    height: 630,
    alt: '',
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/**
 * Returns the image only if its file is actually present in `public/`.
 * Resolved at build time, so there is no runtime cost and no client bundle.
 */
export function resolve(key: ImageKey): SiteImage | null {
  const image = images[key];
  const onDisk = path.join(process.cwd(), 'public', image.src);
  return fs.existsSync(onDisk) ? image : null;
}

/** True when at least one of the named images has been supplied. */
export function anyPresent(...keys: ImageKey[]): boolean {
  return keys.some((key) => resolve(key) !== null);
}
