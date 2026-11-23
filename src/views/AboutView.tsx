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
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#FFD93D] brutal-border shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#60A5FA] overflow-hidden select-none">
              <img
                src="/avt.webp"
                alt="Hoàng Lam - Admin NDH"
                className="w-full h-full object-cover object-top"
              />
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
          <span>Về Người Đồng Hành</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#111111] dark:text-white">
          “Cùng đổi mới, cùng phát triển”
        </h2>
        <div className="space-y-3.5 text-sm sm:text-[15px] font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Theo quan điểm của chủ nghĩa Mác – Lênin, con người vừa là mục tiêu cao nhất, vừa là động lực quyết định của sự nghiệp xây dựng chủ nghĩa xã hội. V.I. Lênin từng khẳng định: <i>“Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa”</i>.
          </p>
          <p>
            Để trở thành con người xã hội chủ nghĩa, mỗi cá nhân ngoài việc có thế giới quan khoa học và bản lĩnh chính trị vững vàng, có thái độ lao động tự giác, kỷ luật và sáng tạo, có tri thức toàn diện và năng lực làm chủ khoa học – công nghệ thì cũng cần có một đạo đức cách mạng và lối sống tập thể. Trong đó, tinh thần <i>“mình vì mọi người, mọi người vì mình”</i> luôn là kim chỉ nam cho mọi hoạt động của Hoàng, đó là khi chúng ta lấy lợi ích chung của xã hội làm nền tảng cho sự phát triển cho chính mình.
          </p>
          <p>
            Vì vậy, Hoàng tạo ra hệ sinh thái Người đồng hành với mong muốn được đóng góp một phần nhỏ bé vào sự nghiệp giáo dục và phát triển con người. Đây không chỉ là trang web chia sẻ tài liệu hay chia sẻ ứng dụng miễn phí dành cho giáo viên, học sinh và sinh viên mà còn là không gian kết nối những người có chung niềm đam mê học tập, giảng dạy, sáng tạo và đổi mới.
          </p>
          <p>
            Hoàng luôn trân trọng và hoan nghênh sự đóng góp của quý thầy cô, các bạn học sinh, sinh viên và tất cả những ai quan tâm đến lĩnh vực giáo dục. Nếu bạn có tài liệu, ứng dụng, ý tưởng hoặc kinh nghiệm hữu ích, hãy cùng chia sẻ với Người đồng hành để những giá trị tốt đẹp ấy được lan tỏa rộng rãi hơn.
          </p>
          <p className="text-[#111111] dark:text-white pt-1">
            <strong><i>“Cho đi là còn mãi!”</i></strong>
          </p>
        </div>
      </section>

      {/* (3) Thẻ liên kết mạng xã hội */}
      <section className="p-6 sm:p-8 bg-[#FAFAF5] dark:bg-[#141820] brutal-card space-y-4">
        <h3 className="text-lg font-black text-[#111111] dark:text-white">
          Kết nối và liên hệ
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
