import React, { useEffect } from 'react';
import styles from './chat.module.css';
import socket from 'socket.io-client';
const socketServer = socket('http://localhost:8080');

function Chat(props) {
  
  useEffect(() => {
    socketServer.on('room1', (msg) => console.log(msg));
  });
  setInterval(()=>{
    socketServer.emit('room1', 'stop~!');
  }, 1000);
  return (
    <div className={styles.chat_container}>
      <button onClick={() => {
        socketServer.emit('room1', 'Thanks!');
      }}>
        Send
      </button>
    </div>
  );
}

export default Chat;