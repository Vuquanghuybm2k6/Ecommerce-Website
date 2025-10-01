
const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")

module.exports.index = async (req, res) => {
  console.log(req.query.status)

  const filterStatus = filterStatusHelper(req.query)
  console.log(filterStatus)
  // TẠO BỘ LỌC TÌM KIẾM (find)

  let find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  
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
  const products = await Product.find(find)
  .sort({position : "desc"}) // desc là sx theo giảm dần nghĩa là cái nào tạo sau thì hiển thị lên trước
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip);

  res.render('admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm", // hiển thị trên tiêu đề trang
    products: products, // dữ liệu để hiển thị danh sách sản phẩm trong 
    filterStatus: filterStatus, // truyền filterStatus vào view
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
  
  res.redirect(req.get("Referer") ) 
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
    case "delete-all":
      await Product.updateMany({ _id: { $in : ids }}, {deleted: true, deletedAt : new Date() })
      break;
    case "change-position":
      console.log(ids)
      for(const item of ids){
        let [id, position] = item.split("-");
        position = parseInt(position)
        console.log(id)
        console.log(position)
        await Product.updateOne({ _id: id}, {position: position}) // không thể updateMany được vì có nhiều sản phẩm và nhiều position khác nhau

      }
     // await Product.updateMany({ _id: { $in : ids }}, {deleted: true, deletedAt : new Date() })
      
    default:
      break;
  }
  res.redirect(req.get("Referer") )
}

  // Xóa mềm
 // [PATCH] /admin/products/delete/:id
module.exports.delete = async (req,res)=>{
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
     { deleted : true,
      deletedAt : new Date() // thời gian xóa vào khi nào
     }
    );
  res.redirect(req.get("Referer") )
}
 // End xóa mềm