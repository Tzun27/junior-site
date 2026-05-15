# UI Aesthetic Concept: National Cheng Kung University

> Aligned with NCKU's official Corporate Identity System (CIS) and the international brand guidelines. See `../ncku-design.md` for the underlying reference. This site is a **school-facing / Traditional Chinese** surface, so the **CIS palette is the default** — the brighter international "Phoenix Red" is reserved for the Phoenix flower mark and is **not** used as a general accent here.

## Core Concept

**"Modern Academia × Warm Heritage"** — a UI that expresses NCKU's three brand pillars (Brave & Ambitious / Collaborative & Creative / Committed & Responsible) through restraint, generous whitespace, and a single confident red. Reference points: the live `web.ncku.edu.tw` aesthetic (functional, restrained, government-feel), the international brand book's bolder applications (square-grid scaffolding, candid reportage photography), and editorial layouts that let typography do the work. The feeling should be _institutional experience_, not _information portal_.

The brand line — *"Connecting inspiration, ideas and impact."* — sets the register: confident, grounded, action-forward, never whimsical.

## Positioning

The design must communicate: top-tier research university, internationally-ready, calm confidence. Avoid the current "noisy admin board" feel — overcrowded layouts, weak hierarchy, red used everywhere until it loses meaning. Replace density with breathing space; replace portal-thinking with student-journey-thinking. Lean toward the **restraint** of the live site rather than the bolder mood-imagery applications in the international brand book.

## Color System

Anchor on the **CIS palette** and use it sparingly. The four CIS colors are the entire vocabulary; do not introduce off-palette swatches — use **tints** when softer surfaces are needed.

- **NCKU Red `#A31F34`** (PANTONE 201C) — the primary brand red. Used for headers, primary nav chrome, links, and CTAs. This matches the live site's dominant red. **Not** the brighter Phoenix Red.
- **NCKU Dark Grey `#555559`** (PANTONE Cool Gray 11C) — body text, secondary headings, and neutral hierarchy on light backgrounds.
- **NCKU Gold `#8C6E4A`** (PANTONE 874C) — supporting only. Reserved for signature/heritage moments: a thin top utility strip (mirroring the live site), small download/affordance marks, ornamental rules. Never used as a general accent.
- **NCKU Silver `#A6A9AB`** (PANTONE 877C) — supporting only. Used for dividers, hairlines, and tinted backgrounds.
- **White `#FFFFFF`** — the dominant background. Body content sits on white; no off-white "ivory" substitutes.

Permitted additions for English-facing surfaces only (see `ncku-design.md` §2.2): **Maroon `#420A15`** for deep heading text on light backgrounds. **Phoenix Red `#E4002B`** is reserved for the Phoenix flower mark and **must not** be recolored or repurposed.

The overall ratio skews heavily neutral — white surfaces, dark grey text — with NCKU Red as deliberate punctuation, not wallpaper.

## Typography

Use the **Noto** family throughout. This satisfies both the international brand spec and is the safe web substitute for the CIS-prescribed Arphic AR HeiB5 / AR MingB5 (which aren't web-licensed).

- **Sans stack:** `"Noto Sans TC", "Noto Sans", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif`
- **Serif stack (sparing use only):** `"Noto Serif TC", "Noto Serif", "PMingLiU", Georgia, serif`

Hierarchy:

- **Headlines — Noto Sans Light.** Yes, *light* weight for headlines — this is the official choice and is intentional; it balances the bold Graphic Signature with a contemporary feel. Headlines are large and confident with generous tracking.
- **Sub-headings / emphasis — Noto Sans Bold.**
- **Body — Noto Sans Regular**, line-height 1.6–1.75, comfortable measure.
- **Noto Serif is permitted only for sparing emphasis** (pull quotes, annual-report-style callouts). **Never use Noto Serif for headlines.** Hierarchy can also be expressed via color, not only size/weight.

### Headline writing

Aim for **seven words or fewer**, benefit-led, declarative, action-forward. Cadence reference (from the brand book): *"Innovation needs dirty hands." / "Progress is a team sport." / "Every discovery is just the start."* Short, optimistic, brave.

## Layout & Composition

Use a **square-cell grid** as the invisible scaffold (per the international system): all content snaps to the grid; cell size scales to the application — fewer/larger cells for bold simple pages, smaller/denser cells for content-heavy pages. Always scale from the top-left; preserve complete (un-clipped) squares along the vertical axis. **Whitespace is part of the system — don't fill every cell.**

Sections should alternate between white and softly **silver-tinted** blocks for rhythm, never introducing new background colors. Use a structured grid with generous gutters and strong vertical rhythm.

Hero sections should feel cinematic but restrained: full-width reportage imagery or a quiet looping video, a single short headline (≤7 words), one strong NCKU-Red CTA. Imagery may bleed off the edge — compositions should feel dynamic and flowing, not rigid.

## Signature & Brand Marks

The official **Graphic Signature** is the only signature mark on this site. Do **not** invent decorative motifs (curves, flourishes, badges) — the brand explicitly prohibits placing the Graphic Signature inside another shape or frame, recoloring the Phoenix flower, or otherwise embellishing the marks. The Graphic Signature can be:

- standalone,
- locked up with the logotype,
- used to *house* a piece of reportage photography (image placed inside the signature shape).

Minimum sizes: Graphic Signature never below **46 px wide**; logotype with Chinese script never below **85 px wide**.

## Components

Match the live site's **minimal chrome** rather than the soft-card-with-shadow language common to startup landing pages.

- **Page chrome:** thin NCKU Gold (`#8C6E4A`) utility strip (~30 px) at the very top → main navigation in NCKU Red (`#A31F34`) with white text → centered logo extending slightly *below* the red bar into the white content area (mirrors `web.ncku.edu.tw`).
- **Buttons:** primary is solid NCKU Red with white text; secondary is outlined NCKU Red. Hover deepens to Maroon (`#420A15`) on English-facing surfaces, or holds to NCKU Red with a silver-tint background on Chinese-facing surfaces. Modest 4–8 px radius — the live site uses minimal corner rounding.
- **Cards / content blocks:** keep flat. The live site uses **no drop shadows and no rounded corners** on main-page content; favor that restraint. Differentiate blocks with whitespace and silver hairlines, not elevation.
- **Tables / lists:** plain — header label left, content/link right, thin silver rules between rows.
- **Iconography:** thin single-weight line icons with consistent stroke; small NCKU Gold download arrows beside download links (one of the few places gold appears on the public site). Match the existing official icon set's stroke and proportions; don't mix styles.
- **Forms / inputs:** generously padded, silver-hairline borders, NCKU Red focus state.

## Photography

Reportage style — real moments, real people, real environments on the NCKU campus and in actual research settings. Three categories: **people** (candid, diverse, students *and* researchers), **research** (equipment, fields, labs — never clichéd), **abstract/texture** (close crops used as backgrounds or housed inside the Graphic Signature). Imagery may receive light tints from the brand palette for depth. **Never** use staged stock-cliché photography (the "diverse students smiling at a laptop" trope).

## Motion

Subtle and restrained. Fade-in on scroll, gentle 8–12 px upward motion on entry, soft 1.02–1.03× scale on button hover. No flashy transitions, no playful bounces, no parallax theatrics. Motion should feel like a confident institution, not a startup landing page.

## Information Architecture & Tone of Voice

Reorganize sections around the student/visitor journey rather than internal admin structures. Translate bureaucratic labels into human language ("Start your journey," "Academic life," "Resources," "Support," "Important dates").

Writing rules of thumb (from the brand book):

1. **Adopt the persona** — write as if NCKU were a person speaking to another person.
2. **Active voice, subject up front.** *"NCKU collaborates with partners worldwide to make change happen."*
3. **Adapt to the audience** — marketing copy can be brave/creative; functional copy stays precise/accessible.
4. **Be precise but concise** — short words, short sentences, short paragraphs.
5. **Edit ruthlessly** — cut every word that isn't earning its place.
6. **Don't always be formal** — contractions are fine; starting sentences with "And"/"But" is acceptable in informal contexts.
7. **Read aloud** — if it doesn't sound natural spoken, rewrite.

## What to Avoid

- Phoenix Red `#E4002B` as a general UI accent — it's the Phoenix flower's color only.
- Off-palette swatches (custom ivories, custom golds, made-up tints). Use tints of the four CIS colors instead.
- Noto Serif as a headline typeface (explicit brand don't).
- Decorative motifs invented around the brand marks (curves, flourishes, frames around the Graphic Signature).
- Heavy red saturation across the whole interface; dense link clusters; small dense text blocks.
- Drop shadows, heavy rounded corners, and other startup-landing-page chrome — the live school site is flatter and more restrained.
- Staged/cliché stock imagery; anything that reads as "government portal" or "1990s university homepage modernized just enough."

## Aesthetic Keywords

CIS-aligned, minimal academic interface, restrained editorial layout, square-cell grid, white surfaces with silver tints, NCKU Red as punctuation, Noto Sans Light headlines, breathing space, calm institutional confidence, reportage photography, official Graphic Signature, no invented motifs.

## Quick-reference CSS variables

```css
:root {
  /* CIS palette — default for this site */
  --ncku-red: #A31F34;            /* PANTONE 201C — primary */
  --ncku-dark-grey: #555559;      /* PANTONE Cool Gray 11C — body text */
  --ncku-gold: #8C6E4A;           /* PANTONE 874C — supporting */
  --ncku-silver: #A6A9AB;         /* PANTONE 877C — dividers, tints */
  --ncku-white: #FFFFFF;

  /* International additions — English-facing surfaces only */
  --ncku-maroon: #420A15;         /* deep heading text, hover */
  --ncku-phoenix-red: #E4002B;    /* Phoenix flower mark ONLY */

  --ncku-font-sans: "Noto Sans TC", "Noto Sans", "PingFang TC",
                    "Microsoft JhengHei", system-ui, sans-serif;
  --ncku-font-serif: "Noto Serif TC", "Noto Serif", "PMingLiU",
                     Georgia, serif;
}
```
