export interface Photo {
  src: string;
  title?: string;
  caption?: string;
}

export interface Video {
  youtube_id: string;
  title?: string;
  description?: string;
}

export const photos: Photo[] = [];

export const videos: Video[] = [];
