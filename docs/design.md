---
name: John Jin
description: Dark, constrained personal site for a programmer — still text over two moving grid planes.
colors:
  ground: 'oklch(0.16 0.035 278)'
  surface: 'oklch(0.195 0.035 278)'
  surface-2: 'oklch(0.23 0.035 278)'
  rule: 'oklch(0.28 0.0385 278)'
  grid-far: 'oklch(0.215 0.042 278)'
  grid-near: 'oklch(0.28 0.0455 278)'
  horizon: 'oklch(0.38 0.042 278)'
  ink: 'oklch(0.96 0.012 278)'
  ink-2: 'oklch(0.8 0.03 278)'
  ink-3: 'oklch(0.66 0.04 278)'
  accent-official: 'oklch(0.78 0.13 235)'
  accent-casual: 'oklch(0.82 0.16 72)'
typography:
  display:
    fontFamily: 'Red Hat Display, PingFang SC, Noto Sans SC, system-ui, sans-serif'
    fontSize: 'clamp(3.25rem, 1.25rem + 6.5vw, 7rem)'
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'Red Hat Display, PingFang SC, Noto Sans SC, system-ui, sans-serif'
    fontSize: '2.75rem'
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: '-0.03em'
  title:
    fontFamily: 'Red Hat Display, PingFang SC, Noto Sans SC, system-ui, sans-serif'
    fontSize: '1.758rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Red Hat Text, PingFang SC, Noto Sans SC, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'Red Hat Display, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 500
    letterSpacing: '0.06em'
  code:
    fontFamily: 'Red Hat Mono, ui-monospace, monospace'
    fontSize: '0.875rem'
    lineHeight: 1.7
rounded:
  base: '2px'
spacing:
  '1': '8px'
  '2': '16px'
  '3': '24px'
  '4': '32px'
  '6': '48px'
  '8': '64px'
  '12': '96px'
  '16': '128px'
components:
  button:
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    height: '40px'
    padding: '0 16px'
  button-hover:
    backgroundColor: '{colors.surface}'
  tag:
    textColor: '{colors.ink-2}'
    rounded: '{rounded.base}'
    padding: '2px 8px'
    typography: '{typography.label}'
  input:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    height: '44px'
  code-block:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    typography: '{typography.code}'
---

# Design System: John Jin

The values above mirror `css/tokens.css` at the time of writing; that file is
normative and its PRIMITIVES block is the only place to change them.
`design/index.html` previews every token with live knobs.

## Overview

**Creative North Star: "Horizon"**

Still, bright text on a front plane over a deep indigo field. Behind it, two
flat line grids sit at different depths: the near plane has large, brighter
cells and moves further with scroll and pointer; the far plane has small, dim
cells and moves a third as much. Nothing else decorates the page. The site is a
profile and a reading surface, so the grids are scenery: faint behind the text
column, full strength only where nothing is being read.

The system is dark only and deliberately small: one ground hue, three ink
levels, one accent per route. Official and Casual share every rule and differ
only in accent and copy.

**Key Characteristics:**

- Deep indigo ground, never pure black or neutral grey.
- Two moving grid planes as the only scenery; quiet on reading pages.
- One accent per route, spent on state, not decoration.
- Heavy Red Hat Display for names and titles; calm Red Hat Text for reading.
- Square-ish corners (2px) and 1px rules; no cards, no shadows on content.

## Colors

A single cool hue carries every neutral; the only saturated colors are the two
route accents.

### Primary

- **Signal Cyan** (accent-official): the Official route's accent. Active nav
  underline, current route label, link underlines and fills, the current role
  on the timeline, focus rings, code keywords.

### Secondary

- **Lamp Amber** (accent-casual): the same role on the Casual route. On the
  other route it appears only as code-string color.

### Neutral

- **Night Indigo** (ground): page background behind everything.
- **Raised Indigo** (surface): code blocks, inputs, search modal, comment
  button hover.
- **Inset Indigo** (surface-2): inline code background.
- **Hairline** (rule): every border and divider.
- **Far Grid / Near Grid** (grid-far, grid-near): the two scenery planes only.
- **Horizon** (horizon): the timeline axis, table header rule, blockquote rule.
- **Ink** (ink): headings and body text (17.3:1 on ground).
- **Ink Soft** (ink-2): summaries, secondary text, inactive nav (10.4:1).
- **Ink Dim** (ink-3): dates, counts, meta labels (6.2:1).

### Named Rules

**The One Hue Rule.** Every neutral is the ground hue at a different lightness
and chroma. A new grey is a defect; derive it from `--ground-*` instead.

**The Spent Accent Rule.** The accent marks state (current page, current route,
current role, focus, link) and code keywords. It never fills a section, tints a
background, or glows.

**The Two Accents Rule.** The palette is the ground scale plus two accents. The
other route's accent appears only in code strings.

## Typography

**Display Font:** Red Hat Display (with PingFang SC / Noto Sans SC for Chinese)
**Body Font:** Red Hat Text
**Label/Mono Font:** Red Hat Mono for code only

**Character:** One superfamily in three cuts: a black, tightly tracked display
for names and titles, a plain text cut for reading, and its mono for code.

### Hierarchy

- **Display** (900, clamps to 7rem, 0.92): the home-page name only.
- **Headline** (900, `--text-3xl`, 1.1): page and post titles.
- **Title** (700, `--text-xl`, 1.2): list item titles, article H2.
- **Body** (400, `--text-base` = 1.125rem, 1.65): reading text, capped at the
  `--measure` (68ch).
- **Label** (Display 500, 0.8125rem, 0.06em): dates, counts, reading time,
  back links. Sentence case.
- **UI** (0.9375rem): nav, controls, route switch (Display 700).

Content sizes step by `--type-ratio` (1.25) from the reading size, so changing
the base or ratio rescales every heading together.

### Named Rules

**The Mono Is For Code Rule.** Red Hat Mono appears in code blocks, inline code
and the ⌘K key cap. Dates, labels and numbers use Display with tabular figures.

## Layout

A single left-aligned container (max 72rem, gutters 16px / 32px / 48px at
phone / tablet / desktop). Reading surfaces cap at the 68ch measure and stay
left-aligned under the title; photos take the full container. Spacing is
multiples of one 8px unit (`--space-*`), with more space above a heading than
below it.

The home page is the name, role, intro and links at the top and the experience
timeline at the bottom of a block that fills the viewport up to 48rem. The
square portrait (2px corners, hairline border, no circle crop) sits in a
reserved 20rem right-hand column from 1280px up. Its top meets the name's cap
height and its bottom the link row; its size follows the text block's height,
so it stays square and aligned in any locale (about 280–320px). Below 1280px it
is a 96px (128px from 640px) square above the name, zoomed on the face via
`routeMeta.avatarFocus`. Below 1024px
the timeline becomes
a vertical list, current role first; list rows stack their date above the
title.

## Elevation & Depth

Content is flat. Depth comes only from the scenery: two grid planes behind the
front plane, separated by cell size, line brightness and parallax rate (near
plane 100%, far plane 33%). The planes are masked to stay faint behind the text
column and fade at the bottom; on post and photo pages the whole scene drops to
35% opacity. The tag drawer and search modal sit on a dark scrim (the search
scrim also blurs); the mobile menu is a full-screen ground panel. None use
shadows.

### Named Rules

**The Front Plane Rule.** Text never moves with the scenery. Only the grids
respond to scroll, pointer and route changes; content enters with one short
fade.

**The Still Under Reduced Motion Rule.** With `prefers-reduced-motion`, drift,
parallax, the route pan and the timeline grow-in all stop; the grids stay as a
static texture.

## Shapes

One corner radius (2px) for everything that has corners: buttons, tags, inputs,
code blocks, images, the search modal. Borders are 1px hairlines in the rule
color. Points on the timeline are the only circles.

## Components

### Buttons

- **Shape:** near-square (2px), 40px tall, 1px hairline border.
- **Default:** ink text in Display 700, transparent background.
- **Hover / Focus:** background lifts to surface and the border to ink-dim;
  2px accent focus outline offset 2px.
- There is no filled primary button in the shipped site; an accent fill is
  reserved for the link-fill hover (below).

### Links

- **In running text:** ink with a 1px accent underline, 2px on hover.
- **Primary links (home socials, pagination):** a 2px accent bar under the
  text that fills the whole word on hover, with the text switching to accent
  ink.

### Chips (tags)

- **Style:** 1px hairline border, ink-soft label, optional count in ink-dim.
- **State:** hover turns the border accent; the current tag gets an accent
  border and a soft accent fill.

### Inputs / Fields

- **Style:** surface background, hairline border, 2px corners.
- **Focus:** accent border and accent ring (the search modal and forms plugin
  are mapped to the route accent).

### Navigation

- **Desktop:** name left in Display 900 caps; nav links in ink-soft, current
  page in ink with a 2px accent underline; search with a ⌘K key cap; 中/EN;
  both routes side by side with the current one in accent.
- **Mobile and tablet (below 1024px):** a full-screen menu with large Display
  links separated by hairlines, then the route switch.
- **Temporarily:** only Home and Experience are linked (Articles, Photos and
  Tags are commented out in `data/headerNavLinks.ts`) and the route switch is
  commented out in `Header.tsx` and `MobileNav.tsx`. With two or fewer links the
  header shows them inline at every width and drops the menu button.

### Experience timeline (signature)

A horizontal axis in the horizon color with year ticks below. Each role gets its
own lane above the axis, newest on top: a span with a point at its start and the
label directly above it. Labels start at the point; in the right half of the
axis they end at the span's end instead (the axis end for the current role).
Past roles are dim; the current role is accent (point, span) and its span grows
to today's date in the browser.

### Grid scene (signature)

Two absolutely positioned planes behind every page, driven by three CSS
variables the client sets (`--scene-px`, `--scene-py`, `--scene-scroll`).
Scroll offset wraps every cell so the grid never runs out; switching routes
pans the lines two cells.

## Do's and Don'ts

### Do:

- **Do** change the look by editing the PRIMITIVES block in `css/tokens.css`
  (or by exporting from `design/index.html`), not by editing components.
- **Do** use the semantic utilities (`bg-ground`, `bg-surface`, `border-rule`,
  `text-ink`, `text-ink-2`, `text-ink-3`, `text-accent`) in new markup.
- **Do** keep reading text at the 68ch measure, left-aligned.
- **Do** use the shared `Arrow` SVG for arrows next to text.

### Don't:

- **Don't** add a light theme or a theme toggle; the site is dark only.
- **Don't** introduce a third accent, gradients, glows or colored panels.
- **Don't** put cards, shadows or rounded containers around list items or
  content.
- **Don't** let anything but the grid planes move in response to scroll or
  pointer.
- **Don't** use the legacy `gray-*` / `primary-*` utilities in new code; they
  exist only so pliny's markup matches the system.
