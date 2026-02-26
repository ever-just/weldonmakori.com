import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Weldon Makori's thoughts on technology, business, startups, and the things he's building.",
};

export default function Blog() {
  return <BlogPage />;
}
