const express = require('express');
require('dotenv').config()

const database = require("./config/database.js");
database.connect();

const systemConfig = require("./config/system.js")
const session = require("express-session")
const cookieParser = require("cookie-parser")

// Route
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
// End Route

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// End Mongoose

const app = express();
const port = process.env.PORT;

// Flash
// cái thư viện express-flash là để giúp fe hiển thị thông báo
var flash = require('express-flash') // cái key  'express-flash' là một key bất kì, đặt tên khác cũng được, chỉ mình mình biết
app.use(cookieParser('keyboard cat')); // lưu vào trong cookie , muốn dùng được cookieParser thì phải cài npm i cookie-parser
app.use(session({ // muốn dùng cái dòng này phải npm i express-session
  secret: 'keyboard cat', // ❗ bắt buộc phải có
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());
// End Flash

// Method Override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
// End Method Override

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
// End Body Parser


app.set("views", "./views");
app.set("view engine", "pug");

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