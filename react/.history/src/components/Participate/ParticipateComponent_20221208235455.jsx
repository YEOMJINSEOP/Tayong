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
                    {user ? <Chat /> : <SignIn />}
                </div>
            </div>

        </div>
    );
};
