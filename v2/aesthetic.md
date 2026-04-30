# UI Overhaul — Design Direction

## Core Concept

Transform the current site from a static, section-based website into a **digital campus dashboard** — a bold, modern, app-like interface that feels like a student productivity tool rather than an institutional portal.

Reference points: **Notion × Discord × university portal (but actually usable).**

The end result should feel fast, responsive, slightly "techy," and student-centered.

---

## Visual Identity

**Philosophy:** High contrast, energetic, functional. Dark mode-first.

**Palette:**

| Role      | Color                   | Usage                     |
| --------- | ----------------------- | ------------------------- |
| Primary   | Phoenix Red `#E4002B`   | Navigation, active states |
| Dark Base | Charcoal `#121212`      | Main background           |
| Surface   | Dark Grey `#1E1E1E`     | Cards, panels             |
| Accent 1  | Neon Coral `#FF5A5F`    | Hover, alerts             |
| Accent 2  | Electric Blue `#3A86FF` | Contrast highlights       |
| Text      | Off-white `#EDEDED`     | Body text                 |

Phoenix Red should be used **structurally** (as an anchor for nav and active states) rather than as a decorative highlight.

**Aesthetic keywords:** futuristic dashboard UI, dark mode, high contrast, neon accents, modular grid, app-like navigation, interactive panels, student productivity interface.

---

## Layout Philosophy

Shift from "website with sections" to **"interactive dashboard."**

**Structure:**

- **Left:** Persistent collapsible sidebar with icon + label navigation, always accessible.
- **Top:** Context bar with search, notifications, and quick actions.
- **Main:** Dynamic grid of panels and cards (announcements, calendar, quick links, resources, etc.).

---

## Component System

**Cards are the primary building block.** Every module — important dates, announcements, learning resources, quick actions — lives inside a card.

- Dark surface with soft glow or subtle border highlight.
- Hover state: gentle lift + glow.

**Buttons:**

- Primary: filled red.
- Secondary: ghost / outlined.
- Slight glow on hover.

**Data tables:** Convert any existing static tables into interactive sortable panels with sticky headers, row hover highlights, and tag-based filtering.

---

## Information Architecture

Reorganize navigation around **actions**, not static categories.

Replace generic groupings (學習 / 資源 / 日程) with action-oriented entries:

- 🔥 Start Here
- 📅 My Schedule
- 📚 Study Tools
- 🧾 Admin Tasks
- 🧑‍🤝‍🧑 Student Life

---

## Signature Feature: Smart Student Dashboard

Add a personalized landing area featuring:

- Today's tasks
- Upcoming deadlines
- Recommended resources

Static/mock data is fine — the goal is for the interface to **feel** intelligent and personalized.

---

## Interaction & Motion

- Hover: glow + subtle scale.
- Click: smooth panel transitions.
- Sidebar: animated expand/collapse.
- Overall feel: fast, snappy, dynamic — but never gimmicky.

---

## Visual Hierarchy

Drive emphasis through:

- **Size** — larger cards for higher-priority modules.
- **Color** — red signals active or primary actions.
- **Motion** — hover and transition emphasis on key elements.

---

## Tone Summary

Bold, energetic, productivity-focused. The interface should feel like a smart student tool, not an institutional website.
