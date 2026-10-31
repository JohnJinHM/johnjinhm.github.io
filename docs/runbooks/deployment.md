# Deployment

The site deploys to GitHub Pages through `.github/workflows/pages.yml`.

## Prerequisites

- Repository Pages source set to GitHub Actions. The workflow's
  `actions/configure-pages` step runs with `enablement: true`.
- The workflow needs `pages: write` and `id-token: write`; both are declared in
  the workflow file.
- No secrets or `.env` values are passed to the build. Features that read
  environment variables (Giscus comments, newsletter providers) are unconfigured
  in the deployed site.

## Steps

1. Push to `main`, or run the "GitHub Pages" workflow manually
   (`workflow_dispatch`).
2. The `build` job, on Ubuntu with Node 22:
   - restores `.next/cache`,
   - runs `yarn`, then `yarn build` with `EXPORT=1`, `UNOPTIMIZED=1`, and
     `BASE_PATH` from `configure-pages`,
   - uploads `./out` as the Pages artifact.
3. The `deploy` job publishes the artifact to the `github-pages` environment.

Runs share the `pages` concurrency group; an in-progress run is not cancelled
by a newer one.

## Check before pushing

Reproduce the CI build locally:

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build   # writes the static site to out/
```

In PowerShell:

```powershell
$env:EXPORT='1'; $env:UNOPTIMIZED='1'; yarn build
```

Unset both variables afterwards: with `EXPORT` set, later runs write RSS feeds
to `out/` instead of `public/`. To test a project-page base path, also set
`BASE_PATH` (for example `/repo-name`).

## Verify

- The workflow run shows both `build` and `deploy` succeeded; the `deploy` job
  links the published URL.
- On the published site, `/` redirects to `/official/`, the route toggle reaches
  `/casual/`, and a photo post shows its image.

## Recovery

- Build failure: nothing is published; the previous deployment stays live. Fix
  on `main` and push again. If the failure mentions stale Contentlayer output,
  reproduce locally after deleting `.contentlayer` and `.next`.
- Bad deployment: revert the offending commit on `main` and push; the workflow
  redeploys the reverted tree.
