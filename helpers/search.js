module.exports = (query)=>{
  let objectSearch ={
    keyword: "",
  }
  // Kiểm tra xem URL có chứa tham số query 'status' hay không
  // Ví dụ: /admin/products?status=active
  // Nếu có, thêm điều kiện status vào bộ lọc find
  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    
    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;// find.title là tìm kiểm những bản ghi có title = "tên mình vừa tìm kiếm"
  }
  return objectSearch;
}