# NDH | Người Đồng Hành

## 1. Hướng dẫn tạo bài đăng mới

Để tạo bài viết mới, hãy thêm một tệp Markdown (`.md`) vào thư mục `src/content/blog/`, ví dụ: `src/content/blog/phuong-phap-day-hoc-so.md`.

### Cấu trúc mẫu chuẩn

```markdown
---
title: "Phương pháp dạy học số và ứng dụng AI trong giáo dục"
description: "Khám phá các kĩ thuật tích hợp công cụ số và trí tuệ nhân tạo nhằm nâng cao trải nghiệm giảng dạy."
pubDate: "2026-11-01"
tags:
  - Sư phạm số
  - AI giáo dục
  - Đổi mới
readingTimeMinutes: 5
cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
draft: false
---

# Tiêu đề bài viết

Đoạn văn mở đầu giới thiệu nội dung chính của bài viết.

## 1. Ứng dụng công nghệ trong lớp học

Nội dung phân tích và ví dụ minh họa.

## 2. Tổng kết

Tóm tắt những điểm quan trọng cần ghi nhớ.
```

### Lưu ý khi tạo bài viết

- Tên tệp viết thường, không dấu, nối với nhau bằng dấu gạch ngang (ví dụ: `bai-viet-so-1.md`). Tên tệp chính là đường dẫn của bài viết (`/bai-viet-so-1`).
- Không đặt tên tệp trùng với các trang hệ thống: `tool.md`, `tag.md`, `gioi-thieu.md`, `tim-kiem.md`, `404.md`.
- Các thẻ khai báo trong trường `tags` sẽ tự động được tổng hợp vào trang **Tags** (`/tag`) và bộ lọc ở trang chủ, không cần tạo trước.
- Bài viết mới nhất theo ngày `pubDate` sẽ tự động hiển thị lên đầu danh sách. Đặt `draft: true` nếu muốn lưu bản nháp mà chưa xuất bản.

---

## 2. Hướng dẫn sử dụng công thức LaTeX và khung mã nguồn có nút sao chép

### Công thức toán học LaTeX (KaTeX)

Hệ thống tích hợp sẵn KaTeX để biên dịch trực tiếp công thức toán học trong bài viết Markdown:

1. **Công thức trong dòng:** đặt công thức giữa hai dấu `$`.
   - Ví dụ: `$E = mc^2$` hoặc `$\Delta = b^2 - 4ac$`.
2. **Khối công thức riêng biệt:** đặt công thức giữa hai cặp dấu `$$` để căn giữa thành một khối độc lập.

```markdown
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

### Khối mã nguồn có nút sao chép

Đặt đoạn mã giữa cặp ba dấu backtick (`` ``` ``) kèm tên ngôn ngữ (như `typescript`, `python`, `html`, `css`, `bash`). Khung mã nguồn sẽ tự động hiển thị tên ngôn ngữ và nút **Sao chép** ở góc trên bên phải.

````markdown
```python
def chao_mung(ten):
    return f"Xin chào {ten} đến với NDH!"
```
````

---

## 3. Hướng dẫn thêm và quản lí công cụ học tập

Danh sách công cụ được quản lí tập trung trong tệp `src/data/tools.ts`. Nếu thêm danh mục mới ở trường `category`, hãy bổ sung danh mục đó vào mảng `TOOL_CATEGORIES` ở cuối tệp.

Các biểu tượng (`icon`) hỗ trợ sẵn gồm: `Gamepad2`, `Timer`, `FileText`, `PenTool`, `Calculator`, `BookOpen`.

### Loại 1: Chuyển hướng sang liên kết ngoài (`external`)

Khi người dùng bấm vào thẻ công cụ, trình duyệt sẽ mở trực tiếp đường dẫn bên ngoài ở tab mới:

```typescript
{
  id: 'word-hunt',
  slug: 'word-hunt',
  name: 'Săn cụm động từ - Word Hunt',
  description: 'Trò chơi tìm 20 cụm động từ ẩn trong dải chữ uốn lượn.',
  icon: 'Gamepad2',
  category: 'Tư duy và học tập',
  type: 'external',
  url: 'https://dhhd.ndh.io.vn/word-hunt.html',
  order: 1,
  featured: true
}
```

### Loại 2: Công cụ nội sinh chạy trực tiếp (`internal`)

Phù hợp với các tiện ích viết trực tiếp bằng React như đồng hồ Pomodoro hoặc bộ đếm từ:

1. Khai báo công cụ mới trong `src/data/tools.ts` với `type: 'internal'` và `url: '/tool/<slug-cong-cu>'`.
2. Xây dựng giao diện và xử lí logic tương ứng theo `tool.slug` trong tệp `src/views/ToolDetailView.tsx`.

### Loại 3: Công cụ nhúng iframe (`embed`)

Cho phép hiển thị ứng dụng từ một trang web khác ngay bên trong giao diện NDH kèm nút phóng to toàn màn hình:

```typescript
{
  id: 'desmos-graphing',
  slug: 'desmos-graphing',
  name: 'Máy tính khoa học và đồ thị Desmos',
  description: 'Vẽ đồ thị hàm số 2D trực quan, giải phương trình và thực hiện các phép tính đại số.',
  icon: 'Calculator',
  category: 'Toán học và khoa học',
  type: 'embed',
  url: 'https://www.desmos.com/calculator?embed',
  order: 5,
  featured: false,
  embedNotice: 'Hỗ trợ tính toán và hiển thị đồ thị tương tác thời gian thực từ nền tảng Desmos.'
}
```
