# weldon.lol

Personal site for Weldon Makori, live at [weldon.lol](https://weldon.lol).

Next.js 16 static export in [`site/`](site/), deployed to GitHub Pages via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) — every push to
`main` rebuilds and redeploys.

## Structure

- `site/` — the Next.js app (static export → `site/out`)
- `data/` — work history and education source data
- `docs/` — setup notes from the previous Netlify + PocketBase architecture
- `research/` — personal research notes
- `scripts/` — PocketBase collection setup scripts (legacy)

## Develop

```bash
cd site
npm ci
npm run dev    # local dev
npm run build  # static export to site/out
```

The PocketBase backend (`src/lib/pocketbase.ts`) is currently offline;
pages that depend on it render empty states.
