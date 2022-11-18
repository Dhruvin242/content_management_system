const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const userRoutes = require("./routes/user.Routes");
const folderRoutes = require("./routes/Folder.routes");
const fileRoutes = require("./routes/file.routes");
const fileShared = require("./routes/shareFile.routes");

app.use(
  express.json({
    limit: "100mb",
  })
);
app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/folder", folderRoutes);
app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/file", fileShared);

module.exports = app;
