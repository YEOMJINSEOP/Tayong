import React, { useState } from 'react';
import styles from './Info.module.css'
import { FiCalendar } from 'react-icons/fi';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../../../service/getData';
import postData from '../../../service/postData';

function Info(props) {

  const navigate = useNavigate();


  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [transport, setTransport] = useState("");
  const [hostId, setHostId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [randomKey, setRandomKey] = useState("");
  const [loginId, setLoginId] = useState("로그인");

  const imgTransport = 'https://img.freepik.com/free-photo/man-driving-car-from-rear-view_1359-494.jpg?w=1800&t=st=1667398765~exp=1667399365~hmac=8304fbbb3ab8792ecbc4535a7e8d5241ae499a2c44d4922f5de295d8b8df3d8f';
  const imgTaxi = 'https://img.freepik.com/free-photo/taxi-sign-roof-top-car_74190-1728.jpg?w=1800&t=st=1667398413~exp=1667399013~hmac=efcccc4afa78711c2ff1407418bf496be6c0ddf73fe37c1c3ecf06f936d5bc24';


  //-----------------추가된 부분 --------------------//
  // 로그인 정보 받아오기
  useEffect(() => {
    //const getUrl="https://iszyx4amug.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue"
    const getUrl = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue"
    getData(getUrl)
      .then(data => {
        const loginId = data.data['loginId'];
        setLoginId(loginId);
      })
  }, [])


  // 참여하기 버튼 누르면 id와 meetId 전송하기
  const onJoinHandler = () => {
    // 참여하는 loginId를 participateUrl로 post합니다.
    const joinUrl = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/participate"

    // 로그인 되어있지 않으면 경고창을 띄웁니다.
    if (loginId == '로그인') {
      alert('참여하려면 로그인이 필요합니다');
    }

    // 로그인 되어있으면 참여 데이터를 전송하고, 해당 모임 페이지로 이동합니다. 이때 meetTitle로 url 이동합니다.
    else {
      let joinData = {
        loginId: loginId,
        meetTitle: title
      }
      console.log('joinData', joinData);
      postData(joinUrl, joinData);
      navigate(`/participate/${joinData.meetTitle}`);
    }
  }

  //----------------------------------------------//
  let param = useParams();

  const onClickHandler = () => {

    const exitUrl = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev//exitparticipate";
    let exitData = {
      loginId: loginId
    }
    postData(exitUrl, exitData);
    console.log("exitdData", exitData);
  }



  useEffect(() => {
    fetch('https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getmeetdetail')
      //fetch('https://iszyx4amug.execute-api.ap-northeast-2.amazonaws.com/dev/getmeetdetail')
      .then(res => res.json())
      .then(data => {
        var k = 0;
        for (var i = 0; i < JSON.parse(data['body']).length; i++) {
          if (JSON.parse(data['body'])[i].randomKey == param['*'].split('/')[0]) {
            k = i;

          }
        }

        setDeparture(JSON.parse(data['body'])[k].departure);
        setArrival(JSON.parse(data['body'])[k].arrival);
        setRemainingTime(JSON.parse(data['body'])[k].remainingTime);
        setRecruitment(JSON.parse(data['body'])[k].recruitment);
        setTransport(JSON.parse(data['body'])[k].transport);
        setTitle(JSON.parse(data['body'])[k].title);
        setContent(JSON.parse(data['body'])[k].content);
        setHostId(JSON.parse(data['body'])[k].id == 0? "user" : JSON.parse(data['body'])[k].id );
        setRandomKey(JSON.parse(data['body'])[k].randomKey);
      });
  }, [])

  const selectImg = (transport) => {
    if (transport == '자가용') {
      return imgTransport;
    } else {
      return imgTaxi;
    }
  }

  return (
    <div>
      <div>모임정보</div>
      <div className={styles.container}>
        <img className={styles.imgTransport} src={selectImg(`${transport}`)} alt="transport image" />
        <div className={styles.locAndUserContainer}>
          <div className={styles.location}>
            <div className={styles.departure}>
              <label className={styles.meetDetailLable} htmlFor='departure'>출발</label>
              <input type="text" id='departure' name='departure' value={departure} readOnly />
            </div>
            <div className={styles.arrival}>
              <label className={styles.meetDetailLable} htmlFor='arrival'>도착</label>
              <input type="text" id='arrival' name='arrival' value={arrival} readOnly />
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <p className={styles.userInfoInfo}>모집자</p>
              <p>{hostId}</p>
            </div>
          </div>
        </div>
        {/* <input className={styles.title} type="text" id='title' name='title' value={title} readOnly/> */}
        <div className={styles.info}>
          <div className={styles.recruitment}>
            <label className={styles.meetDetailLable} htmlFor='recruitment'>모집인원</label>
            <input type="text" id='recruitment' name='recruitment' value={recruitment} readOnly />
            <p>명</p>
          </div>
          <div className={styles.remainingTime}>
            <label className={styles.meetDetailLable} htmlFor='remainingTime'>마감시간</label>
            <input type="text" id='remainingTime' name='remainingTime' value={remainingTime} readOnly />
          </div>
        </div>

        <div className={styles.content}>
          <textarea cols="88" rows="5" maxLength="300" name='content' value={content} readOnly></textarea>
        </div>
      </div>
      <button className={styles.btnOut} onClick = {onClickHandler}>모임 나가기</button>
    </div>
  );
}

export default Info;