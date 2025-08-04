# Todo Manager - Ứng dụng quản lý thời gian

Một ứng dụng web quản lý thời gian hiện đại và đẹp mắt, được xây dựng bằng HTML, CSS và JavaScript thuần.

## 🌟 Tính năng

### ✨ Tính năng chính
- **Thêm công việc mới**: Nhập và thêm công việc cần làm
- **Đánh dấu hoàn thành**: Click vào checkbox để đánh dấu công việc đã hoàn thành
- **Chỉnh sửa công việc**: Sửa đổi nội dung công việc thông qua modal
- **Xóa công việc**: Xóa từng công việc riêng lẻ
- **Lọc công việc**: Lọc theo trạng thái (Tất cả, Đang làm, Hoàn thành)

### 📊 Thống kê
- Hiển thị số lượng tổng cộng
- Số công việc đã hoàn thành
- Số công việc đang làm

### 🧹 Quản lý hàng loạt
- Xóa tất cả công việc đã hoàn thành
- Xóa tất cả công việc

### 💾 Lưu trữ
- Tự động lưu vào localStorage
- Dữ liệu được giữ lại khi refresh trang

### 🎨 Giao diện
- Thiết kế hiện đại với gradient và animation
- Responsive design cho mobile và desktop
- Dark mode friendly
- Smooth animations và transitions

## 🚀 Cách sử dụng

### Cài đặt
1. Tải xuống tất cả file vào một thư mục
2. Mở file `index.html` trong trình duyệt web

### Sử dụng cơ bản
1. **Thêm công việc**: Nhập nội dung vào ô input và nhấn Enter hoặc click nút "+"
2. **Hoàn thành công việc**: Click vào checkbox bên trái công việc
3. **Chỉnh sửa**: Click nút edit (biểu tượng bút chì)
4. **Xóa**: Click nút delete (biểu tượng thùng rác)

### Lọc và quản lý
- Sử dụng các nút lọc để xem công việc theo trạng thái
- Sử dụng nút "Xóa hoàn thành" để xóa tất cả công việc đã hoàn thành
- Sử dụng nút "Xóa tất cả" để xóa toàn bộ danh sách

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: 
  - Flexbox và Grid
  - CSS Variables
  - Animations và Transitions
  - Responsive Design
- **JavaScript ES6+**:
  - Classes
  - Local Storage API
  - Event Handling
  - DOM Manipulation

## 📱 Responsive Design

Ứng dụng được tối ưu cho:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Tính năng nâng cao

### Keyboard Shortcuts
- `Escape`: Đóng modal chỉnh sửa

### Notifications
- Thông báo thành công khi thêm/sửa/xóa
- Thông báo cảnh báo khi không có dữ liệu để xóa

### UX Features
- Auto-focus vào input khi thêm công việc
- Auto-select text khi chỉnh sửa
- Smooth animations cho tất cả interactions
- Empty state messages

## 📁 Cấu trúc file

```
todo-manager/
├── index.html          # File HTML chính
├── styles.css          # File CSS styles
├── script.js           # File JavaScript logic
└── README.md           # Hướng dẫn sử dụng
```

## 🔧 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa CSS variables trong file `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
}
```

### Thêm tính năng mới
Có thể mở rộng bằng cách:
- Thêm deadline cho công việc
- Thêm categories/tags
- Thêm priority levels
- Export/Import data
- Dark mode toggle

## 🤝 Đóng góp

Nếu bạn muốn đóng góp vào dự án:
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.

## 🙏 Cảm ơn

Cảm ơn bạn đã sử dụng Todo Manager! Hy vọng ứng dụng này giúp bạn quản lý thời gian hiệu quả hơn.

---

**Lưu ý**: Đây là ứng dụng client-side, dữ liệu được lưu trong localStorage của trình duyệt. Để backup dữ liệu, bạn có thể export localStorage data hoặc sử dụng tính năng backup của trình duyệt. 