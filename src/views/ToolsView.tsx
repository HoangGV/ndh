import React, { useState } from 'react';
import {
  Timer,
  FileText,
  PenTool,
  Calculator,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Search,
  Sparkles,
  Gamepad2,
} from 'lucide-react';
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
        return <Gamepad2 className="w-5 h-5" />;
      case 'Timer':
        return <Timer className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
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
    <div className="space-y-8">
      {/* Header & Filter Bar */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            Công cụ học tập
          </h1>
          <span className="text-sm text-[#64748B] dark:text-[#94A3B8] tabular-nums">
            {filteredTools.length} công cụ
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {TOOL_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#4168E1] dark:bg-[#5B7FF0] text-white border-[#4168E1] dark:border-[#5B7FF0] font-semibold'
                      : 'bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] font-medium'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:border-[#4168E1] dark:focus:border-[#5B7FF0] outline-hidden transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <article
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className="h-full flex flex-col bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1]/60 dark:hover:border-[#5B7FF0]/60 rounded-xl p-6 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#4168E1]/10 dark:bg-[#5B7FF0]/15 text-[#4168E1] dark:text-[#5B7FF0] flex items-center justify-center shrink-0">
                  {renderIcon(tool.icon)}
                </div>
                <span className="text-xs font-medium text-[#4168E1] dark:text-[#5B7FF0]">
                  {tool.category}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] transition-colors leading-snug">
                {tool.name}
              </h2>

              <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-2 line-clamp-3 leading-relaxed">
                {tool.description}
              </p>

              <div className="mt-auto pt-5 flex items-center justify-between text-xs font-medium text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] transition-colors">
                <span>Truy cập công cụ</span>
                {tool.type === 'external' ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="py-12 px-6 text-center bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-2">
          <p className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            Không tìm thấy công cụ phù hợp
          </p>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            Hãy thử thay đổi danh mục hoặc từ khóa tìm kiếm.
          </p>
        </section>
      )}
    </div>
  );
};
