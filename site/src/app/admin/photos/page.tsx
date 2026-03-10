"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Plus, Trash2, Eye, EyeOff, Upload, X, Video, ImageIcon } from "lucide-react";
import { RecordModel } from "pocketbase";
import { extractYouTubeId, thumbnailUrl } from "@/lib/youtube";

type Tab = "photos" | "videos";

export default function AdminPhotos() {
  const { pb } = useAdmin();
  const [tab, setTab] = useState<Tab>("videos");

  // Photos state
  const [photos, setPhotos] = useState<RecordModel[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadTags, setUploadTags] = useState("");

  // Videos state
  const [videos, setVideos] = useState<RecordModel[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [addingVideo, setAddingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  /* ---------- Photos ---------- */
  const loadPhotos = async () => {
    try {
      const result = await pb.collection("photos").getList(1, 200, { sort: "display_order,-created" });
      setPhotos(result.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const getImageUrl = (photo: RecordModel) => {
    if (photo.image) return pb.files.getURL(photo, photo.image);
    return "";
  };

  const togglePhotoVisibility = async (photo: RecordModel) => {
    try {
      await pb.collection("photos").update(photo.id, { visible: !photo.visible });
      setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, visible: !p.visible } : p)));
    } catch (err) {
      console.error(err);
      showMsg("error", "Failed to update photo visibility.");
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    try {
      await pb.collection("photos").delete(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      showMsg("success", "Photo deleted.");
    } catch (err) {
      console.error(err);
      showMsg("error", "Failed to delete photo.");
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
      showMsg("success", "Photo uploaded successfully!");
      loadPhotos();
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      showMsg("error", "Upload failed: " + msg);
    } finally {
      setUploading(false);
    }
  };

  /* ---------- Videos ---------- */
  const loadVideos = async () => {
    try {
      const result = await pb.collection("videos").getList(1, 200, { sort: "display_order,-created" });
      setVideos(result.items);
    } catch (err) {
      console.error("Failed to load videos (collection may not exist yet):", err);
    } finally {
      setLoadingVideos(false);
    }
  };

  const toggleVideoVisibility = async (video: RecordModel) => {
    try {
      await pb.collection("videos").update(video.id, { visible: !video.visible });
      setVideos((prev) => prev.map((v) => (v.id === video.id ? { ...v, visible: !v.visible } : v)));
    } catch (err) {
      console.error(err);
      showMsg("error", "Failed to update video visibility.");
    }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    try {
      await pb.collection("videos").delete(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
      showMsg("success", "Video deleted.");
    } catch (err) {
      console.error(err);
      showMsg("error", "Failed to delete video.");
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYouTubeId(videoUrl);
    if (!ytId) {
      showMsg("error", "Invalid YouTube URL. Please paste a valid YouTube link.");
      return;
    }
    setAddingVideo(true);
    try {
      await pb.collection("videos").create({
        title: videoTitle,
        youtube_url: videoUrl.trim(),
        youtube_id: ytId,
        description: videoDescription,
        visible: true,
        display_order: videos.length,
      });
      setVideoUrl("");
      setVideoTitle("");
      setVideoDescription("");
      setShowAddVideo(false);
      showMsg("success", "Video added successfully!");
      loadVideos();
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      showMsg("error", "Failed to add video: " + msg);
    } finally {
      setAddingVideo(false);
    }
  };

  useEffect(() => {
    loadPhotos();
    loadVideos();
  }, [pb]);

  const loading = tab === "photos" ? loadingPhotos : loadingVideos;

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
          <button onClick={() => setMessage(null)} className="float-right text-white/30 hover:text-white/60">&times;</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Manage</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Media</h1>
        </div>
        {tab === "photos" ? (
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-sm transition-all"
          >
            {showUpload ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
            {showUpload ? "Cancel" : "Upload Photo"}
          </button>
        ) : (
          <button
            onClick={() => setShowAddVideo(!showAddVideo)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-sm transition-all"
          >
            {showAddVideo ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
            {showAddVideo ? "Cancel" : "Add Video"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
        <button
          onClick={() => setTab("photos")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all border-b-2 -mb-px ${
            tab === "photos"
              ? "border-white/40 text-white/70"
              : "border-transparent text-white/25 hover:text-white/40"
          }`}
        >
          <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
          Photos
          <span className="text-xs text-white/20 ml-1">{photos.length}</span>
        </button>
        <button
          onClick={() => setTab("videos")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all border-b-2 -mb-px ${
            tab === "videos"
              ? "border-white/40 text-white/70"
              : "border-transparent text-white/25 hover:text-white/40"
          }`}
        >
          <Video className="w-4 h-4" strokeWidth={1.5} />
          Videos
          <span className="text-xs text-white/20 ml-1">{videos.length}</span>
        </button>
      </div>

      {/* ============ PHOTOS TAB ============ */}
      {tab === "photos" && (
        <>
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
                      onClick={() => togglePhotoVisibility(photo)}
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
        </>
      )}

      {/* ============ VIDEOS TAB ============ */}
      {tab === "videos" && (
        <>
          {showAddVideo && (
            <form onSubmit={handleAddVideo} className="mb-10 p-6 border border-white/[0.08] rounded-sm bg-white/[0.02] space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">YouTube URL</label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {videoUrl && extractYouTubeId(videoUrl) && (
                    <div className="mt-3 rounded-sm overflow-hidden border border-white/[0.06]">
                      <Image
                        src={thumbnailUrl(extractYouTubeId(videoUrl)!)}
                        alt="Video preview"
                        width={480}
                        height={360}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="Video title"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Description</label>
                    <textarea
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
                      placeholder="Optional description"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={addingVideo || !videoUrl || !videoTitle}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm transition-all disabled:opacity-40"
              >
                <Video className="w-4 h-4" strokeWidth={1.5} />
                {addingVideo ? "Adding..." : "Add Video"}
              </button>
            </form>
          )}

          {videos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-white/20">No videos yet. Add your first one above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => {
                const ytId = video.youtube_id || extractYouTubeId(video.youtube_url);
                return (
                  <div
                    key={video.id}
                    className={`group relative rounded-sm overflow-hidden border border-white/[0.06] ${
                      !video.visible ? "opacity-40" : ""
                    }`}
                  >
                    <div className="relative aspect-video">
                      {ytId ? (
                        <Image
                          src={thumbnailUrl(ytId)}
                          alt={video.title || "Video"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <Video className="w-8 h-8 text-white/10" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white/80 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleVideoVisibility(video)}
                        className="p-2 rounded-sm bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                        title={video.visible ? "Hide" : "Show"}
                      >
                        {video.visible ? (
                          <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <Eye className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </button>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="p-2 rounded-sm bg-white/10 text-red-400/70 hover:bg-red-400/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="px-3 py-2.5 bg-white/[0.03]">
                      <p className="text-xs text-white/50 truncate">{video.title}</p>
                      {video.description && (
                        <p className="text-[11px] text-white/20 mt-0.5 truncate">{video.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
