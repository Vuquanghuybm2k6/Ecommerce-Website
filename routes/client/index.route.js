const productRoutes = require("./product.route") //Import route riêng của phần sản phẩm từ file product.route.js
const homeRoutes = require("./home.route") //Import route riêng của phần sản phẩm từ file home.route.js
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRoutes = require("./search.route")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const cartRoutes = require("./cart.route")
const checkoutRoutes = require("./checkout.route")
module.exports = (app) => { // Export ra một hàm nhận tham số là app (chính là biến const app = express() trong file index.js )
  app.use(categoryMiddleware.category) // cái này sử dụng để đỡ phải gọi nhiều lần cái app.use('/products', categoryMiddleware.category, productRouters);, sau này có nhiều trang sử dụng cái này thì chỉ cần gọi 1 lần như này là được
  app.use(cartMiddleware.cartId)
  // Khi người dùng truy cập vào '/' (trang chủ),
  // thì Express sẽ sử dụng các route được định nghĩa trong homeRouters
  app.use('/', homeRoutes)
  // Khi người dùng truy cập vào '/products',
  // thì Express sẽ sử dụng các route được định nghĩa trong productRouters
  // Ví dụ: /products/list hoặc /products/detail
  app.use('/products', categoryMiddleware.category, productRoutes)
  app.use('/search', searchRoutes)
  app.use('/cart', cartRoutes)
  app.use('/checkout',checkoutRoutes)
}