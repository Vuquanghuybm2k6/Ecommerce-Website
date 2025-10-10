const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate")
// Import thư viện multer để xử lý upload file trong Express
const multer = require('multer')

// Khởi tạo middleware upload với cấu hình lưu trữ được định nghĩa trong storageMulter
// storageMulter() trả về một cấu hình storage (diskStorage) để multer biết cách và nơi lưu file
const upload = multer() // ta xóa cái { storage: storageMulter() } 

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
// => Middleware `upload` này sẽ được dùng trong route:
// router.post("/create", upload.single('thumbnail'), controller.createPost)
// để xử lý upload 1 file từ field có name là "thumbnail"

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus); // dấu ":" là cú pháp để truyền data động vào 
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create)
router.post(
  "/create",
  upload.single('thumbnail'),
  // Đây là middleware xử lý upload file, sử dụng thư viện như multer. Cụ thể:
  // - upload là một instance của multer cấu hình sẵn.
  // - .single('thumbnail') nghĩa là: middleware này chỉ xử lý một file duy nhất, đến từ field (trường) có tên là 'thumbnail' trong form-data của request.
  // - Sau khi xử lý, file này sẽ được lưu trên server (hoặc trong bộ nhớ tùy config), và thông tin file được gắn vào req.file.
 uploadCloud.upload,
  validate.createPost,
  controller.createPost
)
router.get("/edit/:id", controller.edit)

router.patch(
  "/edit/:id",
  upload.single('thumbnail'),
  validate.createPost,
  controller.editPatch
)

router.get("/detail/:id", controller.detail)

module.exports = router;