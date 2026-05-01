# UI Overhaul — Design Direction

> **Brand alignment.** This v2 mockup follows NCKU's official **CIS (識別系統)** design system — the domestic palette used on `web.ncku.edu.tw`. Colors, typography and tone here are derived from `../ncku-design.md`; treat that document as the source of truth and this file as the v2-specific application of it.

---

## Core Concept

Transform the current site from a static, section-based page into a **campus dashboard** — a modular, app-like interface that feels like a student productivity tool while still reading clearly as an NCKU property.

Reference points: **a Notion-style dashboard, dressed in NCKU CIS chrome.** Functional and grounded — closer in feel to the live `web.ncku.edu.tw` than to consumer SaaS.

The end result should feel fast and responsive, but never flashy. Bold typographic statements, generous whitespace, and a single strong red accent — in line with NCKU's brand pillars: *brave & ambitious, collaborative & creative, committed & responsible.*

---

## Visual Identity

**Philosophy:** Light-first, high contrast, restrained. Red used **structurally** as an anchor for navigation and primary actions — never decoratively.

### Palette (CIS — domestic)

| Role         | Token                | Color                  | Usage                                              |
| ------------ | -------------------- | ---------------------- | -------------------------------------------------- |
| Primary      | `--ncku-red`         | NCKU Red `#A31F34`     | Top nav, active states, primary buttons, CTAs      |
| Text / Ink   | `--ncku-dark-grey`   | Dark Grey `#555559`    | Body text, secondary headings                      |
| Supporting   | `--ncku-gold`        | Gold `#8C6E4A`         | Utility nav strip, download arrows, formal accents |
| Supporting   | `--ncku-silver`      | Silver `#A6A9AB`       | Dividers, borders, disabled states, soft tints     |
| Background   | `--ncku-white`       | White `#FFFFFF`        | Page background, card surfaces                     |

**Tints, not new colors.** When a softer surface is needed (hover row, inactive panel, muted badge), use a tint of Silver or Red — do not introduce additional hues. Neon accents, blues and corals are **out of palette**.

> ⚠️ Earlier drafts of this file used **Phoenix Red `#E4002B`** as the primary. That is the international-palette red and is reserved for the Phoenix flower mark; it is **not** the correct red for school-facing or Traditional Chinese work. Primary red on this site is **PANTONE 201C `#A31F34`**, matching the live `web.ncku.edu.tw` header.

**Aesthetic keywords:** institutional dashboard, restrained, functional, generous whitespace, single red anchor, square-grid layout, calm modular surfaces.

---

## Typography

A single Noto-family stack covers both Traditional Chinese and English coherently — and matches both the international brand's choice and the safe web substitute for the CIS print fonts (Arphic AR HeiB5 / AR MingB5).

```css
--ncku-font-sans:  "Noto Sans TC", "Noto Sans", "PingFang TC",
                   "Microsoft JhengHei", system-ui, sans-serif;
--ncku-font-serif: "Noto Serif TC", "Noto Serif", "PMingLiU",
                   Georgia, serif;
```

- **Headings** — Noto Sans **Light**. Yes, light weight for headlines is the official NCKU choice; it balances bold graphic elements with a contemporary feel. Do **not** use Noto Serif for headlines.
- **Sub-headings / emphasis** — Noto Sans Bold.
- **Body** — Noto Sans Regular, Dark Grey on white.
- **Pull quotes / editorial callouts only** — Noto Serif, sparingly.
- **Headline writing** — aim for **seven words or fewer**, declarative and action-forward (e.g. "Every discovery is just the start.").
- **Hierarchy** can be expressed via color (red vs. dark grey) as well as size and weight.

---

## Layout Philosophy

Shift from "website with sections" to **"institutional dashboard."** The structure is app-like, but the surface treatment stays restrained.

**Page chrome (matching the live site's header anatomy):**

- **Top utility strip** — thin gold (`--ncku-gold`) bar (~30px) for language toggle, search, sign-in.
- **Primary nav bar** — NCKU Red (`--ncku-red`) with white text. Centered logo may break slightly below the red bar into the white content area, mirroring `web.ncku.edu.tw`.
- **Left:** persistent, collapsible sidebar with icon + label navigation on white surface, silver dividers.
- **Main:** dynamic grid of panels and cards on white background.

**Grid:** the international system specifies a **square-cell grid** as an invisible scaffold — content snaps to it, scaling from the top-left, with whole (un-clipped) cells along the vertical axis. Use this for card sizing and image crops; let some cells stay empty (whitespace is part of the system).

---

## Component System

**Cards are the primary building block.** Restrained, not glowing.

- White surface on the page background.
- Hairline border in a Silver tint, or a thin Silver bottom rule between sections — no drop shadows by default.
- Hover state: subtle elevation (1–2px shift, light shadow) — never a glow.
- Headings inside cards: Noto Sans Light, Dark Grey or NCKU Red for emphasis.

**Buttons:**

- **Primary** — filled NCKU Red, white label, square-ish corners.
- **Secondary** — ghost/outlined, Dark Grey label, Silver border.
- **Tertiary / link-style** — NCKU Red text, no chrome.
- Hover: minor darken or underline; no glow.

**Data tables:** plain by default — left-aligned label column, content on the right, thin Silver rules between rows. Sortable headers and row-hover highlight (Silver tint) are fine; sticky headers acceptable for long lists.

**Iconography:** simple line-based, single-weight, monochromatic. New icons should match the existing CIS icon set's stroke and proportions; recolor to palette colors only. Small Gold download arrows beside file links — one of the few sanctioned uses of Gold on the public site.

---

## Information Architecture

Reorganize navigation around **actions**, not static categories — but label them in NCKU's grounded voice (avoid emoji-led labels in production; they're useful for sketching only).

Working entries:

- **Start Here** — orientation, first-week checklists.
- **My Schedule** — calendar, deadlines.
- **Study Tools** — courses, library, learning resources.
- **Admin Tasks** — registration, forms, fees.
- **Student Life** — clubs, housing, campus services.

---

## Signature Feature: Smart Student Dashboard

A personalized landing area featuring:

- Today's tasks
- Upcoming deadlines
- Recommended resources

Static/mock data is fine — the goal is for the interface to **feel** intelligent and personalized while staying visually consistent with the rest of the school's web presence.

---

## Photography & Imagery

When imagery appears in cards or hero panels:

- **Reportage-style**: real students, real researchers, real environments. Candid, not staged.
- Crops are encouraged for engagement, but always preserve a clear focal point.
- Color treatment with palette tints is allowed for richness; **no off-palette filters**.
- Imagery may bleed off the card edge for a dynamic feel — but compositions should still snap to the square grid.

---

## Interaction & Motion

Calm, functional motion. Snappy but not gimmicky.

- **Hover:** subtle elevation or underline. No neon glow, no scale-up beyond ~1.02.
- **Click:** quick panel transitions (~150–200ms ease-out).
- **Sidebar:** animated expand/collapse.
- **Page transitions:** crossfade or slide; never bouncy.

If a motion would feel out of place on `web.ncku.edu.tw`, it's probably too much for v2 too.

---

## Visual Hierarchy

Drive emphasis through:

- **Size** — larger cards for higher-priority modules.
- **Color** — NCKU Red signals active or primary; Dark Grey is the default ink; Gold is reserved for utility/formal accents.
- **Whitespace** — generous vertical rhythm above and below section headings, mirroring the live site.
- **Motion** — hover and transition emphasis only on actionable elements.

---

## Tone of Voice

One voice (NCKU's: brave, collaborative, committed), tone adapts to context:

1. **Adopt the persona** — write as if NCKU were a person speaking to a student.
2. **Active voice**, subject up front.
3. **Precise but concise** — short words, short sentences, short paragraphs.
4. **Edit ruthlessly.**
5. **Don't always be formal** — contractions are fine; warmer reads better online.
6. **Read aloud** — if it doesn't sound natural, rewrite.

Marketing/promo copy can be brave and creative; functional copy (forms, tables, errors) must be precise and accessible.

---

## Don'ts

- ❌ Don't use **Phoenix Red `#E4002B`** anywhere except the Phoenix flower mark itself. Primary red is **NCKU Red `#A31F34`**.
- ❌ Don't introduce off-palette colors (electric blues, neon corals, etc.) — use **tints** of palette colors instead.
- ❌ Don't use Noto Serif for headlines.
- ❌ Don't recolor or reframe the school logo / Graphic Signature.
- ❌ Don't apply glow or heavy drop-shadow effects — NCKU's web aesthetic is restrained, not neon.
- ❌ Don't use staged/cliché stock imagery — photography must feel candid and real.
- ❌ Don't fall back to the dark-mode neon palette from earlier drafts; that direction is off-brand for school-facing work.

---

## Reference

- `../ncku-design.md` — the working reference for the CIS palette, typography, grid, photography, tone, and live-site observations. Every choice in this file should be traceable back to it.
- Live site benchmark: `https://web.ncku.edu.tw/index.php?Lang=zh-tw`.
