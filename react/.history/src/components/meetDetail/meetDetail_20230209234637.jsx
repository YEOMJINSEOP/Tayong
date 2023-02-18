import React, { useState } from 'react';
import styles from './meetDetail.module.css'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../../service/getData';

function MeetDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [meet, setMeet]= useState({meetId: '', host:'', departure:'', arrival:'', meetTime: '', recruitment: 0, transport: '', title: '', content: ''})

  const selectImg = (transport) => {
    const imgSelfDriving = 'meetmage/self-driving.jpeg';
    const imgTaxi = 'image/taxi.jpeg'; 
    if(transport === '자가용'){
      return imgSelfDriving;
    } else{
      return imgTaxi;
    }
  }

  useEffect(() => {
    const meetId = params.meetId;
    const meetURL = '/data/meet.json';
    getData(meetURL)
    .then(res => {
      const meetData = res.data;
      const meetSelected = meetData.filter(meet => 
        meet.meetId.toString() === meetId
      );
      setMeet(meetSelected[0]);
    })
  }, [])

  return (
    <div className={styles.container}>
        <img className={styles.image} src= {selectImg(meet.transport)} alt="transport image" />
        <div className={styles.locAndUserContainer}>
          <div className={styles.location}>
            <div className={styles.departure}>
              <label className={styles.meetDetailLable} htmlFor='departure'>출발</label>
              {meet.departure}
            </div>
            <div className={styles.arrival}>
              <label className={styles.meetDetailLable} htmlFor='arrival'>도착</label>
              {meet.arrival}
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.userInfoInfo}>모집자</div>
              <p className={styles.hostId}>{meet.hostId}</p>
            </div>
          </div>
        </div>
        <div className={styles.title}>{meet.title}</div>
        <div className={styles.info}>
          <div className={styles.recruitment}>
            <label className={styles.meetDetailLable} htmlFor='recruitment'>모집인원</label>
            <span>{meet.recruitment}명</span>
          </div>
          <div className={styles.meetTime}>
            <label className={styles.meetDetailLable} htmlFor='meetTime'>출발일</label>
            {meet.meetTime}
          </div>
        </div>

        <div className={styles.content}>
            {meet.content}
        </div>

        <div className={styles.btns}>
          <button className={styles.btn_backToList} onClick={() => {navigate(-1);}}>목록으로</button>
          <button className={styles.btn_join}>참여하기</button>
        </div>
    </div>
  );
}

export default MeetDetail;