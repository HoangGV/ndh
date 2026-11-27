import React, { useState } from 'react';
import { Sun, Moon, Search, Menu, X, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Bài viết', path: '/' },
  { label: 'Công cụ', path: '/tool' },
  { label: 'Tags', path: '/tag' },
  { label: 'Viết bài', path: 'https://cms.ndh.io.vn/', external: true },
  { label: 'Giới thiệu', path: '/gioi-thieu' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isNavActive = (itemPath: string) => {
    if (itemPath === '/') {
      return currentPath === '/';
    }
    if (itemPath === '/tag') {
      return currentPath === '/tag' || currentPath.startsWith('/tag/');
    }
    return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#111827]/95 backdrop-blur-sm border-b border-[#E2E8F0] dark:border-[#1E293B] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 shrink-0 group cursor-pointer text-left"
          aria-label="Trang chủ Người Đồng Hành"
        >
          <img
            src="/ndh.svg"
            alt=""
            aria-hidden="true"
            className="w-7 h-7 shrink-0"
          />
          <span className="text-base font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] transition-colors whitespace-nowrap">
            Người Đồng Hành
          </span>
        </button>

        {/* Center: Primary Navigation */}
        <nav aria-label="Điều hướng chính" className="hidden md:flex items-center gap-6 lg:gap-7 h-full">
          {NAV_ITEMS.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 h-full border-b-2 border-transparent text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors whitespace-nowrap"
                >
                  <span>{item.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              );
            }

            const active = isNavActive(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center h-full border-b-2 text-sm transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'border-[#4168E1] dark:border-[#5B7FF0] text-[#4168E1] dark:text-[#5B7FF0] font-semibold'
                    : 'border-transparent text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:border-[#CBD5E1] dark:hover:border-[#334155] font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0B1120] text-sm text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
            title="Tìm kiếm (Ctrl + K)"
            aria-label="Tìm kiếm bài viết và công cụ"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline text-xs font-medium">Tìm kiếm</span>
            <kbd className="hidden lg:inline-block text-[11px] text-[#64748B] dark:text-[#94A3B8] pl-1 border-l border-[#E2E8F0] dark:border-[#334155] tabular-nums">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Điều hướng di động"
          className="md:hidden border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] px-4 py-3"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/60 hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                );
              }

              const active = isNavActive(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#4168E1]/10 dark:bg-[#5B7FF0]/15 text-[#4168E1] dark:text-[#5B7FF0] font-semibold'
                      : 'text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/60 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
