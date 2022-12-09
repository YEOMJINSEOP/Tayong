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

    // 12/09 작성 - 이전 목록으로 돌아가기 
    const navigate = useNavigate();

    const [uid, setUid] = useState("");
    let param = useParams();
    console.log(param['*']);
    const meetUUID = param['*'];
    // setUid(meetUUID);
    // console.log("look at", uid);


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

            {/* 12/09 작성 - 이전으로 돌아가는 버튼 추가 */}
            <div className={styles.btns_participate}>
                <button className={styles.btn_backToDetail} onClick={() => {
                    navigate(-1);
                }}>이전으로</button>
            </div>
        </div>
    );
};