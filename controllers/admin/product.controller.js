// Import (yêu cầu) model Product từ file models/product.model.js
// Model này được định nghĩa bằng Mongoose để thao tác với collection 'products' trong MongoDB
const Product = require("../../models/product.model");

// Định nghĩa hàm controller xử lý request GET /admin/products
// Hàm này sẽ được router gọi khi người dùng truy cập đường dẫn /admin/products
module.exports.index = async (req, res) => {
  console.log(req.query.status)
  // -------------------------------
  // TẠO MẢNG filterStatus
  // -------------------------------
  // filterStatus là mảng các đối tượng đại diện cho các "bộ lọc trạng thái"
  // Mục đích: truyền vào view để hiển thị các nút/links lọc (Tất cả / Hoạt động / Dừng hoạt động)
  // - name: nhãn hiển thị cho người dùng (ví dụ "Tất cả")
  // - status: giá trị thực tế sẽ so sánh với req.query.status (ví dụ "active", "inactive", hoặc "" cho "Tất cả")
  // - class: dùng để gắn class CSS (ví dụ "active") ở view nhằm highlight nút đang được chọn
  let filterStatus = [{
      name: "Tất cả",
      status: "", // khi status = "" nghĩa là không lọc theo status (tức tất cả)
      class: "" // mặc định rỗng, sẽ set = "active" nếu đang chọn
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ];
  // -------------------------------
  //  ĐÁNH DẤU PHẦN TỬ ĐANG ĐƯỢC CHỌN (active)
  // -------------------------------
  // Nếu URL có query param 'status' (ví dụ ?status=active), ta tìm trong filterStatus
  // phần tử có status trùng với req.query.status rồi gán thuộc tính class = "active"
  // để view biết sẽ thêm class CSS (ví dụ .active) cho button tương ứng.
  if (req.query.status) {
    // findIndex trả về chỉ số (index) của phần tử đầu tiên thỏa điều kiện,
    // nếu không tìm thấy thì trả về -1.
    const index = filterStatus.findIndex(item => item.status == req.query.status);
    // Lưu ý: nếu index = -1 và bạn gọi filterStatus[index].class = "active" → sẽ gây lỗi.
    // Ở code gốc bạn không kiểm tra index >= 0, nên nếu có khả năng req.query.status
    // chứa giá trị lạ (không nằm trong filterStatus), sẽ gây exception.
    // (Gợi ý: có thể thêm kiểm tra `if (index >= 0) { ... }` để an toàn.)
    filterStatus[index].class = "active";
  } else {
    // Nếu không có req.query.status (ví dụ truy cập /admin/products), 
    // ta muốn mặc định nút "Tất cả" được active.
    const index = filterStatus.findIndex(item => item.status == "");
    // Vì mảng đã định nghĩa "Tất cả" với status = "", nên findIndex sẽ tìm thấy index đó.
    filterStatus[index].class = "active";
  }
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
  let keyword = ""
  // Kiểm tra xem URL có chứa tham số query 'status' hay không
  // Ví dụ: /admin/products?status=active
  // Nếu có, thêm điều kiện status vào bộ lọc find
  if (req.query.keyword) {
    keyword = req.query.keyword;
    // Tạo một biểu thức tìm kiếm (regex) từ từ khóa người dùng nhập vào
    // - new RegExp(keyword, "i") sẽ tạo một "mẫu tìm kiếm" không phân biệt chữ hoa/thường
    // - Ví dụ: nếu keyword = "iphone", thì regex sẽ là /iphone/i
    // - Điều này giúp tìm được cả các sản phẩm có title là "iPhone 13", "IPHONE 14", v.v.
    const regex = new RegExp(keyword, "i");
    find.title = regex;// find.title là tìm kiểm những bản ghi có title = "tên mình vừa tìm kiếm"
  }

  // TRUY VẤN DỮ LIỆU TỪ MONGODB

  // Dùng Product.find(find) để lấy danh sách sản phẩm thỏa điều kiện find
  // await dừng hàm cho đến khi truy vấn hoàn tất (vì Product.find trả về Promise)
  const products = await Product.find(find);

  // RENDER VIEW VỚI DỮ LIỆU LẤY ĐƯỢC

  // Gọi res.render để render file view 'admin/pages/products/index'
  // Truyền vào một object chứa:
  // - pageTitle: Tiêu đề trang hiển thị trên giao diện
  // - products: Danh sách sản phẩm đã truy vấn được từ DB
  res.render('admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm", // hiển thị trên tiêu đề trang
    products: products, // dữ liệu để hiển thị danh sách sản phẩm trong 
    filterStatus: filterStatus, // truyền filterStatus vào view
    // Mục đích: view sẽ dùng filterStatus để vẽ nút lọc
    // (mỗi nút lấy .name, .status và nếu .class === "active" thì highlight)
    keyword: keyword // cái này để truyền giá trị cho value
  });
};