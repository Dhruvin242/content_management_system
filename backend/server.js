const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const server = http.createServer(app);

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 8000;

mongoose.connection.once('open', () => console.log('Database Connected..!'))
mongoose.connection.on('error', () => console.log('Database Connection Error..!'))


async function startServer() {
  await mongoose.connect(process.env.MONGO_DB);
  server.listen(port, () => console.log(`server is Runnin on port ${port}`));
}

startServer();
