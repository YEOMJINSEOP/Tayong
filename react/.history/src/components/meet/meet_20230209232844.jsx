import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './meet.module.css';

function Meet({meetId, hostId, title, departure, arrival, recruitment, meetTime, transport}) {

  const navigate = useNavigate();

  const selectImg = () => {
    const imgSelfDriving = 'image/self-driving.jpeg';
    const imgTaxi = 'image/taxi.jpeg'; 
    if(transport == '자가용'){
      return imgSelfDriving;
    } else{
      return imgTaxi;
    }
  }

  const onClickHandler = (e) => {
    console.log('Meet Click 🥕');
    navigate(`/detail/${meetId}`);
  }

  return (
  <li className={styles.meet} onClick={onClickHandler}>
    <div className={styles.infoImage}>
      <img 
      src= {selectImg()}
      alt="transport img" 
      className={styles.transportImg}
      />
    </div>
    <div className={styles.infoLocation}>
      <div className={styles.infoDeparture}>
        <p>출발</p>
      {departure}
      </div> 
      <FaArrowRight className={styles.arrow}/>
      <div className={styles.infoArrival}>
        <p>도착</p>
        {arrival}
      </div>
    </div>
    <div className={styles.infoSet}>
      <div className={styles.infoRecruitment}>
        <p>모집인원</p>
        <span className={styles.recruitment}>{recruitment}</span>
      </div>
      <div className={styles.infoTime}>
        <p>출발시간</p>
        <span className={styles.time}>{meetTime[1]}</span>
        <span className={styles.date}>{meetTime[0]} </span>
      </div>
    </div>
  </li>
  );
}

export default Meet;