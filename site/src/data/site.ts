export const site = {
  name: "Weldon Makori",
  email: "weldonmakori@outlook.com",
  location: "Minneapolis, MN",
  url: "https://weldon.lol",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/weldonmakori/" },
    { label: "GitHub", href: "https://github.com/ever-just" },
    { label: "X", href: "https://x.com/makori_weldon" },
    { label: "Instagram", href: "https://www.instagram.com/actuallyweldon/" },
  ],
  pages: {
    home: true,
    work: true,
    school: true,
    blog: true,
    photos: true,
    calendar: true,
    contact: true,
    call: true,
  },
} as const;

export type PageKey = keyof typeof site.pages;
