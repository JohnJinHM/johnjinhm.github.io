# Product

## Purpose

A personal website for John Jin, published as a static site on GitHub Pages. It
hosts written articles and photo posts, split into two audiences:

- **Official** (`/official`, the default): professional writing, project notes,
  and a professional profile.
- **Casual** (`/casual`): informal notes, snapshots, and a separate personal
  profile.

The visible site focuses on Projects and Experience. The author adds archive content as MDX
files, mostly through the `yarn new` CLI. Hidden archive routes are retained for later restoration.

## Current capabilities

- **Two routes**, each with its own home page, article list, photo grid, and tag
  index. A post belongs to one route or is shared by both.
- **Articles**: MDX with code highlighting, math (KaTeX), citations, GitHub-style
  alerts, and inline images.
- **Photo posts**: one hero image shown at its native aspect ratio, with a
  caption (`summary`) and optional MDX body. Listed in a masonry grid.
- **Home pages**: per-route portrait and introduction, then a searchable project directory with
  a selected-project inspector, workflow, details, and repository link.
- **Header**: Projects, Experience, and language only. WORK & LIFE, Journal, Photos, and
  Personal are temporarily omitted. Articles, Photos, Tags, and `/casual` still work by URL.
- **Experience** (`/[route]/experience`): a searchable directory of the five professional roles,
  showing dates, detailed responsibilities, education, and planned-work qualifications.
- **Reading shortlist**: up to three projects or roles, retained while navigating within the
  mounted site. Supports remove, undo, capacity feedback, and opening an entry across views.
  Reloading starts a fresh shortlist. Search, topic, and selected entry are independent per view.
- **Tags**: counted and listed per route.
- **Search**: `Cmd/Ctrl-K` searches articles and photo posts across both routes.
- **RSS**: a site feed plus one feed per tag.
- **Comments**: Giscus is selected in `data/siteMetadata.js` (see Known gaps).
- **Look**: Broken Arrow-inspired neutral charcoal surfaces, yellow selection and primary
  actions, and a restrained grayscale landscape. Rectangular directory/inspector layout becomes
  stacked on mobile, with an explicit jump-to-detail control. No moving grid scene.
- **UI language**: English or Chinese (`中文`/`EN` toggle). This currently covers
  the nav bar, both home pages, and Experience; posts, tags, and list pages are
  English only.
- **Authoring tooling**: `yarn new` scaffolds posts and compresses images;
  `yarn images:process` regenerates photo derivatives and metadata.

## Known gaps

Placeholder or starter-template values still in the repository:

- `siteUrl` in `data/siteMetadata.js` still points at the starter template's
  Vercel URL, which affects canonical URLs, the sitemap, and RSS links.
- The casual route's Instagram and Bluesky links in `data/routes.ts` are placeholders.
- `data/blog/` and `data/photos/` contain sample posts.
- Giscus reads its repo and category IDs from `NEXT_PUBLIC_GISCUS_*` environment
  variables, which the GitHub Pages workflow does not set.
- `app/api/newsletter` is a server route. It is not part of the static export, so
  the newsletter form (`BlogNewsletterForm`, available in MDX) has no backend on
  GitHub Pages.
