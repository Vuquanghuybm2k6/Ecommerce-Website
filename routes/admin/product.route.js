const express = require("express");
const router = express.Router();
const controller  = require("../../controllers/admin/product.controller");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus); // dấu ":" là cú pháp để truyền data động vào 

module.exports = router;
// ok