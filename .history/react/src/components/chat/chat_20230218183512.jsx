import React, { useEffect, useState } from 'react';
import styles from './chat.module.css';
import {io} from 'socket.io-client';
import { onUserStateChange } from '../../apis/firebase';

function Chat({meetId}) {

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    onUserStateChange(
      (user) => {
        setUserName(user.displayName);
      } 
    );
  }, [])
  
  useEffect(() => {
    setSocket(io('http://localhost:8082', {
      query: { id: meetId }
    }));
  }, [meetId]);


  const sendMessageHandler = (e) => {
    if(e.target.value.trim().length === 0){
      return;
    }
    if(e.type === 'click'){
      console.log('hhh');
    }
    if(e.code === 'Enter' || e.type === 'click'){
      socket.emit('message', {
        userName: userName,
        message: message
      });
      setMessage("");
    }
  }

  useEffect(() => {
    if(socket){
      socket.on('message', (msg) => {
        setChat([...chat, msg]);
      });
    }
  }, [socket, chat]);

  return (
    <div className={styles.container}>
      <div className={styles.chat_container}>
        <ul className={styles.chat_box}>
          {chat.map((data, idx) => {
            return <li key={idx} className={userName === data.userName ? styles.myChat : styles.chat}>
                      <p>{data.userName}</p>
                      <div>{data.message}</div>
                    </li>
          })}
        </ul>
      </div>
      <div className={styles.input_container}>
        <input 
          className={styles.chat_input} 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={sendMessageHandler}
           />
        <button className={styles.send_btn} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
}

export default Chat;