import express from 'express';
import { Server } from 'socket.io';
const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Index page</h1>');
});

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

setInterval(() => {
  socketIO.emit('room1', 'Hello!!');
}, 1000);

socketIO.on('room1', (msg) => console.log(msg));

