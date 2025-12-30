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
     req.body.password = md5(req.body.password) // md5 để mã hóa mật khẩu
    const record = new Account(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }
}
// [GET]: /admin/accounts/edit/:id
module.exports.edit = async(req,res)=>{
  let find = {
    _id : req.params.id,
    deleted : false
  }
  try{
    const data = await Account.findOne(find)
    const roles = await Role.find({deleted:false})
    res.render("admin/pages/accounts/edit.pug",{
    pageTitle: "Chỉnh sửa tài khoản",
    data : data,
    roles : roles
  })
  }
  catch(error){
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
}
//[PATCH]: /admin/account/edit/:id
module.exports.editPatch = async(req,res)=>{
  const id = req.params.id
  const emailExit = await Account.findOne({
    _id : {$ne : id}, // khi mà chỉnh sửa thì ta phải loại trừ cái email của chính bản thân ra
    // chỉ tìm kiếm những email nào không phải của mình để kiểm tra 
    email: req.body.email,
    deleted: false
  })
  if(emailExit){
    req.flash("error", `Email ${req.body.email} đã tồn tại`)
  }
  else{
    if(req.body.password){ // kiểm tra nếu người dùng nhập mk thì mình mã hóa
    req.body.password = md5(req.body.password)
  }
  else{
    delete req.body.password
  }
  await Account.updateOne({_id: id}, req.body)
  req.flash("success", "Cập nhật tài khoản thành công!")
  }
  res.redirect(req.get("Referer"))
}