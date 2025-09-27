
const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
// Định nghĩa hàm controller xử lý request GET /admin/products
// Hàm này sẽ được router gọi khi người dùng truy cập đường dẫn /admin/products
module.exports.index = async (req, res) => {
  console.log(req.query.status)

  const filterStatus = filterStatusHelper(req.query)
  console.log(filterStatus)
  // TẠO BỘ LỌC TÌM KIẾM (find)

  // Khởi tạo bộ lọc mặc định: chỉ lấy sản phẩm chưa bị xóa (deleted = false)
  // Đây là cách "soft delete" – sản phẩm không bị xóa khỏi DB mà chỉ đánh dấu deleted = true
  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
    // Sau bước này, find có thể trở thành:
    // { deleted: false, status: "active" }
  }
  const objectSearch = searchHelper(req.query)
  console.log(objectSearch)

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Pagination
  const countProducts = await Product.countDocuments(find); // hàm đếm số lượng sp trong mongoose
  let objectPagination = paginationHelper({
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countProducts
  )
  // End Pagination
  console.log(objectPagination.skip)

  // TRUY VẤN DỮ LIỆU TỪ MONGODB
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
  // cái phần limit là giới hạn số sản phầm được in ra 1 trang
  // cái phầm skip(Number) thì là dừng in ra ngoài giao diện từ phần tử thứ bao nhiêu


  // RENDER VIEW VỚI DỮ LIỆU LẤY ĐƯỢC
  res.render('admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm", // hiển thị trên tiêu đề trang
    products: products, // dữ liệu để hiển thị danh sách sản phẩm trong 
    filterStatus: filterStatus, // truyền filterStatus vào view
    // Mục đích: view sẽ dùng filterStatus để vẽ nút lọc
    // (mỗi nút lấy .name, .status và nếu .class === "active" thì highlight)
    keyword: objectSearch.keyword, // cái này để truyền giá trị cho value
    pagination: objectPagination
  });
};
// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res)=>{
  console.log(req.params)// req.params là cái biến chứa route động ( cái route mà có dấu ":")
   // lấy ra id và status 
  const status = req.params.status
  const id = req.params.id
  await Product.updateOne({_id: id},{status: status});
  // hàm updateOne đọc tài liệu trong Mongoose, dùng để update trạng thái 1 sản phẩm lên database, nó có 2 object
  // cứ liên quan đến truy vấn thì mở mongoose lên để đọc doc
  res.redirect(req.get("Referer") ) // khi mà ta click vào trạng thái ở phần sp bên phía admin thì nó sẽ tự động nhảy sang trang khác
  // hàm này để nó tự động quay về đúng trang hiện tại, đọc doc trên expres phần API reference 5.x -> response -> method ->res.direct
  //req.get(headerName) trong Express dùng để lấy giá trị của một HTTP header từ request.
  //res.redirect(req.get("Referer")) Lệnh này bảo Express: chuyển hướng về URL lưu trong Referer.
}
 // [PATCH] /admin/products/change-multi
 module.exports.changeMulti = async (req,res) =>{
  //console.log(req.body); // phải cài đặt thư viện body-parse trong npm thì khi gửi lên mới lấy ra dc thuộc tính 
    const type = req.body.type
  const ids = req.body.ids.split(", ").map(id => id.trim());
  switch(type){
    case "active":
     await Product.updateMany({ _id: { $in: ids }},{ status: "active"})
     break;
    case "inactive":
     await Product.updateMany({ _id: { $in : ids }}, {status: "inactive"})
     break;
    default:
     break;
  }
  res.redirect(req.get("Referer") )
}
