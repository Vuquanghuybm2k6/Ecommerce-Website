const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user_id: String,
    products: [ // lưu sản phẩm thành 1 mảng
      {
        product_id: String,
        quantity: Number
      }
    ]
  },
   {
  timestamps: true
});
const Cart = mongoose.model("Cart", cartSchema, "carts"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Cart;