// từ file index.route.js tách sang thành file này(product.route.js) vì sau này có rất nhiều file route/product/.... mà ta viết hết trong file index.route.js thì nó rất phức tạp 
const express = require("express"); // Import thư viện ExpressJS vào file này để sử dụng các tính năng như routing, middleware, v.v.
const router = express.Router(); // Tạo một Router riêng biệt, dùng để định nghĩa các tuyến đường (route) cho phần sản phẩm

const controller = require("../../controllers/client/product.controller")

router.get('/', (req,res)=>{ //Đây là route xử lý khi có HTTP GET đến đường dẫn /. 
//Tại sao chỉ là get('/) thì bởi vì trong file index.route.js ta có file trang chủ là /product nên ở đây ta chỉ cần ghi get('/') thì có thể dẫn đến trang chủ luôn rồi 
//Nghĩa là: Khi người dùng vào đường link như http://localhost:3000/products thì nó sẽ chạy hàm này.
  res.render('client/pages/products/index.pug') // Dùng để render file Pug thành HTML và trả về cho người dùng.
})
module.exports = router; //Export router để có thể import nó vào file khác (thường là index.route.js )
