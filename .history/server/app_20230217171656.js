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

// io.on("connection", (socket) => {
//   socket.emit("room1", "socket connected🔥");
//   socket.on("room1", (msg) => {
//     io.emit("room1", msg);
//   })
// })
io.on('connection', (socket) => {
  const chatRoomId = socket.handshake.query.id;
  socket.join(chatRoomId);

  socket.on('message', (data) => {
    io.to(chatRoomId).emit('message', 'Hello World🌎');
  })
})

io.listen(8080, () => {
  console.log('Listening on port 8080');
});

