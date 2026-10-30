/**
 * Cấu hình Astro Content Collections (src/content/config.ts)
 * Quy định Schema chặt chẽ cho toàn bộ bài viết trong src/content/blog/*.md
 */

export interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
  readingTimeMinutes?: number;
}
