// từ file index.route.js tách sang thành file này(product.route.js) vì sau này có rất nhiều file route/product/.... mà ta viết hết trong file index.route.js thì nó rất phức tạp 
const express = require("express"); // Import thư viện ExpressJS vào file này để sử dụng các tính năng như routing, middleware, v.v.
const router = express.Router(); // Tạo một Router riêng biệt, dùng để định nghĩa các tuyến đường (route) cho phần sản phẩm

const controller = require("../../controllers/client/product.controller")

router.get('/', controller.index);
router.get('/:slugCategory', controller.category);
router.get('/detail/:slugProduct', controller.detail);
module.exports = router; //Export router để có thể import nó vào file khác (thường là index.route.js )
