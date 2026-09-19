"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { RecordModel } from "pocketbase";

const TiptapEditor = dynamic(() => import("@/components/admin/TiptapEditor"), { ssr: false });

export default function AdminBlogEdit() {
  const { pb } = useAdmin();
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;

  const [post, setPost] = useState<RecordModel | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const p = await pb.collection("blog_posts").getOne(postId);
        setPost(p);
        setTitle(p.title);
        setSlug(p.slug);
        setExcerpt(p.excerpt || "");
        setContent(p.content || "");
        setTags(Array.isArray(p.tags) ? p.tags.join(", ") : "");
        setStatus(p.status);
      } catch {
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    }
    if (postId) load();
  }, [postId, pb, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("excerpt", excerpt);
      formData.append("tags", JSON.stringify(tags.split(",").map((t) => t.trim()).filter(Boolean)));
      formData.append("status", status);
      if (status === "published" && post && !post.published_at) {
        formData.append("published_at", new Date().toISOString());
      }
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      await pb.collection("blog_posts").update(postId, formData);
      router.push("/admin/blog");
    } catch (err) {
      setError("Failed to update post.");
      console.error(err);
    } finally {
      setSaving(false);
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
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 text-xs tracking-wide uppercase text-white/25 hover:text-white/50 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          Back to posts
        </Link>
        <h1 className="text-2xl font-extralight text-white/80">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Slug</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm font-mono placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Excerpt</label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Content</label>
          {content !== undefined && <TiptapEditor content={content} onChange={setContent} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="tech, ai, business"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm focus:border-white/30 focus:outline-none transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="w-full text-white/40 text-sm file:mr-3 file:py-2 file:px-3 file:rounded-sm file:border file:border-white/10 file:bg-transparent file:text-white/40 file:text-xs file:cursor-pointer hover:file:border-white/20"
            />
            {post?.cover_image && (
              <p className="text-xs text-white/20 mt-1">Current: {post.cover_image}</p>
            )}
          </div>
        </div>

        {error && <p className="text-red-400/70 text-sm">{error}</p>}

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-white/70 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm transition-all disabled:opacity-40"
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            {saving ? "Saving..." : "Update Post"}
          </button>
          <Link href="/admin/blog" className="text-xs text-white/25 hover:text-white/50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
