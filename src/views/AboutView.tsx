import React from 'react';
import { Mail, Github, Globe, MapPin, Sparkles, Heart, Facebook } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* (1) Section trên cùng: Thông tin tác giả */}
      <section className="p-6 sm:p-10 bg-white dark:bg-[#181B22] brutal-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#FFD93D] brutal-border shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#60A5FA] flex items-center justify-center text-4xl font-black select-none">
              HL
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#4ADE80] text-black text-[10px] font-black brutal-border">
              ADMIN
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#4169E1] text-white text-xs font-black brutal-border">
              <Sparkles className="w-3 h-3" />
              <span>TÁC GIẢ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] dark:text-white">
              Hoàng Lam
            </h1>
            <p className="text-base font-bold text-[#4169E1] dark:text-[#60A5FA]">
              Sư phạm Công nghệ
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Việt Nam</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Tiếng Việt / English</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* (2) Section giới thiệu ngắn gọn về website NDH */}
      <section className="p-6 sm:p-8 bg-white dark:bg-[#181B22] brutal-card space-y-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase text-[#4169E1] dark:text-[#60A5FA]">
          <Heart className="w-4 h-4 fill-current" />
          <span>Về website NDH | Người Đồng Hành</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#111111] dark:text-white">
          “Cùng đổi mới, cùng phát triển”
        </h2>
        <div className="space-y-3 text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            <strong>NDH (Người Đồng Hành)</strong> là không gian chia sẻ, đồng hành cùng bạn tìm hiểu những phương pháp, kỹ thuật dạy học hiện đại và xây dựng các công cụ học tập số tiện ích.
          </p>
          <p>
            Website được thiết kế theo phong cách <strong>Neo-Brutalism</strong> hiện đại, trực quan, tương phản cao và tối ưu trải nghiệm nhanh, mượt mà trên mọi thiết bị.
          </p>
        </div>
      </section>

      {/* (3) Thẻ liên kết mạng xã hội */}
      <section className="p-6 sm:p-8 bg-[#FAFAF5] dark:bg-[#141820] brutal-card space-y-4">
        <h3 className="text-lg font-black text-[#111111] dark:text-white">
          Kết nối & Liên hệ
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Mọi ý kiến đóng góp, trao đổi chuyên môn hoặc kết nối, bạn có thể liên hệ qua các kênh dưới đây:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Facebook */}
          <a
            href="https://fb.com/hoanggv.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] flex items-center gap-2.5 font-bold text-xs hover:bg-[#1877F2] hover:text-white transition-all group"
          >
            <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white shrink-0" />
            <span className="truncate">fb.com/hoanggv.vn</span>
          </a>

          {/* Email */}
          <a
            href="mailto:me@ndh.io.vn"
            className="p-3.5 bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] flex items-center gap-2.5 font-bold text-xs hover:bg-[#FFD93D] hover:text-black transition-all group"
          >
            <Mail className="w-4 h-4 text-[#4169E1] group-hover:text-black shrink-0" />
            <span className="truncate">me@ndh.io.vn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/hoanggv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] flex items-center gap-2.5 font-bold text-xs hover:bg-[#4ADE80] hover:text-black transition-all group"
          >
            <Github className="w-4 h-4 text-black dark:text-white shrink-0" />
            <span className="truncate">github.com/hoanggv</span>
          </a>
        </div>
      </section>
    </div>
  );
};
