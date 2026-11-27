import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight, FileText, Wrench } from 'lucide-react';
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

  const suggestedTags = useMemo(() => {
    const postTags = Array.from(new Set(POSTS.flatMap((p) => p.tags)));
    return postTags.slice(0, 6);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  const handleSelect = (path: string, isExternal = false) => {
    onClose();
    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(path);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0F172A]/45 dark:bg-black/65 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm bài viết và công cụ"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <Search className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết, chủ đề hoặc công cụ..."
            className="w-full bg-transparent text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] transition-colors cursor-pointer"
              aria-label="Xóa từ khóa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] rounded-md hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
          {!normalizedQuery && (
            <div className="p-6 text-center space-y-4">
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                Nhập từ khóa để tìm nhanh trong toàn bộ bài viết và công cụ học tập.
              </p>
              {suggestedTags.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
                  <span className="text-[#64748B] dark:text-[#94A3B8]">Gợi ý:</span>
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="font-medium text-[#4168E1] dark:text-[#5B7FF0] hover:underline underline-offset-4 cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {normalizedQuery && matchedPosts.length === 0 && matchedTools.length === 0 && (
            <div className="p-10 text-center space-y-1.5">
              <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Không tìm thấy kết quả cho “{query}”
              </p>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                Hãy thử từ khóa ngắn hơn hoặc kiểm tra lại chính tả.
              </p>
            </div>
          )}

          {matchedPosts.length > 0 && (
            <div className="p-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
                <FileText className="w-3.5 h-3.5" />
                <span className="tabular-nums">Bài viết ({matchedPosts.length})</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedPosts.map((post) => (
                  <button
                    key={post.slug}
                    type="button"
                    onClick={() => handleSelect(`/${post.slug}`)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/60 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] line-clamp-1 transition-colors">
                        {post.title}
                      </div>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-1 mt-0.5">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                        <span>{post.pubDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTimeMinutes} phút đọc</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedTools.length > 0 && (
            <div className="p-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
                <Wrench className="w-3.5 h-3.5" />
                <span className="tabular-nums">Công cụ ({matchedTools.length})</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedTools.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() =>
                      handleSelect(
                        tool.type === 'external' ? tool.url : `/tool/${tool.slug}`,
                        tool.type === 'external'
                      )
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/60 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] truncate transition-colors">
                          {tool.name}
                        </span>
                        <span className="text-xs text-[#4168E1] dark:text-[#5B7FF0] shrink-0">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-1 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
