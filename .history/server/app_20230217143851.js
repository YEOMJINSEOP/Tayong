import express from 'express';
import { Server } from 'socket.io';
const app = express();
const server = app.listen(8080);
const socketIO = new Server(server, {
  cors:{
    origin: '*'
  }
});

socketIO.on('connection', (socket) => {
  console.log('socket connected!');
  socketIO.emit('room1', 'Good Afternoon🏖️');
})

socketIO.on('room1', console.log);

