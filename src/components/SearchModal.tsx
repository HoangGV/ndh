import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Wrench, ArrowRight, CornerDownLeft } from 'lucide-react';
import { POSTS } from '../data/posts';
import { TOOLS } from '../data/tools';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchedPosts = normalizedQuery
    ? POSTS.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
          p.content.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedTools = normalizedQuery
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(normalizedQuery) ||
          t.description.toLowerCase().includes(normalizedQuery) ||
          t.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#181B22] border-[3px] border-[#111111] dark:border-[#E2E8F0] shadow-[8px_8px_0_#111111] dark:shadow-[8px_8px_0_#60A5FA] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b-[2.5px] border-[#111111] dark:border-[#E2E8F0] flex items-center bg-[#FAFAF5] dark:bg-[#12151C] px-4 py-3">
          <Search className="w-5 h-5 text-[#4169E1] dark:text-[#60A5FA] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết, công cụ, chủ đề (ví dụ: Astro, Pomodoro, Second Brain)..."
            className="w-full px-3 py-1 bg-transparent text-sm sm:text-base font-semibold outline-hidden placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-black/10 rounded mr-2 text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-0.5 text-xs font-bold bg-[#FF6B9D] text-black border border-black shadow-[1.5px_1.5px_0_#111] hover:translate-x-[-1px] hover:translate-y-[-1px]"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm font-semibold mb-2">
                🔎 Tìm kiếm tĩnh phía client (Tương đương Pagefind)
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Astro', 'Pomodoro', 'Neo-Brutalism', 'Lập trình', 'Lighthouse'].map((k) => (
                  <button
                    key={k}
                    onClick={() => setQuery(k)}
                    className="px-2.5 py-1 text-xs font-bold bg-white dark:bg-[#202530] border border-black dark:border-white/30 shadow-[2px_2px_0_#111] hover:bg-[#FFD93D] hover:text-black transition-colors"
                  >
                    #{k}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && matchedPosts.length === 0 && matchedTools.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p className="font-bold text-base">Không tìm thấy kết quả phù hợp với "{query}"</p>
              <p className="text-xs mt-1">Hãy thử với từ khóa khác hoặc kiểm tra lại chính tả.</p>
            </div>
          )}

          {/* Matched Tools */}
          {matchedTools.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#4169E1] dark:text-[#60A5FA] mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>Công cụ học tập ({matchedTools.length})</span>
              </div>
              <div className="space-y-2">
                {matchedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() =>
                      handleSelect(tool.type === 'external' ? tool.url : `/tool/${tool.slug}`)
                    }
                    className="p-3 bg-[#FAFAF5] dark:bg-[#141820] border-2 border-[#111111] dark:border-white/20 shadow-[2px_2px_0_#111] hover:border-[#4169E1] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-black dark:text-white group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA]">
                          {tool.name}
                        </span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-[#FFD93D] text-black border border-black">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#4169E1] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Posts */}
          {matchedPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B9D] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bài viết ({matchedPosts.length})</span>
              </div>
              <div className="space-y-2">
                {matchedPosts.map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => handleSelect(`/${post.slug}`)}
                    className="p-3 bg-white dark:bg-[#141820] border-2 border-[#111111] dark:border-white/20 shadow-[2px_2px_0_#111] hover:border-[#FF6B9D] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-sm text-black dark:text-white group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA]">
                        {post.title}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 mt-0.5">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500">
                        <span>{post.pubDate}</span>
                        <span>·</span>
                        <span>{post.readingTimeMinutes} phút đọc</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B9D] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="px-4 py-2.5 bg-gray-100 dark:bg-[#12151C] border-t-2 border-black dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-gray-500">
          <div className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" />
            <span>Nhấn Enter hoặc click để mở trang</span>
          </div>
          <div>Pagefind Static Index Simulator</div>
        </div>
      </div>
    </div>
  );
};
