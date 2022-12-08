import React, {useState, useEffect, useRef, useParams} from "react";
import BoxLayout from "../components/boxLayout/BoxLayout";
import styles from './Cha.css';
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
// import SignOut from "./SignOut";
import uuid from 'react-uuid';
import getData from '../../../service/getData';


function Chat({meetUUID}) {
    const scroll = useRef()
    const [messages, setMessages] = useState([]);

    console.log("CHAT!!", meetUUID);
    useEffect(() => {
        db.collection('tayongMessage').doc('chat').collection(meetUUID).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
            // console.log("meetUUID", meetUUID);
        })
      }, [])

    

    return (
        <div className="container">
            <div>채팅하기</div>
            <div className="box">
                <div className="chatbox">
                    {/* <SignOut /> */}
                    <div className="msgs">
                        {messages.map(({id, text, photoURL, uid}) => (
                            <div key={id}>
                                <div  className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                {/* <div  className={`msg {'sent'}`}> */}
                                    <img src={photoURL} alt=""/>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={scroll}></div> 
                    </div>
                    <div>
                        <SendMessage scroll={scroll} meetUUID={meetUUID} />   
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
