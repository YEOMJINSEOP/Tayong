const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server({httpServer,
  cors:{
    origin: '*'
  }
});

io.on("connection", (socket) => {
  socket.emit("room1", "socket connected🔥");
  socket.on("room1", (msg) => {
    console.log(msg);
  })
})

io.listen(8080, () => {
  console.log('Listening on port 8080');
});

