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
//   console.log('connected✅');
//   const chatRoomId = socket.handshake.query.id;
//   socket.emit(chatRoomId, "socket connected🔥");
//   socket.on(chatRoomId, (msg) => {
//     io.emit(chatRoomId, msg);
//   })
// })

io.on('connection', (socket) => {
  console.log('connection');
  const chatRoomId = socket.handshake.query.id;

  console.log(chatRoomId);
  console.log(socket.id);

  socket.emit(chatRoomId, "socket connected🔥");

  socket.on('message', (data) => {
    socket.to(chatRoomId).emit('message', data);
  })
})

io.listen(8082, () => {
  console.log('Listening on port 8082');
});

