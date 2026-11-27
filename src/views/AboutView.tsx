import React from 'react';
import { Mail, Github, Globe, MapPin, Facebook } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Author Header */}
      <section className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0B1120] shrink-0">
            <img
              src="/avt.webp"
              alt="Hoàng Lam - Người Đồng Hành"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4168E1] dark:text-[#5B7FF0]">
              Tác giả
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Hoàng Lam
            </h1>
            <p className="text-base font-medium text-[#64748B] dark:text-[#94A3B8]">
              Sư phạm Công nghệ
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] dark:text-[#94A3B8] pt-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Việt Nam</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Tiếng Việt / English</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Người Đồng Hành */}
      <section className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-5">
        <div className="space-y-1.5 pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#4168E1] dark:text-[#5B7FF0]">
            Về Người Đồng Hành
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            “Cùng đổi mới, cùng phát triển”
          </h2>
        </div>

        <div className="space-y-4 text-base text-[#0F172A] dark:text-[#F8FAFC] leading-[1.75]">
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
          <p className="pt-1 text-[#0F172A] dark:text-[#F8FAFC]">
            <strong><i>“Cho đi là còn mãi!”</i></strong>
          </p>
        </div>
      </section>

      {/* Contact Links */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Kết nối và liên hệ
          </h3>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            Mọi ý kiến đóng góp, trao đổi chuyên môn hoặc kết nối, bạn có thể liên hệ qua các kênh dưới đây:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://fb.com/hoanggv.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] rounded-xl flex items-center gap-3 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors"
          >
            <Facebook className="w-4 h-4 shrink-0 text-[#4168E1] dark:text-[#5B7FF0]" />
            <span className="truncate">fb.com/hoanggv.vn</span>
          </a>

          <a
            href="mailto:me@ndh.io.vn"
            className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] rounded-xl flex items-center gap-3 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors"
          >
            <Mail className="w-4 h-4 shrink-0 text-[#4168E1] dark:text-[#5B7FF0]" />
            <span className="truncate">me@ndh.io.vn</span>
          </a>

          <a
            href="https://github.com/hoanggv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] rounded-xl flex items-center gap-3 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors"
          >
            <Github className="w-4 h-4 shrink-0 text-[#4168E1] dark:text-[#5B7FF0]" />
            <span className="truncate">github.com/hoanggv</span>
          </a>
        </div>
      </section>
    </div>
  );
};
