import React from 'react';
import { Rss, Heart, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-white dark:bg-[#12151C] border-t-[2.5px] border-[#111111] dark:border-[#E2E8F0] py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b-2 border-black/10 dark:border-white/10">
          {/* Brand & Slogan */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#4169E1] text-white font-black text-sm px-2 py-0.5 brutal-border shadow-[2px_2px_0_#111]">
                NDH
              </span>
              <span className="font-extrabold text-base">Người Đồng Hành</span>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              <span className="font-bold text-[#4169E1] dark:text-[#60A5FA]">“Cùng đổi mới, cùng phát triển”</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Cùng NDH tìm hiểu những phương pháp, kĩ thuật dạy học hiện đại và xây dựng các công cụ học tập số.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-black text-sm uppercase tracking-wider text-[#111111] dark:text-white">
              Điều hướng nhanh
            </h4>
            <ul className="text-xs font-semibold space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-[#4169E1] dark:hover:text-[#60A5FA] hover:underline"
                >
                  → Bài viết mới
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tool')}
                  className="hover:text-[#4169E1] dark:hover:text-[#60A5FA] hover:underline"
                >
                  → Công cụ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tag')}
                  className="hover:text-[#4169E1] dark:hover:text-[#60A5FA] hover:underline"
                >
                  → Tags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/gioi-thieu')}
                  className="hover:text-[#4169E1] dark:hover:text-[#60A5FA] hover:underline"
                >
                  → Giới thiệu
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & RSS */}
          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-wider text-[#111111] dark:text-white">
              Thông tin tác giả
            </h4>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Admin: <span className="font-bold text-black dark:text-white">Hoàng Lam</span>
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#rss"
                onClick={(e) => {
                  e.preventDefault();
                  alert('URL RSS Feed chính thức: https://ndh.io.vn/rss.xml (Bạn có thể sao chép hoặc tích hợp vào các trình đọc Feedly, NetNewsWire)');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#FF9F43] text-black brutal-border shadow-[2px_2px_0_#111] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <Rss className="w-3.5 h-3.5" />
                <span>RSS Feed (/rss.xml)</span>
              </a>
              <a
                href="https://github.com/hoanggv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#181B22] text-black dark:text-white brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <div>
            © {currentYear} NDH | Người Đồng Hành
          </div>
          <div className="flex items-center gap-1">
            <span>Xây dựng với tinh thần Neo-Brutalism</span>
            <Heart className="w-3.5 h-3.5 text-[#FF6B9D] fill-[#FF6B9D]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
