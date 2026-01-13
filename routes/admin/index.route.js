const systemConfig = require("../../config/system")
const dashboardRoutes = require("./dashboard.route") 
const productRoutes = require("./product.route")
const productCategoryRoutes = require("./product-category.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")
const authRoutes = require("./auth.route")
const authMiddleware = require("../../middlewares/admin/auth.middlewares")
const myAccountRoutes = require("./my-account.route")
const settingRoutes = require("./setting.route")
module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin; // khai báo tách riêng ra như này để nếu mà người dùng muốn đổi tên thì chỉ cần đổi ở dòng này
    app.use( PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes); // đi vào /admin/dashboard rồi chạy vào hàm dashboardRouters
    app.use( PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productCategoryRoutes); 
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth,  productRoutes)
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth,  roleRoutes)
    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth,  accountRoutes)
    app.use(PATH_ADMIN + "/auth",authRoutes )
    app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRoutes)
    app.use(PATH_ADMIN + "/settings", authMiddleware.requireAuth, settingRoutes)
}