const express = require("express");
const shareFileController = require("../controller/fileShare.contoller");
const routes = express.Router();
const { protect } = require("../controller/user.Controller");

routes.post("/sharedFile", protect, shareFileController.fileShared);
routes.post("/resReqFile", protect, shareFileController.fileStatus);

routes.get("/bagdeContent", protect, shareFileController.badgeContent);
routes.get("/receivedUserbadge", protect, shareFileController.reveivedUsersbadgeCount);

module.exports = routes;
