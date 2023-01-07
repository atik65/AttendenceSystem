require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const createDb = require("./db/createDb");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

createDb("mongodb://127.0.0.1:27017/attendance-system")
  .then(() => {
    console.log("Database connect successfully");
    server.listen(port, () => {
      console.log("App is running in port ", port);
    });
  })
  .catch((e) => {
    console.log("Database connection failed.");
  });
