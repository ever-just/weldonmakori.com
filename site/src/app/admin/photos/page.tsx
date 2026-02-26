"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Plus, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";
import { RecordModel } from "pocketbase";

export default function AdminPhotos() {
  const { pb } = useAdmin();
  const [photos, setPhotos] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      const result = await pb.collection("photos").getList(1, 200, { sort: "display_order,-created" });
      setPhotos(result.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pb]);

  const getImageUrl = (photo: RecordModel) => {
    if (photo.image) return pb.files.getURL(photo, photo.image);
    return "";
  };

  const toggleVisibility = async (photo: RecordModel) => {
    try {
      await pb.collection("photos").update(photo.id, { visible: !photo.visible });
      setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, visible: !p.visible } : p)));
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update photo visibility." });
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    try {
      await pb.collection("photos").delete(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: "success", text: "Photo deleted." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete photo." });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", uploadFile);
      formData.append("title", uploadTitle);
      formData.append("caption", uploadCaption);
      formData.append("tags", JSON.stringify(uploadTags.split(",").map((t) => t.trim()).filter(Boolean)));
      formData.append("visible", "true");
      formData.append("display_order", String(photos.length));

      await pb.collection("photos").create(formData);
      setUploadFile(null);
      setUploadTitle("");
      setUploadCaption("");
      setUploadTags("");
      setShowUpload(false);
      setMessage({ type: "success", text: "Photo uploaded successfully!" });
      load();
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      setMessage({ type: "error", text: "Upload failed: " + msg });
    } finally {
      setUploading(false);
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
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Photos</h1>
          <p className="text-sm text-white/25 mt-1">{photos.length} total</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-sm transition-all"
        >
          {showUpload ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
          {showUpload ? "Cancel" : "Upload"}
        </button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <form onSubmit={handleUpload} className="mb-10 p-6 border border-white/[0.08] rounded-sm bg-white/[0.02] space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="w-full text-white/40 text-sm file:mr-3 file:py-2 file:px-3 file:rounded-sm file:border file:border-white/10 file:bg-transparent file:text-white/40 file:text-xs file:cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Title</label>
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="Optional title"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Tags</label>
              <input
                type="text"
                value={uploadTags}
                onChange={(e) => setUploadTags(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="nature, travel"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Caption</label>
            <input
              type="text"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="Optional caption"
            />
          </div>
          <button
            type="submit"
            disabled={uploading || !uploadFile}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm transition-all disabled:opacity-40"
          >
            <Upload className="w-4 h-4" strokeWidth={1.5} />
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      )}

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-white/20">No photos yet. Upload your first one above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`group relative rounded-sm overflow-hidden border border-white/[0.06] ${
                !photo.visible ? "opacity-40" : ""
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={getImageUrl(photo)}
                  alt={photo.title || "Photo"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => toggleVisibility(photo)}
                  className="p-2 rounded-sm bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                  title={photo.visible ? "Hide" : "Show"}
                >
                  {photo.visible ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="p-2 rounded-sm bg-white/10 text-red-400/70 hover:bg-red-400/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              {photo.title && (
                <div className="px-3 py-2 bg-white/[0.03]">
                  <p className="text-xs text-white/40 truncate">{photo.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
