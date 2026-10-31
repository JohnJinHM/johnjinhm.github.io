# Product

## Purpose

A personal website for John Jin, published as a static site on GitHub Pages. It
hosts written articles and photo posts, split into two audiences:

- **Official** (`/official`, the default): professional writing, project notes,
  and a professional profile.
- **Casual** (`/casual`): informal notes, snapshots, and a separate personal
  profile.

Readers switch between the two with a toggle in the header. The author adds
content as MDX files, mostly through the `yarn new` CLI.

## Current capabilities

- **Two routes**, each with its own home page, article list, photo grid, and tag
  index. A post belongs to one route or is shared by both.
- **Articles**: MDX with code highlighting, math (KaTeX), citations, GitHub-style
  alerts, and inline images.
- **Photo posts**: one hero image shown at its native aspect ratio, with a
  caption (`summary`) and optional MDX body. Listed in a masonry grid.
- **Home pages**: per-route name, role, intro, social links, and the
  experiences drawn as a timeline. No post or photo lists.
- **Tags**: counted and listed per route.
- **Search**: `Cmd/Ctrl-K` searches articles and photo posts across both routes.
- **RSS**: a site feed plus one feed per tag.
- **Comments**: Giscus is selected in `data/siteMetadata.js` (see Known gaps).
- **Look**: dark only. One design system for both routes; each route has one
  accent (Official cyan, Casual amber). Two line-grid planes sit behind the
  content and move with scroll and pointer. Tokens and a preview page are in
  `css/tokens.css` and `design/index.html`.
- **UI language**: English or Chinese (`中`/`EN` toggle). This currently covers
  the nav bar and the two home pages only; posts, tags, and list pages are
  English only.
- **Authoring tooling**: `yarn new` scaffolds posts and compresses images;
  `yarn images:process` regenerates photo derivatives and metadata.

## Known gaps

Placeholder or starter-template values still in the repository:

- `siteUrl` in `data/siteMetadata.js` still points at the starter template's
  Vercel URL, which affects canonical URLs, the sitemap, and RSS links.
- The casual route's `company` and social links in `data/routes.ts` and the
  experiences in `data/experiences.ts` are placeholders.
- `data/blog/` and `data/photos/` contain sample posts.
- Giscus reads its repo and category IDs from `NEXT_PUBLIC_GISCUS_*` environment
  variables, which the GitHub Pages workflow does not set.
- `app/api/newsletter` is a server route. It is not part of the static export, so
  the newsletter form (`BlogNewsletterForm`, available in MDX) has no backend on
  GitHub Pages.
