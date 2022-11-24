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
routes.get("/search/:searchWord", protect, fileController.search);

routes.post("/hide", protect, fileController.HideFileFolder);
routes.post("/changefileContent/:fileId", protect, fileController.changeFileConent);

module.exports = routes;
