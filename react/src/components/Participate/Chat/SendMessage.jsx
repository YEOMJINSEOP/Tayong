// import { Input, Button } from '@material-ui/core';
import React, {useState, useParams, useEffect} from 'react';
import { db, auth } from '../firebase';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';

function SendMessage({ scroll, meetUUID }) {
    const [msg, setMsg] = useState('')
    console.log("snedmessage", {meetUUID});

    async function sendMessage(e){
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser

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
                    <input placeholder='메시지를 입력해 주세요.' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button type="submit">전송</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage