const mongoose = require("mongoose");
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema = new mongoose.Schema({
  title: String, // sản phẩm 1
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String, // kiểu của slug là kiểu string
    slug: "title", // slug sẽ ăn theo cái title và nó sẽ chuyển về dạng san-pham-1
    unique: true // nếu có tên hai sản phẩm trùng nhau thì  nó sẽ tạo ra hai cái slug khác nhau
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date // thêm thời gian xóa vào lúc nào
}, {
  timestamps: true
});
const Product = mongoose.model("Product", productSchema, "products"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Product;