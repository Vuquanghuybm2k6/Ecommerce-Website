module.exports = (query) => {
  
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
 
  if (query.status) {
    // findIndex trả về chỉ số (index) của phần tử đầu tiên thỏa điều kiện,
    // nếu không tìm thấy thì trả về -1.
    const index = filterStatus.findIndex(item => item.status == query.status);
    
    filterStatus[index].class = "active";
  } 
  else {
    // Nếu không có req.query.status (ví dụ truy cập /admin/products), 
    // ta muốn mặc định nút "Tất cả" được active.
    const index = filterStatus.findIndex(item => item.status == "");
    // Vì mảng đã định nghĩa "Tất cả" với status = "", nên findIndex sẽ tìm thấy index đó.
    filterStatus[index].class = "active";
  }
  return filterStatus; // khi đó , sẽ trả về một nút có class = "active"
}