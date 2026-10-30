import React, { useState } from 'react';
import { Timer, FileText, PenTool, Calculator, BookOpen, ArrowRight, ExternalLink, Search, Sparkles, Gamepad2 } from 'lucide-react';
import { Tool } from '../types';
import { TOOLS, TOOL_CATEGORIES } from '../data/tools';

interface ToolsViewProps {
  onNavigate: (path: string) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6" />;
      case 'Timer':
        return <Timer className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'Tất cả' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToolClick = (tool: Tool) => {
    if (tool.type === 'external') {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(`/tool/${tool.slug}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Category Filter Bar */}
      <section className="p-4 sm:p-5 bg-white dark:bg-[#181B22] brutal-card space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ học tập..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-bold bg-[#FAFAF5] dark:bg-[#12151C] brutal-border outline-hidden"
            />
          </div>

          <div className="text-xs font-bold text-gray-500 shrink-0 self-end sm:self-center">
            {filteredTools.length} công cụ
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-black/10 dark:border-white/10">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 border-2 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#4169E1] text-white border-black dark:border-white shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA]'
                  : 'bg-white dark:bg-[#181B22] text-gray-700 dark:text-gray-300 border-black/30 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            className="p-6 bg-white dark:bg-[#181B22] brutal-card brutal-card-hover cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="p-3 bg-[#FFD93D] text-black brutal-border shadow-[2px_2px_0_#111] group-hover:scale-105 transition-transform">
                  {renderIcon(tool.icon)}
                </div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 bg-[#FAFAF5] dark:bg-[#12151C] brutal-border text-gray-700 dark:text-gray-300">
                  {tool.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-black text-[#111111] dark:text-white group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA] transition-colors leading-snug">
                {tool.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Bottom Arrow Indicator (No 'Dùng ngay tại đây' or 'Mở trang ngoài ↗') */}
            <div className="mt-5 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA]">
              <span className="text-[11px] font-bold">Truy cập công cụ</span>
              {tool.type === 'external' ? (
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#4169E1] dark:text-[#60A5FA]" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#4169E1] dark:text-[#60A5FA]" />
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
