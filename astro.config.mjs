// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// =============================================================================
// CẤU HÌNH DEPLOY CHO GITHUB PAGES
// =============================================================================
// Trường hợp 1: Dùng Custom Domain riêng (ví dụ: https://domain.com hoặc https://nguoidonghanh.vn)
//   site: 'https://domain.com',
//   base: '/',
//
// Trường hợp 2: Dùng domain mặc định của GitHub Pages (ví dụ: https://<username>.github.io/<repo-name>)
//   site: 'https://caocuong150204.github.io',
//   base: '/ten-repository-cua-ban',
// =============================================================================

export default defineConfig({
  // Đổi thành URL trang web của bạn
  site: 'https://blog.ndh.io.vn',
  // Nếu dùng custom domain thì để '/', nếu dùng github.io/<repo> thì để '/<repo>'
  base: '/',
  // Bắt buộc là 'static' để xuất ra HTML/CSS tĩnh cho GitHub Pages
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
});
