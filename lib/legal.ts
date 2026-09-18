import { site } from './content';

/**
 * ============================================================================
 *  LEGAL DOCUMENTS
 * ============================================================================
 *  The eight policy pages, held as data rather than eight hand-built routes.
 *  A single template at app/legal/[slug]/page.tsx renders whichever document
 *  the slug resolves to, and `generateStaticParams` prerenders all of them.
 *
 *  Adding a ninth policy means adding an entry here. Nothing else changes -
 *  the route, the footer list and the sitemap all read from this array.
 *
 *  Contact details come from `site` in content.ts so the phone number stays
 *  in one place across the marketing page and the policies.
 * ============================================================================
 */

export interface LegalSection {
  heading: string;
  /** Paragraphs, rendered in order. */
  body?: string[];
  /** Optional bulleted list, rendered after the paragraphs. */
  bullets?: string[];
}

export interface LegalDoc {
  slug: string;
  /** Full page title, used as the H1 and in metadata. */
  title: string;
  /** Short label for the footer and the legal index. */
  navLabel: string;
  /** One-line summary, used as the meta description and the page standfirst. */
  summary: string;
  sections: LegalSection[];
}

/**
 * Standard closing section. Every policy ends the same way, pointing at the
 * retailer's own line rather than the network operator - the retailer handles
 * its own enquiries.
 */
function contactSection(subject: string): LegalSection {
  return {
    heading: 'How to reach us',
    body: [
      `Questions about ${subject} should come to us directly. Call ${site.phoneDisplay} during ${site.salesHours}, or write to ${site.contactEmail}.`,
      'We aim to acknowledge written enquiries within ten business days.',
    ],
  };
}

const INDEPENDENT =
  `${site.retailerName} is an independent authorized retailer. We are a separate business from the network operator whose services we sell, and we are solely responsible for the content of this site.`;

export const legalDocs: LegalDoc[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'privacy',
    title: 'Privacy & Data Protection',
    navLabel: 'Privacy & Data Protection',
    summary:
      'What we collect when you use this site or call us, why we collect it, how long we keep it, and the choices you have.',
    sections: [
      {
        heading: 'Who this policy covers',
        body: [
          INDEPENDENT,
          'This policy covers information handled by us. Once an order is placed, the network operator handles your account under its own privacy terms, which we do not control.',
        ],
      },
      {
        heading: 'What we collect',
        bullets: [
          'ZIP codes entered into the availability checker. The check runs entirely in your browser against a published list of serviced areas; the value is not transmitted to us or stored.',
          'Standard server logs from our hosting provider, including IP address, browser type, referring page and timestamp.',
          'Your cookie preferences, stored locally in your own browser.',
          'Information you give us on a phone call, such as your name, service address and contact details, so we can check availability and place an order.',
          'Aggregate analytics and advertising measurement data, collected only after you consent.',
        ],
      },
      {
        heading: 'Why we collect it',
        bullets: [
          'To confirm whether service is available at an address.',
          'To place and track an order you have asked us to place.',
          'To keep the site available and protect it from abuse.',
          'To measure which pages and campaigns are useful, where you have consented.',
          'To meet our legal and regulatory obligations.',
        ],
        body: [
          'We do not use your information for automated decision-making or profiling, and we do not sell personal information.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'We share the details needed to fulfil an order with the network operator, because it is the party that provisions and bills the service.',
          'We use service vendors for hosting, telephony and analytics. They act on our instructions and may not use your information for their own purposes.',
          'We disclose information where the law requires it, or to establish or defend a legal claim.',
        ],
      },
      {
        heading: 'How long we keep it',
        bullets: [
          'Server logs: a rolling short-term window set by our hosting provider.',
          'Analytics data: the retention period configured in the analytics tool, after which it is aggregated or deleted.',
          'Cookie preferences: stored in your browser until you clear them.',
          'Call records and order details: kept for as long as needed to service the order and meet record-keeping obligations, then deleted.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'The site is served over HTTPS, and access to any information we hold is restricted to people who need it to do their job. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'This site is intended for adults arranging residential service. It is not directed to children, and we do not knowingly collect information from anyone under 18. If you believe a child has given us information, contact us and we will delete it.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on where you live, you may have the right to know what personal information we hold, to obtain a copy, to correct it, to ask us to delete it, to opt out of targeted advertising, and not to be treated differently for exercising any of these rights.',
          'We honour browser-level opt-out signals, including Global Privacy Control, where they are sent. To make a request, use the contact details below. We may need to verify your identity before acting.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If this policy changes we will publish the revised version on this page. Continuing to use the site after a change means you accept the revised policy.',
        ],
      },
      contactSection('privacy or your personal information'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    navLabel: 'Disclaimer',
    summary:
      'Our relationship to the network operator, the status of the information on this site, and the limits of what we can promise.',
    sections: [
      {
        heading: 'We are an independent retailer',
        body: [
          INDEPENDENT,
          'We are authorized to sell and take orders for the services described on this site. We do not own, build or operate the network, and we are not the entity that provisions service or issues your bill.',
        ],
      },
      {
        heading: 'This site is not the operator’s site',
        body: [
          'This is our own site. It is not operated by, endorsed by, or produced in partnership with the network operator beyond our authorization to sell its services. Anything written here is ours, not theirs.',
        ],
      },
      {
        heading: 'Pricing and plan information',
        body: [
          'Rates, speeds, plan names and included features are set by the provider and can change at any time, including after you have read this page and before you place an order.',
          'Prices shown exclude taxes, government fees and surcharges unless stated otherwise. The rate confirmed to you at the point of order is the rate that applies.',
        ],
      },
      {
        heading: 'Availability and speeds',
        body: [
          'Service availability is address-specific. Neither the availability checker on this site nor a general statement about a service area is a guarantee that service can be delivered to your address.',
          'Quoted speeds are the maximum for the plan. Actual speeds depend on your equipment, your in-home wiring and network conditions, and are not guaranteed.',
        ],
      },
      {
        heading: 'No professional advice',
        body: [
          'Nothing on this site is legal, financial or technical advice. It is general information to help you choose a plan.',
        ],
      },
      {
        heading: 'No warranty',
        body: [
          'This site is provided on an "as is" and "as available" basis. We make no warranty that it will be uninterrupted, error-free, or that the information on it is complete or current at the moment you read it.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the fullest extent the law allows, we are not liable for indirect, incidental or consequential losses arising from your use of this site or from reliance on information published here. Nothing in this disclaimer limits liability that cannot be limited by law.',
        ],
      },
      {
        heading: 'Links to other sites',
        body: [
          'Where we link to a site we do not control, we do so for convenience. We are not responsible for its content or its privacy practices.',
        ],
      },
      contactSection('anything on this page'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'cookies',
    title: 'Cookies Policy',
    navLabel: 'Cookies Policy',
    summary:
      'The cookies and similar technologies this site uses, what each category does, and how to change your mind.',
    sections: [
      {
        heading: 'What cookies are',
        body: [
          'Cookies are small files a site stores in your browser. Similar technologies, such as local storage and tracking pixels, do comparable jobs. This policy covers all of them.',
        ],
      },
      {
        heading: 'Strictly necessary',
        body: [
          'These make the site work and cannot be switched off. They remember your cookie choice, keep the site secure, and support basic functions such as remembering which sections you have opened. They do not track you across other sites.',
        ],
      },
      {
        heading: 'Analytics',
        body: [
          'These tell us which pages people read and where they leave, in aggregate. We use this to decide what to fix and what to write next. They are only set after you consent, and we do not use them to identify you personally.',
        ],
      },
      {
        heading: 'Advertising',
        body: [
          'These measure whether an advertisement led to a visit, and help avoid showing you the same advertisement repeatedly. They are only set after you consent. If you decline, you will still see advertising, but it will be less relevant and we will not be able to measure it.',
        ],
      },
      {
        heading: 'Your choice',
        body: [
          'You can accept or decline the non-essential categories when you first arrive, and change that choice at any time using the cookie controls on this site.',
          'Your preference is stored in your own browser. Clearing your browser data clears it, and you will be asked again.',
        ],
      },
      {
        heading: 'Browser-level controls',
        body: [
          'Every major browser lets you block or delete cookies in its settings, and honours signals such as Global Privacy Control. Blocking strictly necessary cookies may stop parts of the site working.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If we add or remove a category we will update this page.',
        ],
      },
      contactSection('cookies or your preferences'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'tcpa',
    title: 'TCPA Policy',
    navLabel: 'TCPA Policy',
    summary:
      'How we handle calls and text messages, what you agree to when you give us your number, and how to opt out.',
    sections: [
      {
        heading: 'When you call us',
        body: [
          'If you call the number published on this site, you are placing the call. We do not use an automatic dialing system to answer it, and calling us does not by itself sign you up for anything.',
        ],
      },
      {
        heading: 'When you give us your number',
        body: [
          'If you give us a telephone number so that we can follow up, you agree that we or someone acting for us may call or text that number about the service you enquired about. Those contacts may be made using automated dialing technology or a prerecorded or artificial voice.',
          'Consent to receive marketing calls or texts is not a condition of purchasing anything. You can buy service without agreeing to them.',
        ],
      },
      {
        heading: 'Opting out',
        bullets: [
          'Reply STOP to any text message to stop further texts to that number.',
          'Reply HELP to any text message for assistance.',
          'Tell us on a call that you do not wish to be contacted again, and we will add you to our internal do-not-call list.',
          'Write to us using the contact details below.',
        ],
        body: [
          'Opt-out requests are honoured promptly. It may take a short time for a request to take effect across all our systems.',
        ],
      },
      {
        heading: 'Do-not-call rights',
        body: [
          'We maintain an internal do-not-call list and we respect the National Do Not Call Registry. Being on a registry does not prevent contact where you have given us permission, but you can withdraw that permission at any time.',
        ],
      },
      {
        heading: 'Call recording',
        body: [
          'Calls may be monitored or recorded for quality and training, and to keep a record of what was agreed. Where a call is recorded, you will be told at the start and can ask us not to record.',
        ],
      },
      {
        heading: 'Message frequency and charges',
        body: [
          'Message frequency varies with your enquiry. Message and data rates may apply according to your own plan. Mobile carriers are not liable for delayed or undelivered messages.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If this policy changes we will publish the revised version on this page.',
        ],
      },
      contactSection('calls, texts or your contact preferences'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'trademarks',
    title: 'Trademarks',
    navLabel: 'Trademarks',
    summary:
      'Whose marks appear on this site, on what basis we use them, and how to raise a concern.',
    sections: [
      {
        heading: 'Marks belong to their owners',
        body: [
          `${site.brandName} and any related names, logos and product names are trademarks of their respective owner. They are used on this site to identify the services we are authorized to sell.`,
          'Any other product, company or service name that appears here is the trademark of its owner. Use of a name does not imply any relationship with its owner beyond what is stated on this site.',
        ],
      },
      {
        heading: 'The basis for our use',
        body: [
          INDEPENDENT,
          'We use the operator’s marks solely to describe and sell the services we are authorized to sell. We do not claim ownership of them, and our use does not transfer any right in them to us or to you.',
        ],
      },
      {
        heading: 'No endorsement implied',
        body: [
          'The presence of a trademark on this site does not mean its owner has reviewed, approved or endorsed this site, its design, or the way anything is described here.',
        ],
      },
      {
        heading: 'Our own material',
        body: [
          'The wording, layout, photography and code of this site are ours or are licensed to us. Please do not reproduce them without permission.',
        ],
      },
      {
        heading: 'Raising a concern',
        body: [
          'If you own a mark and believe it is used incorrectly here, contact us with the mark, where it appears, and what you would like changed. We will review promptly and correct or remove the use where appropriate.',
        ],
      },
      contactSection('trademark use on this site'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'marketing',
    title: 'Marketing Policy',
    navLabel: 'Marketing Policy',
    summary:
      'The standards we hold our own advertising to, and what to do if you think we have fallen short.',
    sections: [
      {
        heading: 'What we are advertising',
        body: [
          'Our advertising promotes our services as an authorized retailer. Every advertisement and landing page we run identifies us as an independent retailer, not as the network operator.',
        ],
      },
      {
        heading: 'Accuracy',
        bullets: [
          'Prices we advertise are the provider’s published rates at the time of writing, and we state when a rate excludes taxes and fees.',
          'Speeds we advertise are the plan maximum, described as such.',
          'We do not advertise a plan, promotion or service that is not actually available to order.',
          'We do not describe a service as available at an address we have not checked.',
        ],
      },
      {
        heading: 'How we describe ourselves',
        body: [
          'We never present ourselves as the network operator, or imply that calling us is the same as calling them. Our retailer status is disclosed on every page of this site, in the header and in the footer.',
        ],
      },
      {
        heading: 'Comparisons',
        body: [
          'Where we describe what a service does, we describe it on its own terms. We do not disparage other providers.',
        ],
      },
      {
        heading: 'Advertising platforms',
        body: [
          'Where we advertise through third-party networks, we follow those networks’ policies on affiliate and reseller advertising, including their requirements on disclosure, landing-page accuracy and prohibited claims.',
        ],
      },
      {
        heading: 'Partners and publishers',
        body: [
          'Anyone advertising on our behalf is required to follow this policy. We do not authorize unsolicited email, misleading headlines, fake countdowns, or the use of the operator’s branding in a way that suggests the advertisement came from them.',
        ],
      },
      {
        heading: 'If we get it wrong',
        body: [
          'If you have seen an advertisement of ours that you believe is inaccurate or misleading, tell us where you saw it and what it said. We will investigate, correct it, and take it down while we do.',
        ],
      },
      contactSection('our advertising'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    navLabel: 'Service Fulfillment',
    summary:
      'What happens after you place an order with us, who does what, and what to expect on timing.',
    sections: [
      {
        heading: 'Who does what',
        body: [
          'We take your order. The network operator provisions the service, performs the installation, owns the network and issues your bill.',
          'That split matters for expectations: we can tell you what you ordered and what it costs, and we are your point of contact for anything to do with the order we placed for you.',
        ],
      },
      {
        heading: 'Placing an order',
        bullets: [
          'We confirm the service address and check what is available there.',
          'We go through the plans that fit, including the monthly rate and what is excluded from it.',
          'We take the details needed to open the account and submit the order.',
          'We confirm back to you what was ordered, at what rate, and what happens next.',
        ],
      },
      {
        heading: 'Installation',
        body: [
          'Standard professional installation is included on residential internet plans. An appointment is scheduled with you, and a technician brings the connection into the property and verifies it before finishing.',
          'Someone aged 18 or over needs to be present. If the property needs work beyond a standard installation, the technician will explain what is involved before proceeding.',
        ],
      },
      {
        heading: 'Timing',
        body: [
          'Appointment availability depends on the technician schedule in your area. We will give you the current lead time when we place the order rather than a general estimate.',
        ],
      },
      {
        heading: 'Changing or cancelling',
        body: [
          'Tell us as early as possible if you need to change or cancel an order and we will pass it on. Once service is active, changes and cancellations follow the provider’s own terms, including any notice period that applies.',
        ],
      },
      {
        heading: 'Billing',
        body: [
          'Your bill comes from the provider, on its own cycle, and includes taxes and fees that are not part of the advertised monthly rate. We do not bill you and we do not take payment for monthly service.',
        ],
      },
      {
        heading: 'If something is wrong with your order',
        body: [
          'If what was installed is not what you ordered, or the rate is not what we confirmed, come back to us. We placed the order and we will work to put it right.',
        ],
      },
      contactSection('an order you placed with us'),
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'pci-dss',
    title: 'PCI DSS',
    navLabel: 'PCI DSS',
    summary:
      'How payment card information is handled, and why this site never asks for it.',
    sections: [
      {
        heading: 'This site does not take payments',
        body: [
          'There is no checkout, no payment form and no card field anywhere on this site. We do not process, transmit or store payment card data through it.',
          'If a page claiming to be ours asks you to enter card details, it is not ours. Do not enter them, and tell us.',
        ],
      },
      {
        heading: 'Who takes payment',
        body: [
          'Payment for service is arranged between you and the network operator, which bills you directly under its own terms and maintains its own payment security programme.',
        ],
      },
      {
        heading: 'Card details given on a call',
        body: [
          'Where card details are needed to set up an account, they are entered directly into the provider’s systems. We do not write card numbers down, store them in our own systems, or keep them in call recordings.',
          'We will never ask you to send card details by email or text message. Neither is a secure channel.',
        ],
      },
      {
        heading: 'Our commitment',
        bullets: [
          'We keep our handling of cardholder data within the narrowest possible scope by not taking it on this site at all.',
          'Staff who take orders by phone are instructed never to record or retain card data.',
          'The site is served over HTTPS.',
          'We review these practices as our order process changes.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you believe card information has been requested or handled improperly in connection with us, contact us immediately using the details below so we can investigate.',
        ],
      },
      contactSection('payment security'),
    ],
  },
];

/** All slugs, used by generateStaticParams and the sitemap. */
export function legalSlugs(): string[] {
  return legalDocs.map((doc) => doc.slug);
}

/**
 * Footer legal links, derived from the documents themselves.
 *
 * Deliberately lives here rather than in content.ts: legal.ts already imports
 * `site` from content.ts, so pointing content.ts back at legal.ts would make
 * the two modules circular. Footer.tsx imports this directly.
 */
export function footerLegalLinks(): { label: string; href: string }[] {
  return legalDocs.map((doc) => ({
    label: doc.navLabel,
    href: `/legal/${doc.slug}`,
  }));
}

/** Resolve a slug to its document, or null when it does not exist. */
export function legalDoc(slug: string): LegalDoc | null {
  return legalDocs.find((doc) => doc.slug === slug) ?? null;
}
