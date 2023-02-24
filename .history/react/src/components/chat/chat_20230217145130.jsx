import React, { useEffect } from 'react';
import styles from './chat.module.css';
import socket from 'socket.io-client';
const socketServer = socket('http://localhost:8080');

function Chat(props) {
  
  useEffect(() => {
    socketServer.on('chatRoom', (msg) => console.log(msg));
  });
  setInterval(()=>{
    socketServer.emit('chatRoom', 'stop~!');
  }, 1000);
  return (
    <div className={styles.chat_container}>
      <button onClick={() => {
        socketServer.emit('chatRoom', 'Thanks!');
      }}>
        Send
      </button>
    </div>
  );
}

export default Chat;