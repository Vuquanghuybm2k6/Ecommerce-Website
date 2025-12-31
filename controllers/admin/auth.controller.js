const Account = require("../../models/account.model")
const md5 = require('md5')
const systemConfig = require("../../config/system.js")
// [GET]: /admin/auth/login
module.exports.login = async(req,res)=>{
  console.log(req.cookies)
  if(req.cookies.token){ // khi cookie vẫn còn lưu token mà người dùng lại truy cập vào url "/auth/login" tức là trang đăng nhập
    // thì chúng ta sẽ không để họ vào trang đăng nhập để họ phải đăng nhập lần nữa mà chuyển hướng họ đến trang dashboard
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
  }
  else{ // nếu không có token thì chuyển họ đến trang đăng nhập
    res.render("admin/pages/auth/login",{
    pageTitle: "Trang đăng nhập",
  })
  }
  
}
// [POST]: /admin/auth/loginPost
module.exports.loginPost = async(req,res)=>{
  const email  = req.body.email
  const password = req.body.password
  const user = await Account.findOne({
    email : email,
    deleted: false
  })
  console.log(user)
  if(!user){
    req.flash("error", "Email không tồn tại")
    res.redirect(req.get("Referer"))
  }
  if(md5(password) != user.password){
    req.flash("error", "Sai mật khẩu")
    res.redirect(req.get("Referer"))
  }
  if(user.status == "inactive"){
    req.flash("error", "Tài khoản đã bị khóa")
    res.redirect(req.get("Referer"))
    return
  }
  res.cookie("token", user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}
// [GET]: /admin/auth/logout
module.exports.logout = (req,res) =>{
  res.clearCookie("token") // xóa cookie
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}