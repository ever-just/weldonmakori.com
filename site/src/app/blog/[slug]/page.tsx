import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostPage from "@/components/BlogPostPage";
import { posts } from "@/data/posts";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.published_at, tags: post.tags },
  };
}

export function generateStaticParams() {
  return posts.length > 0
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "_" }];
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
