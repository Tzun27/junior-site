Here's a UI direction prompt you can hand off to Claude Code:

---

# UI Direction: Immersive Campus Flow × Narrative UI

> **NCKU brand alignment.** This direction operates within NCKU's official design system — the CIS palette plus the international additions on `brandpad.io/ncku-international-brand`. Cinematic energy comes from composition, depth, and motion — **not** from inventing colors or typefaces. See `ncku-design.md` for the source spec.

## Core Concept

Move away from a static, panel-based dashboard feel toward a **scroll-driven, cinematic experience** that unfolds like a guided journey. The interface should feel less like a control panel and more like a premium product page that happens to be a university site — think Apple product page meets interactive storytelling meets student onboarding.

The shift is from _"find what you need"_ to _"we guide you to what matters."_

## Brand Personality (the feeling to aim for)

The three pillars from NCKU's own brand language:

- **Brave & Ambitious** — the cinematic format is itself the bravery. Confident, declarative, never timid.
- **Collaborative & Creative** — open, welcoming, modern, accessible.
- **Committed & Responsible** — grounded, practical, proud of tradition.

In one line: **bold and grounded, not playful or whimsical**. Confident typographic statements, generous whitespace, restrained color use punctuated by a single strong red accent.

## Visual Tone

Bold, modern, expressive, cinematic. Confident but not loud. The interface should feel alive — gradients and depth instead of flat surfaces, motion instead of stillness, progressive reveal instead of everything-at-once. Cinematic does *not* mean ornate; it means giving short, declarative statements weight.

## Color & Atmosphere

We work within the NCKU palette. The dark cinematic base maps cleanly onto **Maroon `#420A15`** — already in the international palette. The primary accent throughout the UI is **NCKU Red 201C `#A31F34`** (the Signature Red), not the brighter Phoenix Red.

- **Background**: deep gradient between **Maroon `#420A15`** and a near-black anchored by **International Dark Grey `#312D33`**. Not flat dark mode — use lighting and depth.
- **Primary accent**: **NCKU Red 201C `#A31F34`**, treated as motion, glow, and highlight rather than as a flat fill. Luminous edges, ambient washes, hairline rules.
- **Heritage accents (sparing)**: **Gold `#8C6E4A`** for signature/heritage moments (thin utility strips, micro-details, decorative knockout marks) — used the way the live `web.ncku.edu.tw` site does, never as a general accent. **Silver `#A6A9AB`** for subtle borders, dividers, and secondary type.
- **Type on dark**: **White** primary; tints of Silver for secondary/supporting copy.
- **Softer surfaces**: use **tints** of palette colors (translucent Maroon over black, low-opacity Silver wash) — **never** introduce new hues.
- **Phoenix Red `#E4002B` is reserved for the Phoenix flower mark only.** It must never be recolored, and must not be used as a general UI accent. The Phoenix mark stands out precisely because the rest of the UI lives in the deeper 201C / Maroon family.

### CSS variables

```css
:root {
  /* Cinematic dark base */
  --bg-deep:       #1a0509;            /* near-black with warm undertone */
  --bg-maroon:     #420A15;            /* International Maroon */
  --bg-dark-grey:  #312D33;            /* International Dark Grey */

  /* Accent — primary */
  --ncku-red:      #A31F34;            /* PANTONE 201C — Signature Red */

  /* Heritage — sparing */
  --ncku-gold:     #8C6E4A;            /* PANTONE 874C */
  --ncku-silver:   #A6A9AB;            /* PANTONE 877C */

  /* Reserved — Phoenix mark only, never as a UI accent */
  --phoenix-red:   #E4002B;            /* PANTONE 185C */

  --text-primary:   #FFFFFF;
  --text-secondary: rgba(255,255,255,0.72);
  --text-muted:     rgba(255,255,255,0.48);
}
```

## Typography

Anchored in the **Noto** family — this matches NCKU's international guidelines and is the safe web substitute for the CIS Chinese typefaces (Arphic AR HeiB5 / MingB5, which aren't web-licensed).

- **Headlines**: **Noto Sans Light** (English) / **Noto Sans TC Light** (Chinese). The light weight is intentional and on-brand — it balances the bold cinematic composition with a contemporary feel.
- **Sub-headings / emphasis**: Noto Sans **Bold** / Noto Sans TC **Bold**.
- **Body**: Noto Sans Regular / Noto Sans TC Regular.
- **Pull quotes, editorial contrast**: Noto Serif / Noto Serif TC, used sparingly. **Never as a headline face.**
- Hierarchy can be expressed via **color** (white → silver tint → muted) as well as size and weight.

```css
--font-sans:  "Noto Sans TC", "Noto Sans", "PingFang TC",
              "Microsoft JhengHei", system-ui, sans-serif;
--font-serif: "Noto Serif TC", "Noto Serif", "PMingLiU",
              Georgia, serif;
```

### Headline writing

Match NCKU's brand cadence: **seven words or fewer**, declarative, benefit-led, optimistic, action-forward. Reference examples from the brand book:

- "Innovation needs dirty hands."
- "Progress is a team sport."
- "Every discovery is just the start."
- "To do something great, start somewhere different."

Short statements deserve weight — give them the scene.

## Layout Philosophy

Scrolling _is_ the interaction. Each scroll position is a distinct "scene" with its own theme and purpose. Treat the page as a sequence of story blocks rather than a grid of widgets.

A typical flow:

1. **Hero / Entry scene** — fullscreen, minimal text, ambient motion (particles, light, campus imagery), cursor-follow lighting, subtle parallax, animated headline.
2. **Welcome / identity** — establishes who this is for.
3. **Key actions** — cards stagger into view as the user scrolls.
4. **Timeline / what's happening now** — fills or animates as it enters the viewport.
5. **Resources / explore** — calmer, more browsable.

Each section should have a clear visual identity and a single purpose — don't let scenes blur into each other.

### Underlying grid

Within every scene, content snaps to the **square-cell grid** that underlies the international system — this is what keeps the cinematic format from drifting into stylistic noise.

- Scale cells with the section: **larger cells / fewer squares** for hero scenes; **smaller cells / more squares** for dense content like timelines or resources.
- Always scale from the **top-left**; preserve **complete (un-clipped) squares along the vertical axis**.
- Imagery may bleed off the edge — compositions should feel **dynamic and flowing**, not rigid.
- **Whitespace is part of the system.** Don't fill every cell.

## Signature Interaction: Progressive Reveal

Content should not appear all at once. As the user scrolls:

- Cards fade and slide in with staggered timing.
- Timelines fill progressively.
- Background hue shifts subtly between scenes — always within the palette (Maroon ↔ Dark Grey ↔ near-black).
- Sections feel "activated" rather than just rendered.

Pacing should feel intentional — every reveal earns attention.

## Components

- **Cards**: larger, more visual, less dense than a typical dashboard card. Lead with iconography or imagery. Optimize for _recognition over reading_.
- **Buttons**: filled in **NCKU Red 201C** with a soft luminous edge. Hover lifts the surface and softens the glow — no scale tricks that read as gimmicky, no out-of-palette gradient stops.
- **Icons**: monochromatic, single-weight line icons matching the official NCKU icon set's stroke and proportions. Tint in any palette color provided contrast is sufficient. Don't mix icon styles across the page.
- **Sections**: each one has a theme, a visual identity, and a single clear purpose.

## Photography

Per the brand: **reportage-style** — real moments, real students, real environments. No staged stock.

Three categories:

1. **People photography** — diverse genders and ethnicities; candid passing moments; students *and* researchers. Crop for engagement, but always preserve a clear focal point.
2. **Research photography** — equipment, locations, researchers in their actual fields. Varied, never clichéd.
3. **Abstract / texture** — close crops, used as ambient backgrounds or housed inside graphic shapes.

Color treatment with palette tints is encouraged for richness and depth — but stay inside the palette. The cinematic aesthetic only earns its weight when the subjects are real; generic stock photography breaks the contract immediately.

## Navigation

Hybrid model:

- **Top nav**: minimal, only the key sections.
- **Floating quick-access button**: sticky, always reachable, expands into the most-used actions (course registration, important dates, resources). This preserves real-world usability inside the cinematic frame.

## Information Architecture

Group content around _intent and moment_, not flat categories. Use **NCKU line icons** (single-weight, monochromatic) for each rail — not colored emoji.

- **Start Here**
- **Right Now**
- **Academic Life**
- **Explore Resources**

## Motion Design

Where this direction earns its premium feel.

**Use**: parallax scrolling, layered movement, fade + slide combos, ambient background motion, gentle easing.

**Avoid**: flashy or gimmicky effects, anything that feels laggy, motion that competes with content instead of supporting it.

Motion serves the narrative. It is not decoration, and it is not spectacle.

## Tone of Voice

One voice, multiple tones — adapt to the audience but stay recognizably NCKU.

- **Adopt the persona** — write as if NCKU were a person speaking to another person.
- **Active voice** — subject up front.
- **Precise but concise** — short words, short sentences, short paragraphs.
- **Edit ruthlessly** — cut every word not earning its place.
- **Warm, not stiff** — contractions are fine; starting with "And" / "But" is acceptable in informal scenes.
- **Read aloud** — if it doesn't sound natural spoken, rewrite.

## Emotional Target

The user should feel _curious_ ("what's next?"), _guided_ (never lost), and _quietly impressed_ (this doesn't look like a typical campus site). Motion and reveal serve that feeling — they're not decoration.

## What to Avoid

- ❌ **Phoenix Red `#E4002B` as a general UI accent** — reserved for the Phoenix flower mark, never recolored, never repurposed.
- ❌ **Colors outside the NCKU palette** (coral, blue, teal, custom gradients to non-palette stops). Need a softer surface? Use a **tint** of a palette color.
- ❌ **Noto Serif as a headline typeface.**
- ❌ **Gold or silver used as decorative color** — they are heritage/signature accents, used sparingly.
- ❌ **Staged or stock-cliché photography** — students-laughing-on-quad, generic lab beakers, etc.
- ❌ **Logotype** enclosed in shapes/frames, in more than one color, or scaled larger than the Graphic Signature.
- ❌ Dense, panel-heavy dashboard layouts.
- ❌ Flat dark mode without depth or lighting.
- ❌ Showing everything on first paint.
- ❌ Generic card grids with no hierarchy.
- ❌ Decorative animation that doesn't serve the narrative.
