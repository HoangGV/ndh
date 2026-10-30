---
title: "Hành trình xây dựng Static Site chuẩn Neo-Brutalism với Astro và GitHub Pages"
description: "Chi tiết cách thiết kế và triển khai một trang blog tĩnh siêu tốc độ, miễn phí trọn đời bằng Astro, Tailwind CSS và GitHub Actions."
pubDate: "2026-10-28"
tags:
  - Astro
  - Web Dev
  - Neo-Brutalism
  - GitHub Pages
readingTimeMinutes: 5
cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
---

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
2. **Đổ bóng cứng (Hard Shadow)**: Không có hiệu ứng blur, ví dụ `box-shadow: 4px 4px 0 #111111`.
3. **Màu sắc tương phản cao**: Nền sáng kết hợp các gam màu rực rỡ như Royal Blue (#4169E1), Vàng chuối (#FFD93D), Hồng kẹo (#FF6B9D).
4. **Cảm giác vật lý (Tactile feel)**: Khi di chuột hoặc nhấn nút, các thẻ "nhấc lên" hoặc "ấn lún xuống" tạo cảm xúc chân thực như bấm phím máy cơ.

---

## 2. Cấu trúc Content Collections trong Astro

Astro cung cấp tính năng **Content Collections** giúp quản lý bài viết Markdown/MDX trong thư mục `src/content/blog/` với khả năng xác thực dữ liệu nghiêm ngặt qua Zod schema:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    readingTimeMinutes: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Nhờ đó, nếu bạn lỡ quên điền thẻ tags hoặc sai định dạng ngày tháng, quá trình build sẽ báo lỗi ngay lập tức, ngăn ngừa lỗi hiển thị trên trang production.

---

## 3. Triển khai tự động bằng GitHub Actions

Chỉ cần một file workflow `.github/workflows/deploy.yml` duy nhất, mỗi lần bạn push bài viết mới dạng `.md` trong `src/content/blog/` lên nhánh `main`, GitHub sẽ tự động:
1. Checkout mã nguồn
2. Cài đặt Node.js và dependencies (`npm install --legacy-peer-deps`)
3. Chạy lệnh build tĩnh
4. Đẩy thư mục `dist/` lên GitHub Pages

> **Lời khuyên**: File CNAME được lưu trong thư mục `public/CNAME` để trỏ trực tiếp tên miền cá nhân như `blog.ndh.io.vn`!

Chúc bạn có những trải nghiệm tuyệt vời cùng **NDH | Người Đồng Hành**!
