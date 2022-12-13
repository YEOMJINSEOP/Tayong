import React, { useState } from 'react';
import styles from './meetDetail.module.css'
import { FiCalendar} from 'react-icons/fi';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../../service/getData';
import postData from '../../service/postData';

function MeetDetail(props) {

  let params = useParams();
  console.log(`🐥🥕🐽🐽🐽`, (params['*'].split('/'))[1]);
  let param_userId = (params['*'].split('/'))[1];

  console.log(param_userId);


  const navigate = useNavigate();


  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [transport, setTransport] = useState("");
  const [hostId, setHostId] = useState("user");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [randomKey, setRandomKey] = useState("");
  const[loginId, setLoginId] = useState("로그인");

  //-----------------ML 파트 결과 받아오기--------------------//
  const[resultML, setResultML] = useState(0);
  // 99번째 줄로 이동
  // 아직 받아와서 실행하는 코드는 없음.
  //----------------------------------------------//


  const imgTransport = 'https://img.freepik.com/free-photo/man-driving-car-from-rear-view_1359-494.jpg?w=1800&t=st=1667398765~exp=1667399365~hmac=8304fbbb3ab8792ecbc4535a7e8d5241ae499a2c44d4922f5de295d8b8df3d8f';
  const imgTaxi = 'https://img.freepik.com/free-photo/taxi-sign-roof-top-car_74190-1728.jpg?w=1800&t=st=1667398413~exp=1667399013~hmac=efcccc4afa78711c2ff1407418bf496be6c0ddf73fe37c1c3ecf06f936d5bc24'; 


  //-----------------참여하기 버튼--------------------//
  // 로그인 정보 받아오기
  useEffect(() => {
    
    const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    getData(getUrl)
      .then(data => {
        const loginId = data.data[0]['loginId'];
        setLoginId(loginId);
      })  
  }, [])


  // 참여하기 버튼 누르면 id와 meetId 전송하기
  const onJoinHandler = () => {
    // 참여하는 loginId를 participateUrl로 post합니다.
    const joinUrl = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/participate"

    // 로그인 되어있지 않으면 경고창을 띄웁니다.
    if(loginId == '로그인'){
      alert('참여하려면 로그인이 필요합니다');
    }

    // 로그인 되어있으면 참여 데이터를 전송하고, 해당 모임 페이지로 이동합니다. 이때 randomKey로 url 이동합니다.
    else{
      let joinData = {
        loginId: loginId,
        randomKey: randomKey  // 참여하기 버튼을 누르면 로그인 한 아이디와, randomKey가 joinData로 전송됩니다.
      }
      console.log('joinData', joinData);
      postData(joinUrl, joinData);
      navigate(`/participate/${randomKey}/${param_userId}`);
    }
  }

  //----------------------------------------------//


//-----------------데이터 받아오기-------------------//
  let param = useParams();

  useEffect(() => {
    fetch('https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getmeetdetail')
    .then(res => res.json())
    .then(data => {
      
      var k=0;
      for (var i = 0; i < data.length; i++) {
        if(data[i].randomKey==param['*'].split('/')[0]){     // 이제 제목이 아닌 randomKey로 해당 모임 정보를 가져옵니다!
            k=i;
            
        }
        
      }
      // console.log("dd"+param['*'].split('/'));
      setDeparture(data[k].departure);
      setArrival(data[k].arrival);
      setRemainingTime(data[k].remainingTime);
      setRecruitment(data[k].recruitment);
      setTransport(data[k].transport);
      setTitle(data[k].title);
      setContent(data[k].content);
      setHostId(data[k].id == 0? "user" : data[k].id );
      setRandomKey(data[k].randomKey);   // randomKey를 meetDetail에서도 받아와서 갖고 있습니다.
      // setResultML(JSON.parse(data['body'])[k].ML_recognition); // ML_recognition 받아와서 resultML로 저장
      console.log("this meet UUID = ",data[k].randomKey);
      
    });
  }, [])
  //----------------------------------------------//
  const selectImg = (transport) => {
    if(transport == '자가용'){
      return imgTransport;
    } else{
      return imgTaxi;
    }
  }

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
              {/* <div className={styles.userAvatar}></div> */}
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
          {/* <button className={styles.btn_chat}><a href="http://tayongchat.s3-website.ap-northeast-2.amazonaws.com/">채팅하기</a></button> */}
          <button className={styles.btn_backToList} onClick={() => {
            navigate(-1);
          }}>목록으로</button>
          <button className={styles.btn_join} onClick={onJoinHandler}>참여하기</button>
        </div>
    </div>
  );
}

export default MeetDetail;