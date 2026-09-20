import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { href: "/", key: "home" },
    { href: "/resume", key: "work" },
    { href: "/education", key: "school" },
    { href: "/blog", key: "blog" },
    { href: "/photos", key: "photos" },
    { href: "/calendar", key: "calendar" },
    { href: "/contact", key: "contact" },
    { href: "/call", key: "call" },
  ] as const;

  return [
    ...pages
      .filter((p) => site.pages[p.key])
      .map((p) => ({ url: `${site.url}${p.href}`, changeFrequency: "monthly" as const })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.published_at,
      changeFrequency: "yearly" as const,
    })),
  ];
}
