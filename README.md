# NextLight — Authorized Retailer

A single-page marketing site for an independent authorized retailer of
NextLight fiber internet. Next.js App Router, TypeScript, Tailwind CSS v4.
Statically prerendered — no APIs, no database, no server actions.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

---

## Editing the site

**Nearly every change you will want to make lives in [`lib/content.ts`](lib/content.ts).**
No component file contains a literal price, speed, phone number or feature
bullet. Edit that one file and the change reaches every card, the hero, the
comparison table, the FAQ and the legal copy at once.

### Changing a price

Dollar figures originate in a single `rates` object:

```ts
export const rates = {
  fiberEssential100: 39.95,
  fiberComplete1Gig: 69.95,
  wifiSingleFamily: 12.95,
  digitalVoice: 25.0,
  // ...
};
```

Change a number there and it cascades to the plan card, the hero ribbon, the
fine-print table row, the bundle totals **and** the sentences that explain how
each bundle total was reached. Bundle prices are computed sums, and their
qualifier copy is built from the same values, so a price and its explanation
cannot drift apart.

### Changing the phone number

```ts
export const site = {
  phoneDisplay: '(888) 555-0142',   // what visitors read
  phoneTel: '+18885550142',         // digits only, with +1
};
```

These two values feed every call link on the page. **The current number is a
placeholder** — replace it before launch.

### Adding or removing a service line

`plans` carries a `serviceLine` per entry (`fiber` / `cable` / `bundle` / `tv`
/ `mobile` / `phone`). Sections render in a fixed merchandising order and any
line with no plans is omitted entirely — no empty section, no placeholder
card. Adding plans for a new line is enough to make its section appear in the
right place.

---

## Photography

Images live in `public/images/` and are declared once in
[`lib/images.ts`](lib/images.ts). Each slot is resolved at **build time** with
`fs.existsSync`, so a missing file is never a broken image — the component
falls back to its image-free layout and the slot fills itself on the next
build once the file is dropped in.

[`public/images/README.md`](public/images/README.md) lists the required
filenames, dimensions and the prompts the current set was generated from.

---

## Conventions worth knowing before you edit

A few decisions here look arbitrary but are load-bearing. Each is commented at
the point it matters; the full reasoning is in [`ai.wing`](ai.wing).

- **`overflow-x: clip`, never `hidden`, on `html`/`body`.** `hidden` turns the
  body into a scroll container and silently kills `position: sticky` on the
  top chrome.
- **`backdrop-filter` declared in `globals.css` is stripped by the build.**
  Use Tailwind's `backdrop-blur-*` utilities on the element instead.
- **Gradient-filled text uses `drop-shadow`, not `text-shadow`.** The fill is
  clipped to the glyphs and the text itself is transparent, so a text-shadow
  bleeds through the antialiased edges.
- **Entrance animations never set their hidden state in a CSS rule.** It lives
  in the keyframe's `from` with `animation-fill-mode: both`, so content is
  still visible if the animation never runs.
- **The hero scrim is anchored to the copy column, not the viewport.** The
  copy sits in a centred max-width shell, so a viewport-anchored gradient
  cannot hold contrast and keep the photograph visible at every width.

---

## Accessibility and responsiveness

Audited at 320, 375, 414 and 768px: no horizontal overflow, no text under
12px, no tap target under 44px, no broken images.

Text contrast over the hero photograph was measured rather than eyeballed —
the photo is sampled to a canvas, the scrim layers composited in software, and
each text element checked against its real background. All copy clears WCAG AA.

All motion stops under `prefers-reduced-motion`.

---

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel
detects Next.js and needs no configuration — no environment variables, no
build-command overrides, no output-directory changes.

| Setting | Value |
|---|---|
| Framework | Next.js (auto-detected) |
| Build command | `next build` (default) |
| Install command | `npm install` (default) |
| Environment variables | none |

Before pointing a domain at it, replace the placeholder phone number and give
the four footer legal links real destinations — they currently point at `#`.
