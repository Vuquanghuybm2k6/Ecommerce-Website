const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
//  [GET] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId
  const cart = await Cart.findOne({
    _id: cartId
  })
  if(cart.products.length > 0){
    for(const item of cart.products){ // tìm bản ghi trong db Product để lấy ra cái nào có id giống với id sản phẩm trong giỏ hàng
      const productId = item.product_id
      const productInfo = await Product.findOne({
        _id : productId
      })
      productInfo.priceNew = productsHelper.priceNewProduct(productInfo) // tìm giá mới sau khi giảm
      item.productInfo = productInfo 
      item.totalPrice = item.quantity*productInfo.priceNew // tính tổng tiền của đơn hàng bằng cách nhân giá tiền với số lượng đơn
    }
  }
  cart.totalPrice = cart.products.reduce((sum,item)=>sum+item.totalPrice,0)
  res.render('client/pages/checkout/index', {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  });
}
