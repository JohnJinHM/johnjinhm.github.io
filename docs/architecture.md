# Architecture

This describes the code as it currently stands. It is a Next.js 15 App Router
site built on Contentlayer2, Tailwind CSS v4, and pliny, adapted from
[tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).
Production output is a static export (see
[runbooks/deployment.md](runbooks/deployment.md)).

## URL structure

```text
/                          → client redirect to /official/ (honors BASE_PATH)
/[route]                   → route home
/[route]/blog              → article list      (+ /page/[n])
/[route]/photos            → photo-post grid   (+ /page/[n])
/[route]/tags              → tag index for the route
/[route]/tags/[tag]        → tagged articles + photos (+ /page/[n])
/blog/[...slug]            → a single article
/photos/[...slug]          → a single photo post
```

`route` is `official` or `casual`; `app/[route]/layout.tsx` generates both and
returns 404 for anything else. Single-post pages have no route prefix and are
reachable from either route. Lists are sorted newest first.

## Modules

| Area                                          | Responsibility and owned state                                                                                                                       | Public contract                                                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `data/routes.ts`                              | The set of routes, the default route, and per-route profile data (`routeMeta`: name, avatar, occupation, company, intro, socials, list titles)       | `routes`, `Route`, `defaultRoute`, `isRoute`, `otherRoute`, `routeFromPathname`, `postsForRoute`, `routeMeta` |
| `data/experiences.ts`                         | Per-route experiences list on the home pages                                                                                                         | `experiences[route]`                                                                                          |
| `data/i18n.ts`                                | Locales, UI string dictionaries, Chinese home text and experiences                                                                                   | Exports consumed by home and nav components                                                                   |
| `data/siteMetadata.js`                        | Site-wide settings: title, author, URLs, analytics, comments, newsletter, search                                                                     | Default export                                                                                                |
| `data/headerNavLinks.ts`                      | Header and mobile nav entries                                                                                                                        | `navLinks(route)`                                                                                             |
| `data/blog/`, `data/photos/`, `data/authors/` | MDX content                                                                                                                                          | Frontmatter schema in `contentlayer.config.ts`                                                                |
| `contentlayer.config.ts`                      | Document types (`Blog`, `Photo`, `Authors`), MDX plugin pipeline, computed fields; writes the tag counts and search index                            | Generated `contentlayer/generated` types and data                                                             |
| `app/`                                        | Pages, layouts, `sitemap.ts`, `robots.ts`, SEO helpers                                                                                               | Next.js routing                                                                                               |
| `layouts/`                                    | List and post layouts (`ListLayoutWithTags`, `ListLayoutPhotos`, `PostLayout`, `PostSimple`, `PostBanner`, `PhotoLayout`, `AuthorLayout`)            | Props per layout                                                                                              |
| `components/`                                 | Shared UI: header/footer, route switch, grid scene, tag UI, pagination, locale, search, comments, `PhotoImage`, MDX component map                    | Component props                                                                                               |
| `components/home/`                            | Shared home-page layout for both routes, the experience timeline, and the route enter fade                                                           | `HomeLayout`, `Timeline`, `RouteTransition`                                                                   |
| `css/`                                        | Design tokens (`tokens.css`), grid scene (`scene.css`), Tailwind entry mapping tokens to utilities (`tailwind.css`), code highlighting (`prism.css`) | Custom properties and utilities (`bg-ground`, `text-ink-2`, `text-accent`, …)                                 |
| `scripts/`                                    | Authoring CLI, image processing, postbuild RSS                                                                                                       | `yarn` scripts in `package.json`                                                                              |

## Content model

Frontmatter fields are defined in `contentlayer.config.ts`; that file is the
source of truth. Fields most relevant to routing and layout:

- `route`: `official`, `casual`, or `shared`. `postsForRoute` keeps posts whose
  `route` matches or is `shared`.
- `draft: true` hides a post in production builds.
- Photo posts require `image` and carry generated `imageWidth`, `imageHeight`,
  `imageWidths`, and `imageBlur`.

## Main flows

### Build

1. `contentlayer2 build` reads `data/**/*.mdx`, runs the remark/rehype pipeline,
   and writes `.contentlayer/`. Its `onSuccess` hook writes
   `app/tag-data.json` (tag counts keyed by route; shared posts count in both)
   and `public/search.json` (all articles and photo posts).
2. `next build` renders every page. With `EXPORT=1` it writes a static site to
   `out/`.
3. `scripts/postbuild.mjs` runs `scripts/rss.mjs`, which writes `feed.xml` and
   `tags/<tag>/feed.xml` into `public/` (or `out/` when `EXPORT` is set).

### Design system and route styling

- `css/tokens.css` is the single source of the look. Its PRIMITIVES block
  (ground hue/lightness, the two route accents, type base and ratio, spacing
  unit, radius, grid and motion settings) is the only part meant to be edited;
  every color, size and duration derives from it. `design/index.html` previews
  the tokens with live knobs and exports a PRIMITIVES block (open it from the
  repo in a browser; it is not part of the build).
- `css/tailwind.css` exposes the tokens as utilities through `@theme inline`
  and maps the legacy `gray-*` / `primary-*` palettes onto them for markup the
  site does not own (pliny's search modal and code copy button).
- The site is dark only: `app/theme-providers.tsx` forces the `dark` class.
- `components/RouteAccent.tsx` wraps the UI and sets `data-route` from the
  pathname; `tokens.css` picks `--accent` from it. Post and photo layouts set
  `data-route` from the post's own route.
- `components/Scene.tsx` renders the two grid planes behind every page
  (`css/scene.css`), feeds them pointer and scroll position as CSS variables,
  pans them quickly when the route changes, and dims them on post and photo
  pages. Motion is off under `prefers-reduced-motion`.
- `components/RouteSwitch.tsx` links to both route homes, marking the current
  one. `components/home/RouteTransition.tsx` (mounted in
  `app/[route]/layout.tsx`) re-mounts the page on a route change so it fades in.

### Home pages

`app/[route]/page.tsx` renders `components/home/HomeLayout.tsx` for the route:
name, role, intro and social links (from `routeMeta[route]` or the Chinese
text in `data/i18n.ts`), then `components/home/Timeline.tsx`, which places the
experiences on a year axis from their `start` / `end` fields. The home page
does not list posts or photos and does not read `data/authors/default.mdx`.

### UI language

`components/LocaleProvider.tsx` holds the locale (`en` or `zh`). It defaults to
the browser language and persists in `localStorage.locale`;
`components/LocaleSwitch.tsx` toggles it. Only the nav bar and the home pages
read it. English home text comes from `data/routes.ts` and
`data/experiences.ts`; Chinese text lives in `data/i18n.ts`.

### Tags and search

Tag pages and the tag sidebar read the current route's map from
`app/tag-data.json`. The tag sidebar (`components/TagSidebar.tsx`) opens as a
right-side drawer from a "Tags" button in the list layouts. Search uses pliny's
kbar provider over `public/search.json` and is not route-filtered.

### Images

- `components/PhotoImage.tsx` renders photo posts in lists and on the post page
  with a native `<img>`, `srcSet` built from `imageWidths`, explicit
  `width`/`height`, and a blur-up from `imageBlur`.
- `scripts/lib/images.mjs` holds the shared image operations used by
  `scripts/new-post.mjs` and `scripts/process-images.mjs`: re-encode to
  progressive JPEG at quality 80, cap width at 2400px, strip metadata, generate
  400/800/1200/1600px derivatives, and compute the blur placeholder.
- Images land in `public/static/images/<album>/`; the album defaults to the
  post slug.

## Invariants

- The route list in `data/routes.ts` is the only source of valid route values;
  `contentlayer.config.ts`'s tag counter and `css/tokens.css` (one accent per
  route) also name the two routes and must stay in sync with it.
- A `shared` post appears in both routes' lists, tag counts, and homes.
- Generated files (tag data, search index, feeds, photo image metadata and
  derivatives) are produced by the build or scripts, not edited by hand.
- Links and asset paths must work under a non-empty `BASE_PATH`.
