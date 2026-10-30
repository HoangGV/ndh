# NDH | Người Đồng Hành — Hướng Dẫn Vận Hành & Quản Trị Website

> **Tên website:** NDH | Người Đồng Hành  
> **Slogan:** Cùng đổi mới, cùng phát triển  
> **Tác giả:** Hoàng Lam (Sư phạm Công nghệ)  
> **Tên miền:** `https://ndh.io.vn` / `https://blog.ndh.io.vn`  
> **Phong cách thiết kế:** Neo-Brutalism hiện đại, viền đen dày, bóng đổ cứng, độ tương phản cao, Dark mode chống chớp sáng.

---

## 📑 MỤC LỤC
1. [Quản trị Thẻ & Kho Thẻ (Tags)](#1-quản-trị-thẻ--kho-thẻ-tags)
2. [Hướng dẫn Tạo Bài Đăng Mới](#2-hướng-dẫn-tạo-bài-đăng-mới)
3. [Cú pháp Toán học LaTeX (KaTeX) & Khối Code có nút Copy](#3-cú-pháp-toán-học-latex-katex--khối-code-có-nút-copy)
4. [Hướng dẫn Thêm Công Cụ Học Tập Mới](#4-hướng-dẫn-thêm-công-cụ-học-tập-mới)
   - [Loại 1: Công cụ dẫn hướng tới liên kết ngoài (External)](#loại-1-công-cụ-dẫn-hướng-tới-liên-kết-ngoài-external)
   - [Loại 2: Công cụ nội sinh chạy trực tiếp (Internal)](#loại-2-công-cụ-nội-sinh-bên-trong-web-internal)
   - [Loại 3: Công cụ nhúng Iframe (Embed)](#loại-3-công-cụ-nhúng-iframe-embed)
5. [Bố cục Mục lục (Table of Contents) Thông minh](#5-bố-cục-mục-lục-table-of-contents-thông-minh)
6. [Triển khai GitHub Pages Tự Động (GitHub Actions)](#6-triển-khai-github-pages-tự-động-github-actions)

---

## 🏷️ 1. Quản trị Thẻ & Kho Thẻ (Tags)

> **Xác nhận:** **Kho thẻ (`/tag`) hoàn toàn TỰ ĐỘNG tạo 100%!**

Bạn **không cần** phải tạo thẻ thủ công hay khai báo danh sách thẻ trước. Hệ thống hoạt động theo cơ chế tự động quét:
- Bất cứ khi nào bạn thêm một thẻ mới trong bài viết (ví dụ: `tags: ["Sư phạm số", "Trí tuệ nhân tạo"]`), hệ thống sẽ:
  1. Tự động thêm thẻ đó vào thanh lọc trên trang chủ.
  2. Tự động thêm vào trang tổng hợp **Kho thẻ** (`/tag`).
  3. Tự động đếm số lượng bài viết thuộc thẻ đó.
  4. Tự động tạo trang lọc theo thẻ: `/tag/ten-the`.

---

## ✍️ 2. Hướng dẫn Tạo Bài Đăng Mới

### Vị trí file bài viết:
Trong mã nguồn hiện tại, bài viết được quản lý tại: `src/data/posts.ts`.

### Cách thêm một bài viết mới:
Mở file `src/data/posts.ts`, thêm một đối tượng bài viết vào mảng `POSTS`:

```typescript
{
  slug: 'ten-bai-viet-viet-lien-khong-dau', // Đây chính là URL: https://ndh.io.vn/ten-bai-viet-viet-lien-khong-dau
  title: 'Tiêu đề bài viết của bạn',
  description: 'Tóm tắt ngắn gọn 1-2 câu để hiển thị trên thẻ bài viết và tối ưu SEO.',
  pubDate: '2026-10-30', // Định dạng YYYY-MM-DD
  tags: ['Sư phạm số', 'Công nghệ', 'Kỹ năng'], // Thẻ này sẽ tự động xuất hiện ở Kho Thẻ!
  readingTimeMinutes: 5, // Thời gian đọc ước tính
  cover: 'https://link-anh-bia.jpg', // Tùy chọn (có thể để link ảnh Unsplash/Imgur hoặc để trống)
  content: `
# Tiêu đề lớn của bài viết

Nội dung mở đầu giới thiệu...

## 1. Mục lớn thứ nhất
Mục lục bài viết sẽ **tự động sinh ra** từ các thẻ heading ## và ### này.

- Gạch đầu dòng thứ nhất
- Gạch đầu dòng thứ hai

> Đây là trích dẫn quan trọng cần lưu ý!

### 1.1 Mục nhỏ chi tiết
Nội dung phân tích chi tiết...
`
}
```

### ⚠️ Lưu ý về Slug bài viết:
Vì bài viết hiển thị trực tiếp ngay gốc tên miền (ví dụ: `https://ndh.io.vn/bai-viet-moi`), bạn **KHÔNG ĐƯỢC** đặt slug trùng với các trang hệ thống:
- `tool` (trang công cụ)
- `tag` (trang kho thẻ)
- `gioi-thieu` (trang giới thiệu)
- `tim-kiem` (trang tìm kiếm)
- `404`, `api`, `admin`, `index`, `assets`

---

## 🧮 3. Cú pháp Toán học LaTeX (KaTeX) & Khối Code có nút Copy

Hệ thống đã tích hợp thư viện **KaTeX** chuẩn toán học và trình biên dịch mã nguồn tương tác:

### 3.1. Viết công thức Toán học LaTeX

1. **Công thức nội dòng (Inline Math):**
   Kẹp biểu thức toán học giữa 2 dấu `$`:
   ```markdown
   Phương trình năng lượng của Einstein là $E = mc^2$.
   Biệt thức bậc hai là $\Delta = b^2 - 4ac$.
   ```

2. **Khối công thức nổi bật (Block Math):**
   Kẹp biểu thức toán học giữa 2 cặp dấu `$$`:
   ```markdown
   Công thức nghiệm phương trình bậc hai:

   $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

   Tích phân Gauss:

   $$\int_{-\infty}^{+\infty} e^{-x^2} \, dx = \sqrt{\pi}$$

   Tổng chuỗi:

   $$\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$
   ```

### 3.2. Khối mã nguồn có nút Sao chép (Copy Code)

Mọi khối mã đặt trong 3 dấu backticks (kèm tên ngôn ngữ) sẽ tự động sinh:
- Khung giao diện Neo-Brutalism với 3 nút màu cổ điển.
- Huy hiệu tên ngôn ngữ in hoa (`TYPESCRIPT`, `PYTHON`, `BASH`, `HTML`, `CSS`...).
- Nút **Sao chép** (Copy) có hiệu ứng phản hồi `✓ Đã chép!` và tự đổi màu xanh mint sang trọng.

```markdown
\`\`\`typescript
const greeting = "Xin chào Người Đồng Hành!";
console.log(greeting);
\`\`\`
```

---

## 🛠️ 4. Hướng dẫn Thêm Công Cụ Học Tập Mới

Tất cả công cụ được quản lý tập trung tại file: `src/data/tools.ts`. Có 3 loại công cụ:

### Loại 1: Công cụ dẫn hướng tới liên kết ngoài (External)
Dùng khi bạn có một trang web công cụ nằm ở subdomain khác hoặc một dịch vụ bên ngoài (ví dụ: công cụ Word Hunt tại `https://dhhd.ndh.io.vn/word-hunt.html`). Khi bấm vào, nút sẽ hiển thị nhãn **Truy cập công cụ** và mở liên kết ngoài trên tab mới.

```typescript
{
  id: 'word-hunt',
  slug: 'word-hunt',
  name: 'Săn Cụm Động Từ - Word Hunt',
  description: 'Trò chơi tìm 20 cụm động từ (Phrasal Verbs) theo giáo án của Ms Alice.',
  icon: 'Gamepad2', // Các icon có sẵn: Gamepad2, Timer, FileText, PenTool, Calculator, BookOpen, Sparkles
  category: 'Tư duy & Học tập',
  type: 'external', // BẮT BUỘC là 'external'
  url: 'https://dhhd.ndh.io.vn/word-hunt.html', // Đường dẫn ngoài
  order: 1,
  featured: true
}
```

---

### Loại 2: Công cụ nội sinh bên trong web (Internal)
Dùng khi công cụ được lập trình trực tiếp bằng React/JS chạy ngay trên trang NDH (ví dụ như Đồng hồ Pomodoro hoặc Bộ đếm từ):

**Bước 1:** Khai báo thông tin trong `src/data/tools.ts`:
```typescript
{
  id: 'pomodoro-focus',
  slug: 'pomodoro-focus',
  name: 'Đồng hồ Pomodoro Focus',
  description: 'Bộ đếm thời gian tập trung 25/5 phút chuẩn Pomodoro.',
  icon: 'Timer',
  category: 'Năng suất',
  type: 'internal', // BẮT BUỘC là 'internal'
  url: '/tool/pomodoro-focus', // Đường dẫn nội bộ
  order: 2,
  featured: true
}
```

**Bước 2:** Viết giao diện logic cho công cụ trong file `src/views/ToolDetailView.tsx`:
```tsx
{tool.slug === 'pomodoro-focus' && (
  <div className="p-6 bg-white dark:bg-[#181B22] brutal-card">
    {/* Giao diện tương tác và các nút bấm của công cụ ở đây */}
  </div>
)}
```

---

### Loại 3: Công cụ nhúng Iframe (Embed)
Dùng khi bạn muốn nhúng một trang web khác hiển thị trực tiếp trong một khung viền đẹp ngay tại website NDH (ví dụ như Desmos hoặc Excalidraw):

```typescript
{
  id: 'desmos-graphing',
  slug: 'desmos-graphing',
  name: 'Máy tính Khoa học & Đồ thị Desmos',
  description: 'Vẽ đồ thị hàm số 2D trực quan và thực hiện các phép tính đại số.',
  icon: 'Calculator',
  category: 'Toán học & Khoa học',
  type: 'embed', // BẮT BUỘC là 'embed'
  url: 'https://www.desmos.com/calculator?embed',
  order: 5,
  featured: false,
  embedNotice: 'Hỗ trợ tính toán và hiển thị đồ thị tương tác từ nền tảng Desmos.'
}
```

---

## 📌 5. Bố cục Mục lục (Table of Contents) Thông minh

Để bài viết có chiều rộng hiển thị tối đa (`max-w-4xl`), thoáng mắt và dễ đọc cả trên mobile lẫn desktop, mục lục đã được tinh chỉnh thông minh:
1. **Khối Mục lục Accordion ở đầu bài:** Nằm ngay dưới tiêu đề bài viết, hiển thị số mục và cho phép gập/mở bằng một cú chạm. Danh sách các mục được chia 2 cột đều đặn.
2. **Nút Mục lục Nổi (Floating Quick TOC):** Khi cuộn trang xuống quá 400px, một nút nổi màu xanh Royal Blue sẽ xuất hiện ở góc dưới bên phải. Bạn có thể nhấn vào để mở nhanh ngăn kéo mục lục và nhảy tới phần cần đọc mà không phải cuộn ngược lên đầu trang.

---

## 🚀 6. Triển khai GitHub Pages Tự Động (GitHub Actions)

Quy trình deploy đã được tự động hóa hoàn toàn với file `.github/workflows/deploy.yml`.

### Cơ chế chống lỗi 404 khi tải lại trang (SPA on GitHub Pages):
Lệnh build trong `package.json` đã được cấu hình:
```json
"build": "vite build && cp dist/index.html dist/404.html"
```
Khi người dùng truy cập trực tiếp hoặc bấm F5 ở bất kỳ đường dẫn nào (ví dụ: `ndh.io.vn/ung-dung-latex-va-khoi-ma-nguon-tuong-tac`), GitHub Pages sẽ phục vụ file `404.html` (chính là bản sao của `index.html`), trình duyệt sẽ nhận và render đúng bài viết mà không gặp màn hình lỗi 404 mặc định của GitHub!

### Các bước đẩy code lên GitHub:
1. **Kiểm tra cú pháp cục bộ:**
   ```bash
   npm run lint
   ```
2. **Commit và đẩy lên GitHub:**
   ```bash
   git add .
   git commit -m "Cập nhật bài viết và tính năng mới"
   git push origin main
   ```
3. **Theo dõi tiến trình:**
   Vào tab **Actions** trên repository GitHub của bạn. GitHub Actions sẽ tự động cài đặt, build tĩnh và deploy lên GitHub Pages và tên miền `ndh.io.vn` trong vòng 1-2 phút.
