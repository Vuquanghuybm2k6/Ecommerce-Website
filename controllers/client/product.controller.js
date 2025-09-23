//  [GET] /products
 const Product = require("../../models/product.model");


 module.exports.index = async(req, res) => {  // Route trang chủ
  const products = await Product.find({
    status : "active",
    deleted: false
  });
  const newProducts = products.map(item=>{
    item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0); // hàm toFix để làm tròn số 
    return item;
  });
  console.log(products);
   res.render('client/pages/products/index', {
    pageTitle :"Danh sách sản phẩm", // cái này để hiện thị tiêu đề trên thanh tab
    products : products// products bên phải là biến trong controller tức là ở file hiện tại, products bên trái là biến trong file pug
   }); // res.render là hiển thị giao hiện từ file .pug, đường dẫn vào sẵn trong thư mục view rồi nên không cần phải view/client/... nữa
}
