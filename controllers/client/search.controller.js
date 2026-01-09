const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
//  [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword
  let newProducts = [] // khai báo newProducts bên ngoài để có thế truyền vào trong cái hàm res.render
  if(keyword){
    const keywordRegex = new RegExp(keyword, "i")
    const products = await Product.find({
      title: keywordRegex,
      status : "active",
      deleted: false
    })
    newProducts = productsHelper.priceNewProducts(products)
  }
  res.render('client/pages/search/index', {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products : newProducts
})
}
