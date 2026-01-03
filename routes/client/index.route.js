const productRouters = require("./product.route") //Import route riêng của phần sản phẩm từ file product.route.js
const homeRouters = require("./home.route") //Import route riêng của phần sản phẩm từ file home.route.js
const categoryMiddleware = require("../../middlewares/client/category.middleware")
module.exports = (app) => { // Export ra một hàm nhận tham số là app (chính là biến const app = express() trong file index.js )
   // Khi người dùng truy cập vào '/' (trang chủ),
    // thì Express sẽ sử dụng các route được định nghĩa trong homeRouters
    app.use('/', homeRouters);
    // Khi người dùng truy cập vào '/products',
    // thì Express sẽ sử dụng các route được định nghĩa trong productRouters
    // Ví dụ: /products/list hoặc /products/detail
    app.use(categoryMiddleware.category) // cái này sử dụng để đỡ phải gọi nhiều lần cái app.use('/products', categoryMiddleware.category, productRouters);, sau này có nhiều trang sử dụng cái này thì chỉ cần gọi 1 lần như này là được
    app.use('/products', categoryMiddleware.category, productRouters); 
}