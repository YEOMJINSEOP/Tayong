import React, { useEffect, useState } from 'react';
import BoxLayout from '../components/boxLayout/BoxLayout';
import styles from './Member.module.css';
import User from '../components/User/User';
import getData from '../../../service/getData';
import { useNavigate, useParams } from 'react-router-dom';

export default function Member(props) {

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
        //     //setUserList(JSON.parse(data['body'])[k].Id);

        //   }

        // }
        const newList = JSON.parse(data['body']).filter((data)=>data.randomKey === param['*'].split('/')[0]);
        console.log(newList);
        setUserList(newList);
                //JSON.parse(data['body'])[i].Id 값이 참여자 데이터
      })
  }, []);
  
  return (
    
    <div className={styles.container}>
      <div>참여인원</div>
      <BoxLayout>
        <div className={styles.userContainer}>
          {userList.map((user) => (
            

            <div style={{marginRight:'10px'}}>{user.Id}</div>
          ))}
        </div>
      </BoxLayout>

    </div>
    
  )
}
