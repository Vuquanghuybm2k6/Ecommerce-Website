const express = require('express'); // trong cái đoạn require này k ghi mấy cái path mà chỉ ghi 'express' thôi vì nó ngầm hiểu nó sẽ vào trong thư mục node_modules để vào thư mục express
require('dotenv').config() // phải có dòng lệnh này thì mới chạy được các câu lệnh trong file .env
 
const database = require("./config/database.js");
database.connect();
const routeClient = require("./routes/client/index.route.js"); // import route bên phía client
const routeAdmin = require("./routes/admin/index.route.js"); // import route bên phía admin

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT;// lấy giá trị PORT từ file .env

// Muốn sử dụng được pug thì phải có hai dòng  này
app.set("views", "./views"); // Thiết lập đường dẫn đến thư mục chứa các file view (template Pug)
// Express sẽ hiểu các file view nằm trong thư mục ./views
app.set("view engine", "pug"); // Cấu hình Pug làm template engine để render giao diện
 
// Gọi hàm route() và truyền app vào
// Trong file index.route.js ta đã viết module.exports = (app) => { ... }
// => giờ ta gọi route(app) để gắn các route vào ứng dụng chính
app.use(express.static("public")); // Cung cấp tệp tĩnh (CSS, JS, hình ảnh...) 
// Routes
routeAdmin(app)
routeClient(app);
// Routes

app.listen(port, () => {
  console.log(`Example app listening on port   ${port}`)
})
