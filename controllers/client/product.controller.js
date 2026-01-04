const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products")
const ProductCategory = require("../../models/product-category.model")
const productsCategoryHelper = require("../../helpers/products-category")
//  [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({
    position: "desc"
  });
  const newProducts = productsHelper.priceNewProducts(products)
  res.render('client/pages/products/index', {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts
  });
}

// [GET]: /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status : "active"
    }
    const product = await Product.findOne(find)
    res.render('client/pages/products/detail', {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect(`/products`)
  }

};

// [GET]: /products/:slugCategory
module.exports.category = async (req,res) =>{
  // 🔹 Tìm danh mục cha dựa vào slug trên URL
  // Ví dụ URL: /category/dien-thoai
  // req.params.slugCategory = "dien-thoai"
  const category = await ProductCategory.findOne({
    slug : req.params.slugCategory,
    deleted: false
  })

 const listSubCategory = await productsCategoryHelper.getSubCategory(category.id) // ở trên dùng async await để lấy data thì ở dưới đây cũng phải gọi
 // 🔹 Lấy ra danh sách ID của tất cả danh mục con
  // listSubCategory là mảng các object danh mục
  // map() sẽ chuyển mảng object → mảng id
  // Ví dụ: [{id: 1}, {id: 2}] → [1, 2]
 const listSubCategoryId = listSubCategory.map(item => item.id)
 console.log(listSubCategoryId)
  // 🔹 Lấy danh sách sản phẩm thuộc danh mục hiện tại
  // $in dùng để tìm các sản phẩm có product_category_id
  // nằm trong mảng ID truyền vào
  // Bao gồm:
  //  - category.id        → danh mục cha
  //  - ...listSubCategoryId → toàn bộ danh mục con (cấp 1, 2, 3...)
  const products = await Product.find({
    product_category_id: {$in : [category.id, ...listSubCategoryId]}, // tìm kiểm các sản phẩm thuộc danh mục con
    deleted: false
  }).sort({position: "desc"})
  const newProducts = productsHelper.priceNewProducts(products)
  res.render('client/pages/products/index', {
    pageTitle: category.title,
    products: newProducts
  });
}