import React, { useEffect } from 'react';
import styles from './chat.module.css';
import socket from 'socket.io-client';
const socketIO = socket('http://localhost:8080');

function Chat(props) {
  useEffect(() => {
    socketIO.on('room1', (msg) => console.log(msg));
  })
  return (
    <div className={styles.chat_container}>
      Chat
    </div>
  );
}

export default Chat;