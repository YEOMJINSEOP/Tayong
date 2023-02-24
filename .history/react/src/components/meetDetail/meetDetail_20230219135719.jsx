import React, { useState, useEffect } from 'react';
import styles from './meetDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetDataById, onUserStateChange, updateMeetParticipant } from '../../apis/firebase';
import Chat from '../chat/chat';

function MeetDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [meet, setMeet]= useState({meetId: '', host:'', departure:'', arrival:'', meetTime: '', recruitment: 0, participant: [], transport: '', title: '', content: ''});
  const [userName, setUserName] = useState('');
  useEffect(() => {
    onUserStateChange(
      (user) => {
        setUserName(user.displayName);
      } 
    );
  }, []);

  const participateHandler = () => {
    // if(meet.participant.includes(userName)){
    //   alert('이미 참여중인 모입입니다.');
    //   return;
    // }
    updateMeetParticipant(meet.meetId, meet.participant, userName);
  }

  useEffect(() => {
    const meetId = params.meetId;
    getMeetDataById(meetId)
    .then(meet => {
      console.log(meet);
      setMeet(meet);
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.meetContainer}>
          <img className={styles.image} src= {`image/${meet.transport}.jpeg`} alt="transport image" />
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
                <div className={styles.userInfoInfo}>참여자</div>
                <span>{meet.participant}</span>              
              </div>
            </div>
          </div>
          <div className={styles.title}>{meet.title}</div>
          <div className={styles.info}>
            <div className={styles.recruitment}>
              <label className={styles.meetDetailLable} htmlFor='recruitment'>모집인원</label>
              <span>{meet.recruitment} 명</span>
            </div>
            <div className={styles.meetTime}>
              <label className={styles.meetDetailLable} htmlFor='meetTime'>출발시간</label>
              <span className={styles.time}>{meet.meetTime.time}</span>
              <span className={styles.date}>{meet.meetTime.date}</span>
            </div>
          </div>

          <div className={styles.content}>
              {meet.content}
          </div>

          <div className={styles.btns}>
            <button className={styles.btn_backToList} onClick={() => {navigate(-1);}}>목록으로</button>
            <button className={styles.btn_join} onClick={participateHandler}>참여하기</button>
          </div>
      </div>
      <Chat meetId={params.meetId}/>
    </div>
  );
}

export default MeetDetail;