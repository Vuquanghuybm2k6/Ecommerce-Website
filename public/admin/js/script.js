// Button Status: Xử lý thay đổi trạng thái lọc dữ liệu thông qua các button

//  Lấy tất cả các phần tử (button) trên trang có thuộc tính tự định nghĩa là "button-status"
const buttonsStatus = document.querySelectorAll("[button-status]"); 
// những thuộc tính tự định nghĩa thì cho vào ngoặc vuông

if (buttonsStatus.length > 0) {//  Kiểm tra nếu tồn tại ít nhất một button có thuộc tính này thì mới thực hiện tiếp

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
            } 
            else {
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
