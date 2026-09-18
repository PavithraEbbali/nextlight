/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Every price, speed, fee, feature bullet, disclosure and phone number that
 *  appears anywhere on this site is defined in this file and only in this file.
 *
 *  Dollar figures originate in exactly one place: the `rates` card below.
 *  Plan prices, bundle totals, qualifier sentences, the fine-print grid and
 *  the FAQ answers are all derived from it, so changing a single number there
 *  cascades to every card, the hero lockup, the comparison table and the legal
 *  copy at once - with no TSX layout file edited.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  CORE DATA MODEL                                                           */
/* -------------------------------------------------------------------------- */

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  name: string; // e.g., "NextLight Gig", "NextLight 100 Mbps"
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Optional one-line positioning statement shown under the plan name. */
  tagline?: string;
  /** Optional household-size guidance, e.g. "Sized for 6-12+ devices". */
  bestFor?: string;
  /** Optional badge rendered on the card, e.g. "New". */
  badge?: string;
}

/* -------------------------------------------------------------------------- */
/*  RATE CARD - the only place a dollar figure is written by hand             */
/* -------------------------------------------------------------------------- */

export const rates = {
  fiberEssential100: 39.95,
  fiberComplete1Gig: 69.95,
  fiberAdvanced25Gig: 149.95,
  fiberUltimate8Gig: 249.95,

  wifiSingleFamily: 12.95,
  wifiApartment: 8.95,
  wifiMeshExtender: 4.95,

  digitalVoice: 25.0,
  numberPorting: 5,
} as const;

/** Splits a decimal rate into the integer/cents pair PriceLockup renders. */
export function splitRate(amount: number): { price: number; cents: string } {
  const total = Math.round(amount * 100);
  return {
    price: Math.floor(total / 100),
    cents: String(total % 100).padStart(2, '0'),
  };
}

/** Formats a rate for inline copy: 39.95 -> "$39.95", 5 -> "$5". */
export function money(amount: number): string {
  const { price, cents } = splitRate(amount);
  return cents === '00' ? `$${price}` : `$${price}.${cents}`;
}

/** Formats a recurring rate: 12.95 -> "$12.95/mo". */
export function monthly(amount: number): string {
  return `${money(amount)}/mo`;
}

/* -------------------------------------------------------------------------- */
/*  SITE CONFIGURATION                                                        */
/* -------------------------------------------------------------------------- */

export const site = {
  brandName: 'NextLight',
  retailerName: 'NextLight Authorized Retailer',

  /**
   * PLACEHOLDER SALES LINE - replace with the retailer's own tracked number.
   * `phoneTel` must stay digits-only with the +1 country code.
   * Changing these two values updates every call button, the header, the
   * footer and the disclosures at once.
   */
  phoneDisplay: '(888) 555-0142',
  phoneTel: '+18885550142',

  salesHours: 'Mon-Fri 8AM-9PM MT · Sat-Sun 9AM-6PM MT',

  /**
   * PLACEHOLDER contact address for the policy pages - replace with a real
   * monitored mailbox before launch. Every legal page routes written enquiries
   * here, so it must reach someone.
   */
  contactEmail: 'compliance@example.com',

  /**
   * PLACEHOLDER registered address, shown in the footer contact column and in
   * the compliance line. Replace with the retailer's real mailing address.
   */
  mailingAddress: '000 Example Street, Longmont, CO 80501',

  disclosureShort: 'Independent Authorized Retailer of NextLight.',
  disclosureLong:
    'This is an independent authorized retailer of NextLight services. Pricing, speeds and service features are set by the provider and are subject to change.',

  serviceArea:
    'Longmont, Colorado and surrounding NextLight service communities.',
} as const;

/* -------------------------------------------------------------------------- */
/*  CTA LABELS - enforced site-wide                                           */
/* -------------------------------------------------------------------------- */

export const cta = {
  /** Used on every plan card and section CTA that has a published rate. */
  withPrice: 'Call to order',
  /** Used on every plan card and section CTA with no published rate. */
  withoutPrice: 'Call for pricing',
} as const;

/** Resolves the correct CTA label from the plan's own data. */
export function ctaLabel(plan: PlanItem): string {
  return typeof plan.price === 'number' ? cta.withPrice : cta.withoutPrice;
}

/* -------------------------------------------------------------------------- */
/*  SHARED TERMS - edit once, cascades to every card and the fine-print grid   */
/* -------------------------------------------------------------------------- */

const NO_CAP = 'No data caps · No throttling';
const NO_CONTRACT = 'No contract - month to month';
const ROUTER_OPTIONAL = 'Use your own router, or add Whole-Home WiFi';
const FREE_INSTALL = 'Free professional installation';

/* -------------------------------------------------------------------------- */
/*  PLANS                                                                     */
/* -------------------------------------------------------------------------- */

export const plans: PlanItem[] = [
  /* ---------------------------- FIBER INTERNET ---------------------------- */
  {
    id: 'fiber-essential-100',
    name: 'Essential 100 Mbps',
    serviceLine: 'fiber',
    speedDown: 100,
    speedUp: 100,
    ...splitRate(rates.fiberEssential100),
    tagline: 'Symmetrical 100 Mbps over 100% fiber.',
    bestFor: 'Sized for 1-5 connected devices',
    promoQualifier: 'Plus applicable taxes and fees.',
    equipmentFee: FREE_INSTALL,
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '100 Mbps download and 100 Mbps upload',
      FREE_INSTALL,
      'No data caps and no throttling',
      'No annual contract',
      ROUTER_OPTIONAL,
    ],
  },
  {
    id: 'fiber-complete-1gig',
    name: 'Complete 1 Gig',
    serviceLine: 'fiber',
    speedDown: 1000,
    speedUp: 1000,
    ...splitRate(rates.fiberComplete1Gig),
    isPopular: true,
    tagline: 'A full symmetrical gigabit, up and down.',
    bestFor: 'Sized for 6-12+ connected devices',
    promoQualifier: 'Plus applicable taxes and fees.',
    equipmentFee: FREE_INSTALL,
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '1 Gbps download and 1 Gbps upload',
      'Handles 4K streaming, gaming and video calls at once',
      FREE_INSTALL,
      'No data caps and no throttling',
      'No annual contract',
    ],
  },
  {
    id: 'fiber-advanced-2-5gig',
    name: 'Advanced 2.5 Gig',
    serviceLine: 'fiber',
    speedDown: 2500,
    speedUp: 2500,
    ...splitRate(rates.fiberAdvanced25Gig),
    badge: 'New',
    tagline: 'Multi-gig headroom for a busy household.',
    bestFor: 'Sized for 12+ connected devices',
    promoQualifier:
      'Plus applicable taxes and fees. Multi-gig equipment required.',
    equipmentFee: FREE_INSTALL,
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '2.5 Gbps download and 2.5 Gbps upload',
      'Headroom for large file transfers and home labs',
      FREE_INSTALL,
      'No data caps and no throttling',
      'Multi-gig capable router required to reach full speed',
    ],
  },
  {
    id: 'fiber-ultimate-8gig',
    name: 'Ultimate 8 Gig',
    serviceLine: 'fiber',
    speedDown: 8000,
    speedUp: 8000,
    ...splitRate(rates.fiberUltimate8Gig),
    badge: 'New',
    tagline: 'The top of the NextLight residential lineup.',
    bestFor: 'Sized for unlimited connected devices',
    promoQualifier:
      'Plus applicable taxes and fees. Multi-gig equipment required.',
    equipmentFee: FREE_INSTALL,
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '8 Gbps download and 8 Gbps upload',
      'Built for creators moving very large files daily',
      FREE_INSTALL,
      'No data caps and no throttling',
      '8 Gig capable equipment required to reach full speed',
    ],
  },

  /* -------------------------------- BUNDLES ------------------------------- */
  /* Bundle totals and the qualifier sentence that explains how each total was
     reached are both computed from the rate card, so changing a component
     rate updates the price and its explanation together.                    */
  {
    id: 'bundle-100-wifi',
    name: 'Essential 100 + Whole-Home WiFi',
    serviceLine: 'bundle',
    speedDown: 100,
    speedUp: 100,
    ...splitRate(rates.fiberEssential100 + rates.wifiSingleFamily),
    tagline: 'Symmetrical 100 Mbps with managed WiFi6 coverage.',
    bestFor: 'Smaller homes and apartments',
    promoQualifier: `Essential 100 Mbps at ${money(rates.fiberEssential100)} plus Whole-Home WiFi at ${money(rates.wifiSingleFamily)}. Apartment WiFi is ${money(rates.wifiApartment)}. Plus taxes and fees.`,
    equipmentFee: 'WiFi6 router included with the WiFi add-on',
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '100 Mbps symmetrical fiber internet',
      'Professional-grade WiFi6 router included',
      'Coverage tuned and monitored for you',
      'ProtectIQ security and ExperienceIQ parental controls',
      'No data caps and no annual contract',
    ],
  },
  {
    id: 'bundle-1gig-wifi',
    name: 'Complete 1 Gig + Whole-Home WiFi',
    serviceLine: 'bundle',
    speedDown: 1000,
    speedUp: 1000,
    ...splitRate(rates.fiberComplete1Gig + rates.wifiSingleFamily),
    isPopular: true,
    tagline: 'Gigabit fiber with managed wall-to-wall coverage.',
    bestFor: 'Larger homes up to 5,000+ sq. ft.',
    promoQualifier: `Complete 1 Gig at ${money(rates.fiberComplete1Gig)} plus Whole-Home WiFi at ${money(rates.wifiSingleFamily)}. Apartment WiFi is ${money(rates.wifiApartment)}. Plus taxes and fees.`,
    equipmentFee: 'WiFi6 router included with the WiFi add-on',
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '1 Gbps symmetrical fiber internet',
      'Whole-home coverage rated for 5,000+ sq. ft.',
      'Free equipment replacement and software updates',
      `Optional mesh units at ${money(rates.wifiMeshExtender)} per month each`,
      'No data caps and no annual contract',
    ],
  },
  {
    id: 'bundle-1gig-voice',
    name: 'Complete 1 Gig + Digital Voice',
    serviceLine: 'bundle',
    speedDown: 1000,
    speedUp: 1000,
    ...splitRate(rates.fiberComplete1Gig + rates.digitalVoice),
    tagline: 'Gigabit fiber with an unlimited nationwide home line.',
    bestFor: 'Households that still want a landline',
    promoQualifier: `Complete 1 Gig at ${money(rates.fiberComplete1Gig)} plus Digital Voice starting at ${money(rates.digitalVoice)}. Plus taxes and a one-time port fee.`,
    equipmentFee: 'Works with the home phones you already own',
    dataPolicy: NO_CAP,
    contractTerm: NO_CONTRACT,
    features: [
      '1 Gbps symmetrical fiber internet',
      'Unlimited nationwide calling with no per-minute charges',
      'Voicemail-to-email and simultaneous ring',
      `Keep your current number - porting is a one-time ${money(rates.numberPorting)}`,
      'No data caps and no annual contract',
    ],
  },

  /* ------------------------------ HOME PHONE ------------------------------ */
  {
    id: 'phone-digital-voice',
    name: 'Digital Voice',
    serviceLine: 'phone',
    ...splitRate(rates.digitalVoice),
    tagline: 'A clear home line carried over your fiber connection.',
    bestFor: 'Add to any NextLight internet plan',
    promoQualifier:
      'Starting rate, plus applicable taxes and a one-time port fee.',
    equipmentFee: 'Use the corded or cordless phones you already own',
    dataPolicy: 'Unlimited nationwide calling',
    contractTerm: NO_CONTRACT,
    features: [
      'Unlimited nationwide calling, no per-minute charges',
      'Voicemail-to-email delivery',
      'Simultaneous ring and Find Me / Follow Me routing',
      '911 service tied to your registered service address',
      `Number porting available for a one-time ${money(rates.numberPorting)}`,
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  SERVICE LINE SECTIONS - canonical merchandising order                     */
/*  fiber -> cable -> bundle -> tv -> mobile -> phone                         */
/*  Any line with zero plans is dropped from the page automatically.          */
/* -------------------------------------------------------------------------- */

export interface ServiceSectionMeta {
  line: ServiceLine;
  eyebrow: string;
  title: string;
  description: string;
  anchor: string;
}

export const serviceSectionOrder: ServiceLine[] = [
  'fiber',
  'cable',
  'bundle',
  'tv',
  'mobile',
  'phone',
];

export const serviceSectionMeta: Record<ServiceLine, ServiceSectionMeta> = {
  fiber: {
    line: 'fiber',
    eyebrow: 'Fiber Internet',
    title: 'Residential fiber plans and monthly rates',
    description:
      'Every NextLight plan is delivered over 100% fiber to the premises, so upload speeds match download speeds on every tier. All plans include unlimited data, no traffic throttling and no annual term agreement.',
    anchor: 'fiber',
  },
  cable: {
    line: 'cable',
    eyebrow: 'Cable',
    title: 'Cable internet',
    description: '',
    anchor: 'cable',
  },
  bundle: {
    line: 'bundle',
    eyebrow: 'Bundles',
    title: 'Internet, managed WiFi and voice bundles',
    description:
      'Managed Whole-Home WiFi and unlimited nationwide voice service can be added to any internet plan. The monthly rates shown reflect the combined published rate of each included service.',
    anchor: 'bundles',
  },
  tv: {
    line: 'tv',
    eyebrow: 'TV',
    title: 'Television',
    description: '',
    anchor: 'tv',
  },
  mobile: {
    line: 'mobile',
    eyebrow: 'Mobile',
    title: 'Mobile',
    description: '',
    anchor: 'mobile',
  },
  phone: {
    line: 'phone',
    eyebrow: 'Home Phone',
    title: 'Digital Voice home phone',
    description:
      'A dependable home line delivered over the same fiber connection, with unlimited nationwide calling at one flat monthly rate.',
    anchor: 'phone',
  },
};

/** Plans for a given line, in the order they are declared above. */
export function plansFor(line: ServiceLine): PlanItem[] {
  return plans.filter((p) => p.serviceLine === line);
}

/** Only the service lines that actually have plans, in canonical order. */
export function activeServiceSections(): ServiceSectionMeta[] {
  return serviceSectionOrder
    .filter((line) => plansFor(line).length > 0)
    .map((line) => serviceSectionMeta[line]);
}

/** The plan used for the hero price anchor: lowest published rate on fiber. */
export function leadPlan(): PlanItem {
  const priced = plansFor('fiber').filter((p) => typeof p.price === 'number');
  return priced.reduce((lowest, p) =>
    (p.price ?? Infinity) < (lowest.price ?? Infinity) ? p : lowest
  );
}

/** The fastest published residential tier, used in hero and feature copy. */
export function topSpeedPlan(): PlanItem {
  return plansFor('fiber').reduce((fastest, p) =>
    (p.speedDown ?? 0) > (fastest.speedDown ?? 0) ? p : fastest
  );
}

/** Formats a speed in Mbps as a short human label: 100 Mbps / 2.5 Gig. */
export function speedLabel(mbps?: number): string {
  if (!mbps) return '—';
  if (mbps < 1000) return `${mbps} Mbps`;
  const gig = mbps / 1000;
  return `${Number.isInteger(gig) ? gig : gig.toFixed(1)} Gig`;
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Authorized Retailer',
  /** Rendered as one headline; the accent half picks up the sprout green. */
  headline: 'Symmetrical 100% fiber internet with',
  headlineAccent: 'no data caps.',
  subline:
    'NextLight delivers 100% fiber to the premises, with upload speeds matching download speeds on every tier, from symmetrical 100 Mbps to symmetrical 8 Gig. No throttling, no annual term agreement, professional installation included.',
  priceIntro: 'Fiber plans start at',
  /** Labels for the three-cell stat rail that closes the hero. */
  /*
    Labels for the slim stat ribbon that closes the hero. Kept short because
    each sits inline before its value on a single line.

    The three explanatory notes that used to sit under each value are gone:
    the ribbon is one line per stat now, and each note only restated something
    the subline or the plan cards already say.
  */
  statRail: {
    priceLabel: 'Fiber plans from',
    speedLabel: 'Symmetrical up to',
    installLabel: 'Professional install',
    installValue: 'Included',
  },
  trustChips: [
    '100% Fiber Internet',
    'Symmetrical Speeds',
    'No Data Caps',
    'No Contracts',
  ],
  zip: {
    label: 'Confirm service at your address',
    placeholder: 'Enter your ZIP code',
    button: 'Check availability',
    helper: 'We serve Longmont and surrounding NextLight communities.',
    serviceable:
      'Good news - this ZIP is inside the NextLight footprint. Call to confirm your exact address and start your order.',
    unknown:
      'We need to confirm this ZIP against the current service map. Give us a call and we will check your exact address.',
    invalid: 'Please enter a 5-digit ZIP code.',
  },
} as const;

/** ZIP codes inside the published NextLight footprint (Longmont, CO area). */
export const serviceableZips: string[] = ['80501', '80502', '80503', '80504'];

/* -------------------------------------------------------------------------- */
/*  FINE PRINT GRID - plan rows come from `plans`, costs from `rates`          */
/* -------------------------------------------------------------------------- */

export const finePrint = {
  eyebrow: 'The Fine Print',
  title: 'Monthly rates, equipment and included services',
  description:
    'A consolidated view of every plan listed on this page. Monthly rates are exclusive of applicable taxes and government fees.',
  addOnsHeading: 'Hardware and one-time costs',
  addOns: [
    {
      name: 'Whole-Home WiFi - single family',
      detail: 'Managed WiFi6 router (U6), coverage for 5,000+ sq. ft.',
      cost: monthly(rates.wifiSingleFamily),
    },
    {
      name: 'Whole-Home WiFi - apartment',
      detail: 'Managed WiFi6 router (U4), tuned for smaller footprints',
      cost: monthly(rates.wifiApartment),
    },
    {
      name: 'Mesh WiFi extender',
      detail: 'Optional add-on unit for hard-to-reach rooms',
      cost: `${monthly(rates.wifiMeshExtender)} each`,
    },
    {
      name: 'Digital Voice number porting',
      detail: 'Keep the home number you already have',
      cost: `${money(rates.numberPorting)} one time`,
    },
    {
      name: 'Professional installation',
      detail: 'Standard install on every residential internet plan',
      cost: 'Included',
    },
    {
      name: 'Your own router',
      detail: 'Bring your own equipment instead of managed WiFi',
      cost: 'No monthly fee',
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  FEATURE BANDS - photograph paired with copy                               */
/*  `image` names a key in lib/images.ts. A band whose file has not been       */
/*  supplied yet is skipped entirely, so photos can be added one at a time.    */
/* -------------------------------------------------------------------------- */

export const featureBands: {
  id: string;
  image: 'installation' | 'household' | 'workFromHome';
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
}[] = [
  /* Band 1 deliberately covers the network itself rather than installation.
     "How It Works" already owns the install story, and repeating it here was
     the page's worst duplication. */
  {
    id: 'band-network',
    image: 'installation',
    eyebrow: 'The Network',
    title: 'Fiber built and owned by the community it serves',
    body: 'NextLight is municipal infrastructure, funded and run by Longmont rather than by a distant shareholder. The crews maintaining it live in the same neighbourhoods it reaches, and the fiber runs the whole way to the house.',
    points: [
      'Fiber end to end, with no copper in the final run',
      'Owned by the City of Longmont, not a private operator',
      'Maintained by crews based in the service area',
    ],
  },
  {
    id: 'band-household',
    image: 'household',
    eyebrow: 'At Home',
    title: 'Enough capacity for everything running at once',
    body: 'Streaming in one room, a video call in another and a console mid-download do not have to compete. Plans scale from symmetrical 100 Mbps to symmetrical 8 Gig, with no allowance to watch and no slowdown at the end of the month.',
    points: [
      'Unlimited data on every residential plan',
      'No throttling after a usage threshold',
      'Move up a tier at any time without changing networks',
    ],
  },
  {
    id: 'band-work',
    image: 'workFromHome',
    eyebrow: 'Working From Home',
    title: 'Upload speeds that match your download speeds',
    body: 'Most of what a working household sends out is invisible until it is slow: video calls, cloud backups, large file transfers, shared project folders. On fiber those run at the same speed as everything coming in.',
    points: [
      'Symmetrical speed on every tier, not just the top one',
      'Large uploads finish in the same time as a download',
      'Optional Whole-Home WiFi carries the speed to every room',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  WHY NEXTLIGHT                                                             */
/* -------------------------------------------------------------------------- */

export const whyUs = {
  eyebrow: 'Why NextLight',
  title: 'Fiber to the home, owned by the community',
  description:
    'NextLight is the community-owned fiber network serving Longmont, Colorado. Every connection runs on fiber end to end, delivered directly to the premises.',
} as const;

/* -------------------------------------------------------------------------- */
/*  HOW IT WORKS                                                              */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  eyebrow: 'How It Works',
  title: 'Three steps from call to connected',
  description:
    'Ordering takes one conversation. Here is exactly what happens on it.',
  steps: [
    {
      step: '01',
      title: 'Check your address',
      body: 'Enter your ZIP above or give us a call. We confirm your exact address against the current NextLight service map.',
    },
    {
      step: '02',
      title: 'Pick your speed',
      body: 'We walk through how many devices you run and what you do online, then match you to the tier that fits - and no more than that.',
    },
    {
      step: '03',
      title: 'Get installed',
      body: 'A technician runs the fiber, sets up the connection and verifies your speed. Standard professional installation is included.',
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  FAQ - answers that quote a rate read it from the rate card                */
/* -------------------------------------------------------------------------- */

export const faqSection = {
  eyebrow: 'FAQ',
  title: 'Questions worth asking before you order',
  description:
    'Straight answers on speed, equipment, installation and what shows up on the bill.',
} as const;

export const faqs: { q: string; a: string }[] = [
  {
    q: 'What does symmetrical speed actually mean?',
    a: 'Your upload speed matches your download speed. On the Complete 1 Gig plan that is 1 Gbps in both directions. It matters any time you are sending data out rather than pulling it in - video calls, cloud backups, uploading large files, or hosting a game session.',
  },
  {
    q: 'Is there a data cap or a slowdown after heavy use?',
    a: 'No. There is no monthly data allowance on residential plans and no throttling after a usage threshold. The speed tier you order is the speed you have all month.',
  },
  {
    q: 'Do I have to sign a contract?',
    a: 'No. Residential NextLight internet is month to month. There is no term agreement and no early termination fee tied to your plan.',
  },
  {
    q: 'What does installation cost?',
    a: 'Standard professional installation is included at no charge on every residential internet plan. A technician brings the fiber connection into the home and confirms the line is working before the appointment ends.',
  },
  {
    q: 'Do I need to rent a router?',
    a: `Not unless you want one. You can use your own router at no monthly fee. If you would rather not manage it, Whole-Home WiFi adds a professional-grade WiFi6 router with monitoring and coverage tuning for ${money(rates.wifiSingleFamily)} a month in a single-family home, or ${money(rates.wifiApartment)} a month in an apartment.`,
  },
  {
    q: 'Which speed tier should I pick?',
    a: 'Essential 100 Mbps suits roughly one to five devices. Complete 1 Gig is the common choice for households running six to twelve or more devices with streaming, gaming and work happening at once. Advanced 2.5 Gig and Ultimate 8 Gig add headroom for very heavy multi-gig use.',
  },
  {
    q: 'Can I keep my home phone number?',
    a: `Yes. Digital Voice supports number porting for a one-time ${money(rates.numberPorting)} fee, and the service works with the corded or cordless phones you already own.`,
  },
  {
    q: 'Where is service available?',
    a: 'NextLight serves Longmont, Colorado and surrounding communities inside the network footprint. Enter your ZIP in the checker above or call and we will confirm your specific address.',
  },
  {
    q: 'How long does it take to get connected?',
    a: 'Once your address is confirmed we schedule the installation appointment that works for you. Timing depends on the technician schedule in your area, which we will give you on the call.',
  },
];

/* -------------------------------------------------------------------------- */
/*  NAVIGATION + FOOTER                                                       */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: 'Plans', href: '/#fiber' },
  { label: 'Why NextLight', href: '/#why' },
  { label: 'FAQ', href: '/#faq' },
];

export const footer = {
  blurb:
    'Independent authorized retailer helping households order NextLight fiber internet, bundles and Digital Voice home phone.',
  columns: [
    {
      heading: 'Shop',
      links: [
        { label: 'Fiber internet plans', href: '/#fiber' },
        { label: 'Internet bundles', href: '/#bundles' },
        { label: 'Digital Voice home phone', href: '/#phone' },
        { label: 'Check availability', href: '/#hero' },
      ],
    },
    {
      heading: 'Learn',
      links: [
        { label: 'All FAQs', href: '/#faq' },
        { label: 'Plan pricing and fees', href: '/#fine-print' },
        { label: 'Why NextLight fiber', href: '/#why' },
        { label: 'How ordering works', href: '/#how-it-works' },
      ],
    },
  ],
  contactHeading: 'Talk to a human',

  /*
    Required-disclosures block.

    Every rate quoted below is derived from the rate card rather than typed
    out, so the small print cannot contradict the plan cards - which is the
    usual way a disclosures block goes stale.
  */
  disclosuresHeading: 'Offer details & required disclosures',
  disclosures: [
    `PRICING: Monthly rates shown on this site are the provider’s published residential rates and exclude taxes, government fees and surcharges. Rates are set by the provider, not by us, and are subject to change at any time. The rate confirmed to you when your order is placed is the rate that applies.`,
    `SPEEDS: Advertised speeds are the maximum for each plan. Actual speeds vary with your equipment, in-home wiring, the number of connected devices and network conditions, and are not guaranteed. Speeds over WiFi are typically lower than over a wired connection.`,
    `AVAILABILITY: Service is address-specific. A ZIP code falling within the service area does not guarantee that service can be delivered to a particular address. Availability is confirmed at the point of order.`,
    `INSTALLATION: Standard professional installation is included on residential internet plans. Work beyond a standard installation may carry additional cost, which the technician will explain before proceeding. Someone aged 18 or over must be present.`,
    `MULTI-GIG PLANS: The Advanced 2.5 Gig and Ultimate 8 Gig tiers require multi-gig capable equipment to reach their full speed. Equipment that is not multi-gig capable will limit throughput regardless of the plan ordered.`,
    `WHOLE-HOME WIFI: Managed WiFi is an optional add-on at ${monthly(rates.wifiSingleFamily)} for a single-family home and ${monthly(rates.wifiApartment)} for an apartment, with optional mesh units at ${monthly(rates.wifiMeshExtender)} each. Coverage varies with the size, layout and construction of the property. You may use your own router instead at no monthly charge.`,
    `DIGITAL VOICE: Home phone service starts at ${monthly(rates.digitalVoice)} plus applicable taxes and a one-time ${money(rates.numberPorting)} number-porting fee. 911 service is tied to the registered service address and depends on power and your internet connection being available.`,
    `BUNDLES: Bundle rates shown combine the published monthly rate of each included service. They are not a discounted package rate, and each component is billed at its own published rate.`,
    `DATA AND TERMS: Residential plans carry no monthly data allowance and no annual term agreement. Service is month to month. Terms are set by the provider and may change.`,
    `BILLING: Service is billed by the provider on its own cycle, under its own terms, and includes taxes and fees that are not part of the advertised monthly rate. We do not bill you and do not take payment for monthly service.`,
    `TRADEMARKS: ${site.brandName} and related marks are trademarks of their respective owner and are used here to identify the services we are authorized to sell. Their use does not imply that their owner has reviewed or endorsed this site.`,
  ],

  /*
    Legal links are derived from `legalDocs` in lib/legal.ts rather than
    listed here, so adding a policy adds its footer link automatically and the
    two can never disagree. See `footerLegalLinks()` there.
  */
  copyright:
    '© NextLight Authorized Retailer — independent authorized retailer. Not the network operator.',
  compliance: `For compliance enquiries or complaints, contact us on ${site.phoneDisplay} or at ${site.contactEmail}. ${site.mailingAddress}`,
} as const;
