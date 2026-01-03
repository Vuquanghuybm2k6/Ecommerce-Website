const mongoose = require("mongoose");
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema = new mongoose.Schema({
  title: String, 
  product_category_id: {
    type: String,
    default: ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured : String,
  position: Number,
  slug: {
    type: String, // kiểu của slug là kiểu string
    slug: "title", // slug sẽ ăn theo cái title và nó sẽ chuyển về dạng san-pham-1
    unique: true // nếu có tên hai sản phẩm trùng nhau thì  nó sẽ tạo ra hai cái slug khác nhau
  },
  createdBy:{
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now // hàm trong js để lấy ra tg hiện tại
    }
  },
  deleted: {
    type: Boolean,
    default: false
  },
  // deletedAt: Date, // thêm thời gian xóa vào lúc nào
  deletedBy:{
    account_id: String,
    deletedAt: Date
  },
  updatedBy:[{
    account_id: String,
    updatedAt : Date
  },]
}, {
  timestamps: true
});
const Product = mongoose.model("Product", productSchema, "products"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Product;