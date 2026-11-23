/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { ToolsView } from './views/ToolsView';
import { ToolDetailView } from './views/ToolDetailView';
import { AboutView } from './views/AboutView';
import { TagsView } from './views/TagsView';
import { NotFoundView } from './views/NotFoundView';
import { POSTS } from './data/posts';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | undefined>(undefined);

  // Initialize theme from localStorage (Mặc định Light Mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ndh-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    }
    return 'light';
  });

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ndh-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ndh-theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Synchronize browser history / popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Chuẩn hóa đường dẫn (bỏ hậu tố .html nếu truy cập trực tiếp tệp tĩnh)
  const normalizedPath =
    currentPath === '/' ? '/' : currentPath.replace(/\.html$/i, '').replace(/\/$/, '') || '/';

  // Đồng bộ thẻ tiêu đề & OpenGraph khi chuyển trang trên trình duyệt
  useEffect(() => {
    const siteName = 'Người Đồng Hành';
    const siteOrigin = window.location.origin;
    const defaultTitle = 'Người Đồng Hành - Cùng đổi mới, cùng phát triển';
    const defaultDesc =
      'Cùng Người Đồng Hành tìm hiểu những phương pháp, kĩ thuật dạy học hiện đại và xây dựng các công cụ học tập số';
    const defaultImage = `${siteOrigin}/nguoi-dong-hanh-ndh.webp`;

    let pageTitle = defaultTitle;
    let ogTitle = defaultTitle;
    let description = defaultDesc;
    let image = defaultImage;
    let ogType = 'website';

    if (normalizedPath === '/tool') {
      pageTitle = `Công cụ - ${siteName}`;
      ogTitle = `Công cụ học tập - ${siteName}`;
      description =
        'Bộ công cụ học tập và giảng dạy miễn phí trên Người Đồng Hành: Săn cụm động từ, đồng hồ Pomodoro, đếm từ và các tiện ích số.';
    } else if (normalizedPath === '/tag') {
      pageTitle = `Tags - ${siteName}`;
      ogTitle = `Tags và chủ đề bài viết - ${siteName}`;
      description =
        'Khám phá toàn bộ chủ đề bài viết, phương pháp dạy học hiện đại và công cụ số tại Người Đồng Hành.';
    } else if (normalizedPath === '/gioi-thieu') {
      pageTitle = `Giới thiệu - ${siteName}`;
      ogTitle = `Giới thiệu - ${siteName}`;
      description =
        'Tìm hiểu về Hoàng Lam và hệ sinh thái Người Đồng Hành – không gian chia sẻ tài liệu, phương pháp dạy học và công cụ miễn phí.';
    } else if (normalizedPath !== '/' && !normalizedPath.startsWith('/tag/') && !normalizedPath.startsWith('/tool/')) {
      const slug = normalizedPath.replace(/^\//, '');
      const matchedPost = POSTS.find((p) => p.slug === slug);
      if (matchedPost) {
        pageTitle = `${matchedPost.title} | ${siteName}`;
        ogTitle = matchedPost.title;
        description = matchedPost.description || defaultDesc;
        if (matchedPost.cover) {
          image = /^https?:\/\//i.test(matchedPost.cover)
            ? matchedPost.cover
            : `${siteOrigin}${matchedPost.cover.startsWith('/') ? '' : '/'}${matchedPost.cover}`;
        }
        ogType = 'article';
      }
    }

    document.title = pageTitle;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    const canonicalUrl = `${siteOrigin}${normalizedPath === '/' ? '/' : normalizedPath}`;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', ogTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[property="og:image:secure_url"]', image);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[name="twitter:title"]', ogTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);
  }, [normalizedPath]);

  // ROUTER LOGIC
  const renderView = () => {
    // 1. Home / Articles
    if (normalizedPath === '/' || normalizedPath === '') {
      return (
        <HomeView
          onNavigate={navigateTo}
          selectedTagFilter={selectedTagFilter}
        />
      );
    }

    // 2. Tag Pages
    if (normalizedPath === '/tag') {
      return (
        <TagsView
          onNavigate={navigateTo}
          onSelectTag={(tag) => {
            setSelectedTagFilter(tag);
            navigateTo('/');
          }}
        />
      );
    }

    if (normalizedPath.startsWith('/tag/')) {
      const tagName = decodeURIComponent(normalizedPath.replace('/tag/', ''));
      return (
        <HomeView
          onNavigate={navigateTo}
          selectedTagFilter={tagName}
        />
      );
    }

    // 3. Tools Directory
    if (normalizedPath === '/tool') {
      return <ToolsView onNavigate={navigateTo} />;
    }

    // 4. Specific Tool Detail
    if (normalizedPath.startsWith('/tool/')) {
      const toolSlug = normalizedPath.replace('/tool/', '');
      return <ToolDetailView slug={toolSlug} onNavigate={navigateTo} />;
    }

    // 5. About Page
    if (normalizedPath === '/gioi-thieu') {
      return <AboutView onNavigate={navigateTo} />;
    }

    // 6. Direct Root Article Post Slugs (e.g., /xay-dung-static-site-astro-github-pages)
    const rawSlug = normalizedPath.replace(/^\//, '');
    const matchedPost = POSTS.find((p) => p.slug === rawSlug);

    if (matchedPost) {
      return <ArticleDetailView slug={matchedPost.slug} onNavigate={navigateTo} />;
    }

    // 7. 404 Not Found
    return (
      <NotFoundView
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF5] text-[#111111] dark:bg-[#0F1115] dark:text-[#F3F4F6] transition-colors w-full max-w-full overflow-x-clip">
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 overflow-x-clip">
        {renderView()}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
