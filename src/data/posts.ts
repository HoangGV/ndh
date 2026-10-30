import { Post } from '../types';

/**
 * Tự động đọc và phân tích toàn bộ file Markdown (.md) trong thư mục /src/content/blog/*.md
 * Chuẩn Astro Content Collections: Thêm bài mới chỉ cần tạo file .md trong src/content/blog/!
 */
const rawPosts = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string } | string>;

function parseFrontmatter(rawContent: string): { data: Record<string, any>; content: string } {
  const trimmed = rawContent.trim();
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: trimmed };
  }

  const endMatch = trimmed.indexOf('\n---', 3);
  if (endMatch === -1) {
    return { data: {}, content: trimmed };
  }

  const frontmatterString = trimmed.substring(3, endMatch).trim();
  const content = trimmed.substring(endMatch + 4).trim();

  const data: Record<string, any> = {};
  const lines = frontmatterString.split('\n');
  let currentKey = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    // List item (e.g., "  - item" or "- item")
    if (trimmedLine.startsWith('- ') && currentKey) {
      const val = trimmedLine.substring(2).trim().replace(/^['"](.*)['"]$/, '$1');
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(val);
      continue;
    }

    // Key-value pair (e.g., "title: My Post")
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      currentKey = key;

      if (value === '') {
        data[key] = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          data[key] = value
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^['"](.*)['"]$/, '$1'))
            .filter(Boolean);
        }
      } else if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else if (!isNaN(Number(value)) && value !== '' && !value.includes('-')) {
        data[key] = Number(value);
      } else {
        // Strip quotes
        data[key] = value.replace(/^['"](.*)['"]$/, '$1');
      }
    }
  }

  return { data, content };
}

export function loadPostsFromMarkdown(): Post[] {
  const posts: Post[] = [];

  for (const [path, moduleOrString] of Object.entries(rawPosts)) {
    const rawContent =
      typeof moduleOrString === 'string'
        ? moduleOrString
        : (moduleOrString as any)?.default || '';

    // Lấy slug từ tên file, ví dụ: /src/content/blog/my-post.md -> my-post
    const filename = path.split('/').pop() || '';
    const slug = filename.replace(/\.md$/, '');

    const { data, content } = parseFrontmatter(rawContent);

    // Tính thời gian đọc ước tính nếu không khai báo
    const wordCount = content.trim().split(/\s+/).length;
    const readingTimeMinutes =
      typeof data.readingTimeMinutes === 'number'
        ? data.readingTimeMinutes
        : Math.max(1, Math.ceil(wordCount / 200));

    posts.push({
      slug: data.slug || slug,
      title: data.title || slug,
      description: data.description || '',
      pubDate: data.pubDate ? String(data.pubDate) : new Date().toISOString().split('T')[0],
      updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || undefined,
      draft: Boolean(data.draft),
      content,
      readingTimeMinutes,
    });
  }

  // Sắp xếp bài viết theo ngày đăng mới nhất lên đầu
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export const POSTS: Post[] = loadPostsFromMarkdown();

export const SYSTEM_FORBIDDEN_SLUGS = [
  'tool',
  'tag',
  'gioi-thieu',
  'tim-kiem',
  'rss.xml',
  'sitemap.xml',
  'sitemap-index.xml',
  'robots.txt',
  '404',
  'api',
  'admin',
  'index',
  'assets',
  '_astro',
  '_pagefind',
];
