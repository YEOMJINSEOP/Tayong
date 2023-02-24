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
  console.log('socket connected!');
  socketServer.emit('chatRoom', 'Good Afternoon🏖️');
})

io.listen(8080, () => {
  console.log('Listening on port 8080');
});

