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
    const imgTransport = 'https://img.freepik.com/free-photo/man-driving-car-from-rear-view_1359-494.jpg?w=1800&t=st=1667398765~exp=1667399365~hmac=8304fbbb3ab8792ecbc4535a7e8d5241ae499a2c44d4922f5de295d8b8df3d8f';
    const imgTaxi = 'https://img.freepik.com/free-photo/taxi-sign-roof-top-car_74190-1728.jpg?w=1800&t=st=1667398413~exp=1667399013~hmac=efcccc4afa78711c2ff1407418bf496be6c0ddf73fe37c1c3ecf06f936d5bc24'; 
    if(transport == '자가용'){
      return imgTransport;
    } else{
      return imgTaxi;
    }
  }

  useEffect(() => {
    const paramMeetId = params['*'];
    console.log(paramMeetId);
    const meetURL = '/data/meet.json';
    getData(meetURL)
    .then(res => {return res['data']})
    .then(meetData => {
      console.log(meetData);
      meetData.map(meet => {
      console.log(meet['id']);
      console.log(paramMeetId);
      if(meet['id'] === paramMeetId){return meet}
    })})
    .then(meetSelected => {
      console.log(meetSelected);
    })
    // .then(data => {
    //   let meetSelected;
    //   const meetRandomKey = params['*'].split('/')[1];
    //   for (let i = 0; i < data.length; i++) {
    //     if(data[i].randomKey== meetRandomKey){     
    //         meetSelected = i;
    //     }
    //   }
    //   const infoMeetSelected = data[meetSelected];
    //   setDeparture(infoMeetSelected.departure);
    //   setArrival(infoMeetSelected.arrival);
    //   setRemainingTime(infoMeetSelected.remainingTime);
    //   setRecruitment(infoMeetSelected.recruitment);
    //   setTransport(infoMeetSelected.transport);
    //   setTitle(infoMeetSelected.title);
    //   setContent(infoMeetSelected.content);
    //   setHostId(infoMeetSelected.id == 0? "user" : infoMeetSelected.id );
    //   setMeetId(infoMeetSelected.id); 
    // });
  }, [])

  return (
    <div className={styles.container}>
        <img className={styles.imgTransport} src= {selectImg(`${transport}`)} alt="transport image" />
        <div className={styles.locAndUserContainer}>
          <div className={styles.location}>
            <div className={styles.departure}>
              <label className={styles.meetDetailLable} htmlFor='departure'>출발</label>
              <input type="text" id='departure' name='departure' value={departure} readOnly/>
            </div>
            <div className={styles.arrival}>
              <label className={styles.meetDetailLable} htmlFor='arrival'>도착</label>
              <input type="text" id='arrival' name='arrival' value={arrival} readOnly/>
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.userInfoInfo}>모집자</div>
              <p>{hostId}</p>
            </div>
          </div>
        </div>
        <input className={styles.title} type="text" id='title' name='title' value={title} readOnly/>
        <div className={styles.info}>
          <div className={styles.recruitment}>
            <label className={styles.meetDetailLable} htmlFor='recruitment'>모집인원</label>
            <input type="text" id='recruitment' name='recruitment' value={recruitment} readOnly/>
            <p>명</p>
          </div>
          <div className={styles.remainingTime}>
            <label className={styles.meetDetailLable} htmlFor='remainingTime'>출발일</label>
            <input  type="text" id='remainingTime' name='remainingTime' value={remainingTime} readOnly/>
          </div>
        </div>

        <div className={styles.content}>
            <textarea cols="88" rows="6" maxLength="300" name='content' value={content} readOnly></textarea>
        </div>

        <div className={styles.btns}>
          <button className={styles.btn_backToList} onClick={() => {navigate(-1);}}>목록으로</button>
          <button className={styles.btn_join}>참여하기</button>
        </div>
    </div>
  );
}

export default MeetDetail;