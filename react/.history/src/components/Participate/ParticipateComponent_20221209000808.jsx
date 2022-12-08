import React, { useEffect, useState } from 'react';
import Chat from './Chat/Chat';
import Info from './Info/Info';
import Member from './Member/Member';
import styles from './ParticipateComponent.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './Chat/SignIn';
import { auth } from './firebase';
import { useParams } from 'react-router-dom';
import getData from '../../service/getData';


export default function ParticipateComponent() { 

    let meetUUID = "";
    const [uid, setUid] = useState("");
    const url = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/sendparticipate'
    let param = useParams();
    var k = 0;
    useEffect(() => {
      getData(url)
        .then(res => res['data'])
        .then(data => {
          const newList = JSON.parse(data['body']).filter((data)=>data.randomKey === param['*'].split('/')[0]);
          console.log("PC NewList", newList);
          console.log("parse", JSON.parse(data['body'])[0].randomKey);
          meetUUID = JSON.parse(data['body'])[0].randomKey
          console.log("final", meetUUID);
          setUid(meetUUID);
          console.log("real final", {uid});
        })
    }, []);
  
    const [user] = useAuthState(auth)
    return (
        <div className={styles.container}>
            <div className={styles.containertwo}>
                <div className={styles.leftcontainer}>
                    <div className={styles.top}>
                        <Member />
                    </div>

                    <div className={styles.bottom}>
                        <Info />
                    </div>
                </div>
                <div className={styles.rightcontainer}>
                    {user ? <Chat meetUUID={uid} /> : <SignIn />}
                </div>
            </div>

        </div>
    );
};
