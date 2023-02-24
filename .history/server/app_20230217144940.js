import express from 'express';
import { Server } from 'socket.io';
const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Index page</h1>');
});

const server = app.listen(8080);
const socketServer = new Server(server, {
  cors:{
    origin: '*'
  }
});

socketServer.on('connection', (socket) => {
  console.log('socket connected!');
  socketServer.emit('room1', 'Good Afternoon🏖️');
})

setInterval(() => {
  socketServer.emit('room1', 'Hello!!');
}, 10000);

socketServer.on('room1', (msg) => console.log(msg));

