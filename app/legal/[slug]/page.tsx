import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Aurora from '@/components/Aurora';
import Reveal from '@/components/Reveal';
import { legalDoc, legalDocs, legalSlugs } from '@/lib/legal';
import { site } from '@/lib/content';

/**
 * One template for all eight policy pages.
 *
 * `generateStaticParams` hands Next every slug at build time, so each page is
 * prerendered to static HTML rather than resolved per request - the whole site
 * stays static on Vercel.
 *
 * Next 16 note: `params` is a Promise and must be awaited. `PageProps` is a
 * globally available helper generated from the route literal, so it is not
 * imported.
 */
export function generateStaticParams() {
  return legalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<'/legal/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = legalDoc(slug);

  if (!doc) return { title: 'Not found' };

  return {
    title: `${doc.title} | ${site.retailerName}`,
    description: doc.summary,
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage(props: PageProps<'/legal/[slug]'>) {
  const { slug } = await props.params;
  const doc = legalDoc(slug);

  // An unknown slug is a 404 rather than an empty shell.
  if (!doc) notFound();

  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <main>
      {/* ------------------------------ Masthead ------------------------- */}
      <section className="relative overflow-hidden bg-navy-dark">
        <Aurora tone="dark" grid />

        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <Reveal>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-teal transition-colors duration-200 hover:text-sprout"
            >
              <BackArrow />
              Back to plans
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="heading-brand mt-4 max-w-3xl font-display text-[2rem] font-bold leading-[1.1] text-ivory sm:text-4xl lg:text-5xl">
              {doc.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <span
              aria-hidden="true"
              className="accent-rule mt-6 block h-[3px] w-20 rounded-full"
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg">
              {doc.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- Body ---------------------------- */}
      <section className="relative overflow-hidden bg-ivory py-14 sm:py-16 lg:py-20">
        <Aurora tone="light" />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            {/* Document */}
            <div className="max-w-3xl">
              {doc.sections.map((section, index) => (
                <Reveal key={section.heading} delay={Math.min(index * 45, 260)}>
                  <section className={index === 0 ? '' : 'mt-11'}>
                    <h2 className="heading-brand font-display text-xl font-bold leading-tight text-navy sm:text-2xl">
                      {section.heading}
                    </h2>

                    {section.body?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-4 text-base leading-relaxed text-slate-ink/85"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="mt-4 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-base leading-relaxed text-slate-ink/85"
                          >
                            <CheckIcon />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Other policies. `lg:sticky` keeps it alongside a long document. */}
            <Reveal delay={120} className="lg:self-start">
              <aside className="rounded-2xl border border-mist bg-white p-6 shadow-sm lg:sticky lg:top-[calc(var(--header-offset)+1.5rem)]">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-navy">
                  Other policies
                </h2>
                <span
                  aria-hidden="true"
                  className="accent-rule mt-3 block h-[3px] w-12 rounded-full"
                />

                <ul className="mt-4">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/legal/${other.slug}`}
                        className="flex min-h-11 items-center text-sm leading-snug text-slate-ink/85 transition-colors duration-200 hover:text-navy"
                      >
                        {other.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function BackArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path
        d="M10 3 5 8l5 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-1.5 h-4 w-4 shrink-0 text-navy"
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
