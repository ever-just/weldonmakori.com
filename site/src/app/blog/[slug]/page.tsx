import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { posts } from "@/data/posts";

export const dynamicParams = false;

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
