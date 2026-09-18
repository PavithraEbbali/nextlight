import type { Metadata, Viewport } from 'next';
import { Poppins, Noto_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { hero, site } from '@/lib/content';
import { resolve } from '@/lib/images';

/** NextLight uses Poppins for display type and Noto Sans for body copy. */
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const ogCard = resolve('openGraph');

export const metadata: Metadata = {
  title: `${site.brandName} Fiber Internet Plans | ${site.retailerName}`,
  description:
    'Order NextLight 100% fiber internet with symmetrical speeds from 100 Mbps to 8 Gig. No data caps, no annual contract, free professional installation. Independent authorized retailer.',
  keywords: [
    'NextLight fiber internet',
    'Longmont fiber internet',
    'symmetrical gigabit internet',
    'no data cap internet',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.brandName} Fiber Internet Plans | ${site.retailerName}`,
    description: hero.subline,
    type: 'website',
    // Omitted entirely until the card image is supplied - an og:image tag
    // pointing at a missing file is worse than no tag at all.
    ...(ogCard
      ? {
          images: [
            { url: ogCard.src, width: ogCard.width, height: ogCard.height },
          ],
        }
      : {}),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#002c51',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
