import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './meet.module.css';

function Meet({meetId, host, title, departure, arrival, recruitment, meetDate, meetTime, transport}) {

  const navigate = useNavigate();
  const onClickHandler = (e) => {
    console.log('Meet Click 🥕');
    navigate(`/detail/${meetId}`);
  }

  return (
  <li className={styles.meet} onClick={onClickHandler}>
    <div className={styles.infoImage}>
      <img 
      src= {`image/${transport}.jpeg`}
      alt="transport img" 
      className={styles.transportImg}
      />
    </div>
    <div className={styles.title}>
      <div className={styles.infoDeparture}>
      {title}
      </div> 
    </div>
    <div className={styles.infoSet}>
      <div className={styles.infoRecruitment}>
        <p>모집인원</p>
        <span className={styles.recruitment}>{recruitment}</span>
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