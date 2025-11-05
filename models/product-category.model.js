const mongoose = require("mongoose");
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productCategorySchema = new mongoose.Schema({
  title: String, 
  parent_id: {
    type: String,
    default: ""
  },
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title", 
    unique: true 
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date 
}, {
  timestamps: true
});
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category"); // tham số thứ 3 "products" là cái tên connection trong database
module.exports = ProductCategory;