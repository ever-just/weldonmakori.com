/**
 * Extract a YouTube video ID from various URL formats.
 *
 * Supported:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://m.youtube.com/watch?v=VIDEO_ID&t=123s
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // youtu.be short links
  const shortMatch = url.match(
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  );
  if (shortMatch) return shortMatch[1];

  // Standard, mobile, embed, shorts
  const longMatch = url.match(
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/,
  );
  if (longMatch) return longMatch[1];

  // Bare video ID (11 chars, no slashes)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

  return null;
}

/** Build a privacy-enhanced embed URL. */
export function embedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/** High-quality thumbnail URL (maxresdefault with hqdefault fallback handled by Next/Image). */
export function thumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
