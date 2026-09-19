export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  published_at: string;
  cover_image?: string;
  content: string;
}

export const posts: BlogPost[] = [];
