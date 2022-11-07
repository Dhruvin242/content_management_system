const express = require("express");
const UserController = require("../controller/user.Controller");
const routes = express.Router();

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.post("/googleSignIn", UserController.googleSignIn);

routes.post("/forgotPassword", UserController.forgotPassword);
routes.post("/resetPassword/:token", UserController.resetPassword);

module.exports = routes;
