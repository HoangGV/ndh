---
title: "test bài viết"
description: "mô tả ngắn"
pubDate: "2026-11-25"
tags:
  - "sư phạm"
readingTimeMinutes: 3
cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80"
---

## 1. Chu trình Pomodoro 25/5 cơ bản

Pomodoro (trong tiếng Ý nghĩa là quả cà chua) do Francesco Cirillo phát minh vào cuối những năm 1980. Quy tắc cốt lõi vô cùng giản dị:

| Bước | Hành động | Thời lượng | Ghi chú |
| :--- | :--- | :--- | :--- |
| **01** | Chọn 1 nhiệm vụ duy nhất | - | Không làm đa nhiệm |
| **02** | Cài đặt bộ đếm | 25 phút | Tắt mọi thông báo |
| **03** | Làm việc liên tục | 25 phút | Cho đến khi chuông reo |
| **04** | Nghỉ ngắn | 5 phút | Uống nước, vận động nhẹ |
| **05** | Sau 4 chu kỳ | 15 - 30 phút | Nghỉ dài phục hồi não bộ |

---
## 2. Loại bỏ JavaScript không cần thiết
Thay vì tải cả một thư viện nặng nề chỉ để toggle Dark Mode, bạn chỉ cần một đoạn script inline 5 dòng đặt ngay trong `<head>`:

```javascript
// Không tốn thêm một HTTP request nào
const isDark = localStorage.getItem('theme') === 'dark' || 
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (isDark) document.documentElement.classList.add('dark');
```

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
