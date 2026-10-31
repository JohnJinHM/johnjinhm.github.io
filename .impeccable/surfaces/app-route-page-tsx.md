---
version: 1
slug: "app-route-page-tsx"
primary_target: "app/[route]/page.tsx"
related_targets: ["components/Header.tsx","app/layout.tsx"]
---

# Site shell and home (both routes)

Scope: the whole site's frame (header, route switch, ground, footer) and the two home pages. Visitor mode: Read for lists and posts; the home is a profile read in one glance.

Audience and job: recruiters, peers and friends who want to know who John is in one look (Official), or the off-the-clock version (Casual). Home shows name, intro, links, experiences only; no recent writing. Constraints: dark only, constrained palette (neutrals tinted from one ground hue + one accent per route), sans-serif, no dense decoration, text always clearer than scenery, static export under BASE_PATH.

Memorable moment: two line-grid planes moving at different depths behind still text, the experience timeline on its axis; switching routes pans the grids fast while the accent swaps.

Unresolved: whether list pages carry a reduced horizon; photo grid treatment; Chinese type pairing for 中 locale.

## Direction contract

THESIS: A vector-demo depth field: still, bright text on the front plane over a deep indigo scene of two flat line-grid planes (near: large cells, brighter; far: small cells, dimmer) that move at different rates with scroll, pointer and drift. Refuses the centred dark-portfolio column with icon row and soft cards.

OWN-WORLD: Ground deep indigo (oklch ~0.16, hue ~280), never pure black or grey. Two hairline grid planes, dim, masked to fade away from the text; no stars, no floor. Neutrals tinted from the ground hue. One accent per route (Official cyan, Casual amber) used for the active state, the current timeline point and link underlines only. Red Hat Display 900/700 for the name and headings, Red Hat Text for reading, Red Hat Mono for code. Square corners, hairline rules, no cards, no glow.

STORY: The visitor reads the name, role and one-paragraph intro, sees where John is now on the horizon timeline, and leaves by a link or the nav.

FIRST VIEWPORT: Nav row (name left; Articles, Photos, Tags, search, 中, Official/Casual right, active in accent). Name at ~112px display, role line, intro at 19px, underlined links. Lower third: the timeline axis with year ticks below, roles labelled above in a staircase, spans along it, current role filled in accent. Grid planes behind everything, strongest away from the text column.

FORM: Horizon floor, a grounded variant of the dealt cracktro depth-field challenger (operate-c-cracktro-scroller-queue), chosen after two re-rolls; the user replaced the floor with two grid planes. seed:b2e2b26b987fae91

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
