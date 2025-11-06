const express = require("express");
const router = express.Router();
const multer = require('multer')

const controller = require("../../controllers/admin/product-category.controller.js");
const validate = require("../../validates/admin/product-category.validate")

const upload = multer() 

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id",controller.edit)
router.patch(
  "/edit/:id",
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
)
module.exports = router