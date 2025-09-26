// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status")
  const path = formChangeStatus.getAttribute("data-path");
  console.log(path)
  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      // console.log(statusCurrent)
      // console.log(id)
      // console.log(statusChange)
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      // nếu dùng phương thức get, người dùng có thể truy cập vào và chỉnh sửa linh tinh, nên là đổi sang phương thức PACTH
      console.log(action)
      formChangeStatus.action = action
      formChangeStatus.submit(); // ý nghĩa của hàm submit:  Gửi request đến URL trong action của form 
    })
  })
}
// End Change Status