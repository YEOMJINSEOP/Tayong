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

io.on('connection', (socket) => {
  const chatRoomId = socket.handshake.query.id;
  socket.join(chatRoomId);
  socket.on('message', (data) => {
    io.to(chatRoomId).emit('message', data);
  })
})

io.listen('ec2-3-34-255-2.ap-northeast-2.compute.amazonaws.com', () => {
  console.log('Listening on port 8080');
});

