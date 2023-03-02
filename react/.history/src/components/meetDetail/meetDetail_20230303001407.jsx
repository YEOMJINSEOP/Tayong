import React, { useState, useEffect} from 'react';
import styles from './meetDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetDataById, onUserStateChange, addMeetParticipant, removeMeetParticipant, removeMeetbyId } from '../../apis/firebase';
import Chat from '../chat/chat';

function MeetDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [meet, setMeet]= useState({meetId: '', host:'', departure:'', arrival:'', meetTime: '', recruitment: 0, participant: [], transport: '', title: '', content: ''});
  const [userName, setUserName] = useState('');
  const [isParticipate, setIsParticipate] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isHost, setIsHost] = useState(false);
  
  useEffect(() => {
    onUserStateChange(
      (user) => {
        setUserName(user.displayName);
      } 
    );
  }, []);

  useEffect(() => {
    const meetId = params.meetId;
    getMeetDataById(meetId)
    .then(meet => {
      if(meet.participant.includes(userName)){
        setIsParticipate(true);
      }
      setMeet(meet);
      setIsHost(meet.host === userName);
      setIsFull(meet.participant.length >= meet.recruitment);
    })
  }, [userName, isParticipate]);

  const participateHandler = () => {
    if(!userName){
      alert('로그인이 필요합니다.');
      return;
    }
    if(isParticipate){
      alert('이미 참여중인 모입입니다.');
      return;
    }
    else{
      setIsParticipate(true);
      addMeetParticipant(meet.meetId, meet.participant, userName);
    }
  }

  const quitHandler = () => {
    if(meet.host == userName){
      alert('호스트는 모임을 나갈 수 없습니다.');
      return;
    }
    removeMeetParticipant(meet.meetId, meet.participant, userName);
    setIsParticipate(false);
  }

  const deleteHandler = (meet) => {
    removeMeetbyId(meet);
  }


  return (
    <div className={styles.container}>
      <div className={styles.meetContainer}>
          <img className={styles.image} src= {meet.transport ? `image/${meet.transport}.jpeg` : ''} alt="transport image" />
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
            <div className={styles.participantContainer}>
                <div className={styles.participantLabel}>참여자</div>
                <ul className={styles.participantList}>
                  {meet.participant.map((user, idx) => 
                      {return <li key={idx}>{user}</li>}
                  )}
                </ul>
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
            {!isParticipate && !isFull && <button className={styles.btn_join} onClick={participateHandler}>참여하기</button>}          
            {!isParticipate && isFull && <button className={styles.btn_full}>모집마감</button>}
            {isParticipate && !isHost && <button className={styles.btn_quit} onClick={quitHandler}>나가기</button>}
            {isHost && <button className={styles.btn_delete} onClick={deleteHandler}>삭제하기</button>}
          </div>
      </div>
      {isParticipate && <Chat meetId={params.meetId}/>}
      {!isParticipate && <div className={styles.chat_blocker}>모임에 참여하면 채팅이 가능합니다.</div>}
    </div>
  );
}

export default MeetDetail;