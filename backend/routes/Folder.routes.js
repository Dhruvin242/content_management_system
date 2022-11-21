const express = require("express");
const FolderController = require("../controller/folder.Controller");
const routes = express.Router();
const { protect } = require("../controller/user.Controller");

routes.post("/createFolder", protect, FolderController.createFolder);
routes.get("/getFolderByUserId", protect, FolderController.getFolders);
routes.post("/deleteFolder", protect, FolderController.deleteFolder);
routes.patch("/renameFolder", protect, FolderController.renameFolder);

module.exports = routes;
