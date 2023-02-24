import React, { useEffect, useState } from 'react';
import styles from './chat.module.css';
import {io} from 'socket.io-client';

function Chat({meetId}) {

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    console.log(meetId);
    setSocket(io('http://localhost:8081', {
      query: { id: meetId }
    }));
  }, [meetId]);


  const sendMessageHandler = () => {
    socket.emit('message', message);
    console.log('message',message);
    setMessage("");
  }

  useEffect(() => {
    if(socket){
      socket.on('message', (msg) => {
        console.log('🔥',msg);
        setChat([...chat, msg]);
      });
    }
  }, [socket, chat]);

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