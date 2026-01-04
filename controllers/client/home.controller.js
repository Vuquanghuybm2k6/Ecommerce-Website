const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [GET] /
module.exports.index =async (req, res) => {
  // Lấy ra sp nổi bật
  const productsFeatured = await Product.find({
    featured : "1",
    deleted: false,
    status: "active"
  }).limit(6)
  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured)
  // End Lấy ra sp nổi bật

  // Hiển thị ds sp mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status: "active"
  }).sort({position:"desc"}).limit(6)
  const newProductsNew = productsHelper.priceNewProducts(productsNew)

  // End Hiển thị ds sp mới nhất

  res.render('client/pages/home/index.pug', { // res.render là hiển thị giao hiện từ file .pug, đường dẫn vào sẵn trong thư mục view rồi nên không cần phải view/client/... nữa  
    pageTitle: "Trang chủ", // cái này để hiện thị tiêu đề trên thanh tab
    productsFeatured: newProductsFeatured,
    productsNew : newProductsNew
  });
}