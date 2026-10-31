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

  // ROUTER LOGIC
  const renderView = () => {
    // 1. Home / Articles
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomeView
          onNavigate={navigateTo}
          selectedTagFilter={selectedTagFilter}
        />
      );
    }

    // 2. Tag Pages
    if (currentPath === '/tag' || currentPath === '/tag/') {
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

    if (currentPath.startsWith('/tag/')) {
      const tagName = decodeURIComponent(currentPath.replace('/tag/', ''));
      return (
        <HomeView
          onNavigate={navigateTo}
          selectedTagFilter={tagName}
        />
      );
    }

    // 3. Tools Directory
    if (currentPath === '/tool' || currentPath === '/tool/') {
      return <ToolsView onNavigate={navigateTo} />;
    }

    // 4. Specific Tool Detail
    if (currentPath.startsWith('/tool/')) {
      const toolSlug = currentPath.replace('/tool/', '');
      return <ToolDetailView slug={toolSlug} onNavigate={navigateTo} />;
    }

    // 5. About Page
    if (currentPath === '/gioi-thieu' || currentPath === '/gioi-thieu/') {
      return <AboutView onNavigate={navigateTo} />;
    }

    // 6. Direct Root Article Post Slugs (e.g., /xay-dung-static-site-astro-github-pages)
    const rawSlug = currentPath.replace(/^\//, '').replace(/\/$/, '');
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
    <div className="min-h-screen flex flex-col bg-[#FAFAF5] text-[#111111] dark:bg-[#0F1115] dark:text-[#F3F4F6] transition-colors w-full max-w-full overflow-x-hidden">
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 overflow-x-hidden">
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
