import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { POSTS } from '../data/posts';

interface TagsViewProps {
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

export const TagsView: React.FC<TagsViewProps> = ({ onNavigate, onSelectTag }) => {
  const sortedTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    POSTS.forEach((post) => {
      post.tags.forEach((t) => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>
      </div>

      <section className="pb-6 border-b border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            Tags và chủ đề bài viết
          </h1>
          <span className="text-sm text-[#64748B] dark:text-[#94A3B8] tabular-nums">
            {sortedTags.length} chủ đề
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
          Khám phá toàn bộ các chủ đề bài viết trên Người Đồng Hành để dễ dàng theo dõi và tra cứu tài liệu theo lĩnh vực quan tâm.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTags.map(([tagName, count]) => (
          <button
            key={tagName}
            type="button"
            onClick={() => onSelectTag(tagName)}
            className="p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1]/60 dark:hover:border-[#5B7FF0]/60 rounded-xl text-left flex items-center justify-between gap-3 transition-colors group cursor-pointer"
          >
            <div className="min-w-0">
              <div className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] truncate transition-colors">
                #{tagName}
              </div>
              <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 tabular-nums">
                {count} bài viết
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] shrink-0 transition-colors" />
          </button>
        ))}
      </section>
    </div>
  );
};
