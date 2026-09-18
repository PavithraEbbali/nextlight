# Image brief

Save every file into this folder (`public/images/`) using the **exact filename**
below. Each slot fills itself on the next build — no code change needed.
Until a file exists its slot is skipped, so images can be added one at a time.

Format: **JPEG**, quality ~80, sRGB. Keep each file under ~400 KB
(hero under ~600 KB). Next.js re-encodes to WebP/AVIF on serve.

**No text, lettering, watermarks or brand logos inside any image.** All wording
on the site is live HTML — baked-in text would double up and cannot be edited.

---

## Realism notes — apply to every prompt

Nano Banana drifts toward a glossy "stock render" look unless pushed. In every
prompt keep these:

- Name a real camera and lens, and a plausible aperture.
- Ask for **documentary / editorial** photography, candid, unposed.
- Ask for **available light** — window light, lamps, overcast sky. Never
  "studio lighting" or "cinematic lighting".
- Allow ordinary imperfection: a little clutter, worn paint, scuffed floors,
  a cable that is not hidden.
- Ask for **ordinary-looking people, not models**, in everyday clothes.
- Avoid the words *stunning, beautiful, perfect, flawless, ultra-detailed, 8K,
  hyperrealistic, masterpiece* — these all push toward the AI-render look.
- Add the negative list at the end of each prompt (given below).

**Negative list to append to every prompt:**

> Avoid: text, letters, numbers, watermarks, logos, brand names, oversaturated
> colour, HDR glow, lens flare, bokeh balls, shallow tilt-shift, plastic skin,
> symmetrical faces, stock-photo smiles, staged poses, floating objects,
> extra fingers, warped hands, glossy CGI surfaces, studio lighting.

---

## 1. `hero-background.jpg` — 2400 × 1400

Full-bleed backdrop behind the navy hero. It sits under a dark navy scrim, so
it reads as texture and atmosphere rather than a subject.

**Composition is the critical constraint:** the headline occupies the **left
half**. Keep the left side visually quiet — sky, open ground, shadow. Put any
detail on the **right third**.

> Documentary photograph of a quiet residential street on the northern Colorado
> Front Range in the last twenty minutes before sunset. Single-storey and
> two-storey suburban houses with mature trees line the right side of the frame.
> The foothills and a low ridge sit on the far horizon, hazy in the distance.
> The left third of the frame is open sky and empty roadway, uncluttered. Warm
> low-angle sunlight rakes across the house fronts; long shadows across the
> asphalt. A few parked cars, a basketball hoop, a garden hose left out. Shot on
> a Canon EOS R6 with a 35mm lens at f/5.6, natural available light, slight
> atmospheric haze. Understated colour, muted and true to life, not saturated.
> Editorial documentary style, no people in frame.
>
> [append negative list]

---

## 2. `fiber-installation.jpg` — 1600 × 1200

Pairs with the "A technician brings the fiber to your door" band. This is the
image that makes "free professional installation" feel real.

> Candid documentary photograph of a utility technician kneeling beside the
> exterior wall of an ordinary suburban house, working on a small grey network
> enclosure mounted near the foundation. He is in his forties, plain navy work
> shirt with no visible logo, work gloves, a tool pouch on his belt. A thin
> fibre cable runs from the enclosure up the wall. Overcast afternoon light,
> soft and flat. Garden bed and a bit of untidy lawn in the foreground, siding
> and a downpipe behind him. He is concentrating on the work and not looking at
> the camera. Shot on a Nikon Z6 with a 50mm lens at f/4, available light.
> Natural colour, slightly muted. Real working conditions, unposed.
>
> [append negative list]

---

## 3. `family-streaming.jpg` — 1600 × 1200

Pairs with "Enough capacity for everything running at once".

> Candid documentary photograph of an ordinary family of four in a lived-in
> living room in the evening. Two parents and two children, mixed ages,
> everyday clothes, relaxed and unposed on a well-used sofa. The room is lit by
> warm lamplight and the glow of a television that is out of frame or seen at a
> steep angle so its screen content is not visible. One child is on a tablet, a
> parent is half-watching, a dog is asleep on the rug. The room is slightly
> untidy — a throw blanket bunched up, a couple of mugs on the side table, toys
> near the skirting board. Shot on a Fujifilm X-T4 with a 35mm lens at f/2.8,
> available light only, slight grain from the higher ISO. Warm but muted
> colour. Ordinary-looking people, not models.
>
> [append negative list]

---

## 4. `work-from-home.jpg` — 1600 × 1200

Pairs with "Upload speeds that match your download speeds".

> Candid documentary photograph of a woman in her thirties on a video call at a
> desk in a converted spare bedroom. She is mid-sentence, gesturing, looking at
> the laptop rather than the camera. Plain jumper, hair not styled. The desk is
> a real working desk: notebook, pen, a mug, a phone face down, a charging cable
> that is not tidied away. Daylight comes from a window to her left, slightly
> overcast, no artificial fill. A bookshelf and a half-open wardrobe behind her.
> The laptop screen is angled away so its content is not legible. Shot on a
> Sony A7 III with a 35mm lens at f/2.8, available light. Natural muted colour.
> An ordinary home office, not a designed workspace.
>
> [append negative list]

---

## 5. `home-phone-background.jpg` — 1408 × 768  ✅ supplied

Full-bleed backdrop for the **Digital Voice** section. That section holds a
single plan card on a wide empty band, which reads thin next to the fiber and
bundle sections; a photograph gives it the same visual weight.

It sits under an **80% navy scrim** with ivory text over the full width, so it
works as texture, not as a subject. Keep it calm and evenly lit — a busy or
high-contrast frame will fight the type. Nothing important near the centre.

> Candid documentary photograph of a corner of an ordinary kitchen in the
> early evening. A cordless landline phone sits in its charging base on the
> worktop beside a set of keys and a half-read newspaper. Warm light from an
> under-cabinet strip and a window further back, no overhead lighting. Tiled
> splashback, a little everyday clutter, a tea towel over the oven rail. No
> people in frame. Shot on a Fujifilm X-T4 with a 35mm lens at f/4, available
> light, gentle falloff into the corners of the room. Muted natural colour,
> nothing saturated. Quiet and evenly lit across the frame.
>
> [append negative list]

Once this file exists the Digital Voice section switches from the plain ivory
band to a navy photographic band automatically — its heading and description
flip to the light-on-dark treatment on their own.

---

## 6. `og-image.jpg` — 1200 × 630

The card shown when the page is shared in messages or social. Keep it simple
and readable at small size. **No text** — the title and description come from
the page metadata.

> Documentary photograph of a suburban house exterior at dusk on the Colorado
> Front Range, warm light in the windows, foothills faint on the horizon behind.
> Composed wide with the house sitting left of centre and open sky to the right.
> Shot on a Canon EOS R6 with a 35mm lens at f/5.6, available light at
> blue hour. Muted natural colour, no people in frame. Editorial documentary
> style.
>
> [append negative list]

---

## After you drop the files in

Nothing else is required. Rebuild (`npm run build`) or let the dev server
reload, and:

- `hero-background.jpg` appears behind the hero, under the navy scrim.
- Any of the three band images makes the **Feature Bands** section appear,
  between the fine-print grid and How It Works. Bands alternate image
  left / image right automatically.
- `og-image.jpg` adds the `og:image` metadata tag.

If a photo comes out too busy behind the hero headline, the scrim opacity is a
one-line change in `components/Hero.tsx` (`BrandCanvas`).
