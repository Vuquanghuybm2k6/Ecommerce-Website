const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: { // set thời gian hết hạn
    type:Date,
    expires : 180 // thời gian mà sau khi chúng ta truyền vào, cái này tính theo giây, 180 là 180 giây
  }
}, {
  timestamps: true
});
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = ForgotPassword;