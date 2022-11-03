const express = require("express");
const app = express();
const cors = require("cors");

const userAuthRoutes = require("./Routes/authuser.routes");

const globalErrorHandler = require("./utils/errorController");
const errorResponse = require("./utils/errorResponse");

app.use(express.json());
app.use(cors());
//Mount Routes
app.use("/api/v1/user", userAuthRoutes);

app.all("*", (req, res, next) => {
  next(new errorResponse(`cant find this url ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
