// import { Input, Button } from '@material-ui/core';
import React, {useState, useParams, useEffect} from 'react';
import { db, auth } from '../firebase';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    const [meetUUID, setMeetUUID] = useState("temp uuid"); // 추가

    const url = ' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/sendparticipate';
     useEffect(() => {
         fetch(url)
         .then(res => res.json())
         .then(data => {
             {
             setMeetUUID(JSON.parse(data['body'])[0].randomKey);
           }
         });
       }, []) // 추가

    async function sendMessage(e){
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser

        // await db.collection('messages').add({
        //     text: msg,
        //     photoURL,
        //     uid,
        //     createdAt: firebase.firestore.FieldValue.serverTimestamp()
        // })
        // setMsg('')
        // scroll.current.scrollIntoView({ behavior: 'smooth' })
        await db.collection('tayongMessage').doc('chat').collection(meetUUID).add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button style={{ width: '18%', fontSize: '15px', fontWeight: '550',  maxWidth: '200px'}} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage