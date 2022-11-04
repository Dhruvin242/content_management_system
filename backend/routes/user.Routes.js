const express = require('express');
const UserController = require('../controller/user.Controller');
const routes = express.Router();

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

module.exports = routes