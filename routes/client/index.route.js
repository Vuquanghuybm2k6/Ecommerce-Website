const productRouters = require("./product.route") //Import route riêng của phần sản phẩm từ file product.route.js
const homeRouters = require("./home.route") //Import route riêng của phần sản phẩm từ file home.route.js
module.exports = (app) => { // Export ra một hàm nhận tham số là app (chính là biến const app = express() trong file index.js )
   // Khi người dùng truy cập vào '/' (trang chủ),
    // thì Express sẽ sử dụng các route được định nghĩa trong homeRouters
    app.use('/', homeRouters);
    // Khi người dùng truy cập vào '/products',
    // thì Express sẽ sử dụng các route được định nghĩa trong productRouters
    // Ví dụ: /products/list hoặc /products/detail
    app.use('/products', productRouters); // bản chất khi ta /product thì nó sẽ chạy vào productRouters này
}