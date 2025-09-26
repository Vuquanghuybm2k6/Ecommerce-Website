// Import (yêu cầu) model Product từ file models/product.model.js
// Model này được định nghĩa bằng Mongoose để thao tác với collection 'products' trong MongoDB
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

  // Dùng Product.find(find) để lấy danh sách sản phẩm thỏa điều kiện find
  // await dừng hàm cho đến khi truy vấn hoàn tất (vì Product.find trả về Promise)
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