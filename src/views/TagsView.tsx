import React from 'react';
import { Tag, ArrowLeft, BookOpen } from 'lucide-react';
import { POSTS } from '../data/posts';
import { TagBadge } from '../components/TagBadge';

interface TagsViewProps {
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

export const TagsView: React.FC<TagsViewProps> = ({ onNavigate, onSelectTag }) => {
  // Compute tag frequencies
  const tagCounts: Record<string, number> = {};
  POSTS.forEach((post) => {
    post.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:bg-[#FFD93D] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>
      </div>

      <section className="p-6 sm:p-8 bg-white dark:bg-[#181B22] brutal-card space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A78BFA] text-black font-extrabold text-xs brutal-border shadow-[2px_2px_0_#111]">
          <Tag className="w-3.5 h-3.5" />
          <span>TAXONOMY · TẤT CẢ CHỦ ĐỀ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-white">
          Kho Thẻ & Chủ Đề Bài Viết
        </h1>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Khám phá tất cả các danh mục bài viết trên NDH được phân loại theo chủ đề để bạn dễ dàng theo dõi kiến thức chuyên sâu.
        </p>
      </section>

      {/* Tags Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedTags.map(([tagName, count]) => (
          <div
            key={tagName}
            onClick={() => onSelectTag(tagName)}
            className="p-5 bg-white dark:bg-[#181B22] brutal-card brutal-card-hover cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <TagBadge tag={tagName} />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{count} bài</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
