# UI overhaul: "Horizon" design system

Replace the starter-template look with a dark, constrained, sans-serif design
for a programmer's personal site. The old design is not a reference.

## Decisions so far

- **Dark only.** Drop the light theme and the theme toggle.
- **One system, two accents.** Official and Casual share layout and type; each
  route has one accent (Official cyan, Casual amber). Neutrals are tinted from a
  single deep-indigo ground hue.
- **Home shows the profile only:** name, role, intro, links, experiences. No
  recent articles or photos.
- **Visual world:** front-plane text over two flat line-grid planes (near and
  far) that move at different rates with scroll, pointer and a slow drift.
  Experience is a horizontal timeline; the current role is in the accent.
  Switching routes pans the grids quickly while the accent swaps.
- **Type:** Red Hat Display (name, headings), Red Hat Text (reading),
  Red Hat Mono (code).
- Direction contract: `.impeccable/surfaces/app-route-page-tsx.md`.

## Design system

- `css/tokens.css`: single source of tokens. Edit the PRIMITIVES block;
  everything else derives from it.
- `css/scene.css`: the two grid planes and their motion inputs.
- `design/index.html`: preview with knobs. Open it in a browser from the repo
  (it links the two CSS files above). Knobs override tokens live; "Copy tokens"
  exports a PRIMITIVES block to paste back into `css/tokens.css`.

## Acceptance

- Every page in both routes uses the tokens; no hard-coded colors remain in
  components, and the old `primary`/`secondary`/`gray` palettes are removed.
- Home in both routes matches the chosen sketch
  (`.impeccable/mocks/decision/r3-floor.html`), with the grid planes in place of
  the floor, and works at 390px.
- Grid motion respects `prefers-reduced-motion`; content is readable with
  motion off.
- Body text and meta text pass WCAG AA on the ground.
- `yarn lint`, `yarn build`, and the static export build succeed.
- docs/architecture.md, docs/product.md and DESIGN.md describe the result.

## Progress

- [x] Direction chosen (three decision rounds; Horizon floor, then two grid
      planes replaced the floor).
- [x] Tokens, scene CSS, and preview page; accents swapped (Official cyan,
      Casual amber) on request.
- [x] Tokens wired into Tailwind (`@theme inline`), Red Hat fonts via
      `next/font`, dark only, theme switch removed.
- [x] Scene component in the root layout; old route slide animation retired.
- [x] Header, mobile nav, footer, route switch, search modal mapping.
- [x] Home: profile plus timeline from `start` / `end` experience dates.
- [x] Article list, tags page and drawer, photo grid, post and photo layouts,
      prose, code highlighting, 404.
- [x] Verification in both routes at 1440px and 390px; finish review.
- [x] Docs: architecture, product, README, docs/design.md, decision 0001.

## Outcome

Shipped in the working tree (not committed). Finish review: first pass "fix"
with five findings (route pan jumped instead of panning, grid too strong
behind text, search modal corners and blue focus ring, glyph arrows, timeline
"now" frozen at build time); all five fixed and scored resolved on the verdict
pass, disposition "ship". That verdict covers the fix list, not a second full
review.

## Verification log

- Preview rendered headless at 1440px and 390px; all text tokens pass AA
  (ink 17.3:1, ink-2 10.4:1, ink-3 6.2:1, accent 10.8:1 on ground).
- `yarn lint`: clean except the existing `no-img-element` warning in
  `components/PhotoImage.tsx` (native `<img>` is intentional for the export).
- `yarn build` and `EXPORT=1 UNOPTIMIZED=1 yarn build`: pass (53 pages, RSS).
- Static export served locally and captured via Chrome DevTools Protocol: both
  homes, article list, post, photo grid, photo post, tags, mobile menu, tag
  drawer, search modal, route switch, keyboard focus. No console errors; no
  horizontal overflow at 390px on seven pages.
- Not run: a non-empty `BASE_PATH` export; browsers other than Chrome.
