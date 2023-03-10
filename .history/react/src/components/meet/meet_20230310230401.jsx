import React from 'react';
import { useNavigate} from 'react-router-dom';
import styles from './meet.module.css';

function Meet({meetId, host, title, departure, arrival, recruitment, meetDate, meetTime, transport, participant}) {

  const navigate = useNavigate();
  const isFull = participant.length >= recruitment;
  const onClickHandler = (e) => {
      navigate(`/detail/${meetId}`);
  }

  return (
  <li className={isFull? styles.meet_full : styles.meet} onClick={onClickHandler}>
    <div className={styles.infoImage}>
      <img 
      src= {`image/${transport}.jpeg`}
      alt="transport img" 
      className={styles.transportImg}
      />
    </div>
    <div className={styles.infoLocation}>
      <div className={styles.title}>
      {title.substring(0, 10)}
      </div> 
    </div>
    <div className={styles.infoSet}>
      <div className={styles.infoRecruitment}>
        <p>모집인원</p>
        <span className={styles.recruitment}>{participant.length} / {recruitment}</span>
      </div>
      <div className={styles.infoTime}>
        <p>출발시간</p>
        <span className={styles.time}>{meetTime}</span>
        <span className={styles.date}>{meetDate} </span>
      </div>
    </div>
  </li>
  );
}

export default Meet;