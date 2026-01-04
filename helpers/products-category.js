// Import model ProductCategory để làm việc với collection danh mục sản phẩm
const ProductCategory = require("../models/product-category.model")

// Export hàm getSubCategory (async vì có dùng await)
// parentId: id của danh mục cha ban đầu
module.exports.getSubCategory = async (parentId) => {

  // 🔹 Hàm đệ quy nội bộ
  // Hàm này sẽ:
  // 1. Lấy các danh mục con trực tiếp của parentId
  // 2. Với mỗi danh mục con, tiếp tục tìm các danh mục con cấp sâu hơn
  const getCategory = async (parentId) => {

    // 🔹 Query DB để lấy các danh mục con trực tiếp
    // parent_id = parentId nghĩa là:
    // "Danh mục này có cha là parentId"
    const subs = await ProductCategory.find({
      parent_id: parentId, // khóa liên kết cha – con
      status: "active",    // chỉ lấy danh mục đang hoạt động
      deleted: false       // loại bỏ danh mục đã xoá
    })

    // 🔹 Tạo mảng allSub để chứa:
    // - danh mục con cấp 1
    // - danh mục con cấp 2
    // - danh mục con cấp 3...
    // Ban đầu copy toàn bộ subs (spread để tránh tham chiếu)
    let allSub = [...subs]

    // 🔁 VÒNG LẶP ĐỆ QUY
    // Duyệt từng danh mục con trực tiếp
    for (const sub of subs) {

      // ⚠️ DÒNG NÀY RẤT QUAN TRỌNG
      // Gọi lại hàm getSubCategory (hàm export)
      // với sub.id để tìm tiếp các danh mục con của sub
      //
      // Ví dụ:
      // parentId = 1 → subs = [2, 3]
      // sub.id = 2 → tìm các danh mục con của 2
      const childs = await getCategory(sub.id)

      // 🔹 Gộp danh mục con cấp dưới (childs)
      // vào mảng allSub hiện tại
      allSub = allSub.concat(childs)
    }

    // 🔹 Sau khi:
    // - duyệt hết danh mục con
    // - duyệt hết cháu, chắt...
    // → trả về danh sách đầy đủ
    return allSub
  }

  // 🔹 BẮT ĐẦU ĐỆ QUY
  // Gọi hàm getCategory với parentId ban đầu
  // await để chờ lấy đầy đủ danh mục con
  const result = await getCategory(parentId)

  // 🔹 Trả kết quả ra ngoài controller
  return result
}
