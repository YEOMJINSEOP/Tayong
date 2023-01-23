import React, { useState } from 'react';
import styles from './meetDetail.module.css'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postData from '../../service/postData';
import getData from '../../service/getData';

function MeetDetail(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [transport, setTransport] = useState("");
  const [hostId, setHostId] = useState("user");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [meetId, setMeetId] = useState("");
   
  const selectImg = (transport) => {
    const imgSelfDriving = 'image/self-driving.jpeg';
    const imgTaxi = 'image/taxi.jepg'; 
    if(transport == '자가용'){
      return imgSelfDriving;
    } else{
      return imgTaxi;
    }
  }

  useEffect(() => {
    const paramMeetId = params['*'];
    console.log(paramMeetId);
    const meetURL = '/data/meet.json';
    getData(meetURL)
    .then(res => {
      const meetData = res['data'];
      const meetSelected = meetData.filter(meet => {
      if(meet['id'].toString() === paramMeetId){return meet}
      })[0];
      console.log(meetSelected);
      setDeparture(meetSelected.departure);
      setArrival(meetSelected.arrival);
      setRemainingTime(meetSelected.remainingTime);
      setRecruitment(meetSelected.recruitment);
      setTransport(meetSelected.transport);
      setTitle(meetSelected.title);
      setContent(meetSelected.content);
      setMeetId(meetSelected.id); 
    })
  }, [])

  return (
    <div className={styles.container}>
        <img className={styles.imgSelfDriving} src= {selectImg({transport})} alt="transport image" />
        <div className={styles.locAndUserContainer}>
          <div className={styles.location}>
            <div className={styles.departure}>
              <label className={styles.meetDetailLable} htmlFor='departure'>출발</label>
              {departure}
            </div>
            <div className={styles.arrival}>
              <label className={styles.meetDetailLable} htmlFor='arrival'>도착</label>
              {arrival}
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.userInfoInfo}>모집자</div>
              <p>{hostId}</p>
            </div>
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <div className={styles.recruitment}>
            <label className={styles.meetDetailLable} htmlFor='recruitment'>모집인원</label>
            {recruitment}
            <p>명</p>
          </div>
          <div className={styles.remainingTime}>
            <label className={styles.meetDetailLable} htmlFor='remainingTime'>출발일</label>
            {remainingTime}
          </div>
        </div>

        <div className={styles.content}>
            {content}
        </div>

        <div className={styles.btns}>
          <button className={styles.btn_backToList} onClick={() => {navigate(-1);}}>목록으로</button>
          <button className={styles.btn_join}>참여하기</button>
        </div>
    </div>
  );
}

export default MeetDetail;