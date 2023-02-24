import React, { useEffect, useState } from 'react';
import styles from './chat.module.css';
import {io} from 'socket.io-client';

const socket = io('http://localhost:8080');

function Chat(props) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    socket.emit("chatRoom", message);
    console.log('message: ',message);
    setMessage("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    })
  })
  useEffect(() => {
    socket.on('chatRoom', (message) => {
      setChat([...chat, message]);
    });
  }, [chat]);

  return (
    <div className={styles.chat_container}>
      <ul>
        {chat.map((data) => {
          return <li>{data}</li>
        })}
      </ul>
      <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
}

export default Chat;