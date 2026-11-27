import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { POSTS } from '../data/posts';
import { CoverImage } from '../components/CoverImage';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  selectedTagFilter?: string;
}

const POSTS_PER_PAGE = 12;

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  selectedTagFilter,
}) => {
  const [activeTag, setActiveTag] = useState<string>(selectedTagFilter || 'Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllTags, setShowAllTags] = useState(false);

  const MAX_INITIAL_TAGS = 9; // 'Tất cả' + 8 chủ đề đầu tiên

  useEffect(() => {
    setActiveTag(selectedTagFilter || 'Tất cả');
    setCurrentPage(1);
  }, [selectedTagFilter]);

  const allTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    POSTS.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    const sorted = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
    return ['Tất cả', ...sorted];
  }, []);

  const visibleTags = useMemo(() => {
    if (showAllTags || allTags.length <= MAX_INITIAL_TAGS) {
      return allTags;
    }
    const base = allTags.slice(0, MAX_INITIAL_TAGS);
    if (activeTag !== 'Tất cả' && !base.includes(activeTag)) {
      return [...base, activeTag];
    }
    return base;
  }, [allTags, showAllTags, activeTag]);

  const hiddenTagsCount = Math.max(0, allTags.length - visibleTags.length);

  const filteredPosts = useMemo(() => {
    if (activeTag === 'Tất cả') return POSTS;
    return POSTS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleTagSelect = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1);
    if (tag === 'Tất cả') {
      if (selectedTagFilter) {
        onNavigate('/');
      }
    } else {
      onNavigate(`/tag/${encodeURIComponent(tag)}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Page Heading & Editorial Tag Filter Bar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
            {activeTag === 'Tất cả' ? 'Bài viết mới nhất' : `Chủ đề: ${activeTag}`}
          </h1>
          <span className="text-sm text-[#64748B] dark:text-[#94A3B8] tabular-nums shrink-0">
            {filteredPosts.length} bài viết
          </span>
        </div>

        {/* Clean Wrapping Tag Filter (No Horizontal Scrollbar) */}
        <div
          role="tablist"
          aria-label="Lọc bài viết theo chủ đề"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#E2E8F0] dark:border-[#1E293B]"
        >
          {visibleTags.map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleTagSelect(tag)}
                className={`pb-2.5 -mb-px text-sm border-b-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#4168E1] dark:border-[#5B7FF0] text-[#4168E1] dark:text-[#5B7FF0] font-semibold'
                    : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:border-[#CBD5E1] dark:hover:border-[#334155] font-medium'
                }`}
              >
                {tag === 'Tất cả' ? 'Tất cả' : tag}
              </button>
            );
          })}

          {allTags.length > MAX_INITIAL_TAGS && (
            <button
              type="button"
              onClick={() => setShowAllTags((prev) => !prev)}
              className="pb-2.5 -mb-px text-xs font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] border-b-2 border-transparent transition-colors cursor-pointer tabular-nums"
            >
              {showAllTags ? 'Thu gọn' : `+${hiddenTagsCount} chủ đề`}
            </button>
          )}
        </div>
      </section>

      {/* 3-Column Editorial Article Grid (12 posts per page) */}
      {paginatedPosts.length > 0 ? (
        <section
          aria-label="Danh sách bài viết"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => onNavigate(`/${post.slug}`)}
              className="h-full flex flex-col bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl p-4 hover:border-[#4168E1]/60 dark:hover:border-[#5B7FF0]/60 transition-colors group cursor-pointer"
            >
              {/* 1. 16:9 Cover Image with Mandatory Fallback */}
              <CoverImage
                src={post.cover}
                alt={post.title}
                category={post.tags[0]}
                hoverZoom
              />

              {/* Card Body */}
              <div className="flex flex-col flex-grow pt-4">
                {/* 2. Tags (Clean unboxed text separated by ·) */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-medium text-[#4168E1] dark:text-[#5B7FF0] mb-2">
                    {post.tags.map((tag, index) => (
                      <React.Fragment key={tag}>
                        {index > 0 && (
                          <span aria-hidden="true" className="text-[#94A3B8]">
                            ·
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagSelect(tag);
                          }}
                          className="hover:text-[#3154C4] dark:hover:text-[#7695F5] hover:underline underline-offset-4 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* 3. Article Title */}
                <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] transition-colors leading-snug line-clamp-2 text-balance">
                  {post.title}
                </h2>

                {/* 4. Short Description */}
                {post.description && (
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed line-clamp-3 mt-2">
                    {post.description}
                  </p>
                )}

                {/* 5. Footer Metadata */}
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                  {post.pubDate && <time dateTime={post.pubDate}>{post.pubDate}</time>}
                  {post.pubDate && post.readingTimeMinutes > 0 && (
                    <span aria-hidden="true">·</span>
                  )}
                  {post.readingTimeMinutes > 0 && (
                    <span>{post.readingTimeMinutes} phút đọc</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="py-14 px-6 text-center bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-3">
          <p className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            Không có bài viết nào trong chủ đề này.
          </p>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            Bạn có thể quay lại xem toàn bộ bài viết mới nhất trên website.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleTagSelect('Tất cả')}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white transition-colors cursor-pointer"
            >
              Xem tất cả bài viết
            </button>
          </div>
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Phân trang bài viết"
          className="flex items-center justify-center gap-2 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B]"
        >
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang trước</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handlePageChange(num)}
                aria-current={currentPage === num ? 'page' : undefined}
                className={`w-9 h-9 rounded-lg text-sm font-medium border tabular-nums transition-colors cursor-pointer ${
                  currentPage === num
                    ? 'bg-[#4168E1] dark:bg-[#5B7FF0] text-white border-[#4168E1] dark:border-[#5B7FF0] font-semibold'
                    : 'bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] border-[#E2E8F0] dark:border-[#334155] hover:border-[#4168E1] dark:hover:border-[#5B7FF0]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span>Trang sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      )}
    </div>
  );
};
