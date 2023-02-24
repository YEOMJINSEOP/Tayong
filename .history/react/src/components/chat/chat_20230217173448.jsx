import React, { useEffect, useState } from 'react';
import styles from './chat.module.css';
import {io} from 'socket.io-client';



function Chat({meetId}) {
  const socket = io('http://localhost:8080', {
    query: {id: '257565'}
  });
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    socket.emit("room1", message);
    console.log('message: ',message);
    setMessage("");
  }

  useEffect(() => {
    socket.on("room1", (msg) => {
      console.log(msg);
    })
  })

  useEffect(() => {
    socket.on('room1', (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  return (
    <div className={styles.chat_container}>
      <ul className={styles.chat_box}>
        {chat.map((data, idx) => {
          return <li key={idx} className={styles.chat}>{data}</li>
        })}
      </ul>
      <div className={styles.input_container}>
        <input className={styles.chat_input} type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className={styles.send_btn}onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
}

export default Chat;