import React, { useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';
import {io} from 'socket.io-client';
import { addChat, getChat, onUserStateChange } from '../../apis/firebase';

function Chat({meetId}) {
  const chatRef = useRef(null);
  useEffect(() => {
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  })
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
    setSocket(io('http://ec2-3-38-224-246.ap-northeast-2.compute.amazonaws.com:8083', {
      query: { id: meetId }
    }));
  }, [meetId]);

  async function getChatDataFromDB(meetId){
    let chatData;
    try{
      chatData = await getChat(meetId);
    } catch{
      chatData = [];
    }
    return chatData;
  }
  useEffect(() => {
    getChatDataFromDB(meetId).then((chatData) =>
      setChat(chatData)
    )
  }, []);
  
  useEffect(() => {
    if(socket){
      socket.on('message', (msg) => {
        setChat([...chat, msg]);
      });
    }
  }, [socket, chat]);


  const sendMessageHandler = (e) => {
    if(message.trim().length === 0){
      return;
    }
    if(e.code === 'Enter' || e.type === 'click'){
      socket.emit('message', {
        userName: userName,
        message: message
      });
      addChat(meetId, userName, message);
      setMessage("");
    }
  }



  return (
    <div className={styles.container}>
      <div className={styles.chat_container} ref={chatRef}>
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
          onKeyPress={sendMessageHandler}
           />
        <button className={styles.send_btn} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
}

export default Chat;