const Account = require("../../models/account.model")
const systemConfig = require("../../config/system.js")
const Role = require("../../models/role.model.js")
const md5 = require('md5')
// [GET]: /admin/accounts
module.exports.index = async (req, res)=>{
  let find = {
    deleted : false,
  }
  const records = await Account.find(find).select("-password -token") // chọn những thông tin để hiển thị ra bên ngoài 
  for(const record of records){ // hàm này dùng để hiển thị tên phân quyền mà k hiển thị id của nó 
    const role = await Role.findOne({
      _id : record.role_id,
      deleted: false
    })
    record.role = role
  }
  res.render("admin/pages/accounts/index",{
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}

// [GET]: /admin/accounts/create
module.exports.create = async(req, res)=>{
  const roles = await Role.find({
    deleted : false
  })
  res.render("admin/pages/accounts/create",{
    pageTile: "Tạo mới tài khoản",
    roles : roles
  })
}
//[POST]: /admin/accounts/create
module.exports.createPost = async(req, res)=>{
  const emailExit = await Account.findOne({ // kiểm tra xem email vừa nhập đã tồn tại hay chưa
    email: req.body.email, // tìm kiếm trong db xem có email nào giống vậy k 
    deleted: false // nếu mà email đã bị xóa thì vẫn cho người ta nhập email đấy vào 
  })
  if(emailExit){
    req.flash("error", `Email ${req.body.email} đã tồn tại`)
    res.redirect(req.get("Referer"))
  }
  else{
     req.body.password = md5('req.body.password') // md5 để mã hóa mật khẩu
    const record = new Account(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }
}