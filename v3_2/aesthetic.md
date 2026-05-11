# v3_2 — Banded NCKU treatment of the v3 cinematic shell

This is a delta on top of `v3/`. Same scroll-driven cinematic structure, same content,
same scripts — but the page is rebalanced so that NCKU red reads as a structural
element instead of a small accent. The brief was:

> v3 is mostly white and "lacks the NCKU vibe." Make it more red — but not
> drown the page in red — and switch the Chinese characters to v0's font.

## What changed (vs. v3)

### 1. The page is *banded*, not tinted

The dominant feeling on `web.ncku.edu.tw` (and on `www.ncku.edu.tw`) is a tall
**solid red main nav** stacked under a thin **gold/tan utility strip**, with the
body breathing in white below. v3 inverted that — its topbar was white-glass and
red lived only inside small accents (kicker chip, CTA, scene rail). v3_2 puts the
red back at the chrome:

| Surface           | v3                              | v3_2                                                  |
| ----------------- | ------------------------------- | ----------------------------------------------------- |
| Utility strip     | absent                          | **gold** (`#8C6E4A → #B48F5E`), thin, fixed           |
| Topbar            | white-glass over hero           | **solid NCKU Red** with white knockout, fixed         |
| Hero              | white-majority w/ red atmosphere | white-majority + **diagonal maroon→red slab** + red kicker |
| Inter-scene band  | absent                          | **horizontal red band** ("成 · 大 · NCKU · OFY")       |
| Scene number      | thin red mono caption           | **red knockout ribbon + maroon sub-chip**             |
| President (04)    | white surface with red accents  | **deep maroon panel**, full-bleed, white type         |
| Cards (學業/生活/培力) | thin red rule on hover         | persistent **4px red top stripe**                     |
| Schedule rail     | grey hairline w/ red dots       | red gradient hairline w/ red ring on hover            |
| FAQ list          | white with grey divider         | white with **red top edge** + maroon knockout chips    |
| Footer            | light grey + thin gold rule     | **deep maroon panel** w/ stacked gold+red top rule    |

Net effect: about a fifth of the vertical surface is now majority-red (the topbar
+ president + footer), and the rest is white with red structural accents.
Red is unmistakably the brand color, but the body still breathes.

### 2. Chinese typography now matches v0

v3 loaded **Noto Sans TC** for Chinese characters. v0 doesn't — it loads only
*Open Sans* + *Nunito* as web fonts and lets Chinese fall through the stack to
the system CJK face (PingFang TC on macOS, Microsoft JhengHei on Windows). That
gives a slightly warmer, more familiar reading face than Noto Sans TC's geometric
sans, especially for body copy.

v3_2 replicates v0 exactly:

```css
--ff-body:    "Open Sans", "Nunito", "PingFang TC",
              "Microsoft JhengHei", "Heiti TC", system-ui, sans-serif;
```

Noto Serif TC was also dropped — v3 used it for the italic pull quote and hero
subtitle, but v0 doesn't have it either. v3_2 uses Open Sans italic instead
(`--ff-accent-italic`), which keeps the editorial italic feel without introducing
a font v0 doesn't have.

JetBrains Mono is kept for the small-caps section numbers, schedule timestamps,
and footer micro-text — that's a structural decision in v3 that survives intact.

## NCKU palette (active in v3_2)

```css
--ncku-red:       #A31F34;   /* PANTONE 201C — Signature Red */
--ncku-red-deep:  #8B1929;   /* half-stop deeper, used on gradient bottoms */
--ncku-red-soft:  #C8425A;   /* tint, used SPARINGLY (only as highlight stop) */
--ncku-maroon:    #420A15;   /* International Maroon — president & footer panel */
--ncku-maroon-2:  #2A060D;   /* near-black warm — gradient anchor under maroon */
--ncku-gold:      #8C6E4A;   /* PANTONE 874C — utility strip & footer rule */
--ncku-gold-2:    #B48F5E;   /* lifted gold for utility-strip top edge */
--ncku-silver:    #A6A9AB;   /* PANTONE 877C — secondary type */
--ncku-dark-grey: #555559;   /* PANTONE Cool Gray 11C — body text */
/* Reserved — Phoenix flower mark only, never as UI accent */
--phoenix-flower: #E4002B;
```

201C (`#A31F34`) is the only red used as a flat fill in v3_2. The Phoenix Red
`#E4002B` is *not* used anywhere — per NCKU brand rules it's reserved for the
Phoenix flower mark. Maroon `#420A15` carries the deep panel surfaces. Gold
appears only as a heritage strip — utility-strip background and the thin top rule
on the footer — never as a button or general accent.

## Where to look in the code

| Surface             | Selector                       | What's there                                       |
| ------------------- | ------------------------------ | -------------------------------------------------- |
| Gold utility strip  | `.utility-strip`               | fixed, gold gradient, mono micro-text              |
| Red topbar          | `.topbar`                      | fixed, solid red, white knockout logo circle       |
| Scene ribbon chip   | `.scene__num span` + `em`      | red knockout + maroon sub-label (`01` · `ACADEMIC LIFE`) |
| Inter-scene red band| `.band.band--red`              | full-width red strip, "成 · 大 · NCKU · OFY"      |
| President panel     | `.scene.scene--maroon`         | full-bleed maroon, white quote, gold "「" mark    |
| Card top stripe     | `.thread`                      | 4px red top border (always on)                     |
| Schedule rail       | `.schedule__row::before`       | 2px red gradient hairline; red dot on hover/open   |
| FAQ top rule        | `.faq__list`                   | 2px red top border + maroon knockout category chips|
| Maroon footer       | `.footer` / `.footer__rule`    | maroon background + stacked gold+red top rule      |

## Restraint notes (don't drift)

- Don't recolor the Phoenix flower mark in the logo — it stays Phoenix Red `#E4002B`. The rest of the UI lives in 201C / Maroon.
- Don't introduce a third red. The `--ncku-red-soft` tint exists only as a gradient stop or a low-opacity wash — never as a flat fill.
- Don't tint the body type maroon globally. Body remains Cool Gray 11C; maroon is for headings and structural surfaces.
- Don't add red to the FAB beyond what's there — it's already a strong floating red disc, more would compete with the topbar.

## Sources

- `../ncku-design.md` — the project's NCKU brand reference (CIS palette + international additions).
- `https://web.ncku.edu.tw/index.php?Lang=zh-tw` — the live school site that motivated the gold + red header treatment.
- `../v0/site/styles.css` — the source of the Open Sans + system-CJK font stack copied into v3_2.
- `../v3/site/` — the cinematic shell this version diffs against.
