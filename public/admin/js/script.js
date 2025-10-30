// Button Status

const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {

  let url = new URL(window.location.href);

  buttonsStatus.forEach(button => {

    button.addEventListener("click", () => {

      const status = button.getAttribute("button-status");

      //  Nếu button có giá trị "status"
      if (status) {
        url.searchParams.set("status", status);
      } 
      else {
        
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status


// Form Search

const formSearch = document.querySelector("#form-search");

if (formSearch) { 
  let url = new URL(window.location.href)

  formSearch.addEventListener("submit", (e) => {

    // Ngăn trình duyệt gửi form theo cách mặc định (không reload/submit form theo action)
    e.preventDefault();

    // Lấy giá trị input có name="keyword" trong form.
    // e.target chính là phần tử form, .elements là HTMLFormControlsCollection,
    // nên e.target.elements.keyword truy cập vào input theo thuộc tính name.
    const keyword = e.target.elements.keyword.value

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")
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

    if(inputsCheck.length>0){
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']")
      inputsCheck.forEach(input =>{
        const id = input.value;

        if(typeChange === "change-position"){
          const position = input.closest("tr").querySelector("input[name = 'position']").value
          
          console.log(`${id}-${position}`)
          ids.push(`${id}-${position}`)
        }
        else{
        ids.push(id)

        }
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

// Show Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
  const time = parseInt(showAlert.getAttribute("data-time"))
  const closeAlert = showAlert.querySelector("[close-alert]")
  setTimeout(()=>{
    showAlert.classList.add("alert-hidden") // thêm thuộc tính hidden
  },time)
  closeAlert.addEventListener("click", ()=>{
    showAlert.classList.add("alert-hidden") 
  })
  console.log(showAlert)
}
// Show Alert

// Sort
const sort = document.querySelector("[sort]")
if(sort){
  const url = new URL(window.location.href)
  const sortSelect = sort.querySelector("[sort-select]")
  const sortClear = sort.querySelector("[sort-clear]")
  sortSelect.addEventListener("change", (e)=>{
    const value = e.target.value
    const [sortKey, sortValue] = value.split("-")// hàm split để chia string thành 1 mảng
    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)
    window.location.href = url.href
  })
  // Xóa sắp xếp
  sortClear.addEventListener("click", ()=>{
    url.searchParams.delete("sortKey")
    url.searchParams.delete("sortValue")
    window.location.href = url.href
  })
  // End Xóa sắp xếp

  // Thêm selected cho phần option
  // chúng ta không thể thêm selected vào trong cái phần lắng nghe sk được bỏi vì trong đó có cái hàm window.location.href = url.href
  // mà khi cái hàm window.location.href = url.href hoạt động thì nó sẽ chuyển hướng sang trang khác
  // khi chuyển hướng thì sẽ load lại website, mà khi load lại website thì nó sẽ làm mới lại cái hàm window.location.href = url.href,
  // nên ta sẽ không lấy được giá trị, ta bắt buộc phải lấy giá trị trên url
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if(sortKey && sortClear){
    const stringSort  = `${sortKey}-${sortValue}`
    console.log(stringSort)
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
    optionSelected.selected = true
  }
  // End Thêm selected cho phần option
}
// End Sort