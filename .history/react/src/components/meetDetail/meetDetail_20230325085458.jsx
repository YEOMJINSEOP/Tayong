import React, { useState, useEffect} from 'react';
import styles from './meetDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetDataById, onUserStateChange, addMeetParticipant, removeMeetParticipant, removeMeetbyId } from '../../apis/firebase';
import Chat from '../chat/chat';

function MeetDetail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [meet, setMeet]= useState({meetId: '', host:'', departure:'', arrival:'', meetTime: '', recruitment: 0, participant: [], transport: '', title: '', content: ''});
  const [userMail, setUserMail] = useState('');
  const [isParticipate, setIsParticipate] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isHost, setIsHost] = useState(false);
  
  useEffect(() => {
    onUserStateChange(
      (user) => {
        setUserMail(user.email);
      } 
    );
  }, []);

  useEffect(() => {
    const meetId = params.meetId;
    getMeetDataById(meetId)
    .then(meet => {
      if(meet.participant.includes(userMail)){
        setIsParticipate(true);
      }
      setMeet(meet);
      setIsHost(meet.host === userMail);
      setIsFull(meet.participant.length >= meet.recruitment);
    })
  }, [userMail, isParticipate]);

  const participateHandler = () => {
    if(!userMail){
      alert('로그인이 필요합니다.');
      return;
    }
    if(isParticipate){
      alert('이미 참여중인 모입입니다.');
      return;
    }
    else{
      setIsParticipate(true);
      addMeetParticipant(meet.meetId, meet.participant, userMail);
    }
  }

  const quitHandler = () => {
    if(meet.host === userMail){
      alert('호스트는 모임을 나갈 수 없습니다.');
      return;
    }
    removeMeetParticipant(meet.meetId, meet.participant, userMail);
    setIsParticipate(false);
  }

  const deleteHandler = () => {
    removeMeetbyId(meet);
    navigate(-1);
  }


  return (
    <div className={styles.container}>
      <div className={styles.meetContainer}>
          <img className={styles.image} src= {meet.transport ? `image/${meet.transport}.jpeg` : ''} alt="transport image" />
          <div className={styles.locAndUserContainer}>
            <div className={styles.location}>
              <div className={styles.departure}>
                <p className={styles.meetDetailLable} htmlFor='departure'>출발</p>
                <div className={styles.detailSpan}>{meet.departure}</div>
              </div>
              <div className={styles.arrival}>
                <p className={styles.meetDetailLable} htmlFor='arrival'>도착</p>
                <div className={styles.detailSpan}>{meet.arrival}</div>
              </div>
            </div>
            <div className={styles.transport}>
                <p className={styles.meetDetailLable} htmlFor='transport'>이동수단</p>
                <div className={styles.detailSpan}>{meet.transport}</div>
            </div>
            <div className={styles.participantContainer}>
                <p className={styles.meetDetailLable}>참여자</p>
                <ul className={styles.participantList}>
                  {meet.participant.map((user, idx) => 
                      {return <li key={idx}>{user}</li>}
                  )}
                </ul>
            </div>
          </div>
          <div className={styles.title}>
            <p className={styles.meetDetailLable} htmlFor='title'>제목</p>
            <span className={styles.detailSpan}>{meet.title}</span>
          </div>
          <div className={styles.info}>
            <div className={styles.recruitment}>
              <p className={styles.meetDetailLable} htmlFor='recruitment'>모집인원</p>
              <div className={styles.detailSpan}>{meet.recruitment} 명</div>
            </div>
            <div className={styles.meetTime}>
              <p className={styles.meetDetailLable} htmlFor='meetTime'>출발시간</p>
              <div className={styles.time}>{meet.meetTime.time}</div>
              <div className={styles.date}>{meet.meetTime.date}</div>
            </div>
          </div>

          <div className={styles.content}>
              <p className={styles.meetDetailLable} htmlFor='meetTime'>내용</p>
              <div className={styles.detailSpan}>{meet.content}</div>
          </div>

          <div className={styles.btns}>
            <button className={styles.btn_backToList} onClick={() => {navigate(-1);}}>목록으로</button>
            {!isParticipate && !isFull && <button className={styles.btn_join} onClick={participateHandler}>참여하기</button>}          
            {!isParticipate && isFull && <button className={styles.btn_full}>모집마감</button>}
            {isParticipate && !isHost && <button className={styles.btn_quit} onClick={quitHandler}>나가기</button>}
            {isHost && <button className={styles.btn_delete} onClick={deleteHandler}>삭제하기</button>}
          </div>
      </div>
      <div className={styles.chatContainer}>
        {isParticipate && <Chat meetId={params.meetId}/>}
        {!isParticipate && <div className={styles.chat_blocker}>모임에 참여하면 채팅이 가능합니다.</div>}
      </div>
    </div>
  );
}

export default MeetDetail;