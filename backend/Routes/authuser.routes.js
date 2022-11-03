const express = require("express");
const userAuthContoller = require("../Controllers/userAuth.controller");
const routes = express.Router();

routes.post("/register", userAuthContoller.register);
routes.post("/login", userAuthContoller.login);

module.exports = routes;
