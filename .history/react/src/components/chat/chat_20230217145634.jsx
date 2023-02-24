import React, { useEffect } from 'react';
import styles from './chat.module.css';
import socket from 'socket.io-client';

const socketServer = socket('http://localhost:8080');

function Chat(props) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    socket.emit("chatRoom", message);
    setMessage("");
  }
  useEffect(() => {
    socketServer.on('chatRoom', (message) => {
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