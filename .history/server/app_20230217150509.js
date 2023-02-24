import express from 'express';
import { Server } from 'socket.io';
const app = express();

app.get('/', (req, res, next) => {
  res.send('<h1>Index page</h1>');
});
const webServer = http.createServer(app);
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

socketServer.on('chatRoom', (msg) => {
  console.log(msg)
});

webServer.listen(8080, () => {
  console.log('Listening on port 8080');
});

