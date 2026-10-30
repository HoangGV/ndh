import { Post } from '../types';

export const POSTS: Post[] = [
  {
    slug: 'ung-dung-latex-va-khoi-ma-nguon-tuong-tac',
    title: 'Hỗ trợ công thức Toán học LaTeX và Khối mã nguồn tương tác',
    description: 'Trình soạn thảo bài viết NDH hiện đã tích hợp hoàn hảo công cụ biên dịch KaTeX hiển thị công thức toán học sắc nét cùng nút sao chép code một chạm.',
    pubDate: '2026-10-30',
    tags: ['LaTeX', 'Toán học', 'Lập trình', 'Khoa học'],
    readingTimeMinutes: 4,
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    content: `
# Biên dịch Toán học LaTeX & Khối Mã Nguồn

Website **NDH | Người Đồng Hành** hỗ trợ công nghệ biên dịch tĩnh cao cấp giúp hiển thị đầy đủ các công thức Toán học, Vật lý, Tin học bằng cú pháp **LaTeX (KaTeX)** mượt mà, cùng khối mã nguồn có gắn thẻ ngôn ngữ và nút **Sao chép** tiện lợi.

---

## 1. Công thức Toán học LaTeX trong bài viết

Bạn có thể viết công thức Toán học ngay trong bài viết bằng cách kẹp giữa dấu \`$\` (cho công thức trong dòng - inline) hoặc \`$$\` (cho khối công thức hiển thị riêng biệt - block math).

### Công thức nội dòng (Inline Math)
Ví dụ hệ thức năng lượng nổi tiếng của Albert Einstein: $E = mc^2$, biệt thức phương trình bậc hai $\\Delta = b^2 - 4ac$, hay độ phức tạp thuật toán QuickSort trong trường hợp trung bình là $O(n \\log n)$.

### Khối công thức nổi bật (Block Math)
Nghiệm tổng quát của phương trình bậc hai $ax^2 + bx + c = 0$:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Tích phân Gauss kinh điển trong xác suất thống kê:

$$\\int_{-\\infty}^{+\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}$$

Đẳng thức Euler kết nối 5 hằng số cơ bản của toán học ($e, i, \\pi, 1, 0$):

$$e^{i\\pi} + 1 = 0$$

Công thức tính tổng bình phương của $n$ số nguyên dương đầu tiên:

$$\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$$

---

## 2. Khối mã nguồn và Nút Sao chép (Copy Code)

Mỗi đoạn mã nguồn đều được đặt trong giao diện phong cách Neo-Brutalism với chấm màu phong cách cổ điển, nhãn ngôn ngữ in hoa và nút **Sao chép** nhanh chóng:

\`\`\`typescript
// Thuật toán kiểm tra số nguyên tố tối ưu O(sqrt(n))
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}
\`\`\`

Hoặc mã lệnh Python khoa học dữ liệu:

\`\`\`python
import numpy as np

# Tạo ma trận ngẫu nhiên và tính định thức
matrix = np.array([[3, 1], [4, 2]])
det = np.linalg.det(matrix)
print(f"Định thức của ma trận: {det:.2f}")
\`\`\`

---

## 3. Mục lục bài viết thông minh

Mục lục (Table of Contents) được bố trí gọn gàng thành khối **Mục lục nội dung** ngay đầu bài với nút gập/mở, đồng thời có nút **Mục lục** nổi ở góc dưới màn hình giúp bạn có thể nhảy nhanh đến bất kỳ tiêu đề nào khi đang đọc.
`
  },
  {
    slug: 'xay-dung-static-site-astro-github-pages',
    title: 'Hành trình xây dựng Static Site chuẩn Neo-Brutalism với Astro và GitHub Pages',
    description: 'Chi tiết cách thiết kế và triển khai một trang blog tĩnh siêu tốc độ, miễn phí trọn đời bằng Astro, Tailwind CSS và GitHub Actions.',
    pubDate: '2026-10-28',
    tags: ['Astro', 'Web Dev', 'Neo-Brutalism', 'GitHub Pages'],
    readingTimeMinutes: 5,
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    content: `
# Giới thiệu về Astro và Triết lý Static Site

Trong thời đại mà các framework web ngày càng phình to với Server-Side Rendering (SSR), Hydration phức tạp và hàng tá API backend đắt đỏ, **Astro** nổi lên như một luồng gió mới tinh khôi đưa chúng ta quay về cội nguồn: **Zero JavaScript by default** (mặc định không có JavaScript dư thừa gửi xuống client).

Khi kết hợp với hosting miễn phí **GitHub Pages**, bạn sở hữu một website:
- **Tốc độ mở trang tức thì**: Dưới 0.3s trên toàn cầu nhờ mạng lưới CDN của GitHub.
- **Chi phí vận hành 0đ**: Không database, không máy chủ, không lo sập server vì quá tải.
- **Bảo mật tuyệt đối**: Không có cổng SQL injection hay lỗ hổng server-side.

---

## 1. Phong cách Neo-Brutalism là gì?

Neo-Brutalism (Tân thô mộc số) là trường phái thiết kế phá vỡ sự nhàm chán của phong cách phẳng (Flat design) hay đổ bóng mờ ảo (Soft glassmorphism). Những đặc trưng không thể nhầm lẫn:
1. **Đường viền đen dày (2px - 3px)**: Rõ ràng, dứt khoát.
2. **Đổ bóng cứng (Hard Shadow)**: Không có hiệu ứng blur, ví dụ \`box-shadow: 4px 4px 0 #111111\`.
3. **Màu sắc tương phản cao**: Nền sáng kết hợp các gam màu rực rỡ như Royal Blue (#4169E1), Vàng chuối (#FFD93D), Hồng kẹo (#FF6B9D).
4. **Cảm giác vật lý (Tactile feel)**: Khi di chuột hoặc nhấn nút, các thẻ "nhấc lên" hoặc "ấn lún xuống" tạo cảm xúc chân thực như bấm phím máy cơ.

---

## 2. Cấu trúc Content Collections trong Astro

Astro cung cấp tính năng **Content Collections** giúp quản lý bài viết Markdown/MDX với khả năng xác thực dữ liệu nghiêm ngặt qua Zod schema:

\`\`\`typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
\`\`\`

Nhờ đó, nếu bạn lỡ quên điền thẻ tags hoặc sai định dạng ngày tháng, quá trình build sẽ báo lỗi ngay lập tức, ngăn ngừa lỗi hiển thị trên trang production.

---

## 3. Triển khai tự động bằng GitHub Actions

Chỉ cần một file workflow \`.github/workflows/deploy.yml\` duy nhất, mỗi lần bạn push bài viết mới lên nhánh \`main\`, GitHub sẽ tự động:
1. Checkout mã nguồn
2. Cài đặt Node.js và dependencies
3. Chạy lệnh \`astro build\`
4. Đẩy thư mục \`dist/\` lên GitHub Pages

> **Lời khuyên**: Đừng quên tạo file \`public/.nojekyll\` để GitHub Pages không bỏ qua các tài nguyên tĩnh chứa tiền tố gạch dưới như \`_astro\` nhé!

Chúc bạn có những trải nghiệm tuyệt vời cùng **NDH | Người Đồng Hành**!
`
  },
  {
    slug: 'phuong-phap-pomodoro-deep-work',
    title: 'Phương pháp Pomodoro & Deep Work: Bí quyết học tập không kiệt sức',
    description: 'Cách chia nhỏ phiên học tập 25 phút kết hợp trạng thái tập trung sâu (Flow state) giúp bạn hoàn thành khối lượng công việc gấp đôi trong nửa thời gian.',
    pubDate: '2026-10-25',
    tags: ['Học tập', 'Năng suất', 'Kỹ năng'],
    readingTimeMinutes: 4,
    cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    content: `
# Nghịch lý của sự tập trung thời đại số

Chúng ta đang sống trong một kỷ nguyên của sự phân tâm liên tục: thông báo điện thoại, tin nhắn mạng xã hội và hàng chục tab trình duyệt mở cùng lúc. Kết quả là nhiều người ngồi vào bàn học 8 tiếng nhưng thời gian thực sự "nạp kiến thức" chưa đầy 2 tiếng.

Đây chính là lúc **Kỹ thuật Pomodoro** và triết lý **Deep Work** của Giáo sư Cal Newport phát huy sức mạnh.

---

## 1. Chu trình Pomodoro 25/5 cơ bản

Pomodoro (tiếng Ý nghĩa là quả cà chua) do Francesco Cirillo phát minh vào cuối những năm 1980. Quy tắc cốt lõi vô cùng giản dị:

| Bước | Hành động | Thời lượng | Ghi chú |
| :--- | :--- | :--- | :--- |
| **01** | Chọn 1 nhiệm vụ duy nhất | - | Không làm đa nhiệm |
| **02** | Cài đặt bộ đếm | 25 phút | Tắt mọi thông báo |
| **03** | Làm việc liên tục | 25 phút | Cho đến khi chuông reo |
| **04** | Nghỉ ngắn | 5 phút | Uống nước, vận động nhẹ |
| **05** | Sau 4 chu kỳ | 15 - 30 phút | Nghỉ dài phục hồi não bộ |

---

## 2. Kết hợp với trạng thái Deep Work

Điểm yếu lớn nhất của người mới áp dụng Pomodoro là: *Trong 5 phút nghỉ giải lao, họ lại lướt TikTok hoặc đọc tin nhắn*. Việc này tạo ra **Attention Residue (sự vương vấn chú ý)**, khiến não bộ không kịp thích ứng khi quay lại làm việc.

> **Quy tắc vàng**: Trong 5 phút nghỉ, hãy đứng dậy nhìn ra xa, hít thở sâu, uống một ngụm nước ấm. Tuyệt đối không tiếp nhận thêm thông tin từ màn hình.

---

## 3. Trải nghiệm ngay trên NDH

Bạn không cần tải thêm ứng dụng trả phí nào. Hãy truy cập mục **Công cụ học tập** của NDH và mở công cụ **Đồng hồ Pomodoro Focus** để bắt đầu phiên học tập trung ngay hôm nay!
`
  },
  {
    slug: 'tu-hoc-lap-trinh-tu-con-so-khong',
    title: 'Tự học Lập trình từ con số 0: Lộ trình thực chiến và những cạm bẫy cần tránh',
    description: 'Từ bỡ ngỡ bước chân vào thế giới dòng lệnh đến việc tự tay xây dựng những ứng dụng hoàn chỉnh: bài học xương máu cho người bắt đầu.',
    pubDate: '2026-10-20',
    tags: ['Lập trình', 'Tự học', 'Kinh nghiệm'],
    readingTimeMinutes: 6,
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    content: `
# Bắt đầu tự học: Đừng rơi vào bẫy "Tutorial Hell"

"Tutorial Hell" (Địa ngục xem hướng dẫn) là hội chứng rất phổ biến: bạn xem hết video này đến video khác, gõ theo người hướng dẫn thì chạy được, nhưng khi mở file trống ra tự làm thì đầu óc trống rỗng.

Để thực sự làm chủ một ngôn ngữ, bạn phải chuyển từ **học thụ động** sang **xây dựng chủ động (Project-based learning)**.

---

## 1. Ba trụ cột nền tảng của Web Frontend

Nếu bạn chọn con đường lập trình Web, hãy nắm thật vững bộ ba này trước khi nhảy vào các thư viện phức tạp:

1. **HTML5**: Bộ khung ngữ nghĩa (\`<header>\`, \`<main>\`, \`<nav>\`, \`<article>\`). Viết HTML đúng chuẩn ngữ nghĩa là bước đầu tiên để đạt chuẩn Accessibility và SEO.
2. **CSS3**: Layout với Flexbox & Grid, Box model, Responsive design.
3. **JavaScript (ES6+)**: Xử lý logic, DOM manipulation, mảng, object, async/await và Fetch API.

\`\`\`javascript
// Một ví dụ đơn giản về tư duy hàm thuần khiết
const calculateReadingTime = (text, wpm = 200) => {
  const words = text.trim().split(/\\s+/).length;
  return Math.ceil(words / wpm);
};
\`\`\`

---

## 2. Quy trình 4 bước khi gặp Bug

Khi code báo lỗi đỏ, đừng vội hoảng sợ. Hãy bình tĩnh thực hiện:
- **Đọc kỹ thông báo lỗi**: 90% nguyên nhân nằm ngay dòng đầu tiên của Callstack.
- **Tái tạo lỗi tối giản**: Cô lập đoạn mã gây lỗi ra một file độc lập.
- **Console.log / Debugger**: In ra giá trị của biến ở từng bước thực thi.
- **Tra cứu tài liệu chuẩn**: Đọc MDN Web Docs thay vì sao chép mù quáng.

Người đồng hành tốt nhất trong hành trình lập trình chính là **sự kiên trì** của bạn!
`
  },
  {
    slug: 'quan-ly-thoi-gian-second-brain',
    title: 'Xây dựng Bộ não thứ hai (Second Brain) bằng phương pháp PARA',
    description: 'Giải phóng tâm trí khỏi nỗi lo ghi nhớ thông tin vụn vặt và biến kho kiến thức tích lũy thành sản phẩm thực tế.',
    pubDate: '2026-10-15',
    tags: ['Năng suất', 'Second Brain', 'Ghi chú'],
    readingTimeMinutes: 4,
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    content: `
# Não bộ là nơi sản sinh ý tưởng, không phải nơi lưu trữ chúng

David Allen, tác giả cuốn sách kinh điển *Getting Things Done (GTD)*, từng nói một câu nổi tiếng:
> "Your mind is for having ideas, not holding them."

Khi bạn cố nhớ danh sách việc cần làm, mật khẩu, link tài liệu hay ý tưởng bất chợt, não bộ liên tục bị quá tải RAM tinh thần. Phương pháp **Building a Second Brain (BASB)** của Tiago Forte ra đời để giải quyết triệt để vấn đề này.

---

## 1. Hệ thống tổ chức PARA

PARA phân loại mọi tài nguyên theo **mức độ hành động (Actionability)**:

- **P - Projects (Dự án)**: Các mục tiêu ngắn hạn có thời hạn cụ thể (ví dụ: *Hoàn thành website NDH trước 30/10*).
- **A - Areas (Khu vực trách nhiệm)**: Các khía cạnh cần duy trì liên tục trong cuộc sống (ví dụ: *Sức khỏe*, *Tài chính cá nhân*, *Học tập*).
- **R - Resources (Tài nguyên)**: Chủ đề bạn quan tâm và thu thập tài liệu (ví dụ: *Lập trình Astro*, *Thiết kế Neo-Brutalism*).
- **A - Archives (Lưu trữ)**: Những dự án đã hoàn thành hoặc tạm dừng để dọn sạch không gian làm việc.

---

## 2. Chu trình CODE: Thu thập đến Sáng tạo

Để hệ thống hoạt động trơn tru:
1. **Capture (Thu thập)**: Lưu giữ những gì gây rung cảm.
2. **Organize (Tổ chức)**: Đưa vào thư mục PARA tương ứng.
3. **Distill (Chắt lọc)**: Tóm tắt ý chính bằng ngôn ngữ của riêng bạn.
4. **Express (Biểu đạt)**: Biến kiến thức thành bài viết, video hoặc sản phẩm phục vụ cộng đồng.
`
  },
  {
    slug: 'toi-uu-hieu-nang-web-lighthouse-100',
    title: 'Tối ưu hóa hiệu năng Web: Đạt điểm 100/100 Lighthouse chỉ với SSG',
    description: 'Cách tinh gọn tài nguyên, tải font tối ưu và loại bỏ hoàn toàn render-blocking resources trên môi trường tĩnh.',
    pubDate: '2026-10-10',
    tags: ['Web Dev', 'Hiệu năng', 'SEO'],
    readingTimeMinutes: 5,
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    content: `
# Điểm số Lighthouse 100 không chỉ là con số biểu diễn

Google Lighthouse đánh giá website dựa trên 4 chỉ số cốt lõi: **Performance (Hiệu năng)**, **Accessibility (Khả năng tiếp cận)**, **Best Practices (Thực hành chuẩn)** và **SEO**.

Khi bạn đạt điểm xanh tuyệt đối, người dùng trên các thiết bị cấu hình yếu hay mạng 3G/4G chập chờn vẫn có thể đọc bài viết của bạn mượt mà không bị giật lag.

---

## 1. Các thủ thuật then chốt với Static Site

### Tối ưu hóa Web Fonts
Font chữ thường là nguyên nhân hàng đầu gây ra **FOIT (Flash of Invisible Text)** hoặc giật bố cục (CLS - Cumulative Layout Shift):
- Sử dụng thuộc tính \`font-display: swap\`.
- Tải trước font quan trọng bằng \`<link rel="preload">\`.
- Chỉ tải subset ngôn ngữ cần thiết (ví dụ subset: \`vietnamese\`).

### Loại bỏ JavaScript không cần thiết
Thay vì tải cả một thư viện nặng nề chỉ để toggle Dark Mode, bạn chỉ cần một đoạn script inline 5 dòng đặt ngay trong \`<head>\`:

\`\`\`javascript
// Không tốn thêm một HTTP request nào
const isDark = localStorage.getItem('theme') === 'dark' || 
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (isDark) document.documentElement.classList.add('dark');
\`\`\`

---

## 2. Kiểm tra trước khi bàn giao

Trước khi gắn thẻ release trên Git:
- Chạy kiểm tra Contrast Ratio đạt chuẩn WCAG AA (tối thiểu 4.5:1 đối với văn bản thường).
- Đảm bảo mọi thẻ \`<img>\` đều có thuộc tính \`alt\` mô tả nội dung.
- Xác thực file \`robots.txt\` và \`sitemap.xml\` hợp lệ.
`
  }
];

export const SYSTEM_FORBIDDEN_SLUGS = [
  'tool',
  'tag',
  'gioi-thieu',
  'tim-kiem',
  'rss.xml',
  'sitemap.xml',
  'sitemap-index.xml',
  'robots.txt',
  '404',
  'api',
  'admin',
  'index',
  'assets',
  '_astro',
  '_pagefind'
];
