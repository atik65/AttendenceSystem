require("dotenv").config();
const http = require("http");
const app = require("./app/app");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("App is running in port ", port);
});
