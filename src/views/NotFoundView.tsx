import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6">
      <div className="inline-block p-4 bg-[#FF6B9D] text-black font-mono text-6xl sm:text-7xl font-black brutal-border shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_#60A5FA]">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-white">
          Trang Này Đang Lạc Bước!
        </h1>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được chuyển sang địa chỉ mới trên <strong>NDH | Người Đồng Hành</strong>.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-[#4169E1] text-white font-extrabold text-xs sm:text-sm brutal-btn flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="px-5 py-2.5 bg-[#FFD93D] text-black font-extrabold text-xs sm:text-sm brutal-btn flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Tìm kiếm nội dung</span>
        </button>
      </div>
    </div>
  );
};
