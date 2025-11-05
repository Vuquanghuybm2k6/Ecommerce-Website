const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.js")
// [GET]: /admin/product-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };
  const records = await ProductCategory.find(find)
  const newRecords = createTreeHelper.tree(records)

  res.render('admin/pages/products-category/index', {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords
  });
};

// [GET]: /admin/product-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted : false
  }
  const records = await ProductCategory.find(find).sort({position:"asc"})
  const newRecords = createTreeHelper.tree(records)
  console.log(newRecords)
  res.render('admin/pages/products-category/create', {
    pageTitle: "Tạo danh mục sản phẩm",
    records : newRecords
  });
};

//[POST] : /admin/product-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments()
    req.body.position = countProducts + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }
  const record = new ProductCategory(req.body)
  await record.save()
  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
};