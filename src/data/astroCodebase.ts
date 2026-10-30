export interface AstroFile {
  path: string;
  category: 'config' | 'workflow' | 'layout' | 'component' | 'page' | 'content' | 'doc';
  description: string;
  content: string;
}

export const ASTRO_CODEBASE: AstroFile[] = [
  {
    path: 'astro.config.mjs',
    category: 'config',
    description: 'Cấu hình Astro với Tailwind CSS, Sitemap và thiết lập static output cho GitHub Pages',
    content: `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// =============================================================================
// CẤU HÌNH GITHUB PAGES
// - Trường hợp 1 (Custom Domain): site: 'https://ndh.io.vn', base: '/'
// - Trường hợp 2 (Mặc định): site: 'https://hoanggv.github.io', base: '/repo-name'
// =============================================================================

export default defineConfig({
  site: 'https://ndh.io.vn',
  base: '/',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});`
  },
  {
    path: 'package.json',
    category: 'config',
    description: 'Danh sách thư viện mã nguồn mở và lệnh build Astro',
    content: `{
  "name": "ndh-nguoi-dong-hanh",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "pagefind": "pagefind --site dist"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.11",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^5.1.5",
    "astro": "^5.1.0",
    "canvas-confetti": "^1.9.4",
    "lucide-astro": "^0.475.0",
    "pagefind": "^1.3.0",
    "tailwindcss": "^3.4.17",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0"
  }
}`
  },
  {
    path: '.github/workflows/deploy.yml',
    category: 'workflow',
    description: 'GitHub Actions tự động build Astro và Pagefind search, sau đó deploy lên GitHub Pages',
    content: `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout mã nguồn
        uses: actions/checkout@v4

      - name: Cài đặt Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Cài đặt dependencies
        run: npm ci

      - name: Build Astro Static Site
        run: npm run build

      - name: Đánh chỉ mục Pagefind Search
        run: npx pagefind --site dist

      - name: Upload artifact cho Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Triển khai lên GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`
  },
  {
    path: 'src/content/config.ts',
    category: 'content',
    description: 'Định nghĩa Zod Schema cho Posts và Tools trong Astro Content Collections',
    content: `import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const toolsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    category: z.string(),
    type: z.enum(['internal', 'embed', 'external']),
    url: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    embedNotice: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  tools: toolsCollection,
};`
  },
  {
    path: 'src/layouts/Layout.astro',
    category: 'layout',
    description: 'Layout gốc hỗ trợ SEO, JSON-LD, Be Vietnam Pro font và chống nháy Dark Mode',
    content: `---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  articleDate?: string;
}

const {
  title = 'NDH | Người Đồng Hành',
  description = 'Người Đồng Hành - đồng hành kiến tạo tương lai xanh',
  image = '/og-image.jpg',
  articleDate,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />
    
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Hoàng Lam" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={articleDate ? "article" : "website"} />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.url)} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={new URL(image, Astro.url)} />

    <!-- Google Fonts: Be Vietnam Pro -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

    <!-- Anti-flash Dark Mode script -->
    <script is:inline>
      const theme = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('ndh-theme')) {
          return localStorage.getItem('ndh-theme');
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      })();
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    </script>
  </head>
  <body class="bg-[#FAFAF5] text-[#111111] dark:bg-[#0F1115] dark:text-[#F3F4F6] font-['Be_Vietnam_Pro',sans-serif] min-h-screen flex flex-col selection:bg-[#FFD93D] selection:text-black">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8 max-w-5xl">
      <slot />
    </main>
    <Footer />
  </body>
</html>`
  },
  {
    path: 'src/pages/[slug].astro',
    category: 'page',
    description: 'Trang chi tiết bài viết nằm ngay gốc domain (/ten-bai-viet), tự sinh TOC, bài trước/sau',
    content: `---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import TableOfContents from '../components/TableOfContents.astro';
import TagBadge from '../components/TagBadge.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const forbiddenSlugs = ['tool', 'tag', 'gioi-thieu', 'tim-kiem', 'rss.xml', '404', 'sitemap.xml'];

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return sortedPosts.map((post, index) => {
    if (forbiddenSlugs.includes(post.slug)) {
      throw new Error(\`Slug "\${post.slug}" trùng với route hệ thống! Hãy đổi tên file.\`);
    }
    return {
      params: { slug: post.slug },
      props: {
        post,
        prevPost: index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null,
        nextPost: index > 0 ? sortedPosts[index - 1] : null,
      },
    };
  });
}

const { post, prevPost, nextPost } = Astro.props;
const { Content, headings } = await post.render();
---

<Layout title={\`\${post.data.title} | NDH\`} description={post.data.description} articleDate={post.data.pubDate.toISOString()}>
  <article class="max-w-4xl mx-auto">
    <header class="mb-8 p-6 bg-white dark:bg-[#181B22] border-[2.5px] border-[#111111] dark:border-[#E2E8F0] shadow-[4px_4px_0_#111111] dark:shadow-[4px_4px_0_#60A5FA]">
      <div class="flex flex-wrap gap-2 mb-3">
        {post.data.tags.map((tag: string) => <TagBadge tag={tag} />)}
      </div>
      <h1 class="text-2xl md:text-4xl font-black mb-3">{post.data.title}</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Ngày đăng: {post.data.pubDate.toLocaleDateString('vi-VN')} · Tác giả: Hoàng Lam
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {headings.length > 0 && (
        <aside class="lg:col-span-1 order-2 lg:order-1">
          <TableOfContents headings={headings} />
        </aside>
      )}
      <div class={headings.length > 0 ? "lg:col-span-3 order-1 lg:order-2" : "col-span-full"}>
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <Content />
        </div>
      </div>
    </div>

    <!-- Nút bài trước / sau -->
    <nav class="flex justify-between items-center mt-12 pt-6 border-t-[2.5px] border-[#111111] dark:border-[#E2E8F0]">
      {prevPost ? (
        <a href={\`/\${prevPost.slug}\`} class="px-4 py-2 bg-[#FFD93D] text-black font-bold border-2 border-black shadow-[3px_3px_0_#111]">
          ← {prevPost.data.title}
        </a>
      ) : <div />}
      {nextPost ? (
        <a href={\`/\${nextPost.slug}\`} class="px-4 py-2 bg-[#4ADE80] text-black font-bold border-2 border-black shadow-[3px_3px_0_#111]">
          {nextPost.data.title} →
        </a>
      ) : <div />}
    </nav>
  </article>
</Layout>`
  },
  {
    path: 'src/pages/rss.xml.ts',
    category: 'page',
    description: 'Sinh luồng RSS Feed tĩnh theo chuẩn XML cho toàn bộ bài viết',
    content: `import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'NDH | Người Đồng Hành',
    description: 'Cùng bạn trên mọi hành trình - Website cá nhân và công cụ học tập của Hoàng Lam',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: \`/\${post.slug}/\`,
    })),
    customData: \`<language>vi</language>\`,
  });
}`
  },
  {
    path: 'README.md',
    category: 'doc',
    description: 'Tài liệu hướng dẫn deploy GitHub Pages, cấu hình DNS và quy trình đăng bài cho Admin Hoàng Lam',
    content: `# NDH | Người Đồng Hành - Hướng Dẫn Vận Hành & Triển Khai GitHub Pages

> **Slogan**: Cùng bạn trên mọi hành trình  
> **Tác giả / Admin**: Hoàng Lam  
> **Phong cách**: Neo-Brutalism hiện đại | Static Site Generator (Astro SSG)

---

## 🚀 1. Các lệnh cài đặt & chạy thử nghiệm

\`\`\`bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi động môi trường phát triển (Local Dev Server)
npm run dev

# 3. Build mã nguồn tĩnh (Xuất ra thư mục /dist)
npm run build

# 4. Xem trước sản phẩm sau khi build tĩnh
npm run preview
\`\`\`

---

## 🌐 2. Hướng dẫn Triển khai GitHub Pages từng bước (Miễn phí 100%)

### Bước 1: Tạo GitHub Repository & Đẩy mã nguồn
1. Đăng nhập GitHub và tạo một repository mới (ví dụ: \`nguoi-dong-hanh\` hoặc \`<username>.github.io\`).
2. Khởi tạo Git và push mã nguồn lên nhánh \`main\`:
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: Khởi tạo website NDH phong cách Neo-Brutalism"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   \`\`\`

### Bước 2: Bật tính năng GitHub Actions Pages
1. Trên GitHub repo, vào tab **Settings** -> mục **Pages** (ở thanh bên trái).
2. Tại phần **Build and deployment** -> **Source**, bấm chọn **GitHub Actions**.
3. Không cần chọn template nào khác vì file \`.github/workflows/deploy.yml\` đã có sẵn trong mã nguồn.

### Bước 3: Cấu hình Tên miền (Custom Domain vs github.io)

#### Trường hợp A: Sử dụng Custom Domain riêng (ví dụ: \`ndh.io.vn\`)
1. Cấu hình file \`astro.config.mjs\`:
   \`\`\`javascript
   site: 'https://ndh.io.vn',
   base: '/',
   \`\`\`
2. Cập nhật tên miền của bạn vào file \`public/CNAME\`:
   \`\`\`
   ndh.io.vn
   \`\`\`
3. Đăng nhập trang quản lý tên miền (Cloudflare, Namecheap, v.v.) và cấu hình DNS:
   - **4 bản ghi A** cho \`@\` trỏ tới 4 IP của GitHub:
     - \`185.199.108.153\`
     - \`185.199.109.153\`
     - \`185.199.110.153\`
     - \`185.199.111.153\`
   - **1 bản ghi CNAME** cho \`www\` trỏ tới: \`<username>.github.io\`
4. Trong GitHub Settings > Pages > Custom domain, nhập \`ndh.io.vn\` rồi nhấn **Save**, sau đó tích chọn **Enforce HTTPS**.

#### Trường hợp B: Sử dụng domain mặc định GitHub (\`https://<username>.github.io/<repo-name>\`)
1. Cấu hình file \`astro.config.mjs\`:
   \`\`\`javascript
   site: 'https://<username>.github.io',
   base: '/<repo-name>',
   \`\`\`
2. Xóa file \`public/CNAME\` nếu không dùng domain riêng.

---

## ⚠️ 3. Lưu ý quan trọng về Subdomain của Công cụ học tập
> **Quy tắc GitHub Pages**: Mỗi GitHub repository chỉ hỗ trợ **1 custom domain** duy nhất.  
> Do đó, nếu bạn có công cụ dạng subdomain như \`https://tools2.ndh.io.vn\`, bạn cần tạo một repository riêng (hoặc host trên Vercel/Cloudflare Pages miễn phí) rồi trỏ bản ghi DNS CNAME của subdomain \`tools2\` về dịch vụ đó.

---

## ✍️ 4. Quy trình Đăng bài viết mới dành cho Admin Hoàng Lam

Vì website là Static 100%, không cần tài khoản hay database:
1. Mở thư mục \`src/content/posts/\`.
2. Tạo một file Markdown mới, ví dụ: \`src/content/posts/bai-viet-moi.md\`.
3. Điền cấu trúc Frontmatter chuẩn:
   \`\`\`markdown
   ---
   title: "Tiêu đề bài viết của bạn"
   description: "Mô tả ngắn gọn hiển thị trên thẻ bài viết và thẻ SEO"
   pubDate: 2026-10-30
   tags: ["Học tập", "Astro", "Năng suất"]
   cover: "https://url-anh-bia.jpg"
   draft: false
   ---

   # Tiêu đề nội dung

   Nội dung bài viết bằng Markdown...
   \`\`\`
4. Commit và push lên GitHub (hoặc bấm sửa trực tiếp trên giao diện trình duyệt GitHub.com bằng cách nhấn phím \`.\` để mở VS Code Web).
5. GitHub Actions sẽ tự động kích hoạt, build bài viết và phát hành chỉ trong ~60 giây!

---

## 🚫 5. Danh sách Slug BỊ CẤM đặt tên cho bài viết
Vì bài viết nằm ngay gốc domain (ví dụ: \`https://ndh.io.vn/bai-viet-1\`), bạn **KHÔNG ĐƯỢC** đặt tên file trùng với các route hệ thống sau:
- \`tool\` (Trang danh sách công cụ)
- \`tag\` (Trang tổng hợp thẻ bài viết)
- \`gioi-thieu\` (Trang giới thiệu tác giả)
- \`tim-kiem\` (Trang tìm kiếm)
- \`rss.xml\` (Luồng tin RSS)
- \`sitemap.xml\` (Sơ đồ trang)
- \`robots.txt\`
- \`404\`

---

## 🛠️ 6. Gợi ý Git-based CMS miễn phí (Quản trị trực quan)
Nếu muốn giao diện đăng bài kéo thả như WordPress mà không cần server:
1. **Pages CMS** (pagescms.org): Hoàn toàn miễn phí, kết nối trực tiếp với GitHub repo, giao diện cực kỳ hiện đại.
2. **Decap CMS** (decapcms.org): Mã nguồn mở nổi tiếng, cấu hình qua file \`admin/config.yml\`.`
  }
];
