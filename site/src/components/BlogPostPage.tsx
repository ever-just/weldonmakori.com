"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { RecordModel } from "pocketbase";
import pb from "@/lib/pocketbase";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [post, setPost] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const safeSlug = slug.replace(/"/g, '\\"');
        const result = await pb.collection("blog_posts").getList(1, 1, {
          filter: `slug = "${safeSlug}" && status = "published"`,
        });
        if (result.items.length > 0) {
          setPost(result.items[0]);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  const getImageUrl = (p: RecordModel) => {
    if (p.cover_image) return pb.files.getURL(p, p.cover_image);
    return null;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="text-white/30 text-lg font-light mb-4">Post not found</p>
        <Link
          href="/blog"
          className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  const imgUrl = getImageUrl(post);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-12 md:pt-32 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => router.push("/blog")}
              className="flex items-center gap-2 text-xs tracking-wide uppercase text-white/30 hover:text-white/60 transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
              Back to blog
            </button>
          </motion.div>

          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center gap-2 mb-4"
            >
              <Tag className="w-3 h-3 text-white/20" strokeWidth={1.5} />
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/25 border border-white/10 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/90 leading-[1.1]"
          >
            {post.title}
          </motion.h1>

          {post.published_at && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mt-6"
            >
              <Clock className="w-3.5 h-3.5 text-white/20" strokeWidth={1.5} />
              <span className="text-sm text-white/30">{formatDate(post.published_at)}</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cover Image */}
      {imgUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto px-6 md:px-10 mb-12"
        >
          <div className="relative aspect-[2/1] overflow-hidden rounded-sm bg-white/5">
            <Image
              src={imgUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-3xl mx-auto px-6 md:px-10 pb-20 md:pb-28"
      >
        <div
          className="prose prose-invert prose-sm md:prose-base max-w-none
            prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white/80
            prose-p:text-white/50 prose-p:leading-relaxed
            prose-a:text-white/60 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white/80
            prose-strong:text-white/70 prose-strong:font-medium
            prose-blockquote:border-white/10 prose-blockquote:text-white/40
            prose-code:text-white/60 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-li:text-white/50
            prose-img:rounded-sm"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </motion.article>
    </>
  );
}
