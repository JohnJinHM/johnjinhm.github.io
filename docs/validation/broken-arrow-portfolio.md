# Broken Arrow portfolio review — 2026-11-20

Status: implementation and browser review complete; accepted by the owner on 2026-11-20.
The owner authorized commit and push after acceptance. Base HEAD: `d291ae5`.

## Scope

Integrated the accepted BrokenArrow preview into the original Next.js application, using the
existing bilingual profile, projects, and role data. Header shows Projects, Experience and language.
WORK & LIFE, Journal, Photos and Personal are absent. Hidden archive URLs and source data remain.

## Verification performed

- `yarn lint`: passed; existing `PhotoImage.tsx` native-img advisory remains.
- `EXPORT=1 UNOPTIMIZED=1 yarn build`: passed, including type checking and all 55 static pages.
- `git diff --check`: passed.
- Browser review used the real exported `out/` directory at `http://127.0.0.1:4319/`.
- Root redirects to `/official/`; client navigation to Experience and back works.
- Projects and Experience in English and Chinese at 320, 390, 768 and 1440 CSS pixels:
  all 16 combinations had no horizontal page overflow or observed broken images.
- Visually inspected desktop projects/experience and Chinese mobile layouts.
- Keyboard Enter selects a project and retains button focus. Mobile detail control moves focus
  and scrolls to the inspector. Opening a saved entry on another route focuses the new inspector.
- Search to zero results preserves detail; Clear filters restores entries. Topic filters and
  selection persist across client navigation. All five role descriptions are available.
- Shortlist: save two projects and a role; fourth entry triggers capacity feedback; remove and undo
  restore the entry and count. Switching language also translates existing shortlist titles.
- A temporary 60-character unbroken title at 320px wrapped without overflow alongside 16,687.
  Reload restored the actual title after this test.
- Reduced-motion emulation: no animated portfolio elements; HTML scroll behavior is auto.
- Directly opened `/casual/`, `/casual/experience/`, `/official/blog/`, `/official/photos/`,
  `/blog/how-i-take-photos/`, and `/photos/mountain-morning/`; content remained available.
- No browser console errors were captured during review.

## Evidence and limits

Screenshots and the responsive measurement log are stored outside the repository in
`C:\Projects\Designs\personal-site-previews\integration-review\`:
`projects-final.jpg`, `experience-desktop.jpg`, `experience-mobile-zh.jpg`, `responsive-checks.json`.

This review used the desktop Chromium-based browser with viewport emulation, not physical mobile
devices or multiple browser engines. Non-empty BASE_PATH was checked in source handling, not in a
separate export. Existing Contentlayer Windows/deprecation and static-export header warnings remain.
The existing canonical site URL placeholder and historical content were outside this design change.

The owner inspected and accepted the local preview, then authorized commit and push.
