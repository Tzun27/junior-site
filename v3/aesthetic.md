Here's a UI direction prompt you can hand off to Claude Code:

---

# UI Direction: Immersive Campus Flow × Narrative UI

## Core Concept

Move away from a static, panel-based dashboard feel toward a **scroll-driven, cinematic experience** that unfolds like a guided journey. The interface should feel less like a control panel and more like a premium product page that happens to be a university site — think Apple product page meets interactive storytelling meets student onboarding.

The shift is from _"find what you need"_ to _"we guide you to what matters."_

## Visual Tone

Bold, modern, expressive, and cinematic. Confident but not loud. The interface should feel alive — gradients and depth instead of flat surfaces, motion instead of stillness, progressive reveal instead of everything-at-once.

## Color & Atmosphere

- **Background**: Deep gradient base, black flowing into dark maroon. Not flat dark mode — use lighting and depth.
- **Primary accent**: Phoenix Red, but treated as _motion, glow, and highlight_ rather than a flat fill color.
- **Supporting accents**: Soft glowing red / coral for warmth, cool grey and subtle blue for balance.
- **Typography**: White and light grey on the dark base.
- Use gradients, ambient glows, and subtle lighting to give the surface dimension.

## Layout Philosophy

Scrolling _is_ the interaction. Each scroll position is a distinct "scene" with its own theme and purpose. Treat the page as a sequence of story blocks rather than a grid of widgets.

A typical flow:

1. **Hero / Entry scene** — fullscreen, minimal text, ambient motion (particles, light, campus imagery), cursor-follow lighting, subtle parallax, animated headline.
2. **Welcome / identity** — establishes who this is for.
3. **Key actions** — cards stagger into view as the user scrolls.
4. **Timeline / what's happening now** — fills or animates as it enters the viewport.
5. **Resources / explore** — calmer, more browsable.

Each section should have a clear visual identity and a single purpose — don't let scenes blur into each other.

## Signature Interaction: Progressive Reveal

Content should not appear all at once. As the user scrolls:

- Cards fade and slide in with staggered timing.
- Timelines fill progressively.
- Background hue shifts subtly between scenes.
- Sections feel "activated" rather than just rendered.

The pacing should feel intentional — every reveal earns attention.

## Components

- **Cards**: Larger, more visual, less dense than a typical dashboard card. Lead with iconography or illustration. Optimize for _recognition over reading_.
- **Buttons**: Gradient red with a soft glow, not flat fills. Expressive hover states — lift, glow shift, or subtle scale.
- **Sections**: Each one has a theme, a visual identity, and a single clear purpose.

## Navigation

Hybrid model:

- **Top nav**: minimal, only the key sections.
- **Floating quick-access button**: sticky, always reachable, expands into the most-used actions (course registration, important dates, resources). This preserves real-world usability inside the cinematic frame.

## Information Architecture

Group content around _intent and moment_, not flat categories:

- 🚀 Start Here
- 📅 Right Now
- 📚 Academic Life
- 🧭 Explore Resources

## Motion Design

Where this direction earns its premium feel.

**Use**: parallax scrolling, layered movement, fade + slide combos, ambient background motion, gentle easing.

**Avoid**: flashy or gimmicky effects, anything that feels laggy, motion that competes with content instead of supporting it.

## Emotional Target

The user should feel _curious_ ("what's next?"), _guided_ (never lost), and _quietly impressed_ (this doesn't look like a typical campus site). Motion and reveal serve that feeling — they're not decoration.

## What to Avoid

- Dense, panel-heavy dashboard layouts.
- Flat dark mode without depth or lighting.
- Showing everything on first paint.
- Generic card grids with no hierarchy.
- Decorative animation that doesn't serve the narrative.
