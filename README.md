# weldon.lol

Personal site for Weldon Makori, live at [weldon.lol](https://weldon.lol).

Next.js 16 static export in [`site/`](site/), deployed to GitHub Pages via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) — every push to
`main` rebuilds and redeploys.

## Structure

- `site/` — the Next.js app (static export → `site/out`)
- `site/src/data/` — all content: `site.ts` (identity, socials, page toggles),
  `posts.ts` (blog), `media.ts` (photos/videos), `events.ts` (calendar)
- `data/` — work history and education source data
- `docs/` — setup notes from the previous Netlify + PocketBase architecture (legacy)
- `research/` — personal research notes

## Develop

```bash
cd site
npm ci
npm run dev    # local dev
npm run build  # static export to site/out
```

There is no backend. Content lives in `site/src/data/` — edit a file, push,
and the site rebuilds. Contact and booking forms compose a `mailto:` draft.
The previous PocketBase/Listmonk/ntfy stack is documented under `docs/`.
