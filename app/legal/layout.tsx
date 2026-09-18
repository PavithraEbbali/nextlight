import TopChrome from '@/components/TopChrome';
import Footer from '@/components/Footer';

/**
 * The policy pages carry the same chrome as the marketing page.
 *
 * TopChrome and Footer are rendered here rather than in the root layout
 * because the root layout is shared with the home page, which composes them
 * itself. Keeping them out of the root means neither page renders them twice.
 */
export default function LegalLayout({
  children,
}: LayoutProps<'/legal'>) {
  return (
    <>
      <TopChrome />
      {children}
      <Footer />
    </>
  );
}
