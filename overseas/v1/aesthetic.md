# v-May15 — the feedback aggregate

This version is **not a fresh design**. It is a deliberate aggregate of the
earlier mockups, assembled to answer the written feedback in
`../feedback/converted/新生支持辦公室網頁改版意見.md` (the 2026-05-13 review from
the 新生支持辦公室). Every structural choice traces back to a numbered point in
that file.

## Provenance — what came from where

| Layer | Source | Why |
| --- | --- | --- |
| Page shell, chrome, scene structure, right-side TOC rail | **v3_2** | Feedback pt 5 keeps v3's right-side 目錄 rail; pt 1 calls v3/v4 lower sections "簡潔清晰". v3_2 is v3's cinematic shell already rebalanced into the NCKU gold-strip + red-topbar chrome. |
| Type stack (Noto Sans + Noto Sans TC) | **feedback pt 10** | The review offered v3_2's font *or* Google's Noto Sans / Noto Sans TC — this version takes the Noto pair. See the pt 10 checklist entry below. |
| Hero — banner carousel | **v1** | Feedback pt 1 — students liked v1's top banner. v1's `.hero-media` slideshow grafted in over the v3_2 hero; runs the photo banners (b1 / b3 / b4) on a 7.5 s rotation, pure-graphic banners dropped. |
| 學業 / 生活 / 培力 cards, 校長的話 maroon panel | **v3_2** | The "lower sections" praised in pt 1; untouched from v3_2. |
| 入學重要日程 table, 常見問題 search/accordion | **v4** | Feedback pt 7 — "V4 的重要日程跟常見問題設計很不錯，希望保留這個風格". v4's stat-strip + editorial table and underline-search FAQ grafted into the v3_2 `.scene` shell. |

The grafted v1-hero and v4-schedule/FAQ blocks keep their **original class
names** (`.hero-img`, `.who-tab`, `.faq-bar`, …). A small alias block at the top
of `:root` maps v1's and v4's design tokens (`--ink`, `--font-serif`,
`--ncku-grey`, …) onto this aggregate's v3_2 token set, so the borrowed CSS
resolves without being rewritten. This keeps each graft auditable against its
source version.

## NCKU palette (inherited from v3_2)

```css
--ncku-red:      #A31F34;   /* PANTONE 201C — Signature Red */
--ncku-red-deep: #8B1929;   /* gradient bottoms */
--ncku-maroon:   #420A15;   /* International Maroon — president & footer panel */
--ncku-gold:     #8C6E4A;   /* PANTONE 874C — utility strip & footer rule */
--ncku-silver:   #A6A9AB;   /* PANTONE 877C — secondary type */
/* Phoenix Red #E4002B is reserved for the Phoenix flower mark — never UI. */
```

The chrome stays banded (gold utility strip → solid red topbar → white body →
maroon president → maroon footer). Red is structural, not wallpaper.

## Feedback checklist — how this version answers the review

Built in steps; each step paused for visual verification.

- **Step 0 — scaffold** ✓ — v3_2 shell + v1 hero + v4 schedule/FAQ wired
  together and rendering. No feedback-specific changes applied yet.
- **pt 1** ✓ — v1 banner on top + v3/v4 cleaner body below. *(realised by
  scaffold)*
- **pt 2** ✓ — banner dark veil removed; photos brightened toward v0
  (`.hero-img` carries `brightness(1.16) saturate(1.06)`, lifted once on
  follow-up feedback). The mask-then-zoom title lands large and centred under
  a mask on load, the mask fades, then the title settles to the bottom-right
  corner so it no longer covers the photo. b1/b3/b4 are pre-composed promo
  banners with their own baked-in text: b1 and b4 keep that text to the left
  so the corner copy sits clear, but **b3** is a full-width press-promo
  banner whose text overlaps the corner copy — kept in rotation by request
  (2026-05-14) despite the clash. The pure-graphic banners (b5/b6) were
  dropped from the rotation.
- **pt 5** ✓ — a reserved `--rail-lane` (168px) keeps the fixed scene rail out
  of the content column, so section jumps no longer overlap the rightmost
  cards. The rail also flips to a contrasted colour over the maroon 校長的話
  scene (`.rail--on-dark`) so its labels stay legible. The lane collapses to
  `--gutter` and the rail hides below 1024px.
- **pt 6** ✓ — visitor count sits in the gold utility strip up top
  ("本站到訪 …"), riding the existing NCKU chrome line so it is present but
  unobtrusive. Mock number, localStorage-backed; `getVisitorCount()` is the
  isolated swap point for a real counter later.
- **pt 7** ✓ — v4's stat-strip + editorial schedule table and underline-search
  FAQ, grafted into the v3_2 `.scene` shell. Polish pass aligned the row /
  question numbers (`.cell-num`, `.faq-bar .qid`) to a shared italic editorial
  marker style.
- **pt 8** ✓ — the "下載完整入學日程 PDF" button (`.band-cta-row`) is removed.
  The month-calendar idea in the feedback is explicitly marked 非首要 and is
  **out of scope** unless asked.
- **pt 10** ✓ — font: the review named Google's **Noto Sans** + **Noto Sans
  TC** as acceptable faces, so the stack was switched from v3_2's Open
  Sans / Nunito to those. Noto Sans carries Latin + numerals, Noto Sans TC the
  Hant CJK; system CJK faces stay as the offline fallback. Noto Sans TC has no
  italic master, so `--ff-accent-italic` leans on Noto Sans italic for Latin.
  JetBrains Mono is kept for the micro-labels.

Feedback pts 3–4 and 9 were removed from the review file as unrelated to the UI
redesign (see the header note in the feedback markdown).

## Restraint notes (don't drift)

- Don't reintroduce a third red or recolour the Phoenix flower mark.
- The grafts keep their source class names on purpose — if you touch v4's table
  or v1's hero, diff against `../v4/site/` or `../v1/site/` to stay faithful.
- The schedule/FAQ sections sit inside the v3_2 `.scene` shell, so they keep the
  red ribbon section number — that consistency is intentional, not an oversight.

## i18n — language toggle (added 2026-05-18)

The Overseas Edition carries a zh / en toggle on the right end of the gold
utility strip. The mechanism is the **flat-key JSON catalog + runtime `data-i18n`**
pattern that's standard across `react-i18next` / `next-intl` / `vue-i18n`.

- Catalogs live at `site/i18n/zh-Hant.json` and `site/i18n/en.json` — flat
  string keys, the exact shape consumed by `next-intl` (`messages/<locale>.json`)
  and `react-i18next` (`<locale>/translation.json`).
- Static text in `index.html` is annotated with `data-i18n="key"` (text content)
  or `data-i18n-attr="attr:key,…"` (attributes). The page source-of-truth
  language is still Traditional Chinese — English is layered on at runtime.
- Dynamic renderers in `script.js` (NAV, THREADS, schedule, FAQ, president
  expand label) read their copy through `I18N.t(key)` and re-render on the
  `langchange` CustomEvent the engine dispatches on boot and every toggle.
- Data records in `data/faq.json` and `data/schedule.json` carry text fields
  as per-locale objects: `{ "zh-Hant": "…", "en": "…" }`. The renderer reads
  `field[currentLang] ?? field["zh-Hant"]`, so an entry without an English
  translation falls back to Chinese cleanly. Only ~5–10 sample entries in
  each file are seeded with English in the prototype; the rest fall back.
- Locale preference is detected from `localStorage("ofy.lang")` → else
  `navigator.language` (any `en-*` → `en`, else `zh-Hant`). The toggle
  persists the choice to localStorage; `<html lang>` is flipped on every
  swap.

**Upgrade path to prod.** The user's intended prod stack is React-based
(see the project memory). The same catalog files port unchanged into
`next-intl` / `react-i18next`:

| Prototype (today) | Prod (React, eventually) |
| --- | --- |
| `site/i18n/<locale>.json` | `messages/<locale>.json` (Next.js + next-intl) or `public/locales/<locale>/translation.json` (react-i18next) |
| `data-i18n="hero.lede"` | `{t("hero.lede")}` in JSX |
| Single URL, runtime swap | `/zh/...` & `/en/...` via Next.js `[locale]` segment + middleware |
| Per-locale fields on FAQ / schedule records | unchanged — same `field[locale]` lookup |

If SEO-friendly URLs become the priority before the React rewrite,
**Next.js + next-intl** is the cleanest fit (App Router's `[locale]` segment
handles the routing). **Vite + react-i18next** is a lighter alternative but
needs a pre-render step (e.g. `vite-ssg`) to get per-locale URLs.

Do **not** duplicate `index.html` per language — that path was considered
and rejected. The catalog approach is the floor for any future maintainer
who needs to add a third locale or hand translations to non-engineers.

## Sources

- `../feedback/converted/新生支持辦公室網頁改版意見.md` — the review this version answers.
- `../v3_2/aesthetic.md` — the shell and chrome this builds on.
- `../v1/aesthetic.md`, `../v1/site/` — the banner hero.
- `../v4/stanford_design.md`, `../v4/site/` — the schedule table + FAQ.
- `../ncku-design.md` — the project's NCKU CIS brand reference.
