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

io.listen(8080);

const {createServer} = require('https');
const httpsServer = createServer(options, app);
const httpsIo = new Server({httpsServer, cors:{
  origin: '*'
}
});
httpsIo.on('connection', (socket) => {
  const chatRoomId = socket.handshake.query.id;
  socket.join(chatRoomId);
  socket.on('message', (data) => {
    io.to(chatRoomId).emit('message', data);
  })
});
httpsIo.listen(443);

