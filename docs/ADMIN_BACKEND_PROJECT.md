# WELDONMAKORI.COM — Admin Backend Project

> **Status:** In Progress
> **Last Updated:** 2026-02-26
> **Owner:** Weldon Makori

---

## Overview

Add a full admin backend to weldonmakori.com with analytics, contact form management, blog CMS, calendar/event booking, and photo gallery — all powered by PocketBase on DigitalOcean.

---

## Architecture

```
┌─────────────────────────────┐     ┌──────────────────────────────┐
│   weldonmakori.com          │     │  pb.weldonmakori.com         │
│   Netlify (Next.js 16)      │◄───►│  DigitalOcean (PocketBase)   │
│                              │     │                              │
│  Public Pages:               │     │  Collections:                │
│  - / (home)                  │     │  - blog_posts                │
│  - /resume                   │     │  - photos                    │
│  - /education                │     │  - events                    │
│  - /blog (NEW)               │     │  - bookings                  │
│  - /blog/[slug] (NEW)        │     │  - contact_submissions       │
│  - /photos (NEW)             │     │                              │
│  - /calendar (NEW)           │     │  Built-in:                   │
│  - /contact (NEW)            │     │  - Admin UI at /_/           │
│                              │     │  - Auth (admin user)         │
│  Admin Pages:                │     │  - File storage (photos)     │
│  - /admin (NEW)              │     │  - REST API (auto-generated) │
│  - /admin/blog               │     │  - Real-time (SSE)           │
│  - /admin/photos             │     └──────────────────────────────┘
│  - /admin/events             │
│  - /admin/contacts           │     ┌──────────────────────────────┐
│  - /admin/analytics          │     │  Umami Analytics             │
│                              │◄───►│  DigitalOcean or Vercel      │
└─────────────────────────────┘     │  analytics.weldonmakori.com  │
                                     └──────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js 16 (App Router) | Already in use |
| Styling | Tailwind CSS | Already in use |
| Animations | Framer Motion | Already in use |
| Icons | Lucide React | Already in use |
| Backend/DB | PocketBase (SQLite) | New — single Go binary |
| Hosting (frontend) | Netlify | Already in use |
| Hosting (backend) | DigitalOcean Droplet | New — ~$6/mo |
| Analytics | Umami | New — self-hosted, privacy-focused |
| Calendar UI | FullCalendar | New — frontend calendar display |
| Rich Text | Tiptap | New — blog post editor |
| Photo Gallery | react-photo-album + lightbox | New — masonry grid |
| Booking | Cal.com embed OR custom form | TBD |

---

## PocketBase Collections Schema

### `blog_posts`
| Field | Type | Notes |
|-------|------|-------|
| title | text | required |
| slug | text | required, unique, indexed |
| content | text (JSON) | Tiptap JSON or HTML |
| excerpt | text | Short summary |
| cover_image | file | Single image |
| tags | json | Array of strings |
| status | select | `draft` / `published` |
| published_at | date | Nullable |
| created | autodate | Auto |
| updated | autodate | Auto |

### `photos`
| Field | Type | Notes |
|-------|------|-------|
| image | file | required, single image |
| title | text | optional |
| caption | text | optional |
| tags | json | Array of strings |
| visible | bool | default true — controls frontend display |
| display_order | number | For manual sorting |
| created | autodate | Auto |

### `events`
| Field | Type | Notes |
|-------|------|-------|
| title | text | required |
| description | text | optional |
| start_at | date | required |
| end_at | date | optional |
| location | text | optional |
| type | select | `event` / `meeting` / `deadline` |
| status | select | `upcoming` / `completed` / `cancelled` |
| color | text | Hex color for calendar display |
| created | autodate | Auto |

### `bookings`
| Field | Type | Notes |
|-------|------|-------|
| event | relation | → events (optional) |
| name | text | required |
| email | email | required |
| message | text | optional |
| preferred_time | date | Requested meeting time |
| status | select | `pending` / `confirmed` / `declined` |
| created | autodate | Auto |

### `contact_submissions`
| Field | Type | Notes |
|-------|------|-------|
| name | text | required |
| email | email | required |
| subject | text | optional |
| message | text | required |
| status | select | `new` / `read` / `replied` |
| created | autodate | Auto |

---

## Phases & Milestones

### Phase 1: Infrastructure ✅
- [x] Provision DigitalOcean droplet (Ubuntu 24.04, $6/mo, NYC3)
- [x] Install PocketBase v0.25.9 on droplet (systemd service)
- [x] Set up Caddy reverse proxy
- [ ] Configure subdomain: `pb.weldonmakori.com` (pending DNS)
- [x] Create PocketBase admin account (weldonmakori@outlook.com)
- [x] Create all 5 collections with correct fields
- [x] Configure API rules (public read for posts/photos/events, public create for bookings/contacts)
- [x] Install PocketBase JS SDK in Next.js project
- **Droplet IP:** 142.93.78.220
- **Droplet ID:** 554637298

### Phase 2: Contact Form ✅
- [x] Build `/contact` frontend page (dark theme, form with name/email/subject/message)
- [x] Wire form to PocketBase `contact_submissions` collection
- [ ] Build `/admin/contacts` page (list, status toggle, delete)
- [ ] Email notification on new submission (optional)

### Phase 3: Blog ✅ (frontend)
- [ ] Install Tiptap editor
- [ ] Build `/admin/blog` page (list all posts, create/edit/delete)
- [ ] Build `/admin/blog/new` and `/admin/blog/[id]/edit` pages with Tiptap editor
- [x] Build `/blog` listing page (grid of published posts, tags)
- [x] Build `/blog/[slug]` dynamic post page with rich content rendering
- [x] Cover image support
- [x] Add blog link to site header navigation

### Phase 4: Photo Gallery ✅ (frontend)
- [ ] Build `/admin/photos` page (upload, grid view, toggle visibility, reorder, delete)
- [x] Build `/photos` frontend page (masonry columns with custom lightbox)
- [ ] Filter by tags
- [ ] Lazy loading / infinite scroll
- [x] Add photos link to site header navigation

### Phase 5: Calendar & Events ✅ (frontend)
- [x] Build custom lightweight calendar (no FullCalendar needed)
- [ ] Build `/admin/events` page (create/edit/delete events)
- [x] Build `/calendar` frontend page (month view, event display, day selection)
- [x] Build booking form (request a meeting) with PocketBase integration
- [ ] Build `/admin/bookings` page (view/approve/decline bookings)
- [x] Add calendar link to site header navigation

### Phase 6: Analytics ⬜
- [ ] Deploy Umami on DigitalOcean (same droplet or separate)
- [ ] Add tracking script to Next.js layout
- [ ] Configure `analytics.weldonmakori.com` subdomain (optional)
- [ ] Build `/admin/analytics` page (embed Umami dashboard or pull via API)

### Phase 7: Admin Dashboard ⬜
- [ ] Build `/admin` landing page (overview cards: recent contacts, latest posts, upcoming events, photo count)
- [ ] Auth gate (password or PocketBase admin auth)
- [ ] Sidebar navigation for all admin sections
- [ ] Mobile-responsive admin layout
- [ ] Dark theme consistent with main site

### Phase 8: Polish & Deploy ⬜
- [ ] End-to-end testing
- [ ] SEO meta tags for blog posts (dynamic OpenGraph)
- [ ] RSS feed for blog
- [ ] Performance optimization (image compression, lazy loading)
- [ ] Final deploy and DNS verification
- [ ] Update site header nav with new pages

---

## DNS Plan

| Subdomain | Points To | Purpose |
|-----------|-----------|---------|
| `weldonmakori.com` | Netlify | Main site (existing) |
| `pb.weldonmakori.com` | DigitalOcean droplet IP | PocketBase API + admin |
| `analytics.weldonmakori.com` | Umami instance | Analytics dashboard (optional) |

---

## New npm Dependencies (to be added)

| Package | Purpose |
|---------|---------|
| `pocketbase` | PocketBase JS SDK |
| `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-*` | Rich text editor for blog |
| `@fullcalendar/react`, `@fullcalendar/daygrid`, `@fullcalendar/timegrid` | Calendar UI |
| `react-photo-album` | Masonry photo grid |
| `yet-another-react-lightbox` | Photo lightbox |

---

## Open Questions

- [ ] Custom admin UI at `/admin` vs using PocketBase's built-in admin at `/_/` for CRUD? (Recommendation: custom for public-facing polish, PocketBase `/_/` as fallback/power-user)
- [ ] Booking: use Cal.com embed or build custom booking form?
- [ ] Email notifications: use PocketBase hooks, Resend, or skip for now?
- [ ] Photo storage: PocketBase local storage vs S3-compatible (DigitalOcean Spaces)?

---

## Cost Estimate

| Service | Monthly Cost |
|---------|-------------|
| Netlify (frontend) | Free |
| DigitalOcean Droplet (PocketBase) | ~$6 |
| DigitalOcean Droplet (Umami) — or Vercel free | $0-6 |
| Domain (weldonmakori.com) | Already owned |
| **Total** | **~$6-12/mo** |
