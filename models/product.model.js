const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
  deletedAt : Date // thêm thời gian xóa vào lúc nào
});
const Product = mongoose.model("Product", productSchema, "products"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Product;
