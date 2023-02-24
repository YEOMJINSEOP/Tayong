import express from 'express';
import { Server } from 'socket.io';
const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Index page</h1>');
});

const server = app.listen(3000);
const socketServer = new Server(server, {
  cors:{
    origin: '*'
  }
});

socketServer.on('connection', (socket) => {
  console.log('socket connected!');
  socketServer.emit('chatRoom', 'Good Afternoon🏖️');
})

setInterval(() => {
  socketServer.emit('chatRoom', 'Hello!!');
}, 10000);

socketServer.on('chatRoom', (msg) => console.log(msg));

