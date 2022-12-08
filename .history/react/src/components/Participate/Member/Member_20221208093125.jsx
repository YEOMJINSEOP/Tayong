import React, { useEffect, useState } from 'react';
import BoxLayout from '../components/boxLayout/BoxLayout';
import styles from './Member.module.css';
import User from '../components/User/User';
import getData from '../../../service/getData';
import { useParams } from 'react-router-dom';

export default function Member() {
  let param = useParams();
  const url = 'http://localhost:4000/sendparticipate'
  useEffect(() => {
    getData(url)
    .then(res => res['data'])
    .then(data => {
      for (var i = 0; i < JSON.parse(data['body']).length; i++) {
        if(JSON.parse(data['body'])[i].randomKey==param['*'].split('/')[0]){     // 이제 제목이 아닌 randomKey로 해당 모임 정보를 가져옵니다!
            k=i;
            console.log(JSON.parse(data['body'])[i].Id);



          }
        

      }
      
      //JSON.parse(data['body'])[i].Id 값이 참여자 데이터
    })
  }, []);
  
  
  
  
  
  return (
    <div className={styles.container}>
      <div>참여인원</div>
      <BoxLayout>
        <div className={styles.userContainer}>
          <User/>
          <User/>
          <User/>
        </div>
      </BoxLayout>
      
    </div>
  )
}
