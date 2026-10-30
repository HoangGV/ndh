import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { POSTS } from '../data/posts';
import { TagBadge } from '../components/TagBadge';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  selectedTagFilter?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  selectedTagFilter,
}) => {
  const [activeTag, setActiveTag] = useState<string>(selectedTagFilter || 'Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Extract all unique tags
  const allTags = ['Tất cả', ...Array.from(new Set(POSTS.flatMap((p) => p.tags)))];

  // Filter posts
  const filteredPosts =
    activeTag === 'Tất cả'
      ? POSTS
      : POSTS.filter((p) => p.tags.includes(activeTag));

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Tag Filter Bar & Section Heading */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/10 dark:border-white/10 pb-3">
          <h1 className="text-xl sm:text-2xl font-black text-[#111111] dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4169E1] dark:text-[#60A5FA]" />
            <span>Bài viết & Nghiên cứu mới nhất</span>
          </h1>
          <span className="text-xs font-bold text-gray-500">
            {filteredPosts.length} bài viết
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 pb-1">
          {allTags.map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`text-xs font-extrabold px-3 py-1.5 border-[2px] transition-all ${
                  isSelected
                    ? 'bg-[#4169E1] text-white border-black dark:border-white shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#60A5FA] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white dark:bg-[#181B22] text-black dark:text-gray-200 border-[#111111] dark:border-white/30 shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {tag === 'Tất cả' ? 'Tất cả chủ đề' : `#${tag}`}
              </button>
            );
          })}
        </div>
      </section>

      {/* Article Cards Grid */}
      <section className="space-y-6">
        {paginatedPosts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onNavigate(`/${post.slug}`)}
            className="p-6 bg-white dark:bg-[#181B22] brutal-card brutal-card-hover cursor-pointer group flex flex-col md:flex-row gap-6 items-start"
          >
            {/* Optional Cover image */}
            {post.cover && (
              <div className="w-full md:w-56 h-40 md:h-44 shrink-0 overflow-hidden brutal-border relative bg-gray-200 dark:bg-gray-800">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex-grow flex flex-col justify-between h-full space-y-3">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {post.tags.map((t) => (
                    <TagBadge key={t} tag={t} onClick={() => handleTagChange(t)} />
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black text-[#111111] dark:text-white group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA] transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium line-clamp-2 mt-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 pt-2 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.pubDate}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTimeMinutes} phút đọc</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[#4169E1] dark:text-[#60A5FA] font-black group-hover:translate-x-1 transition-transform">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </article>
        ))}

        {paginatedPosts.length === 0 && (
          <div className="p-10 text-center bg-white dark:bg-[#181B22] brutal-card">
            <p className="font-bold text-base">Không có bài viết nào trong chủ đề này.</p>
            <button
              onClick={() => handleTagChange('Tất cả')}
              className="mt-3 px-4 py-2 bg-[#FFD93D] text-black font-bold text-xs brutal-btn"
            >
              Quay lại tất cả bài viết
            </button>
          </div>
        )}
      </section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <section className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 bg-white dark:bg-[#181B22] text-xs font-bold brutal-border shadow-[2px_2px_0_#111] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5"
          >
            ← Trang trước
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 text-xs font-black brutal-border transition-all ${
                  currentPage === num
                    ? 'bg-[#FFD93D] text-black shadow-[2px_2px_0_#111] -translate-y-0.5'
                    : 'bg-white dark:bg-[#181B22] text-black dark:text-white hover:bg-gray-100 shadow-[1px_1px_0_#111]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-1.5 bg-white dark:bg-[#181B22] text-xs font-bold brutal-border shadow-[2px_2px_0_#111] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5"
          >
            Trang sau →
          </button>
        </section>
      )}
    </div>
  );
};
