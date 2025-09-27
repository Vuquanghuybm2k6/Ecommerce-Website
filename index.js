const express = require('express'); 
require('dotenv').config() 
 
const database = require("./config/database.js");
database.connect();

const systemConfig = require("./config/system.js")

const routeAdmin = require("./routes/admin/index.route"); 
const route = require("./routes/client/index.route"); 


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT;

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}))

// Muốn sử dụng được pug thì phải có hai dòng  này
app.set("views", "./views"); // Thiết lập đường dẫn đến thư mục chứa các file view (template Pug)
// Express sẽ hiểu các file view nằm trong thư mục ./views
app.set("view engine", "pug"); // Cấu hình Pug làm template engine để render giao diện

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin; // cái biến prefix sẽ tồn tại trong tất cả các file pug() để có thể sử dụng được các giá trị trong file system.js
// app.locals là một câu khai báo biến
// End App Locals Variables

app.use(express.static("public")); // Cung cấp tệp tĩnh (CSS, JS, hình ảnh...) 
// Routes
routeAdmin(app)
route(app);
// Routes

app.listen(port, () => {
  console.log(`Example app listening on port   ${port}`)
})
