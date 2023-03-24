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
  const [userMail, setUserMail] = useState("");

  const notificationHandler = (msg) => {
    if (!Notification) {
      console.warn('Notifications not supported in this browser.');
      return;
    }
  
    if (Notification.permission !== 'granted') {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') {
            return;
          } 
        })
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('active');
      const notificationOptions = {
        body: msg.message,
        icon: 'react/public/image/Tayong_Logo.png'
      }
      new Notification('title', notificationOptions);
    }
  }

  useEffect(() => {
    onUserStateChange(
      (user) => {
        setUserMail(user.email);
      } 
    );
  }, [])
  
  useEffect(() => {
    setSocket(io(process.env.REACT_APP_CHAT_SERVER_URL, {
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
        notificationHandler(msg);
      });
    }
  }, [socket, chat]);


  const sendMessageHandler = (e) => {
    if(message.trim().length === 0){
      return;
    }
    if(e.code === 'Enter' || e.type === 'click'){
      socket.emit('message', {
        userMail: userMail,
        message: message
      });
      addChat(meetId, userMail, message);
      setMessage("");
    }
  }



  return (
    <div className={styles.container}>
      <div className={styles.chat_container} ref={chatRef}>
        <ul className={styles.chat_box}>
          {chat.map((data, idx) => {
            return <li key={idx} className={userMail === data.userMail ? styles.chat_mine : styles.chat_other}>
                      <p className={styles.chat_usermail}>{data.userMail}</p>
                      <div className={styles.chat_message}>{data.message}</div>
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