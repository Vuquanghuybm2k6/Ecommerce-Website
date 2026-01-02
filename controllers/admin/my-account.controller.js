const md5 = require('md5')
const Account = require("../../models/account.model")
// [GET] /admin/my-account
module.exports.index = (req, res) => { 
  res.render('admin/pages/my-account/index', { 
    pageTitle: "Thông tin cá nhân" 
  });
}
// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => { 
  res.render('admin/pages/my-account/edit', { 
    pageTitle: "Chỉnh sửa thông tin cá nhân" 
  });
}
// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => { 
  const id = res.locals.user.id
  const emailExit = await Account.findOne({// hàm check xem email đã tồn tại hay chưa
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