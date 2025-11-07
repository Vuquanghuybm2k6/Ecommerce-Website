const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  title: String, 
  product_category_id: {
    type: String,
    default: ""
  },
  description: String,
  permission: {
    type:Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date // thêm thời gian xóa vào lúc nào
}, {
  timestamps: true
});
const Role = mongoose.model("Role", roleSchema, "roles"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = Role;