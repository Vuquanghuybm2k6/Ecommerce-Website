// [GET] /
module.exports.index = (req, res) => { // Route trang chủ
  res.render('client/pages/home/index.pug', { // res.render là hiển thị giao hiện từ file .pug, đường dẫn vào sẵn trong thư mục view rồi nên không cần phải view/client/... nữa
    pageTitle: "Trang chủ" // cái này để hiện thị tiêu đề trên thanh tab
  });
}