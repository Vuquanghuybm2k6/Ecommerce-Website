const Cart = require("../../models/cart.model.js")
module.exports.cartId = async (req,res,next) =>{
  console.log(req.cookies.cartId)
  if(!req.cookies.cartId){ // khi chưa có giỏ hàng
    const cart = new Cart() // lần đầu người dùng vào, thì chưa cardId thì chỉ cần tạo giỏ hàng trống, sau đó lưu vào db 1 giỏ hàng trống
    await cart.save()
    const expiresTime = 1000*60*60*24*365 // 1 giây * 60 * 60*24*365 = thời gian 1 năm
    res.cookie("cartId", cart.id,{
      expires: new Date(Date.now()+expiresTime)
    }) // lưu biến cardId vào trong cookie với data là cart.id
    // nếu ta không xét thời gian cho cookie thì nó sẽ lưu theo phiên, mà mặc định khi lưu theo phiên thì khi ta tắt máy đi, nó sẽ mất
    // tham số thứ ba trong res.cookie là biến đặt thời gian hết hạn cho cookie
  }
  else{ // khi đã có giỏ hàng
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    })
    cart.totalQuantity = cart.products.reduce((sum,item)=>sum+item.quantity, 0)
    res.locals.miniCart = cart
  }
  next()
}