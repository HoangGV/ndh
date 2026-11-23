// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// =============================================================================
// CẤU HÌNH DEPLOY CHO CLOUDFLARE (100% STATIC SITE)
// =============================================================================
// - Output directory: ./dist (khớp với [assets] directory trong wrangler.toml)
// - build.assets: 'assets' (tránh sinh thư mục bắt đầu bằng dấu gạch dưới `_astro`)
// - Không sử dụng _headers, _redirects hay các file có tiền tố `_`
// =============================================================================

export default defineConfig({
  site: 'https://blog.ndh.io.vn',
  base: '/',
  output: 'static',
  outDir: './dist',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
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
