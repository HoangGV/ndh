---
title: "Hỗ trợ công thức Toán học LaTeX và Khối mã nguồn tương tác"
description: "Trình soạn thảo bài viết NDH hiện đã tích hợp hoàn hảo công cụ biên dịch KaTeX hiển thị công thức toán học sắc nét cùng nút sao chép code một chạm."
pubDate: "2026-10-30"
tags:
  - LaTeX
  - Toán học
  - Lập trình
  - Khoa học
readingTimeMinutes: 4
cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"
---

# Biên dịch Toán học LaTeX & Khối Mã Nguồn

Website **NDH | Người Đồng Hành** hỗ trợ công nghệ biên dịch tĩnh cao cấp giúp hiển thị đầy đủ các công thức Toán học, Vật lý, Tin học bằng cú pháp **LaTeX (KaTeX)** mượt mà, cùng khối mã nguồn có gắn thẻ ngôn ngữ và nút **Sao chép** tiện lợi.

---

## 1. Công thức Toán học LaTeX trong bài viết

Bạn có thể viết công thức Toán học ngay trong bài viết bằng cách kẹp giữa dấu `$` (cho công thức trong dòng - inline) hoặc `$$` (cho khối công thức hiển thị riêng biệt - block math).

### Công thức nội dòng (Inline Math)
Ví dụ hệ thức năng lượng nổi tiếng của Albert Einstein: $E = mc^2$, biệt thức phương trình bậc hai $\Delta = b^2 - 4ac$, hay độ phức tạp thuật toán QuickSort trong trường hợp trung bình là $O(n \log n)$.

### Khối công thức nổi bật (Block Math)
Nghiệm tổng quát của phương trình bậc hai $ax^2 + bx + c = 0$:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Tích phân Gauss kinh điển trong xác suất thống kê:

$$\int_{-\infty}^{+\infty} e^{-x^2} \, dx = \sqrt{\pi}$$

Đẳng thức Euler kết nối 5 hằng số cơ bản của toán học ($e, i, \pi, 1, 0$):

$$e^{i\pi} + 1 = 0$$

Công thức tính tổng bình phương của $n$ số nguyên dương đầu tiên:

$$\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$

---

## 2. Khối mã nguồn và Nút Sao chép (Copy Code)

Mỗi đoạn mã nguồn đều được đặt trong giao diện phong cách Neo-Brutalism với chấm màu phong cách cổ điển, nhãn ngôn ngữ in hoa và nút **Sao chép** nhanh chóng:

```typescript
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
```

Hoặc mã lệnh Python khoa học dữ liệu:

```python
import numpy as np

# Tạo ma trận ngẫu nhiên và tính định thức
matrix = np.array([[3, 1], [4, 2]])
det = np.linalg.det(matrix)
print(f"Định thức của ma trận: {det:.2f}")
```

---

## 3. Mục lục bài viết thông minh

Mục lục (Table of Contents) được bố trí gọn gàng thành khối **Mục lục nội dung** ngay đầu bài với nút gập/mở, đồng thời có nút **Mục lục** nổi ở góc dưới màn hình giúp bạn có thể nhảy nhanh đến bất kỳ tiêu đề nào khi đang đọc mà không làm co hẹp khung bài đọc.
