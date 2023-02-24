import React, { useEffect, useState } from 'react';
import styles from './chat.module.css';
import {io} from 'socket.io-client';
import {useParams} from 'react-router-dom';
function Chat() {
  const {id} = useParams('');
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    console.log(id);
    setSocket(io('http://localhost:8080', {
      query: { id: id }
    }));
  }, [id]);


  const sendMessageHandler = () => {
    socket.emit(`${id}`, message);
    console.log(`${id}`,message);
    setMessage("");
  }

  useEffect(() => {
    if(socket){
      socket.on(`${id}`, (msg) => {
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