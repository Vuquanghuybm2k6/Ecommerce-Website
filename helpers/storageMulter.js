const multer = require("multer"); // 1️⃣ Import thư viện multer để xử lý upload file

module.exports = () => { // 2️⃣ Export một hàm trả về cấu hình lưu trữ file (storage)
  const storage = multer.diskStorage({ // 3️⃣ Dùng diskStorage để chỉ định cách lưu file trên ổ đĩa

    destination: function (req, file, cb) { // 4️⃣ Hàm này xác định thư mục lưu file
      cb(null, "./public/uploads/"); // 5️⃣ Đường dẫn thư mục lưu file upload (tính từ gốc project)
      // 📌 cb(null, ...) nghĩa là không có lỗi, tiếp tục xử lý
    },

    filename: function (req, file, cb) { // 6️⃣ Hàm này đặt tên mới cho file sau khi upload
      const uniqueSuffix = Date.now(); // 7️⃣ Lấy thời gian hiện tại (milliseconds) để làm phần định danh
      cb(null, `${uniqueSuffix}-${file.originalname}`); 
      // 8️⃣ Tên file mới là: timestamp + dấu gạch ngang + tên gốc (VD: 1696251234567-abc.jpg)
      // 📌 cb(null, ...) là callback để tiếp tục xử lý nếu không có lỗi
    }

  });

  return storage; // 9️⃣ Trả về cấu hình storage để sử dụng trong multer
};
