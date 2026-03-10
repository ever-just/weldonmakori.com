"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { RecordModel } from "pocketbase";
import pb from "@/lib/pocketbase";
import { extractYouTubeId, embedUrl, thumbnailUrl } from "@/lib/youtube";

interface MediaItem {
  id: string;
  type: "photo" | "video";
  title?: string;
  caption?: string;
  // photo fields
  image?: string;
  collectionId?: string;
  collectionName?: string;
  // video fields
  youtube_id?: string;
  youtube_url?: string;
  description?: string;
}

export default function PhotosPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const [photosResult, videosResult] = await Promise.allSettled([
          pb.collection("photos").getList(1, 200, {
            sort: "display_order,-created",
            filter: "visible = true",
          }),
          pb.collection("videos").getList(1, 200, {
            sort: "display_order,-created",
            filter: "visible = true",
          }),
        ]);

        const mediaItems: MediaItem[] = [];

        // Add videos first (featured content)
        if (videosResult.status === "fulfilled") {
          for (const v of videosResult.value.items) {
            mediaItems.push({
              id: v.id,
              type: "video",
              title: v.title,
              caption: v.description,
              youtube_id: v.youtube_id || extractYouTubeId(v.youtube_url) || undefined,
              youtube_url: v.youtube_url,
              description: v.description,
            });
          }
        }

        // Add photos
        if (photosResult.status === "fulfilled") {
          for (const p of photosResult.value.items) {
            mediaItems.push({
              id: p.id,
              type: "photo",
              title: p.title,
              caption: p.caption,
              image: p.image,
              collectionId: p.collectionId,
              collectionName: p.collectionName,
            });
          }
        }

        setItems(mediaItems);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  const getImageUrl = (item: MediaItem, thumb?: string) => {
    if (item.type === "photo" && item.image && item.collectionId) {
      const record = { id: item.id, collectionId: item.collectionId, collectionName: item.collectionName || "photos" } as RecordModel;
      return pb.files.getURL(record, item.image, thumb ? { thumb } : undefined);
    }
    return "";
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  }, [lightboxIndex, items.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  }, [lightboxIndex, items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

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
            Gallery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white/90 leading-[1.1]"
          >
            Media
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/30 max-w-xl leading-relaxed"
          >
            A collection of photos, videos & more.
          </motion.p>
        </div>
        <div className="hr-fade" />
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="break-inside-avoid animate-pulse">
                <div
                  className="rounded-sm bg-white/[0.04]"
                  style={{ aspectRatio: i % 3 === 0 ? "16/9" : i % 3 === 1 ? "4/3" : "1/1" }}
                />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/30 text-lg font-light">No media yet.</p>
            <p className="text-white/15 text-sm mt-2">Check back soon.</p>
          </motion.div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                {item.type === "video" && item.youtube_id ? (
                  <div className="relative overflow-hidden rounded-sm bg-white/5">
                    <div className="relative aspect-video">
                      <Image
                        src={thumbnailUrl(item.youtube_id)}
                        alt={item.title || "Video"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <svg className="w-7 h-7 text-white/90 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {(item.title || item.caption) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          {item.title && (
                            <p className="text-sm text-white/90 font-light">{item.title}</p>
                          )}
                          {item.caption && (
                            <p className="text-xs text-white/50 mt-1 line-clamp-2">{item.caption}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-sm bg-white/5">
                    <Image
                      src={getImageUrl(item)}
                      alt={item.title || "Photo"}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {(item.title || item.caption) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          {item.title && (
                            <p className="text-sm text-white/90 font-light">{item.title}</p>
                          )}
                          {item.caption && (
                            <p className="text-xs text-white/50 mt-1">{item.caption}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && items[lightboxIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-4 md:left-8 w-11 h-11 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-4 md:right-8 w-11 h-11 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" strokeWidth={1} />
          </button>

          <div
            className="relative w-full max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {items[lightboxIndex].type === "video" && items[lightboxIndex].youtube_id ? (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={embedUrl(items[lightboxIndex].youtube_id!) + "?autoplay=1"}
                  title={items[lightboxIndex].title || "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-sm"
                />
              </div>
            ) : (
              <>
                <Image
                  src={getImageUrl(items[lightboxIndex])}
                  alt={items[lightboxIndex].title || "Photo"}
                  width={1600}
                  height={1200}
                  className="max-w-full max-h-[85vh] object-contain mx-auto"
                  priority
                />
                {(items[lightboxIndex].title || items[lightboxIndex].caption) && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    {items[lightboxIndex].title && (
                      <p className="text-sm text-white/80 font-light">{items[lightboxIndex].title}</p>
                    )}
                    {items[lightboxIndex].caption && (
                      <p className="text-xs text-white/40 mt-1">{items[lightboxIndex].caption}</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="absolute bottom-6 text-xs text-white/20">
            {lightboxIndex + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </>
  );
}
