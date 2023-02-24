import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Index page</h1>');
});

const io= new Server({
  cors:{
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('socket connected!');
  socketServer.emit('chatRoom', 'Good Afternoon🏖️');
})

io.listen(8080, () => {
  console.log('Listening on port 8080');
});

