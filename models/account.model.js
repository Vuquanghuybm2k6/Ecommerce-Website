const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const accountSchema = new mongoose.Schema({
  fullName: String, 
  email : String,
  password: String,
  token :{
    type: String,
    default: ()=> generate.generateRandomString(20) // phải có ()=> thì các tài khoản khác vừa lập mới không bị trùng token
  },
  phone: String,
  avatar: String,
  role_id : String,
  status: String,
  deleted:{
    type: Boolean,
    default : false
  },
  deletedAt: Date,
},
  {
    timestamps: true
  }
);
const Account = mongoose.model("Account", accountSchema, "accounts"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Account;