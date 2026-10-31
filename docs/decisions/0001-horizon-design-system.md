# 0001: "Horizon" design system, dark only

## Context

The site still carried the starter template's look: light/dark/system themes, a
blue and an amber Tailwind palette remapped per route, Space Grotesk, and a
home page that mixed a profile with recent posts. The owner wanted a simple,
clear site for a programmer, dark, with a constrained palette, and asked for an
adjustable design system before implementation.

## Status

Accepted (October 2026).

## Choice

- **Dark only.** The theme toggle and light styles are removed; `next-themes`
  stays only to force `dark` for pliny components.
- **Tokens as the single source.** `css/tokens.css` holds a small PRIMITIVES
  block (ground hue, chroma and lightness; one accent per route; type base and
  ratio; spacing unit; radius; grid and motion settings). Every neutral is the
  ground hue at a different lightness. Tailwind reads the tokens through
  `@theme inline`; `design/index.html` previews them with live knobs.
- **One system, two accents.** Official is cyan, Casual is amber. The other
  route's accent appears only in code strings.
- **Scenery is two line-grid planes** behind the content, moving with scroll,
  pointer and a slow drift, quieter on reading pages, still under reduced
  motion.
- **Home is a profile**: name, role, intro, links, and an experience timeline.
- **Type**: Red Hat Display, Text and Mono.

The direction came from three decision rounds; the owner chose a depth-field
variant and replaced its perspective floor with the two grid planes.

## Alternatives

- Keep light/dark and derive a light theme from the same tokens: more to
  design and verify for little value to this audience.
- A datasheet or man-page look: rejected by the owner as too dark and bland.
- Dense generative decoration (barcode fields, star layers): rejected as
  competing with the text.

## Consequences

- Restyling means editing PRIMITIVES, not components; hard-coded colors in
  components are a defect.
- `gray-*` and `primary-*` utilities still exist as a compatibility mapping for
  pliny markup; new code should use the semantic utilities.
- Experiences need `start` (and `end` unless current) to appear on the
  timeline.
- The scene depends on modern CSS (`oklch()` relative colors, `mod()`, `calc()`
  inside color functions). Browsers without them (roughly pre-2024) have not
  been tested and may lose derived colors or grid motion.
