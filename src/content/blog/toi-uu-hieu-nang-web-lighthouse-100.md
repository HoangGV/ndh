---
title: "Tối ưu hóa hiệu năng Web: Đạt điểm 100/100 Lighthouse chỉ với SSG"
description: "Cách tinh gọn tài nguyên, tải font tối ưu và loại bỏ hoàn toàn render-blocking resources trên môi trường tĩnh."
pubDate: "2026-10-10"
tags:
  - Web Dev
  - Hiệu năng
  - SEO
readingTimeMinutes: 5
cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
---

# Điểm số Lighthouse 100 không chỉ là con số biểu diễn

Google Lighthouse đánh giá website dựa trên 4 chỉ số cốt lõi: **Performance (Hiệu năng)**, **Accessibility (Khả năng tiếp cận)**, **Best Practices (Thực hành chuẩn)** và **SEO**.

Khi bạn đạt điểm xanh tuyệt đối, người dùng trên các thiết bị cấu hình yếu hay mạng 3G/4G chập chờn vẫn có thể đọc bài viết của bạn mượt mà không bị giật lag.

---

## 1. Các thủ thuật then chốt với Static Site

### Tối ưu hóa Web Fonts
Font chữ thường là nguyên nhân hàng đầu gây ra **FOIT (Flash of Invisible Text)** hoặc giật bố cục (CLS - Cumulative Layout Shift):
- Sử dụng thuộc tính `font-display: swap`.
- Tải trước font quan trọng bằng `<link rel="preload">`.
- Chỉ tải subset ngôn ngữ cần thiết (ví dụ subset: `vietnamese`).

### Loại bỏ JavaScript không cần thiết
Thay vì tải cả một thư viện nặng nề chỉ để toggle Dark Mode, bạn chỉ cần một đoạn script inline 5 dòng đặt ngay trong `<head>`:

```javascript
// Không tốn thêm một HTTP request nào
const isDark = localStorage.getItem('theme') === 'dark' || 
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (isDark) document.documentElement.classList.add('dark');
```

---

## 2. Kiểm tra trước khi bàn giao

Trước khi gắn thẻ release trên Git:
- Chạy kiểm tra Contrast Ratio đạt chuẩn WCAG AA (tối thiểu 4.5:1 đối với văn bản thường).
- Đảm bảo mọi thẻ `<img>` đều có thuộc tính `alt` mô tả nội dung.
- Xác thực file `robots.txt` và `sitemap.xml` hợp lệ.
