const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 3000;

server.listen(PORT);
console.log(`Server up and Running At port ${PORT}`);

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log(`${socket.id} Connected`);
  socket.on("draw", drawData => {
    io.emit("draw", drawData);
  });
  socket.on("begin", () => {
    io.emit("begin");
  });
});
