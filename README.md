# weldonmakori.com

Personal website for **Weldon Makori** — live at [weldonmakori.com](https://weldonmakori.com).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter, JetBrains Mono
- **Hosting:** Netlify

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, career highlights, CTA |
| Education | `/education` | Full academic history (UST + Normandale), courses by term |
| Resume | `/resume` | Work experience, ventures, skills |
| 404 | `*` | Custom not-found page |

## Project Structure

```
WELDONMAKORI.COM/
├── site/                    # Next.js application
│   ├── src/
│   │   ├── app/             # Pages and layout
│   │   └── components/      # React components
│   ├── netlify.toml         # Netlify build config
│   └── package.json
├── data/                    # Structured JSON data
│   ├── education-complete.json
│   └── work-history.json
├── research/                # Source research files
│   ├── WELDON_MAKORI_RESEARCH.md
│   ├── SOCIAL_LINKS.md
│   └── transcript
├── docs/                    # Setup guides and design docs
│   ├── SITEMAP_DESIGN.md
│   ├── ANALYTICS_SETUP.md
│   ├── GOOGLE_SEARCH_CONSOLE_SETUP.md
│   └── SUBMIT_TO_GOOGLE.md
└── README.md
```

## Development

```bash
cd site
npm install
npm run dev
```

## Deployment

```bash
cd site
netlify deploy --prod
```

## Future Sections

Blog, Gallery, Projects, Contact, Timeline, Links Hub, Now, Uses — see `docs/SITEMAP_DESIGN.md` for the full plan.
