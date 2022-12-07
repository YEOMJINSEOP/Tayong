import React, {useState, useEffect, useRef} from "react";
import BoxLayout from "../components/boxLayout/BoxLayout";
import styles from './Cha.css';
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";

function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div className="container">
            <div>채팅하기</div>
            <div className="box">
                <div style={{overflowY:"scroll", width: '100%'}}>
                    {/* <SignOut /> */}
                    <div className="msgs">
                        {messages.map(({id, text, photoURL, uid}) => (
                            <div key={id}>
                                
                                <div  className={`msg ${uid ==null ? 'sent' : 'received'}`}>
                                    <img src={photoURL} alt=""/>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <SendMessage scroll={scroll} />   
                    <div ref={scroll}></div> 
                </div>
            
            </div>
        </div>
    )
}

export default Chat
