"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { RecordModel } from "pocketbase";

export default function AdminBlog() {
  const { pb } = useAdmin();
  const [posts, setPosts] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      const result = await pb.collection("blog_posts").getList(1, 100, { sort: "-created" });
      setPosts(result.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pb]);

  const toggleStatus = async (post: RecordModel) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const data: Record<string, string | null> = { status: newStatus };
    if (newStatus === "published" && !post.published_at) {
      data.published_at = new Date().toISOString();
    }
    try {
      await pb.collection("blog_posts").update(post.id, data);
      setMessage({ type: "success", text: `Post ${newStatus === "published" ? "published" : "unpublished"}.` });
      load();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update post status." });
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await pb.collection("blog_posts").delete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: "success", text: "Post deleted." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete post." });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-sm border text-sm ${
          message.type === "success"
            ? "border-green-400/20 bg-green-400/10 text-green-300/80"
            : "border-red-400/20 bg-red-400/10 text-red-300/80"
        }`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="float-right text-white/30 hover:text-white/60">×</button>
        </div>
      )}

      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Manage</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Blog Posts</h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-sm transition-all"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-white/20 mb-4">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="text-sm text-white/40 hover:text-white/60 underline underline-offset-4 transition-colors"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 px-5 py-4 border border-white/[0.06] rounded-sm bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-white/60 truncate">{post.title}</p>
                  <span
                    className={`text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      post.status === "published"
                        ? "bg-green-400/20 text-green-300/80"
                        : "bg-yellow-400/20 text-yellow-300/80"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="text-xs text-white/20 mt-0.5">
                  /{post.slug}
                  {post.published_at && ` · ${new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleStatus(post)}
                  className="p-2 text-white/20 hover:text-white/50 transition-colors"
                  title={post.status === "published" ? "Unpublish" : "Publish"}
                >
                  {post.status === "published" ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="p-2 text-white/20 hover:text-white/50 transition-colors"
                >
                  <Edit className="w-4 h-4" strokeWidth={1.5} />
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-white/20 hover:text-red-400/70 transition-colors"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
