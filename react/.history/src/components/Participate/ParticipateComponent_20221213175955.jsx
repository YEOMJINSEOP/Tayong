import React, { useEffect, useState } from 'react';
import Chat from './Chat/Chat';
import Info from './Info/Info';
import Member from './Member/Member';
import styles from './ParticipateComponent.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './Chat/SignIn';
import { auth } from './firebase';
import { useNavigate, useParams } from 'react-router-dom'; // 12/09 작성 - useNavigate import 추가
import getData from '../../service/getData';


export default function ParticipateComponent() {

    let param = useParams();
    console.log('🐸🐸🐸🐸🐸', param);
    console.log('🟠🟠🟠🟠', (param['*'].split('/'))[1]);
    const meetUUID = (param['*'].split('/'))[1]

    // const [uid, setUid] = useState("");

   



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
                    {user ? <Chat meetUUID={meetUUID} /> : <SignIn />}
                </div>
            </div>
        </div>
    );
};