import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748B] dark:text-[#94A3B8]">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
          <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
            © {currentYear} Người Đồng Hành
          </span>
          <span aria-hidden="true">·</span>
          <span>Cùng đổi mới, cùng phát triển</span>
        </div>

        <nav aria-label="Liên kết chân trang" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
          >
            Bài viết
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/tool')}
            className="hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
          >
            Công cụ
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/tag')}
            className="hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
          >
            Tags
          </button>
          <a
            href="https://cms.ndh.io.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors"
          >
            Viết bài
          </a>
          <button
            type="button"
            onClick={() => onNavigate('/gioi-thieu')}
            className="hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
          >
            Giới thiệu
          </button>
          <a
            href="https://github.com/hoanggv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
};
