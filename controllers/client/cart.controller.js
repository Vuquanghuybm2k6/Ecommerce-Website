// Import model Cart để thao tác với collection giỏ hàng trong database
const Cart = require("../../models/cart.model")

// [POST] /cart/add/:productId
// Controller xử lý thêm sản phẩm vào giỏ hàng
module.exports.addPost = async (req, res) => {

  // Lấy cartId từ cookie để xác định giỏ hàng của người dùng
  const cartId = req.cookies.cartId

  // Lấy productId từ URL params
  const productId = req.params.productId

  // Lấy số lượng từ form gửi lên và chuyển sang kiểu số
  const quantity = parseInt(req.body.quantity)

  // Tìm giỏ hàng tương ứng với cartId trong database
  const cart = await Cart.findOne({
    _id: cartId
  })

  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
  // Nếu tồn tại → trả về object sản phẩm
  // Nếu chưa có → trả về undefined
  const existProductInCart = cart.products.find(
    item => item.product_id === productId
  )

  // ===== TRƯỜNG HỢP 1: SẢN PHẨM ĐÃ CÓ TRONG GIỎ =====
  if (existProductInCart) {

    // Tính lại số lượng mới = số lượng cũ + số lượng thêm vào
    const newQuantity = quantity + existProductInCart.quantity

    // Cập nhật số lượng sản phẩm đã tồn tại trong giỏ hàng
    await Cart.updateOne(
      {
        // Điều kiện: đúng giỏ hàng
        _id: cartId,

        // Và đúng sản phẩm trong mảng products
        'products.product_id': productId
      },
      {
        // Cập nhật quantity của phần tử tìm được
        'products.$.quantity': newQuantity
      }
    )

  } 
  // ===== TRƯỜNG HỢP 2: SẢN PHẨM CHƯA CÓ TRONG GIỎ =====
  else {

    // Tạo object sản phẩm để thêm mới vào giỏ hàng
    const objectCart = {
      product_id: productId,
      quantity: quantity
    }

    // Thêm sản phẩm mới vào mảng products của giỏ hàng
    await Cart.updateOne(
      {
        _id: cartId
      },
      {
        $push: {
          products: objectCart
        }
      }
    )
  }

  // Lưu thông báo thành công để hiển thị cho người dùng
  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")

  // Quay lại trang trước đó (thường là trang sản phẩm)
  res.redirect(req.get("Referer"))
}
