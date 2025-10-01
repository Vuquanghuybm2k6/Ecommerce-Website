// Button Status: Xử lý thay đổi trạng thái lọc dữ liệu thông qua các button

//  Lấy tất cả các phần tử (button) trên trang có thuộc tính tự định nghĩa là "button-status"
const buttonsStatus = document.querySelectorAll("[button-status]");
// những thuộc tính tự định nghĩa thì cho vào ngoặc vuông

if (buttonsStatus.length > 0) { //  Kiểm tra nếu tồn tại ít nhất một button có thuộc tính này thì mới thực hiện tiếp

  //  Tạo một đối tượng URL từ URL hiện tại của trang (window.location.href)
  //    Đối tượng URL cho phép  thao tác với từng phần của URL (hostname, pathname, searchParams,...)
  let url = new URL(window.location.href);

  //  Duyệt qua từng button tìm được trong danh sách
  buttonsStatus.forEach(button => {

    //  Gắn sự kiện click cho mỗi button
    button.addEventListener("click", () => {

      //  Lấy giá trị của thuộc tính "button-status" từ button vừa click
      //    Ví dụ: <button button-status="active"> → status = "active"
      const status = button.getAttribute("button-status");

      //  Nếu button có giá trị "status"
      if (status) {
        // Thêm hoặc cập nhật tham số "status" trên URL
        //    Nếu URL ban đầu là: https://example.com/products
        //    Sau khi set: https://example.com/products?status=active
        url.searchParams.set("status", status);
      } else {
        //  Nếu button không có giá trị (status = null hoặc rỗng)
        //  Xóa tham số "status" khỏi URL
        //    Ví dụ: https://example.com/products?status=active → https://example.com/products
        url.searchParams.delete("status");
      }

      //  Tải lại trang bằng URL mới đã được chỉnh sửa
      //    Hành động này chuyển hướng trình duyệt tới URL mới, áp dụng bộ lọc/hiển thị mới.
      window.location.href = url.href;
    });
  });
}
// End Button Status

//------------------------------------------------------------------------------------------------------------------------------

// Form Search
// Lấy phần tử <form> có id="form-search" từ DOM
// Nếu không tìm thấy, querySelector trả về null
const formSearch = document.querySelector("#form-search");

if (formSearch) { // Nếu form tồn tại thì mới gắn sự kiện, tránh lỗi khi script chạy trên trang không có form
  // Tạo đối tượng URL từ URL hiện tại của trình duyệt
  // Đối tượng này giúp thao tác dễ dàng với query params: url.searchParams
  let url = new URL(window.location.href)

  // Lắng nghe sự kiện submit trên form
  formSearch.addEventListener("submit", (e) => {

    // Ngăn trình duyệt gửi form theo cách mặc định (không reload/submit form theo action)
    e.preventDefault();

    // Lấy giá trị input có name="keyword" trong form.
    // e.target chính là phần tử form, .elements là HTMLFormControlsCollection,
    // nên e.target.elements.keyword truy cập vào input theo thuộc tính name.
    const keyword = e.target.elements.keyword.value

    // === CHÚ Ý: phần kiểm tra bên dưới dùng biến 'status' nhưng code không khai báo 'status'
    // Nếu 'status' không tồn tại (undefined) thì điều kiện if(status) luôn false,
    // và else branch sẽ chạy, gọi url.searchParams.delete("status")
    // Đây dường như là **lỗi logic**: bạn có vẻ muốn kiểm tra 'keyword' chứ không phải 'status',
    // và nếu keyword rỗng thì nên xóa param "keyword" chứ không phải "status".
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
    // In đối tượng URL ra console (dùng để debug)
    // Lưu ý: console.log(url) in ra đối tượng URL; nếu muốn chuỗi URL hãy dùng console.log(url.href)
    console.log(url);
  });
}

// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")
console.log(buttonsPagination)
if (buttonsPagination) {
  let url = new URL(window.location.href)
  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination")
      url.searchParams.set("page", page)

      window.location.href = url.href
    })
  })

}
// End Pagination
// Checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name= 'id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      })
    } else {

      inputsId.forEach((input) => {
        input.checked = false;
      })
    }
  })

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true
      }
      else{
        inputCheckAll.checked = false
      }
    })
  })
}
// End Checkbox

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e)=>{
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]")
    const inputsCheck = checkboxMulti.querySelectorAll("input[name='id']:checked")

    const typeChange = e.target.elements.type.value 
    if(typeChange == "delete-all"){
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?")
      if(!isConfirm){
        return;
      }
    }
    console.log(typeChange)

    if(inputsCheck.length>0){
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']")
      inputsCheck.forEach(input =>{
        const id = input.value;
        ids.push(id)
      })
      inputIds.value = ids.join(", ")
      console.log(ids.join(", "));
      formChangeMulti.submit();
    }
    else{
      alert("Vui lòng nhập lại")
    }
  })
}

// End Form Change Multi