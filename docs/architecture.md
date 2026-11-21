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
/[route]/experience        → shared professional record (EN / ZH)
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

| Area                                          | Responsibility and owned state                                                                                                                 | Public contract                                                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `data/routes.ts`                              | The set of routes, the default route, and per-route profile data (`routeMeta`: name, avatar, occupation, company, intro, socials, list titles) | `routes`, `Route`, `defaultRoute`, `isRoute`, `otherRoute`, `routeFromPathname`, `postsForRoute`, `routeMeta` |
| `data/experiences.ts`                         | Canonical role titles, dates and IDs reused by localized records                                                                               | `experiences[route]`                                                                                          |
| `data/i18n.ts`                                | Locales, UI string dictionaries, Chinese home text and role titles/dates                                                                       | Exports consumed by home and nav components                                                                   |
| `data/siteMetadata.js`                        | Site-wide settings: title, author, URLs, analytics, comments, newsletter, search                                                               | Default export                                                                                                |
| `data/headerNavLinks.ts`                      | Header and mobile nav entries                                                                                                                  | `navLinks(route)`                                                                                             |
| `data/blog/`, `data/photos/`, `data/authors/` | MDX content                                                                                                                                    | Frontmatter schema in `contentlayer.config.ts`                                                                |
| `contentlayer.config.ts`                      | Document types (`Blog`, `Photo`, `Authors`), MDX plugin pipeline, computed fields; writes the tag counts and search index                      | Generated `contentlayer/generated` types and data                                                             |
| `app/`                                        | Pages, layouts, `sitemap.ts`, `robots.ts`, SEO helpers                                                                                         | Next.js routing                                                                                               |
| `layouts/`                                    | List and post layouts (`ListLayoutWithTags`, `ListLayoutPhotos`, `PostLayout`, `PostSimple`, `PostBanner`, `PhotoLayout`, `AuthorLayout`)      | Props per layout                                                                                              |
| `components/`                                 | Portfolio shell/workspace and state; locale, search, archive UI and MDX rendering                                                              | `PortfolioShell`, `PortfolioWorkspace`, component props                                                       |
| `components/home/`                            | Retained earlier home layout/timeline, currently unmounted                                                                                     | Legacy component props                                                                                        |
| `css/`                                        | Current portfolio stylesheet, base/legacy tokens and Tailwind utilities                                                                        | `portfolio.css`, semantic custom properties                                                                   |
| `scripts/`                                    | Authoring CLI, image processing, postbuild RSS                                                                                                 | `yarn` scripts in `package.json`                                                                              |

## Portfolio content and state

`data/experiencePage.ts` owns bilingual education, role descriptions, and project copy.
`components/Portfolio.tsx` maps projects and `localizedExperiences[locale].official` into
stable entries, using repository names and existing role IDs. The route home renders
`PortfolioWorkspace` in project mode; `/experience` renders it in experience mode.

`PortfolioShell` is mounted in the root layout, under `LocaleProvider` and `SearchProvider`.
It owns the selected entry, search and tag per view, plus the three-entry reading shortlist,
last removed entry, and capacity notice. Navigation preserves this state; a full reload resets
it. Shortlist titles are resolved from current locale data rather than storing translated text.
Opening a saved entry navigates and focuses the matching inspector. Selecting directory entries
does not force scroll; mobile has an explicit detail button. Existing route validation and
static generation remain in the route layouts.

The earlier Header, Footer, Scene, HomeLayout, ExperiencePage, Timeline, and RouteTransition
components remain in source for reference but are not mounted by the new portfolio routes.

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

- `css/portfolio.css` owns the current Broken Arrow layout and charcoal/yellow theme. Portfolio
  styles are scoped under `.ba-site`; legacy semantic color tokens are overridden for archived pages.
- `css/tokens.css` and `css/tailwind.css` retain utility scales and archive compatibility. The old
  `design/index.html` token playground and grid CSS are reference artifacts, not the live design.
- `PortfolioShell` supplies the header, portrait/intro, landscape, main region and footer. Header
  links come from `navLinks(route)` and display Projects / Experience. No Personal switch or subtitle.
- `RouteAccent` still supplies route context, but both routes now use the yellow accent.
- The site remains dark only. Typography uses system Segoe UI / Arial / Microsoft YaHei; the
  root no longer downloads the previous Red Hat web fonts.
- The landscape uses the existing image with `BASE_PATH` in its URL. Portraits use the existing
  image wrapper. Internal links use Next Link so configured base paths remain supported.

### UI language

`LocaleProvider` owns English/Chinese preference and persists it in `localStorage.locale`.
The portfolio header toggles it; `PortfolioShell` also updates the HTML language. Profile, roles,
project details and shortlist titles follow the locale. Article content remains in its source language.

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

- The route list in `data/routes.ts` is the source of valid route values. The Contentlayer
  tag counter must stay in sync with it.
- A `shared` post appears in both routes' archive lists and tag counts; portfolio homes do not list posts.
- Generated files (tag data, search index, feeds, photo image metadata and
  derivatives) are produced by the build or scripts, not edited by hand.
- Links and asset paths must work under a non-empty `BASE_PATH`.
