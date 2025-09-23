const dashboardRouters = require("./dashboard.route") 
const systemConfig = require("../../config/system")
module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin; // khai báo tách riêng ra như này để nếu mà người dùng muốn đổi tên thì chỉ cần đổi ở dòng này
    app.use( PATH_ADMIN + '/dashboard', dashboardRouters); // đi vào /admin/dashboard rồi chạy vào hàm dashboardRouters

}