import React from 'react';
import { Home, Search } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigate,
  onOpenSearch,
}) => {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-6">
      <div className="text-6xl sm:text-7xl font-bold tracking-tight text-[#4168E1] dark:text-[#5B7FF0] tabular-nums">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
          Không tìm thấy trang
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
          Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được chuyển sang địa chỉ mới trên Người Đồng Hành.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Tìm kiếm nội dung</span>
        </button>
      </div>
    </div>
  );
};
