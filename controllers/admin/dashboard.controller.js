module.exports.dashboard = (req, res) => { // Route trang chủ
  res.render('admin/pages/dashboard/index', { // res.render là hiển thị giao hiện từ file .pug, đường dẫn vào sẵn trong thư mục view rồi nên không cần phải view/client/... nữa
    pageTitle: "Trang tổng quan" // cái này để hiện thị tiêu đề trên thanh tab
  });
}