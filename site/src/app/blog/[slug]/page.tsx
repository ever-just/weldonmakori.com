import BlogPostPage from "@/components/BlogPostPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "_" }];
}

export default function BlogPost() {
  return <BlogPostPage />;
}
