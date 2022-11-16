const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

mongoose.connection.once("open", () => console.log(`Database connected..!`));
mongoose.connection.on("error", () =>
  console.log(`Database connection Error ....!`)
);

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  server.listen(port, () => console.log(`server is runnig on port ${port}`));
};

startServer();
