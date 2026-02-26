"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { RecordModel } from "pocketbase";
import pb from "@/lib/pocketbase";

export default function BlogPage() {
  const [posts, setPosts] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await pb.collection("blog_posts").getList(1, 50, {
          sort: "-published_at",
          filter: 'status = "published"',
        });
        setPosts(result.items);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const getImageUrl = (post: RecordModel) => {
    if (post.cover_image) {
      return pb.files.getURL(post, post.cover_image);
    }
    return null;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6"
          >
            Writing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white/90 leading-[1.1]"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/30 max-w-xl leading-relaxed"
          >
            Thoughts on technology, business, and the things I&apos;m building.
          </motion.p>
        </div>
        <div className="hr-fade" />
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/30 text-lg font-light">No posts yet.</p>
            <p className="text-white/15 text-sm mt-2">Check back soon.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {posts.map((post, i) => {
              const imgUrl = getImageUrl(post);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {imgUrl && (
                      <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-sm bg-white/5">
                        <Image
                          src={imgUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      {post.tags && Array.isArray(post.tags) && post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.15em] uppercase text-white/25 border border-white/10 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl md:text-2xl font-light text-white/80 group-hover:text-white transition-colors duration-300 leading-tight">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 text-sm text-white/30 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-4">
                      {post.published_at && (
                        <span className="flex items-center gap-1.5 text-xs text-white/20">
                          <Clock className="w-3 h-3" strokeWidth={1.5} />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/50 transition-colors">
                        Read
                        <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
