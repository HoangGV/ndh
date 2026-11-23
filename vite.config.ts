import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

const SITE_URL = 'https://ndh.io.vn';
const SITE_NAME = 'Người Đồng Hành';
const DEFAULT_OG_IMAGE = `${SITE_URL}/nguoi-dong-hanh-ndh.webp`;

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function resolveAbsoluteUrl(urlOrPath?: string): string {
  if (!urlOrPath) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  return `${SITE_URL}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`;
}

function detectImageMimeType(imageUrl: string): string | null {
  const cleanUrl = imageUrl.split('?')[0].toLowerCase();
  if (cleanUrl.endsWith('.webp')) return 'image/webp';
  if (cleanUrl.endsWith('.png')) return 'image/png';
  if (cleanUrl.endsWith('.jpg') || cleanUrl.endsWith('.jpeg')) return 'image/jpeg';
  if (cleanUrl.endsWith('.gif')) return 'image/gif';
  return null;
}

function parseMarkdownFrontmatter(rawContent: string): Record<string, any> {
  const trimmed = rawContent.trim();
  if (!trimmed.startsWith('---')) return {};
  const endMatch = trimmed.indexOf('\n---', 3);
  if (endMatch === -1) return {};

  const frontmatterString = trimmed.substring(3, endMatch).trim();
  const data: Record<string, any> = {};
  const lines = frontmatterString.split('\n');
  let currentKey = '';

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    if (trimmedLine.startsWith('- ') && currentKey) {
      const val = trimmedLine.substring(2).trim().replace(/^['"](.*)['"]$/, '$1');
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(val);
      continue;
    }

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
        data[key] = value.replace(/^['"](.*)['"]$/, '$1');
      }
    }
  }

  return data;
}

interface PageMeta {
  fileName: string;
  pagePath: string;
  title: string;
  ogTitle: string;
  description: string;
  image: string;
  type: 'website' | 'article';
  pubDate?: string;
  updatedDate?: string;
  tags?: string[];
}

function buildHtmlWithMeta(baseHtml: string, meta: PageMeta): string {
  const canonicalUrl = `${SITE_URL}${meta.pagePath}`;
  const isDefaultImage = meta.image === DEFAULT_OG_IMAGE;
  const imageMime = detectImageMimeType(meta.image);

  const safeTitle = escapeHtmlText(meta.title);
  const safeOgTitle = escapeHtmlAttr(meta.ogTitle);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeUrl = escapeHtmlAttr(canonicalUrl);
  const safeImage = escapeHtmlAttr(meta.image);

  const extraArticleTags =
    meta.type === 'article'
      ? [
          meta.pubDate
            ? `    <meta property="article:published_time" content="${escapeHtmlAttr(meta.pubDate)}" />`
            : '',
          meta.updatedDate
            ? `    <meta property="article:modified_time" content="${escapeHtmlAttr(meta.updatedDate)}" />`
            : '',
          `    <meta property="article:author" content="Hoàng Lam" />`,
          ...(meta.tags || []).map(
            (tag) => `    <meta property="article:tag" content="${escapeHtmlAttr(tag)}" />`
          ),
        ]
          .filter(Boolean)
          .join('\n')
      : '';

  const ogImageDetails = [
    `    <meta property="og:image" content="${safeImage}" />`,
    `    <meta property="og:image:secure_url" content="${safeImage}" />`,
    imageMime ? `    <meta property="og:image:type" content="${imageMime}" />` : '',
    isDefaultImage ? `    <meta property="og:image:width" content="1280" />` : '',
    isDefaultImage ? `    <meta property="og:image:height" content="720" />` : '',
    `    <meta property="og:image:alt" content="${safeOgTitle}" />`,
  ]
    .filter(Boolean)
    .join('\n');

  const jsonLdObj =
    meta.type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: meta.ogTitle,
          description: meta.description,
          image: meta.image,
          url: canonicalUrl,
          datePublished: meta.pubDate,
          dateModified: meta.updatedDate || meta.pubDate,
          author: {
            '@type': 'Person',
            name: 'Hoàng Lam',
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/ndh.svg`,
            },
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: meta.ogTitle,
          url: canonicalUrl,
          description: meta.description,
          image: meta.image,
        };

  const jsonLdString = JSON.stringify(jsonLdObj, null, 2).replace(/</g, '\\u003c');

  const seoHeadBlock = `<title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/ndh.svg" />
    <link rel="shortcut icon" type="image/svg+xml" href="/ndh.svg" />
    <link rel="canonical" href="${safeUrl}" />

    <!-- OpenGraph / Facebook / Zalo -->
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:title" content="${safeOgTitle}" />
    <meta property="og:description" content="${safeDesc}" />
${ogImageDetails}${extraArticleTags ? `\n${extraArticleTags}` : ''}

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeOgTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${safeImage}" />
    <meta name="twitter:image:alt" content="${safeOgTitle}" />

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
${jsonLdString}
    </script>`;

  return baseHtml.replace(
    /<title>[\s\S]*?<\/script>(?=\s*<!-- Google Fonts)/,
    seoHeadBlock
  );
}

function staticSeoPagesPlugin(): Plugin {
  return {
    name: 'ndh-static-seo-pages',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      const pagesToGenerate: PageMeta[] = [
        {
          fileName: 'tool.html',
          pagePath: '/tool',
          title: `Công cụ - ${SITE_NAME}`,
          ogTitle: `Công cụ học tập - ${SITE_NAME}`,
          description:
            'Bộ công cụ học tập và giảng dạy miễn phí trên Người Đồng Hành: Săn cụm động từ, đồng hồ Pomodoro, đếm từ và các tiện ích số.',
          image: DEFAULT_OG_IMAGE,
          type: 'website',
        },
        {
          fileName: 'tag.html',
          pagePath: '/tag',
          title: `Tags - ${SITE_NAME}`,
          ogTitle: `Tags và chủ đề bài viết - ${SITE_NAME}`,
          description:
            'Khám phá toàn bộ chủ đề bài viết, phương pháp dạy học hiện đại và công cụ số tại Người Đồng Hành.',
          image: DEFAULT_OG_IMAGE,
          type: 'website',
        },
        {
          fileName: 'gioi-thieu.html',
          pagePath: '/gioi-thieu',
          title: `Giới thiệu - ${SITE_NAME}`,
          ogTitle: `Giới thiệu - ${SITE_NAME}`,
          description:
            'Tìm hiểu về Hoàng Lam và hệ sinh thái Người Đồng Hành – không gian chia sẻ tài liệu, phương pháp dạy học và công cụ miễn phí.',
          image: DEFAULT_OG_IMAGE,
          type: 'website',
        },
      ];

      const blogDir = path.resolve(__dirname, 'src/content/blog');
      if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
        for (const file of files) {
          const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
          const data = parseMarkdownFrontmatter(raw);
          if (data.draft === true) continue;

          const slug = String(data.slug || file.replace(/\.md$/, '')).trim();
          const postTitle = String(data.title || slug);
          const postDesc =
            String(data.description || '').trim() ||
            'Cùng Người Đồng Hành tìm hiểu những phương pháp, kĩ thuật dạy học hiện đại và xây dựng các công cụ học tập số';

          pagesToGenerate.push({
            fileName: `${slug}.html`,
            pagePath: `/${slug}`,
            title: `${postTitle} | ${SITE_NAME}`,
            ogTitle: postTitle,
            description: postDesc,
            image: resolveAbsoluteUrl(data.cover),
            type: 'article',
            pubDate: data.pubDate ? String(data.pubDate) : undefined,
            updatedDate: data.updatedDate ? String(data.updatedDate) : undefined,
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          });
        }
      }

      for (const page of pagesToGenerate) {
        const outPath = path.join(distDir, page.fileName);
        fs.writeFileSync(outPath, buildHtmlWithMeta(baseHtml, page), 'utf-8');
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), staticSeoPagesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
