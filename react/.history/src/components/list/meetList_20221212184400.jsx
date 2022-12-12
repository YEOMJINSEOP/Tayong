import React, { useEffect } from 'react';
import { useState } from 'react';
import {v4 as uuidV4} from 'uuid';
import styles from './meetList.module.css';
import { FaArrowRight } from 'react-icons/fa';
import {json, useNavigate, useParams } from 'react-router-dom';
import Meet from '../meet/meet';
import { FiDatabase } from 'react-icons/fi';
import getData from '../../service/getData';


function MeetList(props) {

  const navigate = useNavigate();

  const [meetList, setMeetList] = useState([]);
  let param = useParams();
  // console.log(param['*']);
  const depLoc = param['*'].split('/')[0];
  const arrLoc = param['*'].split('/')[1]
  console.log(param['*'].split('/'));

  const meetUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getmeeting'
  useEffect(() => {
      getData(meetUrl)
      .then(res => console.log(data))
      .then(data => {
        console.log("위치 데이터를 받아왔습니다🥕")
        setMeetList(data);
        console.log(data);
  })
  }, []);

  
  return (
    <div className={styles.meetList}>
      <div className={styles.location}>
        <div className={styles.locationDeparture}>
          <label className={styles.meetListLabel}htmlFor='departure'>출발</label>
          <input readOnly={true}
              type="text"
              id='departure'
              name='departure'
              value = {depLoc}
          />
        </div>
      <FaArrowRight className={styles.locationArrow}/>
      <div className={styles.locationArrival}>
        <label className={styles.meetListLabel} htmlFor='arrival'>도착</label>
          <input
              readOnly={true}
              type="text"
              id='arrival'
              name='arrival'
              value = {arrLoc}
          />    
        </div>    
      </div>
      <button className={styles.btn_create} onClick={(e) => {
        navigate('/create');
      }}>모집하기</button>
      <ul className={styles.meetUl}>
        {meetList.map((item) => {
          if(item.departure === depLoc && item.arrival === arrLoc){
            
            return (
              <Meet
                randomKey = {item.randomKey} // key 값을 randomKey로 설정
                key={item.randomKey}
                id={item.id}
                title={item.title}
                departure={item.departure}
                arrival={item.arrival}
                recruitment={item.recruitment}
                remainingTime={item.remainingTime}
                transport={item.transport}
               />
              ) 
          }
        })}
      </ul>
    </div>
  );
}

export default MeetList;