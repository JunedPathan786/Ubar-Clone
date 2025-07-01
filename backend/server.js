require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 3000;

const server = http.createServer(app); // ✅ Create server first

initializeSocket(server); // ✅ Now safe to initialize socket with the server

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
