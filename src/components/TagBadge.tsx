import React from 'react';

interface TagBadgeProps {
  tag: string;
  onClick?: (tag: string) => void;
  count?: number;
  isSelected?: boolean;
}

const TAG_COLOR_MAP: Record<string, string> = {
  'Astro': 'bg-[#FFD93D]',
  'Web Dev': 'bg-[#4ADE80]',
  'Neo-Brutalism': 'bg-[#FF6B9D]',
  'GitHub Pages': 'bg-[#FF9F43]',
  'Học tập': 'bg-[#38BDF8]',
  'Năng suất': 'bg-[#FFD93D]',
  'Kỹ năng': 'bg-[#4ADE80]',
  'Lập trình': 'bg-[#A78BFA]',
  'Tự học': 'bg-[#FF6B9D]',
  'Kinh nghiệm': 'bg-[#FF9F43]',
  'Second Brain': 'bg-[#4ADE80]',
  'Ghi chú': 'bg-[#FFD93D]',
  'Hiệu năng': 'bg-[#38BDF8]',
  'SEO': 'bg-[#A78BFA]',
};

export const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  onClick,
  count,
  isSelected,
}) => {
  const bgColor = TAG_COLOR_MAP[tag] || 'bg-[#FFD93D]';

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick(tag);
    }
  };

  return (
    <span
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      className={`inline-flex items-center gap-1.5 font-bold text-xs px-2.5 py-1 text-black brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] select-none transition-all ${bgColor} ${
        onClick
          ? 'cursor-pointer hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]'
          : ''
      } ${isSelected ? 'ring-2 ring-black dark:ring-white scale-105' : ''}`}
    >
      <span>#{tag}</span>
      {typeof count === 'number' && (
        <span className="bg-black text-white text-[10px] px-1.5 py-0.2 rounded font-mono">
          {count}
        </span>
      )}
    </span>
  );
};
