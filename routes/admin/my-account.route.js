const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/my-account.controller");
const multer = require('multer')
const upload = multer() // ta xóa cái { storage: storageMulter() } 
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");

router.get("/", controller.index);
router.get("/edit", controller.edit)
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPatch
)
module.exports = router;