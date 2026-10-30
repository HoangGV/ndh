import React, { useState } from 'react';
import { Sun, Moon, Search, Menu, X, BookOpen, Wrench, User, Tag } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Bài viết', path: '/', icon: BookOpen },
    { label: 'Công cụ học tập', path: '/tool', icon: Wrench },
    { label: 'Kho thẻ', path: '/tag', icon: Tag },
    { label: 'Giới thiệu', path: '/gioi-thieu', icon: User },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b-[2.5px] border-[#111111] dark:border-[#E2E8F0] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo / Brand Zone */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="bg-[#4169E1] text-white font-extrabold text-xl px-2.5 py-1 brutal-border shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#60A5FA] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
            NDH
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight leading-tight group-hover:text-[#4169E1] dark:group-hover:text-[#60A5FA] transition-colors">
              Người Đồng Hành
            </span>
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hidden sm:inline">
              Cùng đổi mới, cùng phát triển
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-bold border-2 transition-all ${
                  isActive
                    ? 'bg-[#4169E1] text-white border-[#111111] dark:border-white shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA]'
                    : 'bg-transparent text-gray-700 dark:text-gray-200 border-transparent hover:border-[#111111] dark:hover:border-gray-500 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search, Theme Toggle, Mobile Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-[#FFD93D] text-[#111111] brutal-border shadow-[2px_2px_0_#111] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            title="Tìm kiếm bài viết hoặc công cụ (Phím tắt: Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tìm kiếm</span>
            <kbd className="hidden lg:inline px-1 py-0.2 bg-black/10 rounded text-[10px] font-mono">⌘K</kbd>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Chuyển đổi giao diện sáng/tối"
            className="p-1.5 bg-white dark:bg-[#181B22] text-[#111111] dark:text-[#FFD93D] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Moon className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111]"
            aria-label="Mở danh mục điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t-2 border-black dark:border-white/20 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center gap-2.5 px-4 py-2 text-sm font-bold border-2 text-left ${
                currentPath === item.path
                  ? 'bg-[#4169E1] text-white border-black'
                  : 'bg-white dark:bg-[#181B22] border-black dark:border-gray-600'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
