"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { RecordModel } from "pocketbase";
import pb from "@/lib/pocketbase";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const result = await pb.collection("photos").getList(1, 200, {
          sort: "display_order,-created",
          filter: "visible = true",
        });
        setPhotos(result.items);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  const getImageUrl = (photo: RecordModel, thumb?: string) => {
    if (photo.image) {
      return pb.files.getURL(photo, photo.image, thumb ? { thumb } : undefined);
    }
    return "";
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  }, [lightboxIndex, photos.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  }, [lightboxIndex, photos.length]);

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
            Photos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/30 max-w-xl leading-relaxed"
          >
            Moments captured along the way.
          </motion.p>
        </div>
        <div className="hr-fade" />
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/30 text-lg font-light">No photos yet.</p>
            <p className="text-white/15 text-sm mt-2">Check back soon.</p>
          </motion.div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <div className="relative overflow-hidden rounded-sm bg-white/5">
                  <Image
                    src={getImageUrl(photo)}
                    alt={photo.title || "Photo"}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {(photo.title || photo.caption) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        {photo.title && (
                          <p className="text-sm text-white/90 font-light">{photo.title}</p>
                        )}
                        {photo.caption && (
                          <p className="text-xs text-white/50 mt-1">{photo.caption}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
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
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageUrl(photos[lightboxIndex])}
              alt={photos[lightboxIndex].title || "Photo"}
              width={1600}
              height={1200}
              className="max-w-full max-h-[85vh] object-contain"
              priority
            />
            {(photos[lightboxIndex].title || photos[lightboxIndex].caption) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                {photos[lightboxIndex].title && (
                  <p className="text-sm text-white/80 font-light">{photos[lightboxIndex].title}</p>
                )}
                {photos[lightboxIndex].caption && (
                  <p className="text-xs text-white/40 mt-1">{photos[lightboxIndex].caption}</p>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-6 text-xs text-white/20">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </motion.div>
      )}
    </>
  );
}
