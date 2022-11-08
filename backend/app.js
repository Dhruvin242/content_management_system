const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const userRoutes = require("./routes/user.Routes");
const folderRoutes = require("./routes/Folder.routes");

app.use(express.json());
app.use(cors());
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/folder',folderRoutes);


module.exports = app;
