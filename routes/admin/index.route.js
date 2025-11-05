const systemConfig = require("../../config/system")
const dashboardRoutes = require("./dashboard.route") 
const productRoutes = require("./product.route")
const productCategoryRoutes = require("./product-category.route")
module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin; // khai báo tách riêng ra như này để nếu mà người dùng muốn đổi tên thì chỉ cần đổi ở dòng này
    app.use( PATH_ADMIN + "/products-category", productCategoryRoutes); 
    app.use( PATH_ADMIN + "/dashboard", dashboardRoutes); // đi vào /admin/dashboard rồi chạy vào hàm dashboardRouters
    app.use(PATH_ADMIN + "/products", productRoutes)
}