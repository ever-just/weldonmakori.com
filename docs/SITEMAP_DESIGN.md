# weldonmakori.com - Sitemap & Design Structure

## Site Architecture

```
weldonmakori.com/
│
├── / (Home/Landing)
│   └── Hero section with quick intro + CTA buttons
│
├── /links
│   └── Linktree-style link hub with all social/contact links
│
├── /resume
│   ├── Overview (summary, download PDF button)
│   ├── Work Experience (timeline view)
│   └── Skills & Technologies (interactive visualization)
│
├── /education
│   ├── Degrees & Institutions
│   ├── Courses & Classes (detailed breakdown)
│   └── Certifications & Training
│
├── /blog
│   ├── /blog (list view)
│   └── /blog/[slug] (individual posts)
│
├── /gallery
│   └── Photo/media grid with lightbox
│
├── /projects
│   ├── /projects (grid view)
│   └── /projects/[slug] (individual project pages)
│
├── /testimonials
│   └── Quotes carousel + full list
│
├── /contact
│   └── Contact form + direct contact options
│
├── /timeline
│   └── Interactive visual timeline (work + education + milestones)
│
├── /speaking
│   └── Talks, presentations, podcasts, interviews
│
├── /publications
│   └── Academic papers, articles, formal writing
│
├── /skills
│   └── Interactive skills visualization (charts/graphs)
│
├── /now
│   └── Current focus, projects, learning
│
└── /uses
    └── Tools, software, hardware, setup
```

---

## Navigation Structure

### Primary Navigation (Header)
```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO/NAME]    About  Work  Projects  Blog  Contact  [CTA] │
└─────────────────────────────────────────────────────────────┘
```

**Desktop Menu:**
- **About** (dropdown)
  - Resume
  - Education
  - Timeline
  - Now
- **Work** (dropdown)
  - Projects
  - Skills
  - Testimonials
  - Speaking
  - Publications
- **Projects** (direct link)
- **Blog** (direct link)
- **Contact** (direct link)
- **CTA Button**: "View Resume" or "Get in Touch"

**Mobile Menu:**
- Hamburger menu with all sections listed
- Sticky header with logo + menu icon

### Footer Navigation
```
┌─────────────────────────────────────────────────────────────┐
│  Quick Links    |    Social    |    Legal    |    Newsletter│
│  - Resume       |    - LinkedIn|    - Privacy|    [Email]   │
│  - Projects     |    - Twitter |    - Terms  |    [Submit]  │
│  - Blog         |    - GitHub  |             |              │
│  - Contact      |    - Instagram|            |              │
│                 |    - Facebook|             |              │
│                                                              │
│  © 2026 Weldon Makori. All rights reserved.                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Page Layouts

### 1. Home Page (/)
**Layout:** Full-screen hero + sections

```
┌────────────────────────────────────────┐
│  HERO SECTION                          │
│  ┌──────────────────────────────────┐  │
│  │  Hi, I'm Weldon Makori           │  │
│  │  [Animated tagline/role]         │  │
│  │  [Brief intro - 2 sentences]     │  │
│  │  [View Resume] [Get in Touch]    │  │
│  │  [Scroll indicator ↓]            │  │
│  └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│  FEATURED WORK (3 projects)            │
│  [Card] [Card] [Card]                  │
├────────────────────────────────────────┤
│  ABOUT SNAPSHOT                        │
│  - Quick stats (years exp, projects)   │
│  - Key skills (top 6-8)                │
│  - Current focus (/now preview)        │
├────────────────────────────────────────┤
│  LATEST BLOG POSTS (3 recent)          │
│  [Card] [Card] [Card]                  │
├────────────────────────────────────────┤
│  TESTIMONIALS (rotating carousel)      │
│  "Quote" - Person, Company             │
├────────────────────────────────────────┤
│  CTA SECTION                           │
│  Let's work together                   │
│  [Contact Me] [View All Links]         │
└────────────────────────────────────────┘
```

### 2. Links Page (/links)
**Layout:** Linktree-style vertical stack

```
┌────────────────────────────────────────┐
│  [Profile Photo]                       │
│  Weldon Makori                         │
│  [Brief tagline]                       │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  📧 Email Me                     │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  💼 LinkedIn                     │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  🐦 Twitter/X                    │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  📷 Instagram                    │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  💻 GitHub                       │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  📄 Download Resume (PDF)        │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  📅 Schedule a Call              │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │  🌐 Main Website                 │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### 3. Resume Page (/resume)
**Layout:** Split view with sidebar navigation

```
┌────────────────────────────────────────┐
│  HEADER                                │
│  Weldon Makori                         │
│  [Download PDF] [Print] [Share]        │
├──────────┬─────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT               │
│          │                             │
│ Summary  │  PROFESSIONAL SUMMARY       │
│ Work     │  [2-3 paragraph overview]   │
│ Skills   │                             │
│ Download │  ─────────────────────────  │
│          │                             │
│          │  WORK EXPERIENCE            │
│          │  ┌─────────────────────────┐│
│          │  │ Company Name            ││
│          │  │ Role • Dates            ││
│          │  │ • Accomplishment 1      ││
│          │  │ • Accomplishment 2      ││
│          │  │ • Accomplishment 3      ││
│          │  │ [Tech: React, Node.js]  ││
│          │  └─────────────────────────┘│
│          │  [Repeat for each role]     │
│          │                             │
│          │  ─────────────────────────  │
│          │                             │
│          │  SKILLS & TECHNOLOGIES      │
│          │  [Interactive visualization]│
│          │  - Languages: [bars/pills]  │
│          │  - Frameworks: [bars/pills] │
│          │  - Tools: [bars/pills]      │
└──────────┴─────────────────────────────┘
```

### 4. Education Page (/education)
**Layout:** Accordion/expandable sections

```
┌────────────────────────────────────────┐
│  EDUCATION                             │
│                                        │
│  ▼ University Name (2018-2022)         │
│  ┌──────────────────────────────────┐ │
│  │ Bachelor of Science in CS        │ │
│  │ GPA: 3.8 • Dean's List           │ │
│  │                                  │ │
│  │ COURSES TAKEN:                   │ │
│  │ ┌────────────┐ ┌────────────┐   │ │
│  │ │ CS 101     │ │ CS 201     │   │ │
│  │ │ Intro to   │ │ Data Struct│   │ │
│  │ │ Programming│ │ & Algos    │   │ │
│  │ └────────────┘ └────────────┘   │ │
│  │ [Show all 40+ courses]           │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ▶ High School Name (2014-2018)        │
│                                        │
│  ▼ CERTIFICATIONS                      │
│  ┌──────────────────────────────────┐ │
│  │ [Cert Badge] AWS Certified       │ │
│  │ Issued: Jan 2024 • Expires: 2027│ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### 5. Projects Page (/projects)
**Layout:** Grid with filters

```
┌────────────────────────────────────────┐
│  PROJECTS                              │
│  [All] [Web] [Mobile] [AI/ML] [Other]  │
│                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │ IMG  │  │ IMG  │  │ IMG  │        │
│  │      │  │      │  │      │        │
│  │Title │  │Title │  │Title │        │
│  │Desc  │  │Desc  │  │Desc  │        │
│  │[Tech]│  │[Tech]│  │[Tech]│        │
│  │[View]│  │[View]│  │[View]│        │
│  └──────┘  └──────┘  └──────┘        │
│  [Repeat grid...]                      │
└────────────────────────────────────────┘
```

### 6. Blog Page (/blog)
**Layout:** List with featured post

```
┌────────────────────────────────────────┐
│  BLOG                                  │
│  ┌──────────────────────────────────┐ │
│  │  FEATURED POST                   │ │
│  │  [Large image]                   │ │
│  │  Title                           │ │
│  │  Excerpt...                      │ │
│  │  [Read More] • 5 min read        │ │
│  └──────────────────────────────────┘ │
│                                        │
│  RECENT POSTS                          │
│  ┌────────────────────────────────┐   │
│  │ [Thumb] Title                  │   │
│  │         Excerpt... • Date      │   │
│  └────────────────────────────────┘   │
│  [Repeat...]                           │
│                                        │
│  [Load More] or [Pagination]           │
└────────────────────────────────────────┘
```

### 7. Timeline Page (/timeline)
**Layout:** Vertical timeline with alternating sides

```
┌────────────────────────────────────────┐
│  MY JOURNEY                            │
│                                        │
│      2026 ●─────────────┐             │
│           │ Current Role │             │
│           │ Company Name │             │
│           └──────────────┘             │
│                                        │
│  ┌──────────────┐ ●                   │
│  │ Previous Role│ │ 2024              │
│  │ Company Name │ │                   │
│  └──────────────┘                     │
│                                        │
│      2022 ●─────────────┐             │
│           │ Graduated    │             │
│           │ University   │             │
│           └──────────────┘             │
│                                        │
│  [Continue timeline...]                │
│                                        │
│  [Filter: All | Work | Education |     │
│           Milestones]                  │
└────────────────────────────────────────┘
```

### 8. Contact Page (/contact)
**Layout:** Split - form + info

```
┌────────────────────────────────────────┐
│  GET IN TOUCH                          │
├──────────────────┬─────────────────────┤
│  CONTACT FORM    │  CONTACT INFO       │
│                  │                     │
│  Name:           │  📧 Email           │
│  [_________]     │  weldonmakori@...   │
│                  │                     │
│  Email:          │  📞 Phone           │
│  [_________]     │  952-277-9595       │
│                  │                     │
│  Type:           │  📍 Location        │
│  [Dropdown ▼]    │  Minneapolis, MN    │
│                  │                     │
│  Message:        │  🔗 Social          │
│  [_________]     │  [LinkedIn] [X]     │
│  [_________]     │  [GitHub] [Insta]   │
│  [_________]     │                     │
│                  │  📅 Schedule        │
│  [Send Message]  │  [Book a Call]      │
│                  │                     │
│                  │  💰 Payments        │
│                  │  [Send Payment]     │
└──────────────────┴─────────────────────┘
```

---

## Design System

### Color Palette
```
Primary:   #667eea (Purple/Blue gradient start)
Secondary: #764ba2 (Purple gradient end)
Accent:    #10b981 (Green for CTAs)
Dark:      #1f2937 (Text, dark mode bg)
Light:     #f9fafb (Light mode bg)
Gray:      #6b7280 (Secondary text)
```

### Typography
```
Headings:  Inter, SF Pro Display, -apple-system
Body:      Inter, -apple-system, BlinkMacSystemFont
Code:      JetBrains Mono, Fira Code, monospace

H1: 3.5rem (56px) - Page titles
H2: 2.5rem (40px) - Section titles
H3: 1.875rem (30px) - Subsections
H4: 1.5rem (24px) - Cards
Body: 1rem (16px)
Small: 0.875rem (14px)
```

### Spacing Scale
```
xs:  0.25rem (4px)
sm:  0.5rem (8px)
md:  1rem (16px)
lg:  1.5rem (24px)
xl:  2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

### Components
- **Cards**: Rounded corners (12px), subtle shadow, hover lift effect
- **Buttons**: Rounded (8px), gradient on primary, solid on secondary
- **Forms**: Clean inputs with focus states, inline validation
- **Navigation**: Sticky header with blur backdrop
- **Animations**: Smooth transitions (300ms), fade-in on scroll

---

## Responsive Breakpoints
```
Mobile:  < 640px  (1 column)
Tablet:  640-1024px (2 columns)
Desktop: > 1024px (3-4 columns)
```

---

## Key Features by Section

### Home
- Animated hero with gradient background
- Featured work carousel
- Stats counter animation
- Smooth scroll navigation

### Links
- Copy-to-clipboard for email/phone
- Click tracking for each link
- QR code generator option
- Social proof (follower counts)

### Resume
- PDF generation on-the-fly
- Print-optimized layout
- ATS-friendly format
- One-click download

### Education
- Course search/filter
- Expandable course descriptions
- GPA calculator
- Transcript viewer

### Projects
- Live demo links
- GitHub integration
- Tech stack badges
- Case study modals

### Blog
- MDX support (embedded components)
- Code syntax highlighting
- Reading time estimates
- Social sharing buttons
- Comment system (optional)

### Gallery
- Lightbox viewer
- Image lazy loading
- Filter by category
- Download option

### Timeline
- Interactive scroll animation
- Filter by category
- Zoom in/out
- Export as image

### Contact
- Form validation
- Email notifications
- Spam protection (honeypot)
- Success/error messages
- Cal.com integration for scheduling
- Stripe integration for payments

---

## Technical Implementation

### Recommended Stack
```
Framework:     Next.js 14 (App Router)
Language:      TypeScript
Styling:       TailwindCSS + shadcn/ui
Animations:    Framer Motion
Content:       MDX (blog) + JSON (data)
Forms:         React Hook Form + Zod
Email:         Resend
Payments:      Stripe
Scheduling:    Cal.com
Analytics:     Google Analytics 4 + Plausible
Hosting:       Netlify (current) or Vercel
Database:      (Optional) Supabase for comments/contact form
```

### File Structure
```
/app
  /(routes)
    /page.tsx (home)
    /links/page.tsx
    /resume/page.tsx
    /education/page.tsx
    /blog/page.tsx
    /blog/[slug]/page.tsx
    /projects/page.tsx
    /projects/[slug]/page.tsx
    /gallery/page.tsx
    /timeline/page.tsx
    /contact/page.tsx
    /testimonials/page.tsx
    /speaking/page.tsx
    /publications/page.tsx
    /skills/page.tsx
    /now/page.tsx
    /uses/page.tsx
/components
  /ui (shadcn components)
  /sections (page sections)
  /layout (header, footer, nav)
/lib
  /utils
  /data
/public
  /images
  /documents
/content
  /blog (MDX files)
  /projects (JSON)
```

---

## Next Steps

1. **Gather Content**
   - Work history details
   - Education/course information
   - Project descriptions
   - Blog post ideas
   - Photos for gallery
   - Testimonials

2. **Design Phase**
   - Create high-fidelity mockups (Figma)
   - Design system documentation
   - Component library

3. **Development Phase**
   - Set up Next.js project
   - Build component library
   - Implement pages one by one
   - Add animations and interactions

4. **Content Population**
   - Add all work history
   - List all courses
   - Upload projects
   - Write initial blog posts

5. **Testing & Launch**
   - Cross-browser testing
   - Mobile responsiveness
   - Performance optimization
   - SEO verification
   - Analytics setup
   - Soft launch → Full launch

---

**Estimated Timeline:** 3-4 weeks for full build (with content ready)
