const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // user_id: String,  // Cái này chưa cần quan tâm đến, khi nào làm tính năng đăng nhập đăng kí thì mới dùng
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number
      }
    ]
  },
   {
  timestamps: true
});
const Order = mongoose.model("Order", orderSchema, "orders"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Order;