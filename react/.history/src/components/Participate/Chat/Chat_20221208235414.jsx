import React, {useState, useEffect, useRef, useParams} from "react";
import BoxLayout from "../components/boxLayout/BoxLayout";
import styles from './Cha.css';
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";
// import SignOut from "./SignOut";
import uuid from 'react-uuid';
import getData from '../../../service/getData';


function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([]);

    console.log("CHAT!!");
    // const url = ' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/sendparticipate';
    // useEffect(() => {
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //         {
    //         const meetUUID = (JSON.parse(data['body'])[0].randomKey);
    //         db.collection('tayongMessage').doc('chat').collection(meetUUID).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
    //             setMessages(snapshot.docs.map(doc => doc.data()))
    //             // console.log("meetUUID", meetUUID);
    //         })
    //       }
    //     })

    //   }, [])

    const [userList, setUserList] = useState([]);
    const url = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/sendparticipate'
    let param = useParams();
    var k = 0;
    useEffect(() => {
      getData(url)
        .then(res => res['data'])
        .then(data => {
          // for (var i = 0; i < JSON.parse(data['body']).length; i++) {
          //   if (JSON.parse(data['body'])[i].randomKey == param['*'].split('/')[0]) {     // 이제 제목이 아닌 randomKey로 해당 모임 정보를 가져옵니다!
          //     k = i;
          //     console.log("userId", JSON.parse(data['body'])[i].Id);
          //     // JSON.parse(data['body'])[i].Id
          //     setUserList([...userList, JSON.parse(data['body'])[k].Id]);
  
          //   }
  
          // }
          const newList = JSON.parse(data['body']).filter((data)=>data.randomKey === param['*'].split('/')[0]);
          console.log(newList);
          setUserList(newList);
                  //JSON.parse(data['body'])[i].Id 값이 참여자 데이터
        })
    }, []);
  

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
                        <SendMessage scroll={scroll} />   
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
