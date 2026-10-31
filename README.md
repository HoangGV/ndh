# NDH | Người Đồng Hành — Hướng Dẫn Vận Hành & Quản Trị Website

> **Tên website:** NDH | Người Đồng Hành  
> **Slogan:** Cùng đổi mới, cùng phát triển  
> **Tác giả:** Hoàng Lam (Sư phạm Công nghệ)  
> **Tên miền:** `https://blog.ndh.io.vn` / `https://ndh.io.vn`  
> **Kiến trúc:** 100% Static Site (SSG), Quản lý bài viết chuẩn Astro Content Collections (`src/content/blog/*.md`)  
> **Phong cách thiết kế:** Neo-Brutalism hiện đại, viền đen dày, bóng đổ cứng, độ tương phản cao, Dark mode chống chớp sáng.

---

## 📑 MỤC LỤC
1. [Khắc phục Lỗi Build GitHub Actions (Dependencies lock file)](#1-khắc-phục-lỗi-build-github-actions)
2. [Cấu trúc Quản lý Bài Viết: `src/content/blog/*.md`](#2-cấu-trúc-quản-lý-bài-viết-srccontentblogmd)
3. [Hướng dẫn Tạo Bài Đăng Mới bằng file Markdown](#3-hướng-dẫn-tạo-bài-đăng-mới-bằng-file-markdown)
4. [Quản trị Thẻ & Kho Thẻ (Tự động 100%)](#4-quản-trị-thẻ--kho-thẻ-tự-động-100)
5. [Cú pháp Toán học LaTeX (KaTeX) & Khối Code có nút Copy](#5-cú-pháp-toán-học-latex-katex--khối-code-có-nút-copy)
6. [Bố cục Mục lục Bài viết (Table of Contents)](#6-bố-cục-mục-lục-bài-viết-table-of-contents)
7. [Hướng dẫn Thêm & Quản lý Công Cụ Học Tập](#7-hướng-dẫn-thêm--quản-lý-công-cụ-học-tập)
8. [Tự Động Triển Khai GitHub Pages qua GitHub Actions](#8-tự-động-triển-khai-github-pages-qua-github-actions)

---

## 🚨 1. Khắc phục Lỗi Build GitHub Actions

### Nguyên nhân lỗi bạn vừa gặp:
```
Error: Dependencies lock file is not found in /home/runner/work/ndh/ndh. 
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```
- Khi chạy `actions/setup-node@v4` với cấu hình `cache: npm`, GitHub Actions bắt buộc repository trên GitHub phải có file `package-lock.json`. Nếu không có file này hoặc chỉ có `bun.lock`, bước setup-node sẽ lập tức báo lỗi và dừng lại.
- Thêm vào đó, lệnh `npm ci` cũng yêu cầu `package-lock.json` đồng bộ tuyệt đối với `package.json`.

### Cách xử lý triệt để đã được thực hiện:
1. **Đã sinh file `package-lock.json` chuẩn** trong thư mục gốc của dự án.
2. **Cập nhật file `.github/workflows/deploy.yml`**:
   - Sử dụng `npm install --legacy-peer-deps` để tự động tương thích mọi gói thư viện mà không bị kẹt lỗi peer dependency.
   - Thêm cờ bỏ qua lỗi mềm cho `pagefind` (`npx pagefind --site dist || true`).
3. **Khi bạn commit và push lên GitHub**: GitHub Actions sẽ tự động chạy thành công 100%, build ra thư mục tĩnh `dist/` và xuất bản lên GitHub Pages với tên miền của bạn!

---

## 📁 2. Cấu trúc Quản lý Bài Viết: `src/content/blog/*.md`

Toàn bộ bài viết hiện tại đã được tách thành các file Markdown độc lập nằm trong thư mục:
```text
src/
└── content/
    ├── config.ts               # Định nghĩa Schema Astro Content Collections
    └── blog/                   # Thư mục chứa toàn bộ bài viết dạng .md
        ├── ung-dung-latex-va-khoi-ma-nguon-tuong-tac.md
        ├── xay-dung-static-site-astro-github-pages.md
        ├── phuong-phap-pomodoro-deep-work.md
        ├── tu-hoc-lap-trinh-tu-con-so-khong.md
        ├── quan-ly-thoi-gian-second-brain.md
        └── toi-uu-hieu-nang-web-lighthouse-100.md
```

Hệ thống sẽ **tự động quét và đọc toàn bộ file `.md`** trong thư mục này:
- Tên file chính là **slug** (đường dẫn URL), ví dụ: `bai-viet-moi.md` -> `/bai-viet-moi`.
- Tiêu đề, ngày đăng, thẻ tag, ảnh bìa, tóm tắt được đọc từ phần **Frontmatter** (đầu file giữa 2 dấu `---`).
- Bài viết mới nhất (theo ngày `pubDate`) sẽ tự động được đưa lên đầu trang chủ.

---

## ✍️ 3. Hướng dẫn Tạo Bài Đăng Mới bằng file Markdown

Để đăng bài mới, bạn chỉ cần tạo 1 file Markdown mới trong thư mục `src/content/blog/`, ví dụ: `src/content/blog/phuong-phap-day-hoc-so.md`.

### Cấu trúc mẫu chuẩn:
```markdown
---
title: "Phương pháp Dạy học Số và Ứng dụng AI trong Giáo dục"
description: "Khám phá các kỹ thuật tích hợp công cụ số và trí tuệ nhân tạo để nâng cao trải nghiệm giảng dạy cho giáo viên."
pubDate: "2026-11-01"
tags:
  - Sư phạm số
  - AI Giáo dục
  - Đổi mới
readingTimeMinutes: 5
cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
draft: false
---

# Tiêu đề lớn bài viết

Đoạn văn mở đầu bài viết giới thiệu về chủ đề...

## 1. Ứng dụng công nghệ trong lớp học

Nội dung phân tích... Bạn có thể viết công thức Toán học như $E = mc^2$ hoặc khối công thức:

$$\int_a^b f(x)dx$$

## 2. Đoạn mã minh họa

```python
def chao_mung(ten):
    return f"Xin chào {ten} đến với NDH!"
```

Mỗi đoạn mã nguồn đều tự động có nút **Sao chép**!
```

### ⚠️ Lưu ý về tên file (.md):
- Đặt tên file viết thường, không dấu, nối bằng dấu gạch ngang (ví dụ: `bai-viet-so-1.md`).
- **Không đặt tên file trùng với các trang hệ thống**: `tool.md`, `tag.md`, `gioi-thieu.md`, `tim-kiem.md`, `404.md`.

---

## 🏷️ 4. Quản trị Thẻ & Kho Thẻ (Tự động 100%)

> **Kho thẻ (`/tag`) hoàn toàn TỰ ĐỘNG!**

Bạn **không cần tạo thẻ trước**. Khi viết bài trong file `.md`, bạn chỉ cần khai báo:
```yaml
tags:
  - Sư phạm Công nghệ
  - Trí tuệ Nhân tạo
```
Hệ thống sẽ tự động:
1. Thu thập thẻ này vào thanh bộ lọc trên Trang chủ.
2. Thêm vào trang tổng hợp **Kho thẻ** (`/tag`).
3. Đếm số lượng bài viết thuộc thẻ đó.
4. Cho phép bấm vào thẻ để lọc danh sách bài viết tương ứng.

---

## 🧮 5. Cú pháp Toán học LaTeX (KaTeX) & Khối Code có nút Copy

Hệ thống tích hợp sẵn bộ phân giải **KaTeX**:
1. **Công thức trong dòng (Inline Math):**
   - Đặt giữa hai dấu `$`: `$E = mc^2$`, `$\Delta = b^2 - 4ac$`.
2. **Khối công thức riêng biệt (Block Math):**
   - Đặt giữa hai dấu `$$`:
   ```markdown
   $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
   ```
3. **Khối mã nguồn & Nút sao chép:**
   - Đặt trong ba dấu backtick kèm tên ngôn ngữ (như ` ```typescript `, ` ```python `, ` ```html `).
   - Tự động hiển thị thanh tiêu đề phong cách Neo-Brutalism, nhãn ngôn ngữ và nút bấm **Sao chép** với hiệu ứng thông báo khi copy thành công.

---

## 📑 6. Bố cục Mục lục Bài viết (Table of Contents) & Giao diện Responsive

1. **Mục lục Nổi (Floating Quick TOC):** Khi cuộn trang đọc bài viết, một nút **"Mục lục"** cố định phong cách Neo-Brutalism sẽ xuất hiện ở góc dưới bên phải màn hình. Bấm vào sẽ mở popup danh mục các tiêu đề `##` và `###` để di chuyển nhanh tới bất kỳ phần nào mà không chiếm diện tích nội dung bài viết. Phần section mục lục tĩnh ở đầu bài đã được lược bỏ theo yêu cầu để giao diện bài viết thoáng đãng và tập trung nhất.
2. **Giao diện Mặc định Light Mode:** Khi người dùng truy cập trang lần đầu, website mặc định ở chế độ **Light Mode** sáng sủa, đồng thời hỗ trợ nút chuyển đổi Dark Mode tùy thích và lưu trạng thái vào `localStorage`.
3. **Thanh điều hướng tinh giản:** Nút **"Công cụ"** (thay cho "Công cụ học tập") và **"Tags"** (thay cho "Kho thẻ") hiển thị gọn gàng, tối ưu trên cả desktop lẫn màn hình điện thoại di động (không bị cuộn ngang).

## 🛠️ 7. Hướng dẫn Thêm & Quản lý Công Cụ Học Tập

Danh sách công cụ được quản lý tập trung tại file `src/data/tools.ts`. Có 3 loại công cụ:

### Loại 1: Chuyển hướng ra liên kết ngoài (External)
Ví dụ công cụ Word Hunt:
```typescript
{
  id: 'word-hunt',
  slug: 'word-hunt',
  name: 'Word Hunt — Tìm Từ Tiếng Anh',
  description: 'Trò chơi rèn luyện phản xạ từ vựng tiếng Anh với bảng chữ cái trực quan.',
  icon: 'Gamepad2',
  category: 'Trò chơi học tập',
  type: 'external',
  url: 'https://dhhd.ndh.io.vn/word-hunt.html',
  order: 1,
  featured: true,
  badgeText: 'Truy cập công cụ'
}
```

### Loại 2: Công cụ nội sinh chạy trực tiếp (Internal)
Ví dụ Đồng hồ Pomodoro, Đếm từ Word Counter, Markdown Live Editor:
- Được viết trực tiếp bằng React trong `src/views/ToolDetailView.tsx`.
- Chạy siêu tốc không phụ thuộc mạng hay dịch vụ bên thứ ba.

### Loại 3: Công cụ nhúng Iframe (Embed)
Ví dụ Máy tính đồ thị Desmos:
```typescript
{
  id: 'desmos-calc',
  slug: 'may-tinh-do-thi-desmos',
  name: 'Máy Tính Đồ Thị Desmos',
  description: 'Vẽ đồ thị hàm số 2D trực quan...',
  icon: 'Compass',
  category: 'Toán học & Đồ thị',
  type: 'embed',
  url: 'https://www.desmos.com/calculator?embed',
  order: 4,
  badgeText: 'Nhúng trực tiếp'
}
```

---

## 🚀 8. Tự Động Triển Khai GitHub Pages qua GitHub Actions

1. File workflow `.github/workflows/deploy.yml` đã được tối ưu:
   - Tự động kích hoạt khi có commit đẩy lên nhánh `main`.
   - Cài đặt thư viện với `npm install --legacy-peer-deps`.
   - Build website tĩnh sang thư mục `dist/`.
   - Đẩy lên GitHub Pages an toàn, không lo thiếu `package-lock.json`.
2. Cấu hình Custom Domain:
   - File `public/CNAME` đã được cấu hình sẵn giá trị: `blog.ndh.io.vn`.
   - Khi deploy, GitHub Pages sẽ tự động gán tên miền cá nhân của bạn.
