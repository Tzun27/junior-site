# NCKU Design Aesthetic — Reference

A working reference for matching the National Cheng Kung University (國立成功大學) visual identity. Compiled from official sources (see end of doc).

> **Note on scope.** NCKU maintains two complementary identity systems, and they are **not identical**:
> 1. **CIS (識別系統)** — the original/domestic Traditional Chinese system, spec sheet `A-03 BASIC DESIGN SYSTEM`. Defines **only 4 colors**: a primary red (PANTONE 201C), a dark grey (Cool Gray 11C), and two supporting colors — gold (874C) and silver (877C). No bright "Phoenix Red", no near-black "Maroon".
> 2. **International Brand Guidelines** — published on brandpad.io for non-Chinese-language audiences. **Adds** Phoenix Red, Maroon, Dark Grey and Signature Red on top of the existing CIS palette to allow more contrast and standout.
>
> **Practical rule:** for school-facing or Traditional Chinese materials, work in the CIS palette. For international/English-facing materials, the international additions are available. The deployed `web.ncku.edu.tw` site uses the **CIS palette** — its dominant red is PANTONE 201C (`#A31F34`), not the brighter international Phoenix Red.

---

## 1. Brand personality (the feeling to aim for)

Three pillars, in NCKU's own words:

- **Brave & Ambitious** — never afraid to try new things, to challenge conventions with reason. Confident, not timid.
- **Collaborative & Creative** — open, welcoming, accessible. Works across boundaries.
- **Committed & Responsible** — gets hands dirty. Practical, grounded, proud of tradition.

Brand line: *"Connecting inspiration, ideas and impact."*

Practical implication for design: **bold and grounded, not playful or whimsical**. Confident typographic statements, generous whitespace, restrained color use punctuated by a single strong red accent.

---

## 2. Color palette

### 2.1 CIS palette (domestic — use this by default)

The CIS spec sheet `A-03` defines four colors total: two main, two supporting. **The deployed `web.ncku.edu.tw` site uses this palette** — the dominant header red is PANTONE 201C, accented by a thin 874C gold strip in the utility nav.

| Role | Name | Hex | RGB | Pantone | CMYK (process) |
|---|---|---|---|---|---|
| **Main 1 — primary red** | NCKU Red | `#A31F34` | 163, 31, 52 | **201C** | C30 M100 Y100 K0 |
| **Main 2 — dark grey** | NCKU Dark Grey | `#555559` | 85, 85, 89 | **Cool Gray 11C** | K85 |
| **Supporting — gold** | NCKU Gold | `#8C6E4A` | 140, 110, 74 | **874C** | C40 M50 Y70 K10 |
| **Supporting — silver** | NCKU Silver | `#A6A9AB` | 166, 169, 171 | **877C** | K40 |

The two main colors carry the identity; gold and silver (輔助色) are explicitly secondary, used to give signature treatments a more formal/heritage feel — see the gold-on-white and silver-on-white logo lockups in the spec sheet.

**Print convention from the spec sheet:** when 201C / Cool Gray 11C aren't available as spot colors (特別色), use the listed CMYK process equivalents. Don't substitute arbitrary Pantone numbers or reinvent the CMYK values.

### 2.2 International additions (English-facing only)

The international system **adds** these on top of the CIS palette to allow more contrast and standout for non-Chinese audiences. Don't use them on Chinese-language or school-facing work unless you have a specific reason.

| Name | Hex | RGB | Pantone | Role |
|---|---|---|---|---|
| **Phoenix Red** | `#E4002B` | 228, 0, 43 | 185C | The Phoenix flower mark only. Bright, energetic. |
| **Maroon** | `#420A15` | 66, 10, 21 | 4102C | Graphic signature on light backgrounds, deep heading text. |
| **Dark Grey** | `#312D33` | 49, 45, 51 | 433C | Slightly bluer/warmer than CIS Cool Gray 11C. Body text. |
| **White** | `#FFFFFF` | 255, 255, 255 | — | Backgrounds, knockout text. |

> ⚠️ The international "Signature Red" (`#A31F34`, 201C) is the **same color as the CIS primary red**. They're two names for the same swatch — naming differs by which system you're working in.

### 2.3 Accessibility — AA-compliant text/background pairs

From the international guide (applies to the combined palette):

- **Maroon text**: on Silver, Phoenix Red, White
- **Dark Grey text**: on Silver, White
- **Signature Red / NCKU Red (201C) text**: on tints of Silver, on White
- **White text**: on Maroon, Signature Red, Phoenix Red, Dark Grey, Grey, Gold

### 2.4 Color usage rules of thumb

- For Chinese-language or school-facing work, default red is **PANTONE 201C / `#A31F34`**, not Phoenix Red.
- The Phoenix flower mark, when used, must **always** remain Phoenix Red `#E4002B` — never recolored.
- Default text on light backgrounds → **NCKU Red (201C), Maroon, or Dark Grey**.
- Default text on dark backgrounds → **White**.
- For softer backgrounds, use **tints** of palette colors — don't introduce new colors.
- Gold and silver are **supporting**, not decorative — reserve them for signature/formal treatments (envelopes, certificates, gold/silver knockouts of the logo). Don't use them as general accent colors.

---

## 3. Typography

### Primary typeface: **Noto** family (Google Fonts)

- **Noto Sans** — primary typeface. Use for headings *and* body, print and digital.
- **Noto Serif** — sparing use only; for highlighting (e.g. pull quotes, annual report callouts). **Never use as a headline typeface.**

### Weight & hierarchy

- **Headings**: Noto Sans **Light** is the official choice for headlines — it balances the bold Graphic Signature with a contemporary feel. (Yes, light weight for headlines — this is intentional and on-brand.)
- **Sub-headings / emphasis**: Bold weights of Noto Sans.
- **Body**: Noto Sans regular. Switch to Noto Serif body only when contrasting with a sans-serif headline for an authoritative tone (e.g. research pieces).
- **Hierarchy can also be expressed via color**, not only size/weight.

### Chinese typography (CIS — verified)

The official CIS font reference (`成大識別系統使用之中文字型對照表`, 2016-11-23) specifies **two Arphic Technology (文鼎) families**, with five weights each. These ship as a downloadable bundle from the CIS page (`中文字型下載`).

**Sans-serif (黑體) — 文鼎黑體 / AR Hei B5**
| Weight | Filename |
|---|---|
| 文鼎黑體-Light | `AR HeiB5 Light` |
| 文鼎黑體-Medium | `AR HeiB5 Medium` |
| 文鼎黑體-Bold | `AR HeiB5 Bold` |
| 文鼎黑體-ExtraBold | `AR HeiB5 ExtraBold` |
| 文鼎黑體-Ultra | `AR HeiB5 Ultra` |

**Serif (明體) — 文鼎明體 / AR Ming B5**
| Weight | Filename |
|---|---|
| 文鼎明體-Light | `AR MingB5 Light` |
| 文鼎明體-Medium | `AR MingB5 Medium` |
| 文鼎明體-Bold | `AR MingB5 Bold` |
| 文鼎明體-Heavy | `AR MingB5 Heavy` |
| 文鼎明體-Ultra | `AR MingB5 Ultra` |

> Subtle detail: the Hei family's 4th weight is **ExtraBold**, but Ming's 4th weight is **Heavy**. The two ranges aren't perfectly parallel.

**Important caveats:**
- These are **commercial Arphic fonts** licensed to NCKU. The CIS font reference document does not itself prescribe pairings (e.g. "Hei Bold for headings, Ming Medium for body") — it's just the font list. If you need the editorial rules on which weight to use where, check the PPT/Word template usage guides on the CIS page (`dlid=8`, `dlid=10`).
- The "B5" in the filenames refers to the **Big-5 encoding** of Traditional Chinese — these are pre-Unicode fonts. Glyph coverage is limited to the Big-5 character set; uncommon characters or Simplified Chinese will not render.
- For **web use**, Arphic AR Hei/Ming B5 are not standard web fonts and licensing may not extend to web embedding. **For web/digital deliverables, the safe substitutes that match the same visual class are:**
  - Sans-serif (matches AR Hei): **Noto Sans TC** (Google Fonts) or **思源黑體 / Source Han Sans TC** (the upstream of Noto Sans CJK)
  - Serif (matches AR Ming): **Noto Serif TC** or **思源宋體 / Source Han Serif TC**
- This also conveniently aligns with the international brand's choice of the **Noto** family — so a single Noto-family stack (Noto Sans TC + Noto Sans for English; Noto Serif TC + Noto Serif for English) covers both systems coherently.

### Headline writing

Aim for **seven words or fewer**. Benefit-led, brave, often a complete short statement. Sample on-brand headlines from the brand book:

- "Innovation needs dirty hands."
- "Progress is a team sport."
- "Every discovery is just the start."
- "To do something great, start somewhere different."

Note the cadence: short, declarative, optimistic, action-forward.

---

## 4. Layout & grid

The international system uses a **square-cell grid** as an invisible scaffold.

- All content (graphic signature, copy, imagery) snaps to the square grid.
- Grid cell size scales to the application: **larger cells / fewer squares** for bold simple layouts; **smaller cells / more squares** when content is dense.
- Always scale from the **top-left corner**, and ensure **complete (un-clipped) squares along the vertical axis**.
- Imagery may bleed off the page edge; compositions should feel **dynamic and flowing**, not rigid.
- **Whitespace is part of the system** — don't fill every cell.

The Graphic Signature can be:
- standalone,
- locked up with the logotype,
- used to *house* photography (image placed inside the signature shape).

### Minimum sizes

- **Graphic Signature** — never below **16 mm / 46 px wide**.
- **Logotype (with Chinese script)** — never below **22 mm / 85 px wide**.

---

## 4.5. Live web aesthetic (`web.ncku.edu.tw`)

Observed from the live site — useful if matching the school's existing web look:

- **Header structure:** thin gold/tan utility nav strip (~30px tall) at the very top → main navigation bar in NCKU Red (201C) with white text, centered logo.
- **Logo placement:** centered in the header, breaking slightly *below* the red bar (extends into the white content area) — gives the logo prominence without floating it.
- **Header red:** PANTONE 201C / `#A31F34`. **Not** the brighter Phoenix Red — confirming the rule that domestic web work uses the CIS palette.
- **Body:** white background, dark text, light grey dividers between content blocks.
- **Section headings:** centered, large, dark grey/near-black, generous vertical whitespace above and below.
- **Content cards:** simple — thumbnail + title + "更多內容" link. No drop shadows, no rounded corners on the main page; minimal chrome.
- **Tables:** very plain — header label on the left, content/download link on the right, thin grey rules between rows.
- **Iconography:** small gold download arrows next to download links — one of the few places gold appears on the public site.

In short: the live site is **functional, government-feel, restrained** — far more conservative than the international brand book's mood imagery suggests. If matching the school's actual web presence, lean toward this restraint rather than the bolder international applications.



The brand calls for **reportage-style photography** — real moments, real people, real environments. Not staged, not stock-cliché.

Three categories:

1. **People photography** — diverse genders and ethnicities, candid passing moments, students *and* researchers. Cropping is encouraged for engagement, but always preserve a clear focal point.
2. **Research photography** — equipment, locations, researchers in their actual fields. Varied, never clichéd.
3. **Abstract/texture photography** — close-ups and crops, often used as backgrounds or housed inside the Graphic Signature.

Photography may receive **color treatment** (tints from the brand palette overlaid) for richness and depth.

Visual mood: simple, bold, inspiring, innovative.

---

## 6. Iconography

A custom NCKU icon set exists (downloadable from the brand portal). Style is simple line-based, single-weight, monochromatic — colorable in any palette color provided contrast is sufficient. New icons should match the existing set's stroke and proportions rather than mixing styles.

---

## 7. Tone of voice

**One voice, multiple tones.** The voice is the brand personality (above); the tone adapts to audience and context.

Writing style rules-of-thumb (from the brand book):

1. **Adopt the persona** — write as if NCKU were a person speaking to another person.
2. **Use the active voice** — subject up front. *"NCKU collaborates with partners worldwide to make change happen."*
3. **Adapt to the audience** — marketing copy can be brave/creative; functional copy should be precise/accessible.
4. **Be precise but concise** — short words, short sentences, short paragraphs (especially online).
5. **Edit ruthlessly** — cut every word that isn't earning its place.
6. **Don't always be formal** — contractions ("you're", "we've") are fine and warmer. Starting sentences with "And"/"But" is acceptable in informal contexts.
7. **Read aloud** — if it doesn't sound natural spoken, rewrite.

---

## 8. Quick-reference CSS variables

For web/UI work. The CIS palette is grouped first because it's what you'll want by default for school-facing or Chinese-language work.

```css
:root {
  /* === CIS palette (domestic — use by default) === */
  --ncku-red: #A31F34;            /* PANTONE 201C — primary red */
  --ncku-dark-grey: #555559;      /* PANTONE Cool Gray 11C */
  --ncku-gold: #8C6E4A;           /* PANTONE 874C — supporting */
  --ncku-silver: #A6A9AB;         /* PANTONE 877C — supporting */

  /* === International additions (English-facing only) === */
  --ncku-phoenix-red: #E4002B;    /* Phoenix flower mark only */
  --ncku-maroon: #420A15;         /* Deep heading text, signature */
  --ncku-intl-dark-grey: #312D33; /* slightly different from CIS */

  --ncku-white: #FFFFFF;

  /* === Type ===
   * For print: NCKU CIS specifies Arphic AR HeiB5 (sans) and AR MingB5 (serif),
   *            5 weights each, available from the CIS font download page.
   * For web:   Arphic Big-5 fonts aren't web-suitable; use Noto as the safe
   *            substitute (also matches the international brand's choice). */
  --ncku-font-sans: "Noto Sans TC", "Noto Sans", "PingFang TC",
                    "Microsoft JhengHei", system-ui, sans-serif;
  --ncku-font-serif: "Noto Serif TC", "Noto Serif", "PMingLiU",
                     Georgia, serif;
}
```

Recommended defaults for a domestic/school-facing web build:
- Page background: white. Body text: `var(--ncku-dark-grey)`.
- Primary navigation / brand chrome: `var(--ncku-red)` background with white text — matches the live site.
- Top utility strip: `var(--ncku-gold)`.
- Links / CTAs: `var(--ncku-red)`.
- Dividers, subtle borders: tints of `var(--ncku-silver)`.

---

## 9. Don'ts (assembled from brand book)

- ❌ Don't recolor the Phoenix flower — it's always Phoenix Red.
- ❌ Don't put the Graphic Signature inside another shape/frame.
- ❌ Don't change the proportions of Chinese-to-English in the logotype.
- ❌ Don't use more than one color in the logotype.
- ❌ Don't make the logotype bigger than the Graphic Signature.
- ❌ Don't use Noto Serif for headlines.
- ❌ Don't introduce colors outside the palette — use **tints** of palette colors when softer backgrounds are needed.
- ❌ Don't use staged/cliché stock imagery — photography must feel candid and real.

---

## Sources

- **Primary — CIS Chinese font reference** `成大識別系統使用之中文字型對照表` (2016-11-23) — provided as document. Lists Arphic AR HeiB5 (5 weights) and AR MingB5 (5 weights) as the official CIS Chinese typefaces. Available via `cc.ncku.edu.tw/cis/cisdl.php?dlid=23`.
- **Primary — CIS (domestic) spec sheet `A-03 BASIC DESIGN SYSTEM`** — provided as screenshot. Defines the 4-color CIS palette (PANTONE 201C, Cool Gray 11C, 874C, 877C) with Pantone, RGB, and CMYK values, plus gold/silver knockout signature treatments.
- **Primary — International Brand Guidelines (full spec):** https://brandpad.io/ncku-international-brand/ — colors, typography, grid, photography, tone of voice.
- **Primary — Live site reference:** https://web.ncku.edu.tw/index.php?Lang=zh-tw — informs the "live web aesthetic" section.
- **Secondary — International Identity System overview (zh-TW):** https://web.ncku.edu.tw/p/412-1000-28530.php?Lang=zh-tw
- **Secondary — CIS index page (zh-TW):** https://web.ncku.edu.tw/p/412-1000-18098.php?Lang=zh-tw — directory of downloadable templates (business card, PPT, Word, envelope, letterhead, etc.) and additional spec PDFs at `cc.ncku.edu.tw/cis/cisdl.php?dlid=N`.
- **Contact for clarification:** Division of Branding and Communication (策略發展整合室 識別溝通組), brand@ncku.edu.tw, +886 6 2757575 ext. 51069.
