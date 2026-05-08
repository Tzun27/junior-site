# Stanford.edu — Design Observations

Source: https://www.stanford.edu/ (captured 2026-05-08, 1440×900 viewport).
Screenshots: `stanford_above_fold.jpeg`, `stanford_full.jpeg`.

## Overall vibe

Institutional, confident, photography-led. The page reads like a printed
prospectus — wide centered column, generous whitespace, big serif/sans
contrasts, almost no decoration. One signature color (Cardinal red) does
nearly all of the visual work; everything else is black, white, or a
neutral gray. No gradients, no glassmorphism, no rounded cards, no
shadows. The warmth comes entirely from photography of the campus and
people.

The hierarchy is loud: section headings are enormous (≈55px, weight 900),
sit centered above each band, and are followed by a one-line subtitle in
plain prose. Inside each band, content compresses back to small,
restrained typography. That swing — huge title, calm body — is the
defining rhythm.

## Color system

| Role                  | Value                | Notes |
|-----------------------|----------------------|-------|
| Cardinal red (primary)| `rgb(140, 21, 21)` / `#8C1515` | The brand. Used for the bottom CTA bar, card image overlays, and accents. |
| Deep cardinal         | `rgb(98, 15, 15)` / `#620F0F`  | Darker overlay tint sitting on top of card photography. |
| Bright cardinal       | `rgb(177, 4, 14)` / `#B1040E`  | Hover / link accent. |
| Black                 | `rgb(0, 0, 0)`       | Body text and headings on light surfaces. |
| White                 | `rgb(255, 255, 255)` | Default page background. |
| Off-white band        | `rgb(244, 244, 244)` / `#F4F4F4` | Alternating section background — lightest possible separation. |
| Slate / stone gray    | `rgb(84, 73, 72)` / `#544948`   | Secondary surface (some footer panels). |
| Dark cocoa            | `rgb(47, 36, 36)` / `#2F2424`   | Used as a near-black wash in some footer/utility regions. |
| Link blue             | `rgb(0, 108, 184)` / `#006CB8` | Inline link blue in dense text contexts. |

There are no border radii to speak of (everything ships sharp 0px corners).
The few rounded values that appear in the computed CSS — `4px` and `50%` —
come from third-party widgets (a Select-Slim search dropdown, avatar
circles), not the page chrome itself.

## Typography

Two families do all the work:

- **Source Sans Pro** (`"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif`) — every headline, button, body paragraph, nav item, footer link.
- **Stanford / Source Serif Pro** (`Stanford, "Source Serif Pro", Georgia, Times, "Times New Roman", serif`) — reserved for the giant "Stanford" wordmark over the hero photo. It's the only serif on the page.

Type scale observed in the wild:

| Element                          | Size      | Weight | Tracking  | Notes |
|----------------------------------|-----------|--------|-----------|-------|
| Section H2 ("Academics", "Research", "Campus News")  | 54.93 px  | 900    | -0.85 px  | Centered, black on white. |
| Story / card title H2            | 43.94 px  | 700    | -0.55 px  | Often white-on-cardinal photo overlay. |
| H3 (sub-card title)              | 20.25 px  | 700    | normal    | Black on white. |
| Hero wordmark "Stanford" (serif) | ~120 px+  | 400    | normal    | Custom Stanford font, white on photo. |
| Top nav link                     | 16 px     | 400    | normal    | Light gray (`#EEEEEE`) on dark header. |
| Body paragraph                   | 18 px / 27 px line height | 400 | normal | 1.5× line height. |
| "Information for:" utility nav   | 13.5 px   | 400    | normal    | Tiny, top-right corner. |

Negative letter-spacing on the largest headings (`-0.85px` and `-0.55px`)
tightens up the ultra-bold display sizes — a small detail that keeps the
huge type from feeling loose. Body text is left as-is, which makes
paragraphs feel relaxed and editorial.

No uppercase. No small-caps. The whole page stays in mixed case, which
reinforces the editorial, magazine-like reading feel.

## Layout & rhythm

- **Single centered column.** Content max-width sits around the 1100–1200px
  range with consistent gutters. No sidebars anywhere on the homepage.
- **Banded sections.** The page is a vertical stack of full-width bands.
  Backgrounds alternate between pure white and `#F4F4F4` to create the
  faintest possible separation — no rules, no shadows, just tone shift.
- **Title → subtitle → content → CTA.** Every band repeats the same
  pattern: enormous centered title, one-line italic-feeling subtitle, the
  content (cards / paragraph / stat row), and a single red rectangular
  "Read more" / "Explore X" button at the bottom.
- **Hero is photography-first.** A wide aerial of the Main Quad fills the
  viewport behind the navigation; the serif wordmark "Stanford" floats
  centered over the photograph. The cardinal-red "Explore Stanford" bar
  pins to the bottom of the hero like a footer drawer.

## Components

### Header / nav
- Dark near-black bar at the top (`#333`-ish) with a small "Stanford
  University" wordmark on the left and a tiny "Information for:" utility
  list on the right (`Students`, `Faculty & Staff`, `Families`, `Visitors`,
  `Alumni`).
- Below it, a primary nav of eight items in light gray text: `Academics`,
  `Research`, `Health Care`, `Campus Life`, `Athletics`, `Admission`,
  `About`, `News`, `Events`, plus a search icon. Sentence case, generous
  spacing, no underlines, no pill backgrounds.

### Buttons / CTAs
- Solid cardinal-red rectangles. **Square corners.** White text, weight 600,
  ~22px on the hero CTA and 18px elsewhere. No icons, no gradients, no
  hover-lift — just a flat color block. Padding is roughly `12px 22px`.
- Inline "Read more" links inside dark photo cards stay weight 600 and
  white, with no underline at rest.

### Cards
- Photo cards use **full-bleed images with a deep cardinal-red overlay**
  (~`#620F0F` at high opacity). White headline (~44px / 700) sits over the
  red wash, with category eyebrow text in small uppercase-ish caps and a
  short white "Read more" link at the bottom-left.
- Some cards are inverted (white background, black title, a small color
  swatch tag) — these stat / news cards alternate with the dark photo
  cards in a 4-up grid.
- All cards are flush rectangles. No rounded corners, no border, no shadow.

### Stat blocks (Research section)
- Big numbers like `6,499`, `3,029`, `350,000+`, `$94 billion`, `400+`,
  `$11+ trillion` rendered in heavy red sans, centered, with one or two
  lines of tiny gray descriptor text below each. Five-column horizontal
  row.

### Footer
- White background overall, but the very bottom edge is a slim cardinal-red
  band the full width of the page (`rgb(140, 21, 21)`, ~134 px tall).
- Above it, a multi-column link list: `Schools`, `Research`, `Health Care`,
  `About Stanford`, `Admission`, all in plain black sans on white. Social
  icons row sits just above the columns.
- A small Stanford block-S wordmark anchors the bottom-left, with a tiny
  copyright/legal row below.

## Imagery

- Editorial campus photography: aerial Main Quad, students in labs, athletes
  mid-stride, dance studios, gymnasts on rings.
- Slightly warm color grade — golden-hour Palo Alto sun. Heavy reliance on
  the sandstone/terracotta of the campus architecture, which sits naturally
  next to the cardinal red.
- Faces and bodies dominate; very few product shots or graphics.

## Motion & interaction

The headline finding: the page is **almost entirely static**. There are
no scroll-triggered fade-ins, no slide-ups, no parallax. No
IntersectionObserver, no AOS, no GSAP, no Swiper. The library load is
jQuery + Waypoints + Formidable Forms — a classic mature WordPress stack.
Motion is reserved for two places: the sticky chrome reacting to scroll,
and small hover/focus transitions on interactive elements.

### Scroll behavior

- **Two-row sticky chrome.** Both top bars pin to the viewport on scroll:
  - `#brand-bar` — `position: fixed; top: 0; height: 48 px; z-index: 100; background: #B1040E` (the dark cardinal utility bar with "Stanford University" + "Information for:" links).
  - `#site-navigation` — `position: fixed; top: 48 px; height: 54.5 px; z-index: 110; background: #FFFFFF`. Carries a `.shadow` class.
  - Combined sticky height ≈ 102 px. The hero photo and everything else scroll naturally beneath them.
- **Soft delayed shadow under the nav.** The header has `transition: box-shadow 0.5s 0.25s` — a soft shadow fades in under the white nav after a quarter-second pause once content starts scrolling underneath it. Subtle separation, no abrupt flip.
- **No parallax.** No `background-attachment: fixed`. The hero `<img class="bg-img">` is technically `position: fixed` but its placement is recomputed by jQuery on every `scroll` / `resize` / `panelImageContentAdjust` event — a hand-rolled JS object-fit that keeps the image filling its container. Effectively the hero scrolls 1:1 with the page; the trickery is just to support the cover-crop on legacy browsers.
- **No reveal-on-scroll content.** Cards, stats, headings — all rendered fully visible from the start. Nothing fades or slides in as it enters the viewport. The page reads like a printed document that simply scrolls.
- **The hero wordmark uses `transition: font-size 0.5s`.** It doesn't animate on scroll, but the giant "Stanford" rescales smoothly when the window resizes (current size: 134 px).

### Hover & focus

All hover transitions are short (0.25 s – 0.3 s) and color-only — no
movement, no scale, no rotation on the page chrome.

| Element | Hover behavior |
|---------|----------------|
| Primary button (`.button--primary`) | Background `#B1040E` → `#820000` (darker maroon) over `0.3s ease-out`. No movement. |
| Secondary button (`.button--secondary`) | Inverts to transparent bg + red text + `1px solid #B1040E` border. |
| Inline link (`a.jump-link`) | Adds `text-decoration: underline` + color shifts to dark blue `#00548F` over `0.3s`. |
| Top-level nav item (`#site-navigation a`) | Renders an underline via a `::after` pseudo, also fades in. |
| News / story cards (`article.theme--choco`) | Box-shadow deepens over `0.3s ease-in`. Default rest shadow: `0 0 10px rgba(0,0,0,.15), 0 3px 3px rgba(0,0,0,.15)`. |
| Card image (`img` inside card) | `transition: 0.3s ease-in` on the image's transform — a small Ken-Burns–style scale on hover. |
| Social icons | Color tween `0.25s ease-in-out`. |
| Caret arrows in lists (`.fa-angle-right`) | `transition: margin 0.25s` — the arrow nudges right when the link is hovered. |

There are **122 `:focus` rules** in the stylesheet — focus visuals are
treated as first-class citizens and tend to mirror the hover state, so
keyboard users get the same affordances as mouse users.

### Animations defined in CSS

The stylesheets ship 26 `@keyframes`, but most are from third-party
plugins (Formidable Forms `frmSlide*`, SlimSelect `ss-valueIn/Out`,
Dropzone `passing-through`, FontAwesome `awe_spin`). Only two are
actually applied to page-level elements, both with `0.4s ease-in-out`:

- `@keyframes b` — fades in a backdrop layer (`opacity: 0 → 0.5`).
- `@keyframes c` — slides a panel down (`margin-top: -10em → 0`) and re-stacks its `z-index`.

These look like the **mega-menu reveal** on the primary nav: hovering a
top-level item drops a full-width panel down with a half-opacity scrim
behind it, in 400 ms.

### Library / scroll-handler footprint

- **jQuery** is the central dependency. Bound window handlers: `scroll`, `resize`, `navKeyboardBindings`, `resizeEnd`, `panelImageContentAdjust`, `load`.
- **Waypoints** is loaded but used minimally (no `data-aos` / `.in-view` / `.reveal` classes anywhere).
- `requestAnimationFrame` is used in inline scripts, almost certainly to throttle the scroll/resize handlers.
- No `IntersectionObserver`. No `addEventListener('scroll')` on the global window from inline scripts — scroll is handled through jQuery.

### What this means for the "feel"

The motion vocabulary is austere and old-school in the best way:

1. The chrome is responsive (sticks, shadows, animates the mega-menu) but the content is not. The page trusts the photography and the typography to carry the page, rather than choreographing entry animations.
2. Hover feedback is universally a 0.25–0.3 s color/shadow tween. Nothing pops, lifts, or scales aggressively. Buttons just darken; cards just deepen their shadow.
3. Transitions are colour-driven, not transform-driven. The result feels editorial — like turning a page in a magazine — rather than app-like.
4. Accessibility-first: focus state always present, keyboard handlers attached to the nav.

If you wanted to recreate the *vibe*, the rule is: keep motion off the
content layer entirely; let scroll be scroll. Reserve transitions for
hover/focus only, and keep them short, color-only, and ease-in or
ease-out (never bounces, springs, or overshoot).

## What this would translate into for a "Stanford-feeling" rebuild

- One brand color, used sparingly. Resist the urge to add a secondary.
- Sans-serif everywhere except a single ceremonial serif wordmark.
- Section H2s an order of magnitude bigger than body text (≈3× rather than
  the typical ≈1.5×).
- Square corners. No shadows. No gradients.
- Bands alternating white / `#F4F4F4`, never bordered.
- Photography with a deep brand-color overlay where text needs to land.
- Negative letter-spacing on the largest display sizes only.
- Bottom of every section gets one solid red rectangular CTA, and only one.
