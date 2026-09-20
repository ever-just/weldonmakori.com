export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  published_at: string;
  cover_image?: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "new-site",
    title: "New site, same Weldon",
    excerpt:
      "weldon.lol is back — rebuilt as a fully static site with no backend to keep alive.",
    tags: ["meta", "building"],
    published_at: "2026-09-19",
    content: `
<p>My personal site went down earlier this year — the domain lapsed, the backend server I was using went away, and weldonmakori.com quietly stopped resolving. It happens when you're busy building other things.</p>

<p>So I rebuilt it. This version is simpler on purpose: a fully static site, no database, no server to babysit, no admin panel. The whole thing is a git repository — every page is generated at build time and served from a CDN. If I want to change something, I edit a file and push. That's it.</p>

<p>What's here:</p>
<ul>
<li><strong>Work</strong> — a decade of sales, operations, and building, from a window cleaning company I co-founded at 19 to scaling an AI consultancy as COO.</li>
<li><strong>School</strong> — the long road through business law and actuarial science at St. Thomas.</li>
<li><strong>Writing</strong> — this blog. Expect posts about building Everjust, AI agents, insurance, and whatever else I'm thinking about.</li>
<li><strong>Call</strong> — a video call page that works right in the browser. Try it.</li>
</ul>

<p>If you want to reach me, email is fastest: <a href="mailto:weldonmakori@outlook.com">weldonmakori@outlook.com</a>.</p>
`,
  },
];
