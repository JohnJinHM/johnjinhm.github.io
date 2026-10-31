# Agent working instructions

## Start here

- Read README.md, then docs/product.md and docs/architecture.md as relevant to
  the task. Inspect the affected code and any local AGENTS.md instructions.
- Use the README "Develop" section for setup and verification commands, and
  docs/runbooks/deployment.md for anything touching the deploy.
- Check documented assumptions against the repository. Report material conflicts
  instead of silently treating outdated prose as current behavior.

## Make changes

- Implement the requested behavior with the smallest coherent change. Preserve
  unrelated work and keep unrelated cleanup separate.
- Follow existing module contracts and data ownership. Use public entry points
  (for example the helpers in `data/routes.ts`) instead of re-deriving their logic.
- Add abstractions or dependencies when a current requirement justifies them.
  State the concrete benefit. Prefer a local function or module when sufficient.
- Research unfamiliar APIs or changeable compatibility details (Next.js,
  Contentlayer2, Tailwind v4, pliny) in primary documentation before relying on
  them. Record only findings that affect the task.
- For routine reversible choices, proceed and report meaningful assumptions.
  Ask when missing information changes required behavior or the authorized scope.

## Verify and finish

- There is no automated test suite. Run `yarn lint` and `yarn build` for code
  changes; for anything affecting the deployed site, build the static export the
  way CI does (see docs/runbooks/deployment.md).
- Check observable behavior at affected boundaries, in both routes (`/official`
  and `/casual`) when the change is route-aware.
- Report the outcome, checks run and their results, and remaining gaps. Describe
  an unrun check as unrun; do not infer a pass.
- Update the authoritative documentation when behavior, commands, or boundaries
  change. Keep task progress out of this file.

## Grow documentation as needed

- Create documents and directories only when current work needs them; avoid
  empty scaffolding and speculative content.
- Product context lives in docs/product.md, implementation boundaries in
  docs/architecture.md. Link instead of copying.
- Record consequential tradeoffs in numbered docs/decisions/\*.md files (context,
  status, choice, alternatives, consequences) once a decision is settled.
- For work needing a durable plan, use docs/plans/active/<task>.md. Keep acceptance,
  progress, and verification current. On completion, record the outcome, move the
  plan to docs/plans/completed/, and repair affected links.
- Add `<dir>/AGENTS.md` only for local rules that differ from this file.

## Repository specifics

- Generated files — do not hand-edit; regenerate instead:
  - `app/tag-data.json` (tracked) and `public/search.json` are written by
    Contentlayer's `onSuccess` hook in `contentlayer.config.ts`.
  - `feed.xml` and `tags/<tag>/feed.xml` are written by `scripts/rss.mjs`
    (via `scripts/postbuild.mjs`) after `next build`, into `public/`, or into
    `out/` when `EXPORT` is set.
  - `imageWidth`, `imageHeight`, `imageWidths`, `imageBlur` in photo frontmatter
    and the `<name>-<width>w.jpg` derivatives are written by `yarn new` /
    `yarn images:process`.
- Use `yarn build`, not `next build` alone: the build script runs
  `contentlayer2 build` first and the RSS postbuild step after.
- Production is a static export (`EXPORT=1 UNOPTIMIZED=1`, with `BASE_PATH` from
  GitHub Pages). `next/image` optimization is off, so source images must go
  through the image scripts, and hard-coded absolute URLs must account for
  `BASE_PATH` (see `app/page.tsx`).
- Route-aware content filtering goes through `postsForRoute` in
  `data/routes.ts`; posts with `route: shared` belong to both routes.
- If Contentlayer or Next reports stale-cache errors after moving routes or
  content, delete `.contentlayer` and `.next` and rebuild.
- The pre-commit hook runs lint-staged (`eslint --fix`, then `prettier --write`
  on js/ts/json/css/md/mdx). Prettier settings: no semicolons, single quotes,
  print width 100.
- `faq/` holds upstream starter-template notes, not project documentation.
- `sharp`'s prebuilt binary may not decode HEIC; convert to JPEG/PNG first.
