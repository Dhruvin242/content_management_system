const express = require("express");
const fileController = require("../controller/file.Controller");
const routes = express.Router();
const { protect } = require("../controller/user.Controller");

routes.post(
  "/uploadFile",
  protect,
  fileController.upload.single("myfile"),
  fileController.fileUpload
);

routes.get("/getFiles", protect, fileController.GetFiles);

module.exports = routes;
