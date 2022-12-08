// import { Input, Button } from '@material-ui/core';
import React, {useState, useParams, useEffect} from 'react';
import { db, auth } from '../firebase';
// import firebase from 'firebase';
import firebase from 'firebase/compat/app';

function SendMessage({ scroll, meetUUID }) {
    const [msg, setMsg] = useState('')
    console.log("snedmessage", {meetUUID});
    const meetUUID = {meetUUID};
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
                    <input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button style={{ width: '18%', fontSize: '15px', fontWeight: '550',  maxWidth: '200px'}} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage