const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {Sequelize} = require('sequelize');


const app = express();
const httpServer = createServer(app);

const sequelize = new Sequelize(
  'tayong',
  'root',
  'wlstjq039#',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

async function testConnection(){
  try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch(error){
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

const io = new Server({httpServer,
  cors:{
    origin: '*'
  }
});



io.on('connection', (socket) => {
  const chatRoomId = socket.handshake.query.id;
  socket.join(chatRoomId);
  socket.on('message', (data) => {
    console.log(data);
    io.to(chatRoomId).emit('message', data);
  })
})

io.listen(8083);

