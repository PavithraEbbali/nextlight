import TopChrome from '@/components/TopChrome';
import Hero from '@/components/Hero';
import ServiceSections from '@/components/ServiceSections';
import FinePrintGrid from '@/components/FinePrintGrid';
import WhyUs from '@/components/WhyUs';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

/**
 * Page order is fixed by spec:
 *
 *   1. Disclosure bar + sticky header   (TopChrome)
 *   2. Hero                             (ZIP checker)
 *   3. Service lines                    (ServiceSections - canonical order)
 *   4. Fine-print comparison grid
 *   5. How it works, then Why NextLight (WhyUs - the photo bands live inside
 *      the Why section rather than standing alone, so the page makes each
 *      argument once)
 *   6. FAQ
 *   7. Footer
 *
 * ServiceSections resolves which lines render from lib/content.ts, so the
 * merchandising order is data-driven rather than hard-coded here.
 */
export default function Home() {
  return (
    <>
      <TopChrome />
      <main>
        <Hero />
        <ServiceSections />
        <FinePrintGrid />
        <WhyUs />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
